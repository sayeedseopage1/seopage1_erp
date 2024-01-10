import { apiSlice } from "./apiSlice";

const _token = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

const projectStatusApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getProjectStatus: build.query({
            query: (query = "") => `/account/get-project-status-date${query}`,
            providesTags: ["GET_PROJECT_STATUS"],
        }),
    }),
});

export const { useGetProjectStatusQuery } = projectStatusApiSlice;
