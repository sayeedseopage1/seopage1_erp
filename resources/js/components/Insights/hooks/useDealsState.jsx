import axios from 'axios';
import * as React from 'react';
import { useDispatch,  useSelector } from 'react-redux';
import { setDeals, setLeads, setStatus } from '../services/slices/dealSlice';
import { CompareDate } from '../utils/dateController';
import { useGetDealsQuery } from '../services/api/dealSliceApi';
import { useGoals } from './useGoals';
import dayjs from 'dayjs';
import { stage } from '../utils/constants';


export const useDealsState = () => {
    const { deals, leads , status, error } = useSelector(state => state.deals);
    const {getTargetPeriod, getEndDate} = useGoals();
    const dispatch = useDispatch();
    const day = new CompareDate();

    const {
        data: dealsData,
        isLoading: dealsIsLoading,
        error: dealsError,
        isFetching: dealsIsFetching
    } = useGetDealsQuery({
        refetchOnMountOrArgChange: true,
        skip: deals.length > 0
    });
    

    React.useEffect(() => {
        if(dealsData && !dealsIsFetching){
            dispatch(setDeals(dealsData));
            dispatch(setLeads(dealsData));
        }
    }, [dealsData, dealsIsFetching])


    // get deals 
    const getDeals = (deals, goal, startDate, endDate) => {

        
        if(!deals || !goal) return;
        const _endDate = endDate ? endDate : getEndDate(goal);
        // console.log(goal)
       
        let filteredDeals = deals.filter(
                deal => day.isSameOrAfter(deal.created_at, startDate) && 
                day.isSameOrBefore(deal.created_at, _endDate)  
                &&
                (goal.assigneeType === 'User' ? deal.added_by === goal.assignedUser?.id :
                 goal.assigneeType === 'Team' ?  goal.team?.members?.split(',').findIndex(d => Number(d) === Number(deal.added_by)) : false) &&
                (_.lowerCase(goal.entryType) === 'progressed' ? _.lowerCase(goal.qualified) === _.lowerCase(stage[Number(deal.deal_stage)]) : true) &&
                (_.lowerCase(goal.entryType) === 'won' ? _.lowerCase(deal.won_lost) === 'yes' : true)
            );
        
            
        return filteredDeals;
    }


    /// get lead by deal id
    const getLeadByDealId = (leads, dealId) => {
        if(!leads.length) return;
        return leads.find(lead => lead.deal_id === dealId);
    }



    // analyze deals with in period
    const analyzeDeals = (deals, period, goalData , index, filter) => {
        let totalDeal = 0;
        let dealAdded = 0;
        let dealWon = 0;
        let dealLost = 0;
        let dealAddedPercentage = 0;
        let dealWonPercentage = 0;
        let dealLostPercentage = 0;
        let goalProgress = 0;
        let difference = 0;
        let endDate ;
        let startDate;
        
        
        
        if(!deals) return;

        if(filter.end && filter.start){
            startDate = filter.start;
            endDate = filter.end;
        }else{
            startDate = period.start;
            endDate = period.end;
        }

        const _deals = getDeals(deals, goalData, startDate, endDate);

        // get period start and end date

        totalDeal = _deals.length;

        // count total deal added value 
        _deals.map(deal => {
            // console.log({deal, startDate, endDate})
            
                dealAdded += deal.amount;


                if(_.lowerCase(deal.won_lost) === 'yes') {
                    dealWon++;
                }
                if(_.lowerCase(deal.won_lost) === 'no') {
                    dealLost++;
                }

            })



       let goal = Number(period.value);
            
        goalProgress = goal === 0 ? 0 : ( dealAdded /goal ) * 100;
        // goalProgress  = goalProgress > 100 ? 100 : goalProgress;
        goalProgress = goalProgress < 0 ? 0 : goalProgress;

        // if goal progress not integer then fix it to 1 decimal place
        if(goalProgress % 1 !== 0){
            goalProgress = goalProgress.toFixed(1);
        }

       let target = goal - dealAdded;

        return {
            deals: _deals,
            ...period,
            id: `${period.index || index} `,
            totalDeal,
            dealAdded,
            dealWon,
            dealLost,
            dealAddedPercentage,
            dealWonPercentage,
            dealLostPercentage,
            goalProgress,
            target,
            difference:dealAdded - Number(period.value),
            goal
        }
        
    }




    // get summary 
    const getSummary = ( deals, goal, filter ) => {
        if(!deals || !goal) return;
        let period = getTargetPeriod(goal);
        let summary = [];


        period.map((p, i) => {
            let analyzedValue = analyzeDeals(deals, p, goal, i, filter);
            summary.push(analyzedValue);
        })

        return summary;
    }   
    


    return {deals, getDeals, getLeadByDealId, getSummary, getDealStateStatus: status, getDealStateError:error }
}