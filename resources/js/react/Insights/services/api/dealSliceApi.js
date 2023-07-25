



import { apiSlice } from "./apiSlice";            


const dealSliceApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getDeals: build.query({
            query: (id) => `/account/insights/deals`
        }),

        getDealsByGoalId: build.query({
            query: (goalId) => `/account/insights/deal-details/${goalId}`,
            providesTags: (result, error, goalId) => [{ type: 'Deal', goalId: goalId }]
        })
        
    })
}) ;



export const { useGetDealsQuery, useGetDealsByGoalIdQuery } = dealSliceApi;

