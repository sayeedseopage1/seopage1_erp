



import { apiSlice } from "./apiSlice";            


const goalApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        
        getGoals: build.query({
            // query: (id) => `/account/insights/goals/get/${id}`
            query: (user_id) => `/account/insights/goals/get/${user_id}`
        }),

        editGoalTitle: build.mutation({
            query: ({id, title}) =>  ({
                url: `/account/insights/goal-title/edit/title/${id}`,
                method: 'POST',
                body:{ id, title, _token: document.querySelector('meta[name="csrf-token"]').getAttribute('content') }
            })
        }),
        
    })
}) ;



export const { useGetGoalsQuery, useEditGoalTitleMutation} = goalApiSlice;

