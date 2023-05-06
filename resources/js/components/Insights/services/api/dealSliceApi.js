



import { apiSlice } from "./apiSlice";            


const dealSliceApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getDeals: build.query({
            query: (id) => `/account/insights/deals`
        })
        
    })
}) ;



export const { useGetDealsQuery } = dealSliceApi;

