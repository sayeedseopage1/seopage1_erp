import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import * as React from 'react';
import { setGoals, setRecurring, setStatus } from "../services/slices/goalSlice";
import { useGetGoalsQuery } from "../services/api/goalsApiSlice";


export const useGoals = () => {
    const {goals, recurring}  = useSelector(state => state.goals);
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


    return {goals, goalsIsLoading ,getGoalById}
}