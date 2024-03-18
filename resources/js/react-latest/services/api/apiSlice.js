import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    keepUnusedDataFor: 60,
    tagTypes: [
        "points_page_filter_options",
        "TASK_STATUS",
        "TASKS",
        "TASKSREPORT",
        "PMGUIDELINE",
        "REVISIONS",
        "COMMENTS",
        "All_TASKS",
        // "TASK_REPORT"
    ],
    endpoints: () => ({}),
});
