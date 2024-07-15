import { apiSlice } from "./apiSlice";


const priceQuotationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    priceQuotationsFilterOptions: build.query({
      query: () => `/account/price-quotations/get-filter-data`,
    }),
  }),
});


export const {
  usePriceQuotationsFilterOptionsQuery,
} = priceQuotationsApiSlice;