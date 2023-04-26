
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    reports: [
        {
            id: 'reports_1',
            section: "My Reports",
            title: "My Reports",
            type: 'Forecast'
        },
        {
            id: 'reports_2',
            section: "My Reports",
            title: "My Reports 1",
            type: "Deal"
        },
        {
            id: 'report_3',
            section: "Other Report",
            title: "Other Report",
            type: "Lead"
        },
        {
            id: 'report_4',
            section: "Other Report",
            title: "Other Report 1",
            type: "Forecast"
        },
        {
            id: 'report_5',
            section: "Other Report",
            title: "Other Report 2",
            type: "Deal"
        },
        {
            id: 'report_6',
            section: "Other Report",
            title: "Other Report 3",
            type: "Lead"
        },
        {
            id: 'report_7',
            section: "Other Report",
            title: "Other Report 4",
            type: "Forecast"
        },
        {
            id: 'report_8',
            section: "Other Report",
            title: "Other Report 4",
            type: "Forecast"
        },
        {
            id: 'report_9',
            section: "Other Report",
            title: "Other Report 4",
            type: "Forecast"
        },
        {
            id: 'report_10',
            section: "Other Report",
            title: "Other Report 4",
            type: "Forecast"
        },
        {
            id: 'report_11',
            section: "Other Report",
            title: "Other Report 4",
            type: "Forecast"
        },
        {
            id: 'report_12',
            section: "Other Report",
            title: "Other Report 4",
            type: "Forecast"
        },
        {
            id: 'report_13',
            section: "Other Report",
            title: "Other Report 4",
            type: "Forecast"
        },
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