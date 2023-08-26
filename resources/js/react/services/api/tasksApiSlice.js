import { apiSlice } from "./apiSlice";            


const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query({
            query: (query) => `/account/tasks/get-tasks${query}`, 
            providesTags: "TASKS"
        }),

        // store task
        storeProjectTask: build.mutation({
            query: (data) => ({
                url:  `/account/new-task/store`,
                method: 'POST',
                body: data
            }),

            invalidatesTags: ["TASKS"]
        }),

        // update task
        updateTask: build.mutation({
            query: (data) => ({
                url: '/account/new-task/edit',
                method: 'POST',
                body: data
            }),

            invalidatesTags: ["TASKS"]
        }),
        
        getSubTasks: build.query({
            query:({taskId, query}) => `/account/tasks/get-tasks-subtasks/${taskId}?${query}`,
        }),

        getAllSubtask: build.query({
            query: (query) => `/account/tasks/get-subtasks?${query}`
        }),

        getTasksReports: build.query({
            query: ({taskId, type}) => `/account/tasks/${type === 'parent' ? 'get-parent-tasks': 'get-sub-tasks'}/report-issues/${taskId}`,
            providesTags: ["TASKSREPORT"]
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
            invalidatesTags: ['TASKSREPORT']
        }),
        
    })
}) ;



export const { 
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
     useUpdateTaskMutation
} = taskApiSlice;

