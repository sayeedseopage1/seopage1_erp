import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    reports: [
        {
            section: "My Reports",
            reports: [
                { type: "leads", text: "Leads Conversion by Source" },
                { type: "deal", text: "Deal Conversion" },
                { type: "deal", text: "Deals won over time" },
                { type: "deal", text: "Average value of won deals" },
                { type: "forecast", text: "Average value of won deals" },
                { type: "deal", text: "Deal duration" },
                { type: "activity", text: "Activities completed and planned" },
                { type: "leads", text: "Leads Conversion by Source" },
                { type: "deal", text: "Deal Conversion" },
                { type: "deal", text: "Deals won over time" },
                { type: "deal", text: "Average value of won deals" },
                { type: "forecast", text: "Average value of won deals" },
                { type: "deal", text: "Deal duration" },
                { type: "activity", text: "Activities completed and planned" },
                { type: "deal", text: "Products sold" },
                { type: "deal", text: "Products sold" },
            ],
        },
    ],
    status: "idle",
    error: null,
};

// slice
const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {
        addReport: (state, action) => {
            state.reports = [...state.reports, action.payload];
            state.status = "idle";
        },

        changeStatus: (state, action) => {
            state.status === action.payload;
        },
    },
});

export const { addReport, changeStatus } = reportsSlice.actions;

export default reportsSlice.reducer;
