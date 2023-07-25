import { apiSlice } from "./apiSlice";            

const incentiveApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
       incentiveCurrentData: build.mutation({
            query: (data) => ({
                url: `/account/incentives-json/get`,
                method: 'POST',
                body: {
                    ...data,
                    _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
                },
            })
       }),


       getDisbursedAmount: build.query({
        query: (query) => `/account/incentives/disbursed-amounts/disbursed-get${query}`
       }),

       getHeldAmount: build.query({
        query: (query) => `/account/incentives/held-amounts/held-get${query}`
       }),

       

    })

}) ;



export const { 
    useIncentiveCurrentDataMutation,
    useGetDisbursedAmountQuery,
    useLazyGetDisbursedAmountQuery,
    useGetHeldAmountQuery,
    useLazyGetHeldAmountQuery
 } = incentiveApiSlice;

