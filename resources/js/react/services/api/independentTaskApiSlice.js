import { apiSlice } from "./apiSlice";



const independentTaskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all authorized independent task
    getIndependentTask: builder.query({
      query: (query) => `/account/get-all-independent-task?${query}`,
      // providesTags: ["INDEPENDENT_TASK"],
    }),

    // get all independent task for authorization
    getIndependentAuthorizeTask: builder.query({
      query: () => `/account/get-independent-task`,
      providesTags: ["INDEPENDENT_TASK"],
    }),

    // post an independent task
    postIndependentTask: builder.mutation({
      query: (data) => ({
        url: `/account/independent-task`,
        method: 'POST',
        body: data,
        formData: true,
      }),
      invalidatesTags: ["INDEPENDENT_TASK"],
    }),

    // update an independent task
    putIndependentTask: builder.mutation({
      query: (data) => ({
        url: `/account/independent-task/${data.id}`,
        method: 'PUT',
        body: data,
        // formData: true,
      }),
      invalidatesTags: ["INDEPENDENT_TASK"],
    }),

    // get conversations
    getIndependentTaskAuthorizationConversations: builder.query({
      query: (id) => `/account/independent-task-conversations/${id}`,
      providesTags: ["IDNEDPENDENT_TASK_AUTHORIZATION_CONVERSATIONS"]
    }),

    // create independent task conversation
    createIndependentTaskAuthorizationConversation: builder.mutation({
      query: (data) => ({
        url: `/account/create-independent-task-conversations`,
        method: "POST",
        body: {
          ...data,
          _token: document
            .querySelector("meta[name='csrf-token']")
            .getAttribute("content"),
        },
      }),
      invalidatesTags: ["IDNEDPENDENT_TASK_AUTHORIZATION_CONVERSATIONS"]
    }),

    // update independent task conversation
    updateIndependentTaskAuthorizationConversation: builder.mutation({
      query: (data) => ({
        url: `/account/update-independent-task-conversations`,
        method: "PUT",
        body: {
          data,
          _token: document
            .querySelector("meta[name='csrf-token']")
            .getAttribute("content"),
        },
      }),
      invalidatesTags: ["IDNEDPENDENT_TASK_AUTHORIZATION_CONVERSATIONS"]
    }),

    // update independent task "has_update" status
    updateIndependentTaskStatus: builder.mutation({
        query: (data) => ({
            url: `/account/independent-task/conversions/status/update`,
            method: "PUT",
            body: {
                data,
                _token:document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content"),
            }
        }),
        invalidatesTags: ["IDNEDPENDENT_TASK_AUTHORIZATION_CONVERSATIONS", "INDEPENDENT_TASK"]
    }),

    // get all independent subtasks
    getIndependentSubtasks: builder.mutation({
        query: (query) => ({
            url: `/account/independent-subtasks?${query}`,
            method: 'GET',
        })
    }),


    // get independent subtasks
    getIndependentSubtaskByTaskId: builder.mutation({
        query: ({taskId, query}) => ({
            url: `/account/independent-task/${taskId}/subtask?${query}`,
            method: 'GET',
        })
    }),


  })
})

export const {
  useGetIndependentTaskQuery,
  useLazyGetIndependentTaskQuery,
  useGetIndependentAuthorizeTaskQuery,
  useLazyGetIndependentAuthorizeTaskQuery,
  usePostIndependentTaskMutation,
  usePutIndependentTaskMutation,
  useGetIndependentTaskAuthorizationConversationsQuery,
  useLazyGetIndependentTaskAuthorizationConversationsQuery,
  useCreateIndependentTaskAuthorizationConversationMutation,
  useUpdateIndependentTaskAuthorizationConversationMutation,
  useUpdateIndependentTaskStatusMutation,
  useGetIndependentSubtaskByTaskIdMutation,
  useGetIndependentSubtasksMutation,
} = independentTaskApiSlice;
