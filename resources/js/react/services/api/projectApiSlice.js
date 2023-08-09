import { apiSlice } from "./apiSlice";            


const projectApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        storeProjectGuideline: build.mutation({
            query: (data) => ({
                url: `/account/task-guideline-store`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },   
            }), 
            invalidatesTags: ["PMGUIDELINE"]
        }),
        
        checkPMTaskGuideline: build.query({
            query: (projectId) => `/account/tasks/check-pm-taskguideline/${projectId}`,
            providesTags: ["PMGUIDELINE"]
        }),

        // get porject milestone
        getMilestoneDetails: build.query({
            query: (projectId) => `/account/get-project-information/tasks/${projectId}` 
        }),

        // store task
        storeProjectTask: build.mutation({
            query: (data) => ({
                url:  `/account/new-task/store`,
                method: 'POST',
                body: data
            }),

            invalidatesTags: ["TASKS"]
        })
    })
}) ;



export const { 
     useStoreProjectGuidelineMutation,
     useLazyCheckPMTaskGuidelineQuery,
     useCheckPMTaskGuidelineQuery,
     useGetMilestoneDetailsQuery,
     useLazyGetMilestoneDetailsQuery,
     useStoreProjectTaskMutation
} = projectApiSlice;

