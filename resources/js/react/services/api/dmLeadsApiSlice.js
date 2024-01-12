import { apiSlice } from "./apiSlice";

const dmLeadApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        dmLeads: build.query({
            query: (query) => `/account/get-all-dm-leads?${query}`,
            providesTags: ["DM_LEADS"],
        }),
        dmDealConversion: build.mutation({
            query: (data) => ({
                url: `/account/digital-marketing-deal/stage`,
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

        deleteDmLead: build.mutation({
            query: (id) => ({
                url: `/account/digital-marketing-lead/${id}`,
                method: "DELETE",
                body: {
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                }
            }),
            invalidatesTags: ["DM_LEADS"]
        }),

        // export lead
        allDmLeads: build.query({
            query: (query) => `/account/export-dm-lead-data${query}`,
        }),

        // store dm lead
        storeDmLead: build.mutation({
            query: (data) => ({
                url: `/account/dm-lead-store`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                }
            }),
            invalidatesTags: ["DM_LEADS"]
        }),
    }),
});

export const {
    useDmLeadsQuery,
    useDmDealConversionMutation,
    useDeleteDmLeadMutation,
    useAllDmLeadsQuery,
    useLazyAllDmLeadsQuery,
    useStoreDmLeadMutation,
    useStoreDmLeadSourceMutation,
} = dmLeadApiSlice;
