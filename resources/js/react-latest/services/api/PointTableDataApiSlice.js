import { apiSlice } from "./apiSlice";            

const pointTableDataApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
       pointTableData: build.mutation({
            query: (data) => ({
                url: `/account/point-table-data`,
                method: 'POST',
                body: {
                    ...data,
                    _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
                },
            })
       }),
       
       
       nonCashPoint: build.mutation({
        query: (data) => ({
            url: `/account/store-non-cash-points`,
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
    usePointTableDataMutation,
    useNonCashPointMutation
 } = pointTableDataApiSlice;

