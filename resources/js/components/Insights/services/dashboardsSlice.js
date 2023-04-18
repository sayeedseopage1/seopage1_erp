import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    dashboards: [
        {
            section: "My Dashboards",
            dashboards: ["My Dashboard", "New Dashboard"],
        },
    ],

    status: "idle",
    error: null,
};

// slice
const dashboardSlice = createSlice({
    name: "dashboards",
    initialState,
    reducers: {
        addDashboard: (state, action) => {
            let section = action.payload.section;
            let index = state.dashboards.findIndex(
                (i) => i.section === section
            );
            if (index > -1) {
                state.dashboards[index].dashboards.push(
                    action.payload.dashboard
                );
            } else {
                state.dashboards = [...state.dashboards, { ...action.payload }];
            }
        },

        addSection: (state, action) => {
            state.dashboards.push({ section: action.payload, dashboards: [] });
        },

        changeStatus: (state, action) => {
            state.status === action.payload;
        },
    },
});

export const { addDashboard, addSection, changeStatus } =
    dashboardSlice.actions;

export default dashboardSlice.reducer;
