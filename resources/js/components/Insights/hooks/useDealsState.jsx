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

        let filteredDeals = [];    
        let othersDeals = [];


        // filter by date range
        deals.map(deal => {
            if(day.isSameOrAfter(deal.created_at, startDate) && 
                day.isSameOrBefore(deal.created_at, _endDate)){
                 filteredDeals.push(deal);
                }else {
                    othersDeals.push(deal);
                }
        })



        if(_.lowerCase(goal.dealType) === 'new client'){
            // create array of all clients username
             let clients = filteredDeals.map(deal => deal.client_username);    
           // create unique array of clients username
            clients = [...new Set(clients)];

            // if any client has existing on other deals then remove it from clients array
            clients = clients.filter(client => {
                return !othersDeals.find(deal => deal.client_username === client)
            })

            // filter deals by clients
            filteredDeals = filteredDeals.filter(deal => {
                return clients.findIndex(client => client === deal.client_username) !== -1
            })


            // first deal of each client
            filteredDeals = filteredDeals.filter((deal, index) => {
                return filteredDeals.findIndex(d => d.client_username === deal.client_username) === index
            })


        } else if(_.lowerCase(goal.dealType) === 'existing client'){
            // create array of all clients username
            let clients = filteredDeals.map(deal => deal.client_username);    
            // create unique array of clients username
            clients = clients ?  [...new Set(clients)] : [];
            
            // if any client has no existing on other deals and 
            // has not duplicate on filtered deals then remove it from clients array

            clients = clients.filter(client => {
                return !othersDeals.find(deal => deal.client_username === client) &&
                        filteredDeals.findIndex(deal => deal.client_username === client) <= 0
            })


            // filter deals by clients
            filteredDeals = filteredDeals.filter(deal => {
                return clients.findIndex(client => client === deal.client_username) !== -1
            });


            // remove first deal of each client
            filteredDeals.filter((deal, index) => {
                return filteredDeals.findIndex(d => d.client_username === deal.client_username) !== index
            })
        }

        

        // filter by user if assignee type is user
        if(_.lowerCase(goal.assigneeType) === 'user'){
            filteredDeals = filteredDeals.filter(deal => deal.added_by === goal.assignedUser?.id);
        }

        // console.log(goal)
        // // filter by team if assignee type is team
        if(_.lowerCase(goal.assigneeType) === 'team' && goal.team){
            const members = goal.team?.members?.split(',');

            filteredDeals = filteredDeals.filter(deal => {
                return members.findIndex(member => Number(member) === Number(deal.added_by)) !== -1
            })
        }

        // filter by entry type
        if(_.lowerCase(goal.entryType) === 'progressed'){
            filteredDeals = filteredDeals.filter(deal => _.lowerCase(goal.qualified) === _.lowerCase(stage[Number(deal.deal_stage)]));
        }

        if(_.lowerCase(goal.entryType) === 'won'){
            filteredDeals = filteredDeals.filter(deal => _.lowerCase(deal.won_lost) === 'yes');
        }     
        return filteredDeals;
    }


    // distribute deals by period
    const distributeDealsByPeriod = (deals, startDate, endDate) => {
        return deals.filter(deal => {
            return day.isSameOrAfter(deal.created_at, startDate) && 
            day.isSameOrBefore(deal.created_at, endDate)
        })
    }


    /// get lead by deal id
    const getLeadByDealId = (leads, dealId) => {
        if(!leads.length) return;
        return leads.find(lead => lead.deal_id === dealId);
    }



    // analyze deals with in period
    const analyzeDeals = (deals, period, goalData , index) => {
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
        let result = 0;
        let yAxis = goalData.trackingValue;
        let target = 0;
        let goal = 0;
        let _deals = deals;
        
    
        

        
        startDate = period.start;
        endDate = period.end;

         _deals = distributeDealsByPeriod(_deals, startDate, endDate);
        // get period start and end date

        goal = Number(period.value);

        if(_deals.length > 0){
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



                    
                goalProgress = goal === 0 ? 0 : ( dealAdded /goal ) * 100;
                // goalProgress  = goalProgress > 100 ? 100 : goalProgress;
                goalProgress = goalProgress < 0 ? 0 : goalProgress;

                // if goal progress not integer then fix it to 1 decimal place
                if(goalProgress % 1 !== 0){
                    goalProgress = goalProgress.toFixed(1);
                }

                target = goal - dealAdded;
                target = parseInt(target) === target ? target : target.toFixed(1);

                    
                goal =  parseInt(goal) === goal ? goal : goal.toFixed(1);


                result = _.lowerCase(goalData.trackingType) === 'value' ? dealAdded : totalDeal;
                result = parseInt(result) === result ? result : result.toFixed(1);

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
        }



        if(_.lowerCase(goalData.trackingType) === 'value'){
            difference = dealAdded - Number(period.value);
        } else {
            difference = totalDeal - Number(period.value);
        }


        difference =  parseInt(difference) === difference ? difference : difference.toFixed(1);

        
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