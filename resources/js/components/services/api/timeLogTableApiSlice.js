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

    })
}) ;



export const { 
     useGetEmployeeWiseDataMutation,
     useGetTaskWiseDataMutation,
     useGetProjectWiseDataMutation
} = timeLogTableApiSlice;

