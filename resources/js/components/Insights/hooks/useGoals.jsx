import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import * as React from 'react';
import { setGoals, setRecurring, setStatus } from "../services/slices/goalSlice";
import { useGetGoalsQuery } from "../services/api/goalsApiSlice";


export const useGoals = () => {
    const {goals}  = useSelector(state => state.goals);
    const dispatch = useDispatch();

    const {data: goalsData, isLoading: goalsIsLoading, error: goalsError} = useGetGoalsQuery(window.Laravel.user.id);

    React.useEffect(() => {
        if(goalsData && !goalsIsLoading){
            dispatch(setGoals(goalsData.goals));
            dispatch(setRecurring(goalsData.recurring));
        }
    }, [goalsData, goalsIsLoading, goalsError])


    const getGoalById = (id) => {
        return goals.length > 0 && goals.find(goal => goal.id === id);
    }


    return {goals, goalsIsLoading ,getGoalById}
}