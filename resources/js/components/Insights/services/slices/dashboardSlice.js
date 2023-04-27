import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    dashboards: [
        {
            id: 'dashboard_1',
            section: "My Dashboard",
            title: "My Dashboard",
        },
        {
            id: 'dashboard_2',
            section: "My Dashboard",
            title: "My Dashboard 2",
        },
        {
            id: 'dashboard_3',
            section: "Other Dashboard",
            title: "Other Dashboard",
        }
    ],
};


const dashboardSlice = createSlice({
    name: 'dashboards',
    initialState,
    reducers: {
        addDashboard: (state, action) => {
            state.dashboards = [...state.dashboards, action.payload];
        },
        setDashboards: (state, action) => {
            state.dashboards = action.payload;
        },
    },
});


export const { addDashboard, setDashboards } = dashboardSlice.actions;
export default dashboardSlice.reducer;