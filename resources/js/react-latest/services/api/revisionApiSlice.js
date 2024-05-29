import { apiSlice } from "./apiSlice";

const revisionApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // revisions
        getRevisions: build.query({
            query: (query) => `/account/tasks/revisions?${query}`,
            providesTags: ["REVISIONS"],
        }),

        // sales revision response
        saleRevisionAction: build.mutation({
            query: (data) => ({
                url: `/account/tasks/sales-response-on-revision`,
                method: "PUT",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: ["REVISIONS"],
        }),

        exportTableRevision: build.mutation({
            query: (query) => ({
                // url: `/account/qualified-sales?mode=json&${query}`,

                url: `/account/export-task-revisions-data?${query}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetRevisionsQuery,
    useSaleRevisionActionMutation,
    useExportTableRevisionMutation,
} = revisionApi;
