import { apiSlice } from "./apiSlice";


const requiredActionApiSlice = apiSlice.injectEndpoints({
  endpoints:(build)=>({
    getLiveRequiredAction : build.query({
      query: (query)=>`/account/get-pending-active-live-action?${query}`,
    }),

    getExpiredRequiredAction : build.query({
      query : (query)=>`/account/get-pending-expired-live-action?${query}`,
    }),

    getPastRequiredAction : build.query({
      query: (query)=>`/account/get-pending-past-action?${query}`,
    }),

    getFormData: build.query({
      query: (url)=>url,
    })

  })
})


export const {
  useLazyGetLiveRequiredActionQuery,
  useGetExpiredRequiredActionQuery,
  useLazyGetExpiredRequiredActionQuery,
  useLazyGetPastRequiredActionQuery,
  useGetFormDataQuery,
} = requiredActionApiSlice; 