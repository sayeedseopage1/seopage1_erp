import { apiSlice } from "./apiSlice";



const independentTaskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder)=>({
    // get all independent task
    getIndependentTask : builder.query({
      query: (query)=>`/account/independent-task`,
      providesTags : ["INDEPENDENT_TASK"],
    }),

    // post an independent task
    postIndependentTask : builder.mutation({
      query: (data) => ({
        url:  `/account/independent-task`,
        method: 'POST',
        body: data,
        formData: true,
      }),
      invalidatesTags : ["INDEPENDENT_TASK"],
    })

  })
})

export const {
  useGetIndependentTaskQuery,
  useLazyGetIndependentTaskQuery,
  usePostIndependentTaskMutation,
} = independentTaskApiSlice;