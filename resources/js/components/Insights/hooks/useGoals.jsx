import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import * as React from 'react';


export const useGoals = () => {
    const {goals}  = useSelector(state => state.goals);

    // fetch all goals
    React.useEffect(() => {
        const fetch = async () => {
            // dispatch(setStatus({status: "loading"}));
            await axios.get('/account/insights/goals/get').then(res => {
                // dispatch(setDeals(res.data));
                // console.log(res.data);
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