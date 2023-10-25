import { apiSlice } from "./apiSlice";            


const revisionCalculatorApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
       getRevisionCalculatorData: build.query({
            query: (query) => `/account/revision-calculator-data${query}`,
       }),

       projectElaborationData: build.query({
            query: query => `/account/revision-calculator-data/assigne-project-count${query}`,
       }),

       getRevisionCalculatorTaskWiseData: build.query({
            query: query => `/account/revision-calculator-data/no-of-tasks${query}`,
       }),
       getRevisionCalculatorRevisionWiseData: build.query({
            query: query => `/account/revision-calculator-data/no-of-revisions${query}`,
        }),
        getRevisionCalculatorDataSalesIssues: build.query({
            query: query => `/account/revision-calculator-data/sales-issues${query}`,
        }),
        
        getRevisionCalculatorDataPmIssues: build.query({
            query: query => `/account/revision-calculator-data/pm-issues${query}`,
        }),
         
        getRevisionCalculatorDataClientIssues: build.query({
            query: query => `/account/revision-calculator-data/client-issues${query}`,
        }), 

        getRevisionCalculatorDataLeadIssues: build.query({
            query: query => `/account/revision-calculator-data/ldev-issues${query}`,
        }),
 

        getRevisionCalculatorDataDevIssues: build.query({
            query: query => `/account/revision-calculator-data/dev-issues${query}`,
        }),

        
        getRevisionCalculatorDataTotalDispute: build.query({
            query: query => `/account/revision-calculator-data/total-dispute${query}`,
        }),

        getRevisionCalculatorDataTotalUnsolveDispute: build.query({
            query: query => `/account/revision-calculator-data/dispute-not-resolve${query}`,
        }),

        getPendingRevisionData: build.query({
            query: query => `/account/revision-calculator-data/pending-issues${query}`
        })
    })
}) ; 



export const { 
    useLazyGetRevisionCalculatorDataQuery,
    useGetRevisionCalculatorDataQuery,
    useLazyProjectElaborationDataQuery,
    useProjectElaborationDataQuery,
    useLazyGetRevisionCalculatorTaskWiseDataQuery,
    useGetRevisionCalculatorTaskWiseDataQuery,
    useGetRevisionCalculatorRevisionWiseDataQuery,
    useLazyGetRevisionCalculatorRevisionWiseDataQuery,
    useLazyGetRevisionCalculatorDataDevIssuesQuery,
    useLazyGetRevisionCalculatorDataClientIssuesQuery,
    useLazyGetRevisionCalculatorDataLeadIssuesQuery,
    useLazyGetRevisionCalculatorDataPmIssuesQuery,
    useLazyGetRevisionCalculatorDataSalesIssuesQuery,
    useLazyGetRevisionCalculatorDataTotalDisputeQuery,
    useLazyGetRevisionCalculatorDataTotalUnsolveDisputeQuery,
    useLazyGetPendingRevisionDataQuery
} = revisionCalculatorApiSlice;

