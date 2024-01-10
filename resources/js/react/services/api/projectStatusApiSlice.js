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

        getPmGoal: build.query({
            query: (project_id) => `/account/get-pm-goal-date/${project_id}`,
            providesTags: "GET_PM_GOAL",
        }),
    }),
});

export const { useGetProjectStatusQuery, useGetPmGoalQuery } =
    projectStatusApiSlice;
