import { apiSlice } from "./apiSlice";

const _token = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute("content");

const DashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTestData: build.query({
      query: (query) => `account/tasks/get-tasks?${query}`,
    }),
  }),
});

export const {
  useGetTestDataQuery,
} = DashboardApiSlice;
