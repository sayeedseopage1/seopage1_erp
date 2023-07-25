import { apiSlice } from "./apiSlice";            


const userSliceApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => `/get-users`
        }),
        getAllUsers: build.query({
            query: () => `/get-users/all`
        })
    })
}) ;



export const { 
    useGetUsersQuery, 
    useGetAllUsersQuery,
    useLazyGetAllUsersQuery 
} = userSliceApi;

