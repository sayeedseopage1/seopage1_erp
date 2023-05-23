import { apiSlice } from "./apiSlice";            

const incentiveApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
       incentiveCurrentData: build.mutation({
            query: (data) => ({
                url: `/account/incentives-json/get`,
                method: 'POST',
                body: {
                    ...data,
                    _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
                },
            })
       }) 

    })

}) ;



export const { 
    useIncentiveCurrentDataMutation
 } = incentiveApiSlice;

