import { result } from "lodash";
import { apiSlice } from "./apiSlice";


const goalApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getGoals: build.query({
            query: (query) => `/account/insights/goals/get/${query}`,
            providesTags: (result) => [{ type: 'Goal', id: 'LIST' }],
            keepUnusedDataFor: 0.0001,
        }),

        addNewGoal: build.mutation({
            query: (data) => ({
                url: `/account/insights/goals/add`,
                method: 'POST',
                body: {
                    ...data
                }
            }),

            invalidatesTags: (result, error, arg) => [{ type: 'Goal', id: 'LIST' }]
        }),


        getGoalById: build.query({
            query: (id) => `/account/insights/goal/get-goal-details/${id}`,
            providesTags: (result, error, id) => [{ type: 'Goal', id }]
        }),

        editGoalTitle: build.mutation({
            query: ({ id, title }) => ({
                url: `/account/insights/goal-title/edit/title/${id}`,
                method: 'POST',
                body: {
                    id,
                    title,
                    _token: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }),

            invalidatesTags: (result, error, arg) => [{ type: 'Goal', id: 'LIST' }]
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
                if (result) return ([
                    { type: 'Goal', id: arg.id },
                    { type: 'Deal', goalId: arg.id }
                ])
            }
        }),

        // add goal
        addGoal: build.mutation({
            query: (data) => ({
                url: `/account/insights/goals/add`,
                method: 'POST',
                body: {
                    ...data,
                    _token: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }),

            invalidatesTags: (result, error, arg) => [{ type: 'Goal', id: 'LIST' }]
        }),
        // Goal make as public 
        makeGoalPublic: build.mutation({
            query: () => ({
                url: `/account/goal-mark-as-public`,
                method: 'POST',
                body: {
                    is_public: 1,
                    _token: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }),
        }),
    })
});




// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints



export const {
    useGetGoalsQuery,
    useLazyGetGoalsQuery,
    useEditGoalTitleMutation,
    useGetGoalByIdQuery,
    useUpdateGoalMutation,
    useAddGoalMutation,
    useMakeGoalPublicMutation,
} = goalApiSlice;

