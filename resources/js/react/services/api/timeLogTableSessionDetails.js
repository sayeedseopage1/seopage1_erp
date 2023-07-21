import { apiSlice } from "./apiSlice";            


const timeLogTableApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        
       getSessionDetails:  build.query({
            query: ({projectID, employeeID, startDate, endDate}) => ({
                url: `/account/time-log-report/${projectID}/${employeeID}?start_date=${startDate}&end_date=${endDate}`,
                method: "GET", 
            }) 
       }), 

    })
}) ;



export const {  
    useGetSessionDetailsQuery,
    useLazyGetSessionDetailsQuery
} = timeLogTableApiSlice;

