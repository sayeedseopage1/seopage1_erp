import { apiSlice } from "./apiSlice";

const DealApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        deals: build.query({
            query: () => `/account/get-deal-data`,
            providesTags: ["DEALS"],
        }),
    }),
});

export const {
  useDealsQuery
} = DealApiSlice;
