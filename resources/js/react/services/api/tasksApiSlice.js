import { apiSlice } from "./apiSlice";

const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query({
            query: (query) => `/account/tasks/get-tasks${query}`,
            providesTags: ["TASKS"],
        }),

        // store task
        storeProjectTask: build.mutation({
            query: (data) => ({
                url: `/account/new-task/store`,
                method: "POST",
                body: data,
            }),

            invalidatesTags: ["TASKS", "AUTHORIZE_PARENT_TASK"],
        }),

        // update task
        updateTask: build.mutation({
            query: (data) => ({
                url: "/account/new-task/edit",
                method: "POST",
                body: data,
                formData: true,
            }),

            invalidatesTags: ["TASKS", "SUB_TASKS"],
        }),

        getSubTasks: build.query({
            query: ({ taskId, query }) =>
                `/account/tasks/get-tasks-subtasks/${taskId}?${query}`,
        }),
        getTaskForTotalTime: build.query({
            query: (taskId) => `/account/task/${taskId}/json?mode=basic`,
        }),

        getAllSubtask: build.query({
            query: (query) => `/account/tasks/get-subtasks?${query}`,
        }),

        getTasksReports: build.query({
            query: ({ taskId, type }) =>
                `/account/tasks/${
                    type === "parent" ? "get-parent-tasks" : "get-sub-tasks"
                }/report-issues/${taskId}`,
            providesTags: ["TASKSREPORT"],
        }),

        resolveReport: build.mutation({
            query: (data) => ({
                url: `/account/tasks/report-issues/resolve`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: ["TASKSREPORT"],
        }),

        getTaskTypeData: build.query({
            query: () => `/account/tasks-type`,
            providesTags: ["TASK_TYPE_STATUS_DATA"],
        }),

        updateTasktypeAuthStatus: build.mutation({
            query: (body) => ({
                url: `/account/tasks-type-authorization/${body.task_type_id}`,
                method: "PUT",
                body: {
                    ...body,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: ["TASK_TYPE_STATUS_DATA"],
        }),

        checkUnAuthorizedTaskType: build.query({
            query: () => `/account/developer/primary-page-authorization-count`,
        }),
    }),
});

export const {
    useGetTaskForTotalTimeQuery,
    useGetTasksQuery,
    useLazyGetTasksQuery,
    useGetSubTasksQuery,
    useLazyGetSubTasksQuery,
    useGetAllSubtaskQuery,
    useLazyGetAllSubtaskQuery,
    useGetTasksReportsQuery,
    useLazyGetTasksReportsQuery,
    useResolveReportMutation,
    useStoreProjectTaskMutation,
    useUpdateTaskMutation,
    useLazyGetTaskTypeDataQuery,
    useGetTaskTypeDataQuery,
    useUpdateTasktypeAuthStatusMutation,
    useCheckUnAuthorizedTaskTypeQuery,
} = taskApiSlice;
