



import { apiSlice } from "./apiSlice";            


const filterBarOptionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getEmployeeOptions: build.mutation({
            query: (query) => `/account/menu/filter/get-employee${query}`
        }),

        getProjectsOptions: build.mutation({
            query: () => `/account/menu/filter-options/projects`
        }),

        getShiftOptions: build.mutation({
            query: (department) => `/account/menu/filter-options/shift${department}`
        }),

        getDepartmentOptions: build.mutation({
            query: () => `/account/menu/filter-options/department`
        }), 
         
        getAllProjectsOptions:build.query({
            query: (query) => `/account/get-projects/${query}`
        }),
    })

}) ;



export const { 
    useGetDepartmentOptionsMutation,
    useGetEmployeeOptionsMutation,
    useGetShiftOptionsMutation,
    useGetProjectsOptionsMutation,
    getAllProjectsOptions
 } = filterBarOptionsApiSlice;

