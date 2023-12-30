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

       
        wonDealCreate: build.mutation({
            query: (data) => ({
                url: "/account/accounts/deals/store",
                method: "POST",
                body: {
                    ...data,
                    _token,
                },
            }),
            invalidatesTags: ["WON_DEALS"]
        }),

        wonDealUpdate: build.mutation({
            query: (data) => ({
                url: "/account/accounts/deals/update",
                method: "POST",
                body: {
                    ...data,
                    _token,
                },
            }),

            invalidatesTags: ["WON_DEALS"]
        }),

        wonDealDelete: build.mutation({
            query: (dealId) => ({
                url: `/account/deals/${dealId}`,
                method: "DELETE",
                body: {
                    _token,
                },
            }),
            invalidatesTags: ["WON_DEALS"]
        }),
         
        // deal export data
        exportableWonDeals: build.mutation({
            query: (query) => ({
                url: `/account/export-deal-data?${query}`,
                method: "GET",
            })
        }),

 
    }),
});

export const { 
    useWonDealsQuery, 
    useWonDealCreateMutation,
    useWonDealUpdateMutation,
    useWonDealDeleteMutation,
    useExportableWonDealsMutation
} = WonDealsApiSlice;
