import { apiSlice } from "./apiSlice";

const _token = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

const WonDealsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        wonDeals: build.query({
            query: (query) => `/account/get-contracts-data?${query}`,
            providesTags: ["WON_DEALS"],
        }),
                
        // deal export data
        exportableWonDeals: build.mutation({
            query: (query) => ({
                url: `/account/export-contracts-data?${query}`,
                method: "GET",
            })
        }),

 
    }),
});

export const { 
    useWonDealsQuery,  
    useExportableWonDealsMutation
} = WonDealsApiSlice;
