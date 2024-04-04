import { apiSlice } from "./apiSlice";

const evaluationApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTaskList: build.query({
            query: (userId) => `account/employee-evaluation-task/${userId}`,
            providesTags: ["ALL_TASKS"],
        }),
        storeTaskRating: build.mutation({
            query: (data) => ({
                url: `account/employee-task-evaluation-store`,
                method: "POST",
                body: data,
                formData: true,
            }),
            invalidatesTags: ["ALL_TASKS", "ALL_EVALUATION"],
        }),
        finalTaskSubmissionStatus: build.mutation({
            query: (assignToId) => ({
                url: `http://localhost:3000/api/task/finalSubmissionStatus/${assignToId}`,
                method: "PUT",
            }),
            invalidatesTags: ["ALL_TASKS", "ALL_EVALUATION"],
        }),
        getEvaluationList: build.query({
            query: () => `/account/get-all-evaluation`,
            providesTags: ["ALL_EVALUATION"],
        }),
    }),
});

export const {
    useGetTaskListQuery,
    useStoreTaskRatingMutation,
    useFinalTaskSubmissionStatusMutation,
    useGetEvaluationListQuery,
} = evaluationApiSlice;
