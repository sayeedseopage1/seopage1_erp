import { apiSlice } from "./apiSlice";

const evaluationApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTaskList: build.query({
            query: (assignToId) =>
                `http://localhost:3000/api/task/all-tasks/assign-to/${assignToId}`,
            providesTags: ["All_TASKS"],
        }),
        updateTask: build.mutation({
            query: ({ taskId, data }) => ({
                url: `http://localhost:3000/api/task/update-task/${taskId}`,
                method: "PUT",
                body: data,
                formData: true,
            }),
            invalidatesTags: ["All_TASKS"],
        }),
        finalTaskSubmissionStatus: build.mutation({
            query: (assignToId) => ({
                url: `http://localhost:3000/api/task/finalSubmissionStatus/${assignToId}`,
                method: "PUT",
            }),
            invalidatesTags: ["All_TASKS", "All_EVALUATION"],
        }),
        getEvaluationList: build.query({
            query: () => `/account/get-all-evaluation`,
            providesTags: ["All_EVALUATION"],
        }),
    }),
});

export const {
    useGetTaskListQuery,
    useUpdateTaskMutation,
    useFinalTaskSubmissionStatusMutation,
    useGetEvaluationListQuery,
} = evaluationApiSlice;
