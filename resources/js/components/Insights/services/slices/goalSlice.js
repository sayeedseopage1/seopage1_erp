import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    goals: [],
    recurring: []
};


const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        addGoal: (state, action) => {
            state.goals.push(action.payload.goals);
        },
        addRecurring: (state, action) => {
            state.recurring.push(action.payload.recurring);
        },
        setGoals: (state, action) => {
            state.goals = action.payload;
        },

        setRecurring: (state, action) => {
            state.recurring = action.payload.recurring;
        },
    },
});


export const { addGoal, setGoals, setRecurring, addRecurring } = goalSlice.actions;
export default goalSlice.reducer;