import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    goals: [],
    recurring: [],
    status: 'idle',
    error: null
};


const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        addGoal: (state, action) => {
            state.goals.push(action.payload.goal);
        },
        updateGoal: (state, action) => {
            state.goals = state.goals.map(goal => {
                if (goal.id === action.payload.goal.id) {
                    return action.payload.goal;
                }
                return goal;
            });
        },
        
        addRecurring: (state, action) => {
            state.recurring = [...state.recurring, ...action.payload.recurring];
        },

        setGoals: (state, action) => {
            state.goals = action.payload.goals;
        },


        setRecurring: (state, action) => {
            state.recurring = [...action.payload.recurring];
        },

        updateRecurring: (state, action) => {
            if(state.recurring.length > 0){
                let recurring = state.recurring.filter(recurring => 
                    recurring.goal_id !== action.payload.goal.id);
                state.recurring =  [...recurring, ...action.payload.recurring];
            }
            
            state.recurring =  [...action.payload.recurring];
        },

        setStatus: (state, action) => {
            state.status = action.payload.status;
        },

        setError: (state, action) => {
            state.error = action.payload.error;
        }
    },
});


export const { addGoal, setGoals, setRecurring, addRecurring, updateGoal, updateRecurring, setStatus, setError } = goalSlice.actions;
export default goalSlice.reducer;