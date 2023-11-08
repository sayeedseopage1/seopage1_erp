import { apiSlice } from "./apiSlice";


const requiredActionApiSlice = apiSlice.injectEndpoints({
  endpoints:(build)=>({
    getLiveRequiredAction : build.query({
      query: (query)=>`account/get-pending-active-live-action?${query}`,
    })
  })
})


export const {
  useLazyGetLiveRequiredActionQuery,
} = requiredActionApiSlice; 