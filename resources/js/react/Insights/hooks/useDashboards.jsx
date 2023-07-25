import axios from 'axios';
import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addDashboard, setDashboards } from '../services/slices/dashboardSlice';
import { closeDashboardModal } from '../services/slices/dashboardModalSlice';


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


    // save new dashboard 
    const addNewDashboard = async (data, setLoading , setError) => {
        await axios.post('/account/insights/dashboards/add', data).then(res => {
            if(res.data.length > 0){
                setLoading(false)
                dispatch(addDashboard(res.data[0]));
                dispatch(closeDashboardModal());
            }
        }).catch(err => {
            setLoading(false)
            console.log(err)
        })
    }

    return {dashboards, addNewDashboard};
}