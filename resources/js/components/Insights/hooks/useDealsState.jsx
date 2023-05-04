import axios from 'axios';
import * as React from 'react';
import { useDispatch,  useSelector } from 'react-redux';
import { setDeals, setStatus } from '../services/slices/dealSlice';
import { CompareDate } from '../utils/dateController';
import { useGetDealsQuery } from '../services/api/dealSliceApi';
import dayjs from 'dayjs';


export const useDealsState = () => {
    const { deals, status, error } = useSelector(state => state.deals);
    const dispatch = useDispatch();
    const day = new CompareDate();

    const {
        data: dealsData,
        isLoading: dealsIsLoading,
        error: dealsError,
        isFetching: dealsIsFetching
    } = useGetDealsQuery({
        refetchOnMountOrArgChange: true,
        skip: deals.length > 0
    });
    

    React.useEffect(() => {
        if(dealsData && !dealsIsFetching){
            dispatch(setDeals(dealsData));
        }
    }, [dealsData, dealsIsFetching])


    // get deals 
    const getDeals = (deals, startDate, endDate) => {

        return deals.filter(deal => {
            if(endDate){
                return day.isSameOrAfter(deal.created_at, startDate) &&
                day.isSameOrBefore(deal.created_at, endDate)
            }else{
                return day.isSameOrAfter(deal.created_at, startDate)
            }
        });
    }


    return {deals, getDeals, getDealStateStatus: status, getDealStateError:error }
}