



import { apiSlice } from "./apiSlice";            


const filterBarOptionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllFilterOption: build.query({
            query: () => `/account/search-bar-filter`,
            providesTags: () => ["points_page_filter_options"] 
        }),
        // getEmployeeOptions: build.query({
        //     query: query => `/account/menu/filter/get-employee${query}`
        // }),

        getProjectsOptions: build.query({
            query: () => `/account/menu/filter-options/projects`
        }),

        
        // getShiftOptions: build.query({
        //     query: (department) => `/account/menu/filter-options/shift${department}`
        // }),

        
        // getDepartmentOptions: build.query({
        //     query: () => `/account/menu/filter-options/department`
        // }), 

        getAllProjectsOptions:build.query({
            query: (query) => `/account/get-projects/${query}`
        }),

        // mutation
        getEmployeeOptions: build.mutation({
            query: (query) => `/account/menu/filter/get-employee${query}`
        }),

        // getProjectsOptions: build.mutation({
        //     query: () => `/account/menu/filter-options/projects`
        // }),

        getShiftOptions: build.mutation({
            query: (department) => `/account/menu/filter-options/shift${department}`
        }),

        getDepartmentOptions: build.mutation({
            query: () => `/account/menu/filter-options/department`
        }), 
         
       
    })

}) ;



export const { 
    // // query
    useGetAllFilterOptionQuery,
    useGetAllProjectsOptionsQuery,
    useLazyGetAllProjectsOptionsQuery,
    // useGetDepartmentOptionsQuery,
    // useGetShiftOptionsQuery,
    // useGetEmployeeOptionsQuery,
    useGetProjectsOptionsQuery,


    // mutation
    useGetDepartmentOptionsMutation,
    useGetEmployeeOptionsMutation,
    useGetShiftOptionsMutation,
    // useGetProjectsOptionsMutation,
    // getAllProjectsOptions
 } = filterBarOptionsApiSlice;

