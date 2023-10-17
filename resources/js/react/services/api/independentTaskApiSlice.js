import { apiSlice } from "./apiSlice";



const independentTaskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder)=>({
    // get all authorized independent task
    getIndependentTask : builder.query({
      query: (query)=>``,
      providesTags : ["INDEPENDENT_TASK"],
    }),

    // get all independent task for authorization
    getIndependentAuthorizeTask : builder.query({
      query: ()=>`/account/get-independent-task`,
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
  useGetIndependentAuthorizeTaskQuery,
  usePostIndependentTaskMutation,
} = independentTaskApiSlice;