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
            query: (projectId) => `/account/tasks/add-tasks/project-deliverables/${projectId}`
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
        getPendingTaskAuthorizationConversations: build.query({
            query: (task_id) => `/account/pending-task-conversations/${task_id}`,
            providesTags: ["PENDING_TASK_AUTHORIZATION_CONVERSATIONS"]
        }),

        createPendingTaskAuthorizationConversation: build.mutation({
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

        updatePendingTaskAuthorizationConversation: build.mutation({
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
        }),
        //  get project Details
        getProjectDetails: build.query({
            query: (project_id) => `/account/project-details/${project_id}`,
            providesTags: ["SINGLE_PROJECT_DETAILS"]
        }),
        // get project taskList
        getProjectTaskList: build.query({
            query: (project_id) => `/account/project-tasks/${project_id}`
        }),
        // get project milestone
        getProjectMilestone: build.query({
            query: (project_id) => `/account/project-milestones/${project_id}`
        }),
        // get project pending extension History
        getProjectPendingExtension: build.query({
            query: (project_id) => `/account/project-pending-extension/${project_id}`,
            providesTags: ["PROJECT_PENDING_EXTENSION_HISTORY"]
        }),

        // Project Completion form authorization
        authorizeCompletionForm: build.mutation({
            query: (data) => ({
                url: `/account/submission-accept`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: ["SINGLE_PROJECT_DETAILS"]
        }),
        // Project QC form authorization
        authorizeQcForm: build.mutation({
            query: (data) => ({
                url: `/account/qc-submission-accept`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: ["SINGLE_PROJECT_DETAILS"]
        }),
        // Project Deadline Extension form
        deadlineExtensionRequest: build.mutation({
            query: (data) => ({
                url: `store-project-deadline-exp`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: ["SINGLE_PROJECT_DETAILS"]
        }),

        // Project Deadline Extension form authorization
        authorizeDeadlineExtensionForm: build.mutation({
            query: (data) => ({
                url: `store-project-deadline-exp-auth`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: ["SINGLE_PROJECT_DETAILS"]
        }),
        // Project Incomplete from admin
        incompleteProject: build.mutation({
            query: (data) => ({
                url: `/acoounts/projects/incomplete`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: ["SINGLE_PROJECT_DETAILS"]
        }),
        // Project Dispute form
        disputeProject: build.mutation({
            query: (data) => ({
                url: `/projects/dispute/store`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: ["SINGLE_PROJECT_DETAILS"]
        }),

        // Project dispute Authorization
        disputeProjectAuthorization: build.mutation({
            query: (data) => ({
                url: `projects/dispute/authorization`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: ["SINGLE_PROJECT_DETAILS"]
        }),
        // Project Task Guideline Authorization - approve
        authorizeTaskApprovedGuideline: build.query({
            query: (id) => `task-guideline-approved-authorization/${id}`,
            invalidatesTags: ["SINGLE_PROJECT_DETAILS"]
        }),
        // Project Task Guideline Authorization - reject
        authorizeTaskRejectGuideline: build.query({
            query: (id) => `task-guideline-deny-authorization/${id}`,
            invalidatesTags: ["SINGLE_PROJECT_DETAILS"]
        }),

    })
});



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
    useUpdatePendingTaskAuthorizationConversationMutation,
    useGetProjectDetailsQuery,
    useGetProjectTaskListQuery,
    useGetProjectMilestoneQuery,
    useGetProjectPendingExtensionQuery,
    useAuthorizeCompletionFormMutation,
    useAuthorizeQcFormMutation,
    useDeadlineExtensionRequestMutation,
    useAuthorizeDeadlineExtensionFormMutation,
    useIncompleteProjectMutation,
    useDisputeProjectMutation,
    useDisputeProjectAuthorizationMutation,
    useLazyAuthorizeTaskApprovedGuidelineQuery,
    useLazyAuthorizeTaskRejectGuidelineQuery,
} = projectApiSlice;

