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
    }),
});

export const { useGetIncentiveTypeQuery } = pmSalesApiSlice;
