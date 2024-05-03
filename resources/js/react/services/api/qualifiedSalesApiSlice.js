import { apiSlice } from "./apiSlice";

const qualifiedSalesApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getQualifiedSales: build.query({
            query: (query) => `/account/qualified-sales?mode=json&${query}`,
        }),

        getPointDistributionDetails: build.query({
            query: (query) => `/account/qualified-sales/get-points/${query}`,
        }),

        // deal export data
        exportableQualifiedSales: build.mutation({
            query: (query) => ({
                url: `/account/qualified-sales?mode=json&${query}`,

                // url: `/account/export-qualified-sales-data?${query}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetQualifiedSalesQuery,
    useLazyGetQualifiedSalesQuery,
    useGetPointDistributionDetailsQuery,
    useLazyGetPointDistributionDetailsQuery,
    useExportableQualifiedSalesMutation,
} = qualifiedSalesApiSlice;
