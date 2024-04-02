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
        createPmPointFactor: build.mutation({
            query: (data) => ({
                url: `/account/pm-point-factor`,
                method: "POST",
                body: data,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: ["GET_PM_POINT_FACTORS"],
        }),
        updatePmPointfactor: build.mutation({
            query: ({ id, data }) => ({
                url: `/account/pm-point-factor/${id}/update`,
                method: "PUT",
                body: data,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: ["GET_PM_POINT_FACTORS"],
        }),
    }),
});

export const {
    useGetPmPointFactorsQuery,
    useGetSinglePmPointFactorQuery,
    useGetAllCriteriaQuery,
    useGetFactorsFieldsByCriteriaQuery,
    useCreatePmPointFactorMutation,
    useUpdatePmPointfactorMutation,
} = pmSalesApiSlice;
