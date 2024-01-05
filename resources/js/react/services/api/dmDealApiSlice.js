import { apiSlice } from "./apiSlice";

const _token = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

const DmDealApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        dmDeals: build.query({
            query: (query) => `/account/get-dm-deal-data?${query}`,
            providesTags: ["DM_DEALS"],
        }),

       
        dmDealCreate: build.mutation({
            query: (data) => ({
                url: "/account/accounts/deals/store",
                method: "POST",
                body: {
                    ...data,
                    _token,
                },
            }),
            invalidatesTags: ["DM_DEALS"]
        }),

        dmDealUpdate: build.mutation({
            query: (data) => ({
                url: "/account/accounts/deals/update",
                method: "POST",
                body: {
                    ...data,
                    _token,
                },
            }),

            invalidatesTags: ["DM_DEALS"]
        }),

        dmDealDelete: build.mutation({
            query: (dealId) => ({
                url: `/account/deals/${dealId}`,
                method: "DELETE",
                body: {
                    _token,
                },
            }),
            invalidatesTags: ["DM_DEALS"]
        }),
         
        // deal export data
        exportableDmDeals: build.mutation({
            query: (query) => ({
                url: `/account/export-dm-deal-data?${query}`,
                method: "GET",
            })
        }),

 
    }),
});

export const { 
    useDmDealsQuery, 
    useDmDealCreateMutation,
    useDmDealUpdateMutation,
    useDmDealDeleteMutation,
    useExportableDmDealsMutation
} = DmDealApiSlice;
