import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import * as React from 'react';
import { useGetGoalsQuery, useUpdateGoalMutation, usePrefetch, useAddGoalMutation } from "../services/api/goalsApiSlice";
import { getPeriod } from "../utils/getPeriod";
import dayjs from 'dayjs';
import _ from "lodash";


export const useGoals = () => {
    const [goals, setGoals] = React.useState({
        goals: [],
        recurring: []
    });
    const dispatch = useDispatch();


    const [
        addGoal,
        {
            isUninitialized: addGoalIsUninitialized,
            isSuccess: addGoalIsSuccess,
            isLoading: addGoalIsLoading,
            isFetching: addGoalIsFetching,
        }
    ] = useAddGoalMutation();

    const [
        updateGoal,
        {
            isUninitialized: updateGoalIsUninitialized,
            isSuccess: updateGoalIsSuccess,
            isLoading: updateGoalIsLoading,
        }
    ] = useUpdateGoalMutation();


   const {
        data: goalsData,
        isLoading: goalsIsLoading,
        isSuccess: goalsIsSuccess,
        isFetching: goalsIsFetching,
    } = useGetGoalsQuery(
        window?.Laravel?.user?.id
    );


    React.useEffect(() => {
        if(goalsData && goalsIsSuccess){
            const newGoals = [];
            const newRecurring = [];

            
             goalsData?.goals?.map(goal => {
                if(_.isArray(goal)){
                    newGoals.push(...goal);
                }else{
                    newGoals.push(goal)
                }
               
            })

             goalsData?.recurring?.map(r => {
                if(_.isArray(r)){
                    newRecurring.push(...r);
                }else{
                    newRecurring.push(r)
                }
            })

            setGoals({
                goals: newGoals,
                recurring: newRecurring
            })
        }

       

    }, [goalsData, goalsIsSuccess])


    // get end date
    // get goals
     const getEndDate = (goal) => {
        const frequency = _.toLower(goal.frequency)

        if(frequency === 'monthly'){
            return dayjs(goal.startDate).add(1, 'month').format('YYYY-MM-DD');
        }

        if(frequency === 'weekly'){
            return dayjs(goal.startDate).add(1, 'week').format('YYYY-MM-DD');
        } 
        
        if(frequency === 'yearly'){
            return dayjs(goal.startDate).endOf('year').format('YYYY-MM-DD');
        }
        if(frequency === 'quarterly'){
            return dayjs(goal.startDate).add(1, 'quarter').format('YYYY-MM-DD');
        }
    }


    // create goal period
    const getTargetPeriod = (goal, filter) => {
        if(!goal) return;
        let recurring;
        if(!filter && _.isEmpty(filter)){
            recurring = goal?.recurring?.length > 0 ? goal.recurring :  getPeriod({
                startDate: goal.startDate,
                endDate: goal.endDate || getEndDate(goal),
                frequency: goal.frequency,
                defaultValue: goal.trackingValue
            });
        }else{
            recurring = getPeriod({
                startDate: filter.start,
                endDate: filter.end,
                frequency: goal.frequency,
                defaultValue: goal.trackingValue
            });
        }
        return [...recurring];
    }



    /// fixed decimal 
    const fixedDecimalPlace = (_value) => {
        let value = Number(_value);
        return parseInt(value) === value ? value : value.toFixed(1);
    }

    // added goal summary
    const addedGoalSummary = (deals, goalData, period, index) => {
        let totalDeal = 0;
        let dealAdded = 0;
        let dealWon = 0;
        let dealLost = 0;
        let dealAddedPercentage = 0;
        let dealWonPercentage = 0;
        let dealLostPercentage = 0;
        let goalProgress = 0;
        let difference = 0;
        let result = 0;
        let yAxis = goalData.trackingValue;
        let target = 0;
        let goal = 0;
        let _deals = deals || [];
        let rowCount = 0;

        if(_.isEmpty(deals) || deals === undefined){
            totalDeal = 0;
            dealAdded = 0;
            dealWon = 0;
            dealLost = 0;
            dealAddedPercentage = 0;
            dealWonPercentage = 0;
            dealLostPercentage = 0;
            goalProgress = 0;
            difference = 0; 
            result = 0;
            yAxis = goalData?.goal?.trackingValue;
            target = 0;
            goal = Number(period.value);
            rowCount = 0;
        } else {
            totalDeal = _deals.length;
            
            goal = Number(period.value);
            dealAdded = _deals.reduce((total, deal) => {
                return total + Number(deal.deal_amount);
            }, 0);


            rowCount = _deals.length; 
            
            result = fixedDecimalPlace(dealAdded - goal);


            const {goal: _goal} = goalData;

            if(_goal?.trackingType === "Value"){
                goalProgress = goal !== 0 ? (dealAdded / goal) * 100 : 0;
                difference = fixedDecimalPlace(dealAdded - goal);
                target = goal - dealAdded;
                result = dealAdded
                // create yAxis;

                if (goal < dealAdded) {
                    yAxis = dealAdded;
                } else {
                    yAxis = goal;
                }

            }else{
                goalProgress = goal !== 0 ? (totalDeal / goal) * 100 : 0;
                difference = fixedDecimalPlace(totalDeal - goal);
                target = goal - totalDeal;
                result = totalDeal;

            // create yAxis
                if (goal < totalDeal) {
                    yAxis = totalDeal;
                } else {
                    yAxis = goal
                }
            }

            
            // formate
            result = fixedDecimalPlace(result);
            totalDeal = fixedDecimalPlace(totalDeal);
            target = fixedDecimalPlace(target);
            dealAdded = fixedDecimalPlace(dealAdded);
            difference = fixedDecimalPlace(difference);
            goalProgress = goalProgress < 0 ? 0 : goalProgress;
            if (goalProgress % 1 !== 0) {
                goalProgress = goalProgress.toFixed(1);
            };

        }

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
            targetType: _.lowerCase(goalData?.goal.trackingType),
            goalData,
            yAxis,
            rowCount
        }


    }


    // progressed goal summary 
    const progressedGoalSummary = (deals, goalData, period, index) => {
        let totalDeal = 0;
        let dealAdded = 0;
        let dealWon = 0;
        let dealLost = 0;
        let dealAddedPercentage = 0;
        let dealWonPercentage = 0;
        let dealLostPercentage = 0;
        let goalProgress = 0;
        let difference = 0;
        let result = 0;
        let yAxis = goalData.trackingValue;
        let target = 0;
        let goal = 0;
        let rowCount = 0;
        let _deals = deals;



        // fixed decimal place to 2 if not integer
        const fixedDecimalPlace = (_value) => {
            let value = Number(_value);
            return parseInt(value) === value ? value : value.toFixed(1);
        }

        if (_deals.length > 0) {
            totalDeal = _deals.length;
            rowCount = _deals.length;

            goal = Number(period.value);
            dealAdded = _deals.reduce((total, deal) => {
                return total + Number(deal.amount);
            }, 0);

            

            // count total deal added value
            _deals.map(deal => {
                if (_.lowerCase(deal.won_lost) === 'yes') {
                    dealWon++;
                }
                if (_.lowerCase(deal.won_lost) === 'no') {
                    dealLost++;
                }
            })

            if(goalData?.goal?.trackingType  === 'Value') {
                goalProgress = goal === 0 ? 0 : (dealAdded / goal) * 100;
                target = goal - dealAdded;
            }else{
                goalProgress = goal === 0 ? 0 : (totalDeal / goal) * 100;
                target = goal - totalDeal;
            }


            
            goalProgress = goalProgress < 0 ? 0 : goalProgress;
            if (goalProgress % 1 !== 0) {
                goalProgress = goalProgress.toFixed(1);
            };

            
            target = fixedDecimalPlace(target);
            goal = fixedDecimalPlace(goal);
            const {goal: _goalData} = goalData;

          

            result = _.lowerCase(_goalData.trackingType) === 'value' ? dealAdded : totalDeal;
            result = fixedDecimalPlace(result);

            if (_.lowerCase(_goalData.trackingType) === 'value') {
                if (goal < dealAdded) {
                    yAxis = dealAdded;
                } else {
                    yAxis = goal;
                }
            } else {
                if (goal < totalDeal) {
                    yAxis = totalDeal;
                } else {
                    yAxis = goal
                }
            }




            /// difference
            if (_.lowerCase(_goalData.trackingType) === 'value') {
                difference = dealAdded - Number(period.value);
            }else{
                difference = totalDeal - Number(period.value);
            }

            
            dealAdded = fixedDecimalPlace(dealAdded);
            difference = fixedDecimalPlace(difference);
        } else {
            totalDeal = 0;
            dealAdded = 0;
            dealWon = 0;
            dealLost = 0;
            dealAddedPercentage = 0;
            dealWonPercentage = 0;
            dealLostPercentage = 0;
            goalProgress = 0;
            difference = 0;
            result = 0;
            yAxis = goalData?.goal?.trackingValue;
            target = 0;
            goal = Number(period.value);
            rowCount = 0;
        }

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
            targetType: _.lowerCase(goalData?.goal.trackingType),
            goalData,
            yAxis,
            rowCount
        }

    }


    // get goal won deals 
    const wonGoalSummary = (deals, goalData, period, index) => {
        let totalDeal = 0;
        let dealAdded = 0;
        let dealWon = 0;
        let dealLost = 0;
        let dealAddedPercentage = 0;
        let dealWonPercentage = 0;
        let dealLostPercentage = 0;
        let goalProgress = 0;
        let difference = 0;
        let result = 0;
        let yAxis = goalData.trackingValue;
        let target = 0;
        let goal = 0;
        let _deals = deals;
        let rowCount = 0;


        // fixed decimal place to 2 if not integer
        const fixedDecimalPlace = (_value) => {
            let value = Number(_value);
            return parseInt(value) === value ? value : value.toFixed(1);
        }

        if (_deals.length > 0) {
            
            rowCount = _deals.length;
            goal = Number(period.value);
            if(goalData?.goal?.general_checkbox) {
                dealAdded = _deals.reduce((total, deal) => {
                    return total + Number(deal.amount);
                }, 0);
            }else{
                dealAdded = _deals.reduce((total, deal) => {
                    return total + Number(deal.team_total_amount);
                }, 0);
            }
            

            
           if(Number(goalData?.goal?.team_id) ===  1){
            totalDeal = dealAdded;
           } 
            

            // count total deal added value
            _deals.map(deal => {
                if (_.lowerCase(deal.won_lost) === 'yes') {
                    dealWon++;
                }
                if (_.lowerCase(deal.won_lost) === 'no') {
                    dealLost++;
                }
            })

            if(goalData?.goal?.trackingType === "Value"){
                goalProgress = goal === 0 ? 0 : (dealAdded / goal) * 100;
                target = goal - dealAdded;
            }else{
                goalProgress = goal === 0 ? 0 : (totalDeal / goal) * 100;
                target = goal - totalDeal;
            }
            
            goalProgress = goalProgress < 0 ? 0 : goalProgress;
            if (goalProgress % 1 !== 0) {
                goalProgress = goalProgress.toFixed(1);
            };

            
            target = fixedDecimalPlace(target);
            goal = fixedDecimalPlace(goal);
            const {goal: _goalData} = goalData;

          

            result = _.lowerCase(_goalData.trackingType) === 'value' ? dealAdded : totalDeal;
            result = fixedDecimalPlace(result);

            if (_.lowerCase(_goalData.trackingType) === 'value') {
                if (goal < dealAdded) {
                    yAxis = dealAdded;
                } else {
                    yAxis = goal;
                }
            } else {
                if (goal < totalDeal) {
                    yAxis = totalDeal;
                } else {
                    yAxis = goal
                }
            }




            /// difference
            if (_.lowerCase(_goalData.trackingType) === 'value') {
                difference = dealAdded - Number(period.value);
            }else{
                difference = totalDeal - Number(period.value);
            }

            
            dealAdded = fixedDecimalPlace(dealAdded);
            difference = fixedDecimalPlace(difference);
        } else {
            totalDeal = 0;
            dealAdded = 0;
            dealWon = 0;
            dealLost = 0;
            dealAddedPercentage = 0;
            dealWonPercentage = 0;
            dealLostPercentage = 0;
            goalProgress = 0;
            difference = 0;
            result = 0;
            yAxis = goalData?.goal?.trackingValue;
            target = 0;
            goal = Number(period.value);
            rowCount = 0;
        }

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
            targetType: _.lowerCase(goalData?.goal.trackingType),
            goalData,
            yAxis,
            rowCount
        }

    }


    


    return {
        goals,
        goalsIsLoading,
        goalsIsSuccess,
        goalsIsFetching,
        getTargetPeriod, 
        getEndDate, 

        // update
        updateGoal,
        updateGoalIsUninitialized,
        updateGoalIsSuccess,
        updateGoalIsLoading,

        // add
        addGoal,
        addGoalIsUninitialized,
        addGoalIsSuccess,
        addGoalIsLoading,
        addGoalIsFetching,


        // 
        addedGoalSummary,
        wonGoalSummary,
        progressedGoalSummary
    }
}