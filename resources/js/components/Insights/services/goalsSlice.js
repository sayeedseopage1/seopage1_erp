import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    goals: [
        { section: "Active", goals: ["Deals added mehedihasanseopage1"] },
        { section: "Past", goals: [] },
    ],
    status: "idle",
    error: null,
};

// slice
const goalsSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
        addGoal: (state, action) => {
            state.goals = [...state.goals, action.payload];
            state.status = "idle";
        },

        changeStatus: (state, action) => {
            state.status === action.payload;
        },
    },
});

export const { addGoal, changeStatus } = goalsSlice.actions;

export default goalsSlice.reducer;
