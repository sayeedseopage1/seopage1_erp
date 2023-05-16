



import { apiSlice } from "./apiSlice";            


const dealSliceApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getDeals: build.query({
            query: (id) => `/account/insights/deals`
        }),

        getDealByGoalId: build.query({
            query: (id) => `/account/insights/deal-details//${id}`
        })
        
    })
}) ;



export const { useGetDealsQuery, useGetDealByGoalIdQuery } = dealSliceApi;

