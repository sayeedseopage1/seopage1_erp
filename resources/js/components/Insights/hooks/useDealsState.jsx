import axios from 'axios';
import * as React from 'react';
import { useDispatch,  useSelector } from 'react-redux';
import { setDeals, setLeads, setStatus } from '../services/slices/dealSlice';
import { CompareDate } from '../utils/dateController';
import { useGetDealsQuery } from '../services/api/dealSliceApi';
import { useGoals } from './useGoals';
import dayjs from 'dayjs';
import { stage } from '../utils/constants';
import _ from 'lodash';


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
    const getDeals = (deals, goal, startDate, endDate, filter) => {

        
        if(!deals || !goal) return;

        let _endDate = endDate;


        if(filter?.start && filter?.end){
            startDate = filter.start;
            endDate = filter.end;
        } else {
            startDate = startDate ? startDate : goal.startDate;
            _endDate = endDate ? endDate : getEndDate(goal);
        }
        
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
        let result;
        
        
        
        if(!deals) return;

        
            startDate = period.start;
            endDate = period.end;

        const _deals = getDeals(deals, goalData, startDate, endDate, filter);

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
       target = parseInt(target) === target ? target : target.toFixed(1);

       if(_.lowerCase(goalData.trackingType) === 'value'){
            difference = dealAdded - Number(period.value);
       } else {
            difference = totalDeal - Number(period.value);
       }


         difference =  parseInt(difference) === difference ? difference : difference.toFixed(1);
         goal =  parseInt(goal) === goal ? goal : goal.toFixed(1);


        result = _.lowerCase(goalData.trackingType) === 'value' ? dealAdded : totalDeal;
        result = parseInt(result) === result ? result : result.toFixed(1);
        let yAxis = 0;

        if(_.lowerCase(goalData.trackingType) === 'value'){
            if(goal < dealAdded){
                yAxis = dealAdded;
            }else{
                yAxis = goal;
            }
        }else{
            if(goal < totalDeal){
                yAxis = totalDeal;
            }else{
                yAxis = goal
            }
        }



        // formate
        dealAdded = dealAdded.toFixed(2);

        return {
            deals: _deals,
            ...period,
            id: `${period.index || index} `,
            totalDeal: Number(totalDeal),
            dealAdded: Number(dealAdded),
            dealWon,
            dealLost,
            dealAddedPercentage,
            dealWonPercentage,
            dealLostPercentage,
            goalProgress,
            target,
            difference,
            goal,
            result,
            targetType: _.lowerCase(goalData.trackingType),
            goalData,
            yAxis 
        }
        
    }




    // get summary 
    const getSummary = ( deals, goal, filter, applyFilter ) => {
        if(!deals || !goal) return;
        let period = applyFilter ? getTargetPeriod(goal, filter) : getTargetPeriod(goal);
        let summary = [];


        period.map((p, i) => {
            let analyzedValue = applyFilter ? analyzeDeals(deals, p, goal, i, filter) : analyzeDeals(deals, p, goal, i);
            summary.push(analyzedValue);
        })

        return summary;
    }   
    


    return {deals, getDeals, getLeadByDealId, getSummary, getDealStateStatus: status, getDealStateError:error }
}