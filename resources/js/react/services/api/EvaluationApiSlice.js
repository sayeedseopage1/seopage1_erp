import { apiSlice } from "./apiSlice";

const evaluationApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTaskList: build.query({
            query: (userId) => `account/employee-evaluation/${userId}`,
            providesTags: ["ALL_TASKS"],
        }),
        updateTask: build.mutation({
            query: ({ taskId, data }) => ({
                url: `http://localhost:3000/api/task/update-task/${taskId}`,
                method: "PUT",
                body: data,
                formData: true,
            }),
            invalidatesTags: ["ALL_TASKS"],
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
    useUpdateTaskMutation,
    useFinalTaskSubmissionStatusMutation,
    useGetEvaluationListQuery,
} = evaluationApiSlice;
