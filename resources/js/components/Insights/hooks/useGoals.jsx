import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import * as React from 'react';
import { useGetGoalsQuery, useUpdateGoalMutation, usePrefetch } from "../services/api/goalsApiSlice";
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
    }
}