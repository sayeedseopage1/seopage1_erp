import { apiSlice } from "./apiSlice";            


const timeLogTableApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        
       getEmployeeWiseData:  build.mutation({
            query: (data) => ({
                url: `/get-timelogs/employees`,
                method: "POST",
                body: {
                    ...data,
                    _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
                }
            }) 
       }),

       getProjectWiseData: build.mutation({
            query: (data) => ({
                url: `/get-timelogs/projects`,
                method: "POST",
                body: {
                    ...data,
                    _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
                }
            }) 
        }), 

        getTaskWiseData: build.mutation({
            query: (data) => ({
                url: `/get-timelogs/tasks`,
                method: "POST",
                body: {
                    ...data,
                    _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
                }
            }) 
        }),  

        getTimeLogHistory: build.mutation({
            query: (data) => ({
                url: `/get-timelogs/time_log_history`,
                method: "POST",
                body: {
                    ...data,
                    _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
                }
            }) 
        }),  

        getTimeLogHistoryDetails: build.query({
            query: (userId) => `/account/tasks/developer-task-history/${userId}`
        })


    })
}) ;



export const { 
     useGetEmployeeWiseDataMutation,
     useGetTaskWiseDataMutation,
     useGetProjectWiseDataMutation,
     useGetTimeLogHistoryMutation,
     useLazyGetTimeLogHistoryDetailsQuery 
} = timeLogTableApiSlice;

