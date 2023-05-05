import { apiSlice } from "./apiSlice";


const teamSliceApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTeams: build.query({
            query: () => `/get-teams`
        }),
    })
}) ;



export const { useGetTeamsQuery } = teamSliceApi;