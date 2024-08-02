import { apiSlice } from "./apiSlice";

const _token = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute("content");

const DashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({

    getTestData: build.query({
      query: () => ({ url: "account/dashboard/details" }),
    }),

    // get all employ list for dropdown 
    getDashboardUserList: build.query({
      query: (role_id) => ({ url: `account/dashboard-user/with-lead/${role_id}` }),
    }),

    // Start -----  Sale executive dashboard ----- Start //
    getSaleExecutiveDashboardData: build.query({
      query: (payload) => ({
        url: `account/dashboard/details?${payload}`
      }),
    }),
    getCountryWiseWonDealForUser: build.query({
      query: (payload) => ({
        url: `account/dashboard-sales/sale-dashboard-details/country-wise-won-deal?${payload}`
      }),
    }),
    getCountryWiseBiddingBreakdownForUser: build.query({
      query: (payload) => ({
        url: `account/dashboard-sales/sale-dashboard-details/country-wise-bidding-breakdown?${payload}`
      }),
    }),
    getSaleExecutiveDashboardDataForAdmin: build.query({
      query: (payload) => ({
        url: `account/dashboard-sales-performance/admin-sale-dashboard-details/${payload.sale_id}?${payload.query}`
      }),
    }),
    getCountryWiseBiddingBreakdownForAdmin: build.query({
      query: (payload) => ({
        url: `account/dashboard-sales-performance/admin-sale-dashboard-details/country-wise-bidding-breakdown/${payload.sale_id}?${payload.query
          }`
      }),
    }),
    getCountryWiseWonDealForAdmin: build.query({
      query: (payload) => ({
        url: `account/dashboard-sales-performance/admin-sale-dashboard-details/country-wise-won-deal/${payload.sale_id}?${payload.query
          }`
      }),
    }),
    // End ----- Sale executive dashboard ----- End //
  }),
});

export const {
  useGetTestDataQuery,
  useGetDashboardUserListQuery,
  useGetSaleExecutiveDashboardDataQuery,
  useGetCountryWiseWonDealForUserQuery,
  useGetCountryWiseBiddingBreakdownForUserQuery,
  useGetSaleExecutiveDashboardDataForAdminQuery,
  useGetCountryWiseBiddingBreakdownForAdminQuery,
  useGetCountryWiseWonDealForAdminQuery,
} = DashboardApiSlice;
