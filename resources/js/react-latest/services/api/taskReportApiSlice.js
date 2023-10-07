import { apiSlice } from "./apiSlice";

const taskReportApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({

    // get task report
    getTaskReport: build.query({
      query: (filter) => `/account/get-task-report?${filter}`,
      // providesTags: ["TASK_REPORT"]
    }),

    submitTaskReport: build.mutation({
      query: (data) => ({
        url: `/account/tasks/report-issues/resolve`,
        method: 'POST',
        body: {
          ...data,
          _token: document
            .querySelector("meta[name='csrf-token']")
            .getAttribute("content"),
        },
      }),

      // invalidatesTags: ["TASK_REPORT"]
    })

  }),
});




export const {
  useLazyGetTaskReportQuery,
  useSubmitTaskReportMutation,
} = taskReportApi;