import { apiSlice } from "./apiSlice";

const singleTaskPageApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
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
            })
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
            })
        }),

        /**
         *  * Approve task
         */

        markAsComplete: build.mutation({
            query: (data) => ({
                url: `/tasks/task-stage/store`,
                method: "POST",
                body: data,
            })
        }),

        /**
         *  * Get Task Submitted subtask 
         * @param id  is TaskId
         */
        getSubmittedTask: build.query({
            query: (id) => `/account/tasks/get-task-submissions/${id}`
        })
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
    useGetSubmittedTaskQuery
} = singleTaskPageApiSlice;
