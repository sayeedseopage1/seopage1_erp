import { result } from "lodash";
import { apiSlice } from "./apiSlice";            


const goalApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        
        getGoals: build.query({
            // query: (id) => `/account/insights/goals/get/${id}`
            query: (user_id) => `/account/insights/goals/get/${user_id}`,
            providesTags: (result) => {
                if(!result) return [{ type: 'Goal', id: 'LIST' }]

                const {goals} = result;

                return [...goals.map(({id}) => ({ type: 'Goal', id }))]
            }
           
        }),


        getGoalById: build.query({
            query: (id) => `/account/insights/goal/get-goal-details/${id}`,
            providesTags: (result, error, id) => [{ type: 'Goal', id }]
        }),

        editGoalTitle: build.mutation({
            query: ({id, title}) =>  ({
                url: `/account/insights/goal-title/edit/title/${id}`,
                method: 'POST',
                body:{ 
                    id, 
                    title, 
                    _token: document.querySelector('meta[name="csrf-token"]').getAttribute('content') 
                }
            })
        }),

        updateGoal: build.mutation({
            query: ({
                id,
                data
            }) => ({
                url: `/account/insights/goals/edit/${id}`,
                method: 'POST',
                body: {
                    id,
                    ...data,
                    _token: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }),
          invalidatesTags: (result, error, arg) => {
            // invalidate goal and deal queries
            if(result) return ([
                { type: 'Goal', id:arg.id }, 
                { type: 'Deal', goalId: arg.id }
            ])
          }
        }),
        
    })
}) ;




// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints



export const { 
    useGetGoalsQuery, 
    useEditGoalTitleMutation, 
    useGetGoalByIdQuery, 
    useUpdateGoalMutation,
} = goalApiSlice;

