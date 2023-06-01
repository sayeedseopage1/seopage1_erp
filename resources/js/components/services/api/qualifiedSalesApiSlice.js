import { apiSlice } from "./apiSlice";            


const qualifiedSalesApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getQualifiedSales: build.query({
            query: () => `/account/qualified-sales?mode=json`
        }),
    })
}) ;



export const { 
    useGetQualifiedSalesQuery
} = qualifiedSalesApiSlice;

