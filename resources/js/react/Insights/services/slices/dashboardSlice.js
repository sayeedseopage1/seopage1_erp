import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    dashboards: [],
};


const dashboardSlice = createSlice({
    name: 'dashboards',
    initialState,
    reducers: {
        addDashboard: (state, action) => {
            state.dashboards.push(action.payload)
        },
        setDashboards: (state, action) => {
            state.dashboards = action.payload;
        },
    },
});


export const { addDashboard, setDashboards } = dashboardSlice.actions;
export default dashboardSlice.reducer;