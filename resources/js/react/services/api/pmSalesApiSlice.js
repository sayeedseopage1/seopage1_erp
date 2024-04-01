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
        getSinglePmPointFactor: build.query({
            query: (id) => `/account/pm-point-factor/${id}/edit`,
        }),
        getAllCriteria: build.query({
            query: () => `/account/pm-point-criteria`,
        }),
        getFactorsFieldsByCriteria: build.query({
            query: (id) => `/account/get-criteria-wise-factor/${id}`,
        }),
    }),
});

export const {
    useGetPmPointFactorsQuery,
    useGetSinglePmPointFactorQuery,
    useGetAllCriteriaQuery,
    useGetFactorsFieldsByCriteriaQuery,
} = pmSalesApiSlice;
