import { apiSlice } from "./apiSlice";

const _token = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

const DmWonDealsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        dmWonDeals: build.query({
            query: (query) => `/account/get-dm-contracts-data?${query}`,
            providesTags: ["WON_DEALS"],
        }),
                
        // deal export data
        exportableDmWonDeals: build.mutation({
            query: (query) => ({
                url: `/account/export-dm-contracts-data?${query}`,
                method: "GET",
            })
        }),

 
    }),
});

export const { 
    useDmWonDealsQuery,  
    useExportableDmWonDealsMutation
} = DmWonDealsApiSlice;
