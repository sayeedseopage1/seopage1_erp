import axios from 'axios';
import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addDashboard, setDashboards } from '../services/slices/dashboardSlice';



export const useDashboards = () => {
    const {dashboards} = useSelector((state) => state.dashboards);
    const dispatch = useDispatch();

    // get dashboard from data base
    React.useState(() => {
        const fetch = async () => {
            await axios.get('/account/insights/dashboard/get')
                .then(res => {
                   dispatch(setDashboards(res.data)); 
                })
                .catch(err => {
                    console.log(err)
                })
        }

        
        if(dashboards.length === 0){
            fetch();
        }

        return () => fetch();
    }, [])


    return {dashboards};
}