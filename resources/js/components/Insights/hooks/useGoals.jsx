import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import * as React from 'react';
import { setGoals, setRecurring, setStatus } from "../services/slices/goalSlice";
import { useGetGoalsQuery } from "../services/api/goalsApiSlice";
import { getPeriod } from "../utils/getPeriod";
import dayjs from 'dayjs';


export const useGoals = () => {
    const {goals, recurring, status}  = useSelector(state => state.goals);
    const dispatch = useDispatch();

    const {data: goalsData, isLoading: goalsIsLoading, error: goalsError} = useGetGoalsQuery(window.Laravel.user.id);

    React.useEffect(() => {
        if(goalsData && !goalsIsLoading){
            dispatch(setGoals(goalsData));
            dispatch(setRecurring(goalsData));
        }
    }, [goalsData, goalsIsLoading, goalsError])


    const getGoalById = (id) => {
        if(goals.length > 0){
            const _goals = goals.find(goal => goal.id === id);
            const _recurring = recurring.length > 0 ? recurring.filter(r => r.goal_id === id) : [];
            return  {
                ..._goals,
                recurring: _recurring
            }
        }
        
    }



    // get end date
    // get goals
     const getEndDate = (goal) => {
        const frequency = _.toLower(goal.frequency)

        if(frequency === 'monthly'){
            return dayjs(goal.startDate).endOf('month').format('YYYY-MM-DD');
        }

        if(frequency === 'weekly'){
            return dayjs(goal.startDate).endOf('week').format('YYYY-MM-DD');
        } 
        
        if(frequency === 'yearly'){
            return dayjs(goal.startDate).endOf().format('YYYY-MM-DD');
        }
        if(frequency === 'quarterly'){
            return dayjs(goal.startDate).endOf('quarter').format('YYYY-MM-DD');
        }
    }


    // create goal period
    const getTargetPeriod = (goal) => {
        if(!goal) return;
        let recurring = goal?.recurring?.length > 0 ? goal.recurring :  getPeriod({
                startDate: goal.startDate,
                endDate: goal.endDate || getEndDate(goal),
                frequency: goal.frequency,
                defaultValue: goal.trackingValue
            }); 
        return [...recurring];
    }


    return {goals, goalsIsLoading ,getGoalById, getTargetPeriod, getEndDate, goalStateStatus: status}
}