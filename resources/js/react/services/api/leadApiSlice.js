import { apiSlice } from "./apiSlice";

const leadApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        leads: build.query({
            query: (query) => `/account/get-all-leads?${query}`,
            providesTags: ["LEADS"],
        }),

        leadCreate: build.mutation({
            query: (data) => ({
                url: "/lead/store",
                method: "POST",
                body: {
                    ...data,
                    _token:document
                    .querySelector("meta[name='csrf-token']")
                    .getAttribute("content"),
                },
            }),
            invalidatesTags: ["LEADS"]
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

        // export lead
        allLeads: build.query({
            query: (query) => `/account/export-lead-data${query}`,
        }),

        // get countries
        getCountry: build.query({
            query:`/account/get-all-country`,
            providesTags: []
        })
    }),
});

export const {
    useLeadsQuery,
    useLeadCreateMutation,
    useDealConversionMutation,
    useDeleteLeadMutation,
    useAllLeadsQuery,
    useLazyAllLeadsQuery,
    useGetCountryQuery
} = leadApiSlice;
