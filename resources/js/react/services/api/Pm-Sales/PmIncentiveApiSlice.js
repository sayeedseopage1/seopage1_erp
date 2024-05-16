import { apiSlice } from "../apiSlice";

const _token = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

const pmSalesApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getIncentiveType: build.query({
            query: () => `/account/incentive-type`,
            providesTags: ["GET_INCENTIVE_TYPE"],
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
            invalidatesTags: ["GET_INCENTIVE_TYPE"],
        }),
    }),
});

export const { useGetIncentiveTypeQuery, useEditIncentiveTypesMutation } =
    pmSalesApiSlice;
