import { apiSlice } from "./apiSlice";

const evaluationApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTaskList: build.query({
            query: (userId) => `account/employee-evaluation-task/${userId}`,
            providesTags: ["ALL_TASKS"],
        }),
        getSingleTask: build.query({
            query: (taskId) => `account/evaluation-task/${taskId}`,
        }),
        storeTaskRating: build.mutation({
            query: (data) => ({
                url: `account/employee-task-evaluation-store`,
                method: "POST",
                body: data,
                formData: true,
            }),
            invalidatesTags: [
                "ALL_TASKS",
                "ALL_EVALUATION",
                "EVALUATION_HISTORY",
            ],
        }),

        storeTaskRatingFinalSubmission: build.mutation({
            query: (data) => ({
                url: `account/employee-evaluation-submission-store`,
                method: "POST",
                body: data,
                formData: true,
            }),
            invalidatesTags: ["ALL_TASKS", "ALL_EVALUATION"],
        }),
        updateTaskRatingSubmission: build.mutation({
            query: (data) => ({
                url: `/account/employee-task-evaluation-update`,
                method: "POST",
                body: data,
                formData: true,
            }),
            invalidatesTags: ["ALL_TASKS", "ALL_EVALUATION"],
        }),
        storeTeamLeadReview: build.mutation({
            query: (data) => ({
                url: `/account/employee-evaluation-team-lead-cmnt`,
                method: "POST",
                body: data,
                formData: true,
            }),
            invalidatesTags: ["ALL_EVALUATION"],
        }),
        storeAdminAuthorized: build.mutation({
            query: (data) => ({
                url: `/account/employee-evaluation-authorization`,
                method: "POST",
                body: data,
                formData: true,
            }),
            invalidatesTags: ["ALL_EVALUATION"],
        }),
        storeAdminRejected: build.mutation({
            query: (data) => ({
                url: `/account/employee-evaluation-authorization`,
                method: "POST",
                body: data,
                formData: true,
            }),
            invalidatesTags: ["ALL_EVALUATION"],
        }),
        storeAdminExtended: build.mutation({
            query: (data) => ({
                url: `/account/employee-evaluation-authorization`,
                method: "POST",
                body: data,
                formData: true,
            }),
            invalidatesTags: ["ALL_EVALUATION"],
        }),

        finalTaskSubmissionStatus: build.mutation({
            query: (assignToId) => ({
                url: `http://localhost:3000/api/task/finalSubmissionStatus/${assignToId}`,
                method: "PUT",
            }),
            invalidatesTags: ["ALL_TASKS", "ALL_EVALUATION"],
        }),
        getEvaluationList: build.query({
            query: (query) => `/account/get-all-evaluation?${query}`,
            providesTags: ["ALL_EVALUATION"],
        }),
        getSingleEvaluation: build.query({
            query: (userId) => `/account/get-single-evaluation/${userId}`,
            providesTags: ["ALL_EVALUATION"],
        }),
        getRevisionList: build.query({
            query: (taskId) => `account/employee-task-revision/${taskId}`,
            providesTags: ["ALL_REVISION"],
        }),
        getAllRevisionList: build.query({
            query: (taskId) => `account/evaluation-total-revision/${taskId}`,
            providesTags: ["ALL_REVISION"],
        }),
        getAllRevisionListByRoundNumber: build.query({
            query: (data) =>
                `account/evaluation-total-task-revision/${data.user_id}/${data.round}`,
            providesTags: ["ALL_REVISION"],
        }),
        getEvaluationHistory: build.query({
            query: (userId) => `account/evaluation-history/${userId}`,
            providesTags: ["EVALUATION_HISTORY"],
        }),
    }),
});

export const {
    useGetTaskListQuery,
    useGetSingleTaskQuery,
    useStoreTaskRatingMutation,
    useStoreTeamLeadReviewMutation,
    useStoreAdminAuthorizedMutation,
    useStoreAdminRejectedMutation,
    useStoreAdminExtendedMutation,
    useUpdateTaskRatingSubmissionMutation,
    useStoreTaskRatingFinalSubmissionMutation,
    useFinalTaskSubmissionStatusMutation,
    useGetEvaluationListQuery,
    useGetRevisionListQuery,
    useGetAllRevisionListQuery,
    useGetAllRevisionListByRoundNumberQuery,
    useGetSingleEvaluationQuery,
    useGetEvaluationHistoryQuery,
} = evaluationApiSlice;
