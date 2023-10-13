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
        url:  ``,
        method: 'POST',
        body: data
      }),
    })

  })
})

export const {
  useLazyGetIndependentTaskQuery,
  usePostIndependentTaskMutation,
} = independentTaskApiSlice;