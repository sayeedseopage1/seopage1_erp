import { apiSlice } from "./apiSlice";            


const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query({
            query: (query) => `/account/tasks/get-tasks${query}`, 
            providesTags: "TASKS"
        }),
        getSubTasks: build.query({
            query:({taskId, query}) => `/account/tasks/get-tasks-subtasks/${taskId}?${query}`,
        })
    })
}) ;



export const { 
     useGetTasksQuery,
     useLazyGetTasksQuery,
     useGetSubTasksQuery,
     useLazyGetSubTasksQuery
} = taskApiSlice;

