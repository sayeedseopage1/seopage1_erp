import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import * as React from 'react';


export const useGoals = () => {
    const {goals}  = useSelector(state => state.goals);
    

    // fetch all goals
    React.useEffect(() => {
        const fetch = async () => {
            const id = window.Laravel.user.id;
            if(!id) return;
            // dispatch(setStatus({status: "loading"}));
            await axios.get(`/account/insights/goals/get/${id}`).then(res => {
                // dispatch(setDeals(res.data));
                console.log(res.data);
                // dispatch(setStatus({status: 'completed'}));
            }).catch(err => {
                console.log(err);
                // dispatch(setStatus({status: 'idle'}));
            })
        }

        fetch();
    }, [])

 
    return {goals}
}