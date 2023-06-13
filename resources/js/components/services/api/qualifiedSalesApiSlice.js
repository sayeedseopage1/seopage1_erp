import { apiSlice } from "./apiSlice";            


const qualifiedSalesApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getQualifiedSales: build.query({
            query: (query) => `/account/qualified-sales?mode=json&${query}`
        }),
    })
}) ;



export const { 
    useGetQualifiedSalesQuery,
    useLazyGetQualifiedSalesQuery
} = qualifiedSalesApiSlice;

