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
      query: (data) => ({
        url: `/account/tasks/comment-edit`,
        method: "POST",
        body: data,
        formData: false,
      }),
      invalidatesTags: ["COMMENTS"]
    }),

    // update a comment


    // delete a comment

  })
})




export const { useGetCommentsQuery, useLazyGetCommentsQuery } = commentsApiSlice;