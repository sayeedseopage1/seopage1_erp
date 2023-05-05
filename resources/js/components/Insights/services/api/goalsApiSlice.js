



import { apiSlice } from "./apiSlice";            


const goalApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getGoals: build.query({
            query: (id) => `/account/insights/goals/get/${id}`
        })
        
    })
}) ;



export const { useGetGoalsQuery } = goalApiSlice;

