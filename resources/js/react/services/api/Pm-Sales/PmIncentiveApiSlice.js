import { apiSlice } from "../apiSlice";

const _token = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

const pmSalesApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getIncentiveFactors: build.query({
            query: () => `/account/incentive-factor`,
            providesTags: ["GET_INCENTIVE_FACTORS"],
        }),
        getSingleIncentiveCriteria: build.query({
            query: (id) => `/account/incentive-criteria/${id}`,
            providesTags: ["GET_INCENTIVE_FACTORS"],
        }),
        editIncentiveTypes: build.mutation({
            query: ({ id, payload }) => ({
                url: `/account/incentive-type/${id}`,
                method: "PUT",
                body: payload,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: ["GET_INCENTIVE_FACTORS"],
        }),
        editIncentiveFactors: build.mutation({
            query: ({ id, payload }) => ({
                url: `/account/incentive-factor/${id}`,
                method: "PUT",
                body: payload,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: ["GET_INCENTIVE_FACTORS"],
        }),
        editIncentiveCriteria: build.mutation({
            query: ({ id, payload }) => ({
                url: `/account/incentive-criteria/${id}`,
                method: "PUT",
                body: payload,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: ["GET_INCENTIVE_FACTORS"],
        }),
        addIncentiveFactors: build.mutation({
            query: (payload) => ({
                url: `/account/incentive-factor`,
                method: "POST",
                body: payload,
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: ["GET_INCENTIVE_FACTORS"],
        }),
        deleteIncentiveFactor: build.mutation({
            query: (id) => ({
                url: `/account/incentive-factor/${id}`,
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": _token,
                },
            }),
            invalidatesTags: ["GET_INCENTIVE_FACTORS"],
        }),
    }),
});

export const {
    useGetIncentiveFactorsQuery,
    useGetSingleIncentiveCriteriaQuery,
    useEditIncentiveTypesMutation,
    useEditIncentiveFactorsMutation,
    useEditIncentiveCriteriaMutation,
    useAddIncentiveFactorsMutation,
    useDeleteIncentiveFactorMutation,
} = pmSalesApiSlice;
