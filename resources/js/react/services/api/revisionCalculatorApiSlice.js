import { apiSlice } from "./apiSlice";            


const revisionCalculatorApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
       getRevisionCalculatorData: build.query({
            query: (query) => `/account/revision-calculator-data${query}`,
       })  
    })
}) ; 

export const { 
    useLazyGetRevisionCalculatorDataQuery,
    useGetRevisionCalculatorDataQuery
} = revisionCalculatorApiSlice;

