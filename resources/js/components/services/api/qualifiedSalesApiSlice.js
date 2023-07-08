import { apiSlice } from "./apiSlice";

const qualifiedSalesApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getQualifiedSales: build.query({
            query: (query) => `/account/qualified-sales?mode=json&${query}`,
        }),

        getPointDistributionDetails: build.query({
            query: (query) => `/account/qualified-sales/get-points/${query}`,
        }),
    }),
});

export const {
    useGetQualifiedSalesQuery,
    useLazyGetQualifiedSalesQuery,
    useGetPointDistributionDetailsQuery,
    useLazyGetPointDistributionDetailsQuery,
} = qualifiedSalesApiSlice;
