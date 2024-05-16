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
    }),
});

export const {
    useGetIncentiveTypeQuery,
    useEditIncentiveTypesMutation,
    useGetIncentiveFactorsQuery,
} = pmSalesApiSlice;
