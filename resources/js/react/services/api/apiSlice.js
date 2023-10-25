import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    keepUnusedDataFor: 60,
    tagTypes: [
            'points_page_filter_options',
            'TASK_STATUS',
            'TASKS',
            'TASKSREPORT',
            "PMGUIDELINE",
            "DAILY_SUBMISSION_STATUS",
            "TASK_TYPE_STATUS_DATA",
            "ENABLE_MARKASCOMPLETE",
            "USER_IN_PROGRESS_TASKS",
            "DISPUTES",
            "SUB_TASKS",
            "AUTHORIZE_PARENT_TASK",
            "PENDING_TASK_AUTHORIZATION_CONVERSATIONS",
            "INDEPENDENT_TASK",
            "IDNEDPENDENT_TASK_AUTHORIZATION_CONVERSATIONS",
    ],
    endpoints: () => ({}),
});

