import { apiSlice } from "./apiSlice";

const DealApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        deals: build.query({
            query: (query) => `/account/get-deal-data?${query}`,
            providesTags: ["DEALS"],
        }),
    }),
});

export const {
  useDealsQuery
} = DealApiSlice;
