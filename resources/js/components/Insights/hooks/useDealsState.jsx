import axios from 'axios';
import * as React from 'react';
import { useDispatch,  useSelector } from 'react-redux';
import { setDeals, setStatus } from '../services/slices/dealSlice';


export const useDealsState = () => {
    const { deals, status, error } = useSelector(state => state.deals);
    const dispatch = useDispatch();
    

    // fetch deal data
    React.useEffect(() => {
        const fetch = async () => {
            dispatch(setStatus({status: "loading"}));
            await axios.get('/account/insights/deals').then(res => {
                dispatch(setDeals(res.data));
                dispatch(setStatus({status: 'completed'}));
            }).catch(err => {
                console.log(err);
                dispatch(setStatus({status: 'idle'}));
            })
        }

        if(deals.length === 0){
            fetch();
        }
    }, [])


    return {deals, getDealStateStatus: status, getDealStateError:error }
}