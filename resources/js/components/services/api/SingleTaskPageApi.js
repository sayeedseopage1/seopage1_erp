import { apiSlice } from "./apiSlice";            

const singleTaskPageApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
         getTaskDetails: build.query({
            query: (query) => `/account/task${query}`
         }),


        //  sub task

         createSubtask: build.mutation({
            query: (data) => ({
                url: `/account/tasks/sub-tasks`,
                method: "POST",
                body: data,
                formData: true,
            })
         }),

         deleteUplaodedFile: build.mutation({
            query:(id) =>({
                url: `/account/tasks/task-files/${id}`,
                method: "POST",
                body: {
                    _method: 'DELETE',
                    _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
                }
            })
         }),

         editSubtask: build.mutation({
            query:({data, id}) =>({
                url: `/account/tasks/sub-tasks/${id}`,
                method: "POST",
                body: data,
                formData: true
            })
         }),


        //  note
        crateNote: build.mutation({
            query: data => ({
                url: `/account/tasks/task-note`,
                method: "POST", 
                body: data,
                formData: true
            })
        }),

        deleteNoteUploadedFile: build.mutation({
            query: id => `/account/task/${id}/json?mode=task_note_file_delete`,
            method: "GET",
        }),

        updateNote: build.mutation({
            query: ({data, id}) => ({
                url: `/account/tasks/task-note/${id}`,
                method: 'POST',
                body: data,
                formData: true 
            })
        }),

        // comments
        storeComment: build.mutation({
            query: ({data, task_id}) => ({
                url: `/account/task/${task_id}/json?mode=comment_store`,
                method: "POST",
                body: data,
                formData:true
            }) 
        }),

        //start time
        startTimerApi: build.mutation({
            query: (data) => ({
                url: `/account/timelogs/start-timer`,
                method: "POST",
                body: {
                    ...data,
                    _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
                },
            })
        }),

        //start time
        stopTimerApi: build.mutation({
            query: (data) => ({
                url: `/account/timelogs/stop-timer?id=${data?.timeId}`,
                method: "POST",
                body: {
                    ...data,
                    _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
                },
            })
        }),

    })
}) ;




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
    useStopTimerApiMutation
} = singleTaskPageApiSlice;