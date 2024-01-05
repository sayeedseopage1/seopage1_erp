import { apiSlice } from "./apiSlice";

const _token = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

const DealApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        deals: build.query({
            query: (query) => `/account/get-deal-data?${query}`,
            providesTags: ["DEALS"],
        }),

       
        dealCreate: build.mutation({
            query: (data) => ({
                url: "/account/accounts/deals/store",
                method: "POST",
                body: {
                    ...data,
                    _token,
                },
            }),
            invalidatesTags: ["DEALS"]
        }),

        dealUpdate: build.mutation({
            query: (data) => ({
                url: "/account/accounts/deals/update",
                method: "POST",
                body: {
                    ...data,
                    _token,
                },
            }),

            invalidatesTags: ["DEALS"]
        }),

        dealDelete: build.mutation({
            query: (dealId) => ({
                url: `/account/deals/${dealId}`,
                method: "DELETE",
                body: {
                    _token,
                },
            }),
            invalidatesTags: ["DEALS"]
        }),
         
        // deal export data
        exportableDeals: build.mutation({
            query: (query) => ({
                url: `/account/export-deal-data?${query}`,
                method: "GET",
            })
        }),

 
    }),
});

export const { 
    useDealsQuery, 
    useDealCreateMutation,
    useDealUpdateMutation,
    useDealDeleteMutation,
    useExportableDealsMutation
} = DealApiSlice;
