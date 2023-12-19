import { apiSlice } from "./apiSlice";

const leadApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        leads: build.query({
            query: (query) => `/account/get-all-leads?${query}`,
            providesTags: ["LEADS"],
        }),
        dealConversion: build.mutation({
            query: (data) => ({
                url: `/deal/stage`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            // invalidatesTags: ['LEADS']
        }),

        deleteLead: build.mutation({
            query: (id) => ({
                url: `/account/leads/${id}`,
                method: "DELETE",
                body:{
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                }
            }),
            invalidatesTags: ["LEADS"]
        }),
    }),
});

export const {
    useLeadsQuery,
    useDealConversionMutation,
    useDeleteLeadMutation,
} = leadApiSlice;
