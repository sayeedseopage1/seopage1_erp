import { apiSlice } from "./apiSlice";            

const singleTaskPageApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
         getTaskDetails: build.query({
            query: (query) => `/account/task${query}`
         })
    })
}) ;


export const { 
    useGetTaskDetailsQuery,
} = singleTaskPageApiSlice;