import { apiSlice } from "./apiSlice";



const dailySubmissionApiSlice = apiSlice.injectEndpoints({
    endpoints : (build)=>({
        getDailySubmission : build.query({
            query : (id) => `/account/tasks/get-today-tasks/${id}`,
            providesTags: ["DAILY_SUBMISSION_STATUS"]
        }),

        getDailyTasksSubmission : build.query({
            query : (task_id) => `/account/tasks/daily-submissions/${task_id}`,
            providesTags: ["DAILY_SUBMISSION_STATUS"]
        }),

        submitDailySubmission: build.mutation({
            query : (data) => ({
                url: `/account/tasks/daily-submissions`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["DAILY_SUBMISSION_STATUS"]
        }),

        getAllDailySubmission: build.query({
            query: (searchParam)=>`/account/tasks/all-daily-submissions?${searchParam}`,
            providesTags: ["ALL_DAILY_SUBMISSION_STATUS"],
        })
    })
})


export const {
    useGetDailySubmissionQuery,
    useLazyGetDailySubmissionQuery,
    useGetDailyTasksSubmissionQuery,
    useSubmitDailySubmissionMutation,
    useGetAllDailySubmissionQuery,
    useLazyGetAllDailySubmissionQuery,
} = dailySubmissionApiSlice;