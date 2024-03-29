import { apiSlice } from "./apiSlice";

const _token = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

const pmSalesApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getPmPointFactors: build.query({
            query: (query) => `/account/pm-point-factor?${query}`,
            providesTags: ["GET_PM_POINT_FACTORS"],
        }),
    }),
});

export const { useGetPmPointFactorsQuery } = pmSalesApiSlice;
