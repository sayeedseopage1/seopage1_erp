
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    reports: [
        {
            id: 'reports_1',
            section: "My Reports",
            title: "My Reports",
            type: 'Forecast'
        }
    ],
};


const reportSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        addReport: (state, action) => {
            state.reports.push(action.payload);
        },
        setReports: (state, action) => {
            state.reports = action.payload;
        },
    },
});


export const { addReport, setReports} = reportSlice.actions;
export default reportSlice.reducer;