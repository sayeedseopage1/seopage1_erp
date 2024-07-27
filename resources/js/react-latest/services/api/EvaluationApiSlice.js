import { apiSlice } from "./apiSlice";

const evaluationApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTaskList: build.query({
            query: (userId) => `account/employee-evaluation/${userId}`,
            providesTags: ["All_TASKS"],
        }),
        getSingleEvaluation: build.query({
            query: (userId) => `/account/get-single-evaluation/${userId}`,
            providesTags: ["ALL_EVALUATION"],
        }),
    }),
});

export const {
    useGetTaskListQuery,
    useUpdateSingleTaskMutation,
    useFinalTaskSubmissionStatusMutation,
    useGetEvaluationListQuery,
    useGetSingleEvaluationQuery,
} = evaluationApiSlice;
