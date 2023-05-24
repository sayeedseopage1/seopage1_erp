import { apiSlice } from "./apiSlice";            


const timeLogTableApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
       getEmployeeWiseData:  build.query({
            query: () =>  `/get-timelogs/employees`
       }),

       getProjectWiseData: build.query({
            query: () => `/get-timelogs/projects`
       }),

       getTaskWiseData: build.query({
            query: () =>  `/get-timelogs/tasks`
        })
    })
}) ;



export const { 
    useGetEmployeeWiseDataQuery,
    useLazyGetEmployeeWiseDataQuery,
    useGetProjectWiseDataQuery,
    useLazyGetProjectWiseDataQuery,
    useGetTaskWiseDataQuery,
    useLazyGetTaskWiseDataQuery
} = timeLogTableApiSlice;

