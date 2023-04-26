import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    goals: [
        {
            id: 'goal_1',
            status: 'active',
            title: "My goal 1",
            type: 'Forecast'
        },
        {
            id: 'goal_2',
            status: 'active',
            title: "My goal 2",
            type : 'Deal'
        },
        {
            id: 'goal_3',
            status: 'past',
            title: "My goal 3",
            type: 'Forecast'
        } 
    ],
};


const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        addGoal: (state, action) => {
            state.goals.push(action.payload);
        },
        setGoals: (state, action) => {
            state.goals = action.payload;
        },
    },
});


export const { addGoal, setGoals } = goalSlice.actions;
export default goalSlice.reducer;