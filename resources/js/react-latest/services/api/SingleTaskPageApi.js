import { apiSlice } from "./apiSlice";

const singleTaskPageApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // get task status
       getTaskStatus: build.query({
            query: (taskId) => `/account/tasks/get-task-status/${taskId}`,
            providesTags: ["TASK_STATUS"]
       }),

        // get task details
        getTaskDetails: build.query({
            query: (query) => `/account/task${query}`,
        }),

        // create sub task
        createSubtask: build.mutation({
            query: (data) => ({
                url: `/account/tasks/sub-tasks`,
                method: "POST",
                body: data,
                formData: true,
            }),
        }),

        // delete uploaded file
        deleteUplaodedFile: build.mutation({
            query: (id) => ({
                url: `/account/tasks/task-files/${id}`,
                method: "POST",
                body: {
                    _method: "DELETE",
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
        }),

        // edit sub task
        editSubtask: build.mutation({
            query: ({ data, id }) => ({
                url: `/account/tasks/sub-tasks/${id}`,
                method: "POST",
                body: data,
                formData: true,
            }),
        }),

        // create note
        crateNote: build.mutation({
            query: (data) => ({
                url: `/account/tasks/task-note`,
                method: "POST",
                body: data,
                formData: true,
            }),
        }),

        // delete note uploaded file
        deleteNoteUploadedFile: build.mutation({
            query: (id) =>
                `/account/task/${id}/json?mode=task_note_file_delete`,
            method: "GET",
        }),

        // update note
        updateNote: build.mutation({
            query: ({ data, id }) => ({
                url: `/account/tasks/task-note/${id}`,
                method: "POST",
                body: data,
                formData: true,
            }),
        }),

        // comments
        storeComment: build.mutation({
            query: ({ data, task_id }) => ({
                url: `/account/task/${task_id}/json?mode=comment_store`,
                method: "POST",
                body: data,
                formData: true,
            }),
        }),

        //start time
        startTimerApi: build.mutation({
            query: (data) => ({
                url: `/account/timelogs/start-timer`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            
            invalidatesTags: ['TASK_STATUS']
        }),

        // subtask status

        /**
         * * user track time 
         *  @parma userId
         */
       
        getUserTrackTime: build.query({
            query: (userId) => `/account/developer/tracked-time-today/${userId}`
        }),

        /**
         * * Stop daily tracking time api
         */
        stopTimerApi: build.mutation({
            query: (data) => ({
                url: `/account/timelogs/stop-timer?id=${data?.timeId}`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            
            invalidatesTags: ['TASK_STATUS']
        }),

        /**
         *  * When a develper tracked less then 7 hours a day
         *  * Developer need to explain the reasons of less tracking
         *  * this explaination form submittion hook 
         */
        storeStopTrackTimer: build.mutation({
            query: (data) => ({
                url: `/account/developer/stop-tasks-timer`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            
            invalidatesTags: ['TASK_STATUS']
        }),



        /**
            * * Get developer's tasks
            * @param id This is User ID
        */ 

        getDeveloperTasks: build.query({
            query: (id) =>  `/account/tasks/get-developer-tasks/${id}` 
        }),


        /**
         *  * Approve task
         */

        approveSubmittedTask: build.mutation({
            query: (data) => ({
                url: `/tasks/task-stage/approve`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            
            invalidatesTags: ['TASK_STATUS']
        }),

        /**
         *  * Approve task
         */

        markAsComplete: build.mutation({
            query: (data) => ({
                url: `/tasks/task-stage/store`,
                method: "POST",
                body: data,
            }),
            
            invalidatesTags: ['TASK_STATUS']
        }),

        /**
         *  * Get Task Submitted subtask 
         * @param id  is TaskId
         */
        getSubmittedTask: build.query({
            query: (id) => `/account/tasks/get-task-submissions/${id}`
        }),


        /**
         *  * revision by
         *  @param id is task id;
         */

        createRevision: build.mutation({
            query: (data) => ({
                url: `/tasks/task-stage/revision`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            invalidatesTags: ['TASK_STATUS']
        }),


        /**
         *  * get Revision
         *  @param id  is task id
         */

        getRevisionDetails: build.query({
            query: (id) => `/account/tasks/get-task-revision/${id}`
        }), 

        /**
         *  * revision accept deny
         */

        revisionAcceptOrDeny: build.mutation({
            query: (data) => ({
                url: `/account/tasks/revision/accept-or-revision-by-developer`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            
            invalidatesTags: ['TASK_STATUS']
        }),

        // * accept by lead developer
        

        revisionAcceptOrDenyByLeadDeveloper: build.mutation({
            query: ({fdata, params}) => ({
                url: `/account/tasks/${params}`,
                method: "POST",
                body: {
                    ...fdata,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            }),
            
            invalidatesTags: ['TASK_STATUS']
        }),
        


        /**
         *  * submit for client approval 
         */

        submitForClientApproval: build.mutation({
            query: (data) => ({
                url: `/account/tasks/client-approval`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },    
            }),
            invalidatesTags: ['TASK_STATUS']
        }),

        /**
         *  * submit for client approval 
         */

        confirmClientApproval: build.mutation({
            query: (data) => ({
                url: `/account/tasks/client-approved-task`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },    
            }),
            invalidatesTags: ['TASK_STATUS']
        }),

        /**
         *  * submit for client approval 
         */

        storeClientRevisionTask: build.mutation({
            query: (data) => ({
                url: `/account/tasks/client-has-revision-task`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },    
            }),
            invalidatesTags: ['TASK_STATUS']
        }),


        /**
         * * Working Environment
         */

        workingEnvironment: build.mutation({
            query: (data) => ({
                url: `/account/working-environment-store`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            })
        }),

        /**
         * * create report
         */

        createReport: build.mutation({
            query: (data) => ({
                url: `/account/tasks/develoepr/report-issue`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            })
        }),

        // check sub task clock
        checkSubTaskTimer: build.query({
            query: (taskId) => `/account/tasks/task-timer-check/${taskId}`
        }),
        // check sub task state
        checkSubTaskState: build.query({
            query: (taskId) => `/account/tasks/parent-task-subtasks/${taskId}`
        }),




        // TASK DISPUTE
        getDisputes:build.query({
            query: (query) => `/account/task-disputes${query}`
        }),
        
        // ASK DISPUTE QUESTION
        askDisputeQuestion: build.mutation({
            query: (data) => ({
                url: `/account/task-dispute-question`,
                method: "POST",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            })
        }),

        // ANSWER DISPUTE QUESTION
        answerDisputeQuestion: build.mutation({
            query: (data) => ({
                url: `/account/task-dispute-question-answer`,
                method: "PUT",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            })
        }),  

        // ANSWER DISPUTE QUESTION
        disputeSubmitToAuthorization: build.mutation({
            query: (data) => ({
                url: `/account/task-dispute-submit-to-auth`,
                method: "PUT",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            })
        }),  
        // ANSWER DISPUTE QUESTION
        disputeAnswerMakeAsRead: build.mutation({
            query: (data) => ({
                url: `/account/task-dispute-read-status`,
                method: "PUT",
                body: {
                    ...data,
                    _token: document
                        .querySelector("meta[name='csrf-token']")
                        .getAttribute("content"),
                },
            })
        }),  

    
        
    }),
});

export const {
    useGetTaskDetailsQuery,
    useLazyGetTaskDetailsQuery,
    useCreateSubtaskMutation,
    useDeleteUplaodedFileMutation,
    useEditSubtaskMutation,
    useCrateNoteMutation,
    useDeleteNoteUploadedFileMutation,
    useUpdateNoteMutation,
    useStoreCommentMutation,
    useStartTimerApiMutation,
    useStopTimerApiMutation,
    useGetDeveloperTasksQuery,
    useStoreStopTrackTimerMutation,
    useGetUserTrackTimeQuery,
    useLazyGetUserTrackTimeQuery,
    useApproveSubmittedTaskMutation,
    useMarkAsCompleteMutation,
    useGetSubmittedTaskQuery,
    useLazyGetSubmittedTaskQuery,
    useCreateRevisionMutation,
    useGetRevisionDetailsQuery,
    useRevisionAcceptOrDenyMutation,
    useSubmitForClientApprovalMutation,
    useGetTaskStatusQuery,
    useRevisionAcceptOrDenyByLeadDeveloperMutation,
    useConfirmClientApprovalMutation,
    useStoreClientRevisionTaskMutation,
    useWorkingEnvironmentMutation,
    useCreateReportMutation,
    useCheckSubTaskTimerQuery,
    useLazyCheckSubTaskTimerQuery,
    useLazyCheckSubTaskStateQuery,
    useGetDisputesQuery,
    useLazyGetDisputesQuery,
    useAskDisputeQuestionMutation,
    useAnswerDisputeQuestionMutation,
    useDisputeSubmitToAuthorizationMutation,
    useDisputeAnswerMakeAsReadMutation,
} = singleTaskPageApiSlice;
