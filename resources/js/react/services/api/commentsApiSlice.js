import { apiSlice } from "./apiSlice";




const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({

    // get all comments
    getComments: build.query({
      query: (taskId) => `/account/tasks/${taskId}/comments`,
      providesTags: ["COMMENTS"],
    }),

    // post a comment
    postComment: build.mutation({
      query: ({taskId, data}) => ({
        url: `account/task/${taskId}/json?mode=comment_store`,
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["COMMENTS"]
    }),


    // update a comment


    // delete a comment

  })
})




export const { useGetCommentsQuery, useLazyGetCommentsQuery,usePostCommentMutation } = commentsApiSlice;