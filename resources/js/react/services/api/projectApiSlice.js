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

        updateProjectGuideline: build.mutation({
            query: (data) => ({
                url: `/task-guideline-update/${data.id}`,
                method: "PUT",
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

        // deliverable
        getProjectDeliverableStatus: build.query({
            query: (projectId) =>  `/account/tasks/add-tasks/project-deliverables/${projectId}`
        }),

        getProjectManagerTaskGuidelineStatus: build.query({
            query: (projectId) => `task-guideline-authorization/${projectId}`
        }),

        getAuthorizeTasks: build.query({
            query: () => '/account/tasks/pending-parent-tasks',
            providesTags: ["AUTHORIZE_PARENT_TASK"]
        }),

        updateAuthorizeTask: build.mutation({
            query: (data) => ({
                url: `/account/tasks/auth-pending-tasks/${data.id}?status=${data.status}`,
                method: "PUT",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: ["AUTHORIZE_PARENT_TASK"]
        }),

        // get conversations
        getPendingTaskAuthorizationConversations:build.query({
            query: (task_id) => `/account/pending-task-conversations/${task_id}`,
            providesTags: ["PENDING_TASK_AUTHORIZATION_CONVERSATIONS"]
        }),

        createPendingTaskAuthorizationConversation:build.mutation({
            query: (data) => ({
                url: `/account/pending-task-conversations`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: ["PENDING_TASK_AUTHORIZATION_CONVERSATIONS", "AUTHORIZE_PARENT_TASK"]
        }),

        updatePendingTaskAuthorizationConversation:build.mutation({
            query: (data) => ({
                url: `/account/pending-task-conversations`,
                method: "PUT",
                body: {
                    data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: ["PENDING_TASK_AUTHORIZATION_CONVERSATIONS", "AUTHORIZE_PARENT_TASK"]
        })
    })
}) ;



export const {
     useStoreProjectGuidelineMutation,
     useUpdateProjectGuidelineMutation,
     useLazyCheckPMTaskGuidelineQuery,
     useCheckPMTaskGuidelineQuery,
     useGetMilestoneDetailsQuery,
     useLazyGetMilestoneDetailsQuery,
     useLazyGetProjectDeliverableStatusQuery,
     useLazyGetProjectManagerTaskGuidelineStatusQuery,
     useGetAuthorizeTasksQuery,
     useUpdateAuthorizeTaskMutation,
     useGetPendingTaskAuthorizationConversationsQuery,
     useCreatePendingTaskAuthorizationConversationMutation,
     useUpdatePendingTaskAuthorizationConversationMutation
} = projectApiSlice;

