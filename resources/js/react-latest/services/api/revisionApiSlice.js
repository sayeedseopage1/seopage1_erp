import { apiSlice } from "./apiSlice";

const revisionApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
      // revisions
      getRevisions: build.query({
        query: (query) => `/account/tasks/revisions?${query}`,
        providesTags: ["REVISIONS"]
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
            invalidatesTags: ["REVISIONS"]
        })
    }),
}) ;



export const {
   useGetRevisionsQuery,
   useSaleRevisionActionMutation
 } = revisionApi;

