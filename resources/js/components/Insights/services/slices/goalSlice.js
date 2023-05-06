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
        addRecurring: (state, action) => {
            state.recurring = [...state.recurring, ...action.payload.recurring];
        },
        setGoals: (state, action) => {
            state.goals = action.payload.goals;
        },

        setRecurring: (state, action) => {
            state.recurring = action.payload.recurring;
        },

        setStatus: (state, action) => {
            state.status = action.payload.status;
        },

        setError: (state, action) => {
            state.error = action.payload.error;
        }
    },
});


export const { addGoal, setGoals, setRecurring, addRecurring, setStatus, setError } = goalSlice.actions;
export default goalSlice.reducer;