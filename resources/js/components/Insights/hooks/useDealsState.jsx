import axios from 'axios';
import * as React from 'react';
import { useDispatch,  useSelector } from 'react-redux';
import { setDeals, setLeads, setStatus } from '../services/slices/dealSlice';
import { CompareDate } from '../utils/dateController';
import { useGetDealsQuery } from '../services/api/dealSliceApi';
import { useGoals } from './useGoals';
import dayjs from 'dayjs';


export const useDealsState = () => {
    const { deals, leads , status, error } = useSelector(state => state.deals);
    const {getTargetPeriod} = useGoals();
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
    const getDeals = (deals, startDate, endDate) => {

        return deals.filter(deal => {
            if(endDate){
                return day.isSameOrAfter(deal.created_at, startDate) &&
                day.isSameOrBefore(deal.created_at, endDate)
            }else{
                return day.isSameOrAfter(deal.created_at, startDate)
            }
        });
    }


    /// get lead by deal id
    const getLeadByDealId = (leads, dealId) => {
        if(!leads.length) return;
        return leads.find(lead => lead.deal_id === dealId);
    }



    // analyze deals with in period
    const analyzeDeals = (deals, period) => {
        let totalDeal = 0;
        let dealAdded = 0;
        let dealWon = 0;
        let dealLost = 0;
        let dealAddedPercentage = 0;
        let dealWonPercentage = 0;
        let dealLostPercentage = 0;
        let difference = 0;
        
        
        if(!deals) return;

        const _deals = deals.filter(deal => day.isSameOrAfter(deal.created_at, period.start) && 
                day.isSameOrBefore(deal.created_at, period.end))
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




        return {
            ...period,
            id: period.id || period.title,
            totalDeal,
            dealAdded,
            dealWon,
            dealLost,
            dealAddedPercentage,
            dealWonPercentage,
            dealLostPercentage,
            difference: dealAdded - Number(period.value),
            goal: Number(period.value)
        }
        
    }




    // get summary 
    const getSummary = ( deals, goal ) => {
        if(!deals || !goal) return;
        let period = getTargetPeriod(goal);
        let summary = [];


        period.map(p => {
            let analyzedValue = analyzeDeals(deals, p);
            summary.push(analyzedValue);
        })

        return summary;
    }   
    


    return {deals, getDeals, getLeadByDealId, getSummary, getDealStateStatus: status, getDealStateError:error }
}