import { apiSlice } from "./apiSlice";


const _token = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute("content");


const priceQuotationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    allPriceQuotations: build.query({
      query: (query) => `/account/price-quotations?${query || ""}`,
      providesTags: ["PriceQuotations"],
    }),
    createPriceQuotation: build.mutation({
      query: (data) => ({
        url: `/account/price-quotations`,
        method: "POST",
        body: data,
        headers: {
          "X-CSRF-TOKEN": _token,
        },
      }),
      invalidatesTags: ["PriceQuotations"],
    }),
    getSinglePriceQuotation: build.query({
      query: (id) => `/account/price-quotation/${id}`,
    }),
    getCMSList: build.query({
      query: () => `/account/get-cms-list`,
    }),
    getCurrencies: build.query({
      query: () => `/account/get-currencies`,
    }),
    getProjectNiches: build.query({
      query: (query) => `/account/get-project-niches${query || ""}`,
    }),
    getDealNames: build.query({
      query: (query) => `/account/get-deal-name-from-deal-stage/${query}`,
    }),
    getClients: build.query({
      query: (query) => `/account/get-clients-from-deal-stage${query}`,
    }),
  }),
});


export const {
  useAllPriceQuotationsQuery,
  useCreatePriceQuotationMutation,
  useGetSinglePriceQuotationQuery,
  useGetCMSListQuery,
  useGetCurrenciesQuery,
  useGetProjectNichesQuery,
  useGetDealNamesQuery,
  useGetClientsQuery,
} = priceQuotationsApiSlice;