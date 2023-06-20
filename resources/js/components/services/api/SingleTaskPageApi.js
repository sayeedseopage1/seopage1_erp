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
    })
}) ;


export const { 
    useGetTaskDetailsQuery,
    useLazyGetTaskDetailsQuery,
    useCreateSubtaskMutation,
    useDeleteUplaodedFileMutation,
    useEditSubtaskMutation,
    useCrateNoteMutation
} = singleTaskPageApiSlice;