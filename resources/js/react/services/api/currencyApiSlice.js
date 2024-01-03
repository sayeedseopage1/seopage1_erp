import { apiSlice } from "./apiSlice";            

const CurrencyApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        currencyList: build.query({
            query: () => `/account/get-all-currencies`
        })
    })
}) ;

 
export const { 
    useCurrencyListQuery
 } = CurrencyApiSlice;

