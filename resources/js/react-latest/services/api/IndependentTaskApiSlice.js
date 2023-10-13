import { apiSlice } from "./apiSlice";



const independentTaskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder)=>({
    // get all independent task
    getIndependentTask : builder.query({
      query: (query)=>``,
    }),

    // post an independent task
    postIndependentTask : builder.mutation({
      query: (data) => ({
        url:  `/account/independent-task`,
        method: 'POST',
        body: data,
        formData: true,
      }),
    })

  })
})

export const {
  useLazyGetIndependentTaskQuery,
  usePostIndependentTaskMutation,
} = independentTaskApiSlice;