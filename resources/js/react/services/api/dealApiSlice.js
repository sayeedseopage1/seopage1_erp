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
        }),
    }),
});

export const { useDealsQuery, useDealCreateMutation } = DealApiSlice;
