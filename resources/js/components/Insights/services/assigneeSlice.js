import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teams: [],
    users: [],
};

const assigneeSlice = createSlice({
    name: "assignee",
    initialState,
    reducers: {
        addAssigneeUsers: (state, action) => {
            state.users = action.payload;
        },

        addAssigneeTeams: (state, action) => {
            state.teams = action.payload;
        },
    },
});

export const { addAssigneeTeams, addAssigneeUsers } = assigneeSlice.actions;

export default assigneeSlice.reducer;
