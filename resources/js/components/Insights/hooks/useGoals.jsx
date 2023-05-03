import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import * as React from 'react';
import { setGoals, setRecurring, setStatus } from "../services/slices/goalSlice";


export const useGoals = () => {
    const {goals}  = useSelector(state => state.goals);
    const dispatch = useDispatch();
    

    // fetch all goals
    React.useEffect(() => {
        const fetch = async () => {
            const id = window.Laravel.user.id;
            if(!id) return;
            dispatch(setStatus({status: "loading"}));
            await axios.get(`/account/insights/goals/get/${id}`).then(res => {
                if(res.data){
                    const { goals, recurring } = res.data;
                    dispatch(setGoals(goals));
                    dispatch(setRecurring(recurring));
                    dispatch(setStatus({status: 'completed'}));
                }
            }).catch(err => {
                console.log(err);
                dispatch(setStatus({status: 'idle'}));
            })
        }

        if(goals.length === 0){
            fetch();
        }
    }, [])

 
    return {goals}
}