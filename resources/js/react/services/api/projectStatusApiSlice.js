import { method } from "lodash";
import { apiSlice } from "./apiSlice";

const _token = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

const projectStatusApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getProjectStatus: build.query({
            query: (query) => `/account/get-project-status-date?${query}`,
            providesTags: ["GET_PROJECT_STATUS"],
        }),

        getPmGoal: build.query({
            query: (project_id) => `/account/get-pm-goal-date/${project_id}`,
            providesTags: "GET_PM_GOAL",
        }),

        createDeadlineExplanationReason: build.mutation({
            query: (data) => ({
                url: `/account/project-status-reason-submit`,
                method: "POST",
                body: {
                    ...data,
                    _token: _token,
                },
            }),
            invalidatesTags: [
                "PENDING_DEADLINE_EXPLANATION_REASON",
                "AUTHORIZE_PARENT_TASK",
            ],
        }),
        createResolveSuggestionComment: build.mutation({
            query: (data) => ({
                url: `/account/project-status-resolve-submit`,
                method: "POST",
                body: {
                    ...data,
                    _token: _token,
                },
                headers: {
                    _token: _token,
                },
            }),
            invalidatesTags: [
                "PENDING_RESOLVE_SUGGESTION_COMMENT",
                "AUTHORIZE_PARENT_TASK",
            ],
        }),
        createExtendRequest: build.mutation({
            query: (data) => ({
                url: `account/pm-extend-request-store`,
                method: "POST",
                body: data,
                formData: true,
            }),
            invalidatesTags: [
                "PENDING_EXTEND_REQUEST",
                "AUTHORIZE_PARENT_TASK",
            ],
        }),
        getProjectExtendImages: build.query({
            query: (goal_id) =>
                `/account/project-extend-image/${goal_id}`,
            providesTags: "GET_PROJECT_EXTEND_IMAGE",
        }),
        createReviewExtendRequest: build.mutation({
            query: (data) => ({
                url: `account/project-status-accept-extend-request`,
                method: "POST",
                body: data,
                formData: true,
            }),
        }),
    }),
});

export const {
    useGetProjectStatusQuery,
    useGetPmGoalQuery,
    useCreateDeadlineExplanationReasonMutation,
    useCreateResolveSuggestionCommentMutation,
    useCreateExtendRequestMutation,
    useGetProjectExtendImagesQuery,
    useCreateReviewExtendRequestMutation,
} = projectStatusApiSlice;
