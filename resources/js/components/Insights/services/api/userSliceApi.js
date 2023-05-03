import { apiSlice } from "./apiSlice";


const userSliceApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => `/get-users`
        }),
        getUser: build.query({
            query: (id) => `/account/employees/${id}`
        })
    })
}) ;



export const { useGetUsersQuery, useGetUserQuery } = userSliceApi;