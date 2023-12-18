import { apiSlice } from "./apiSlice";
 
  
const leadApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    leads: build.query({
      query: (query) => `/account/get-all-leads?${query}`, 
    })
  })
})




export const { 
  useLeadsQuery,
} = leadApiSlice;