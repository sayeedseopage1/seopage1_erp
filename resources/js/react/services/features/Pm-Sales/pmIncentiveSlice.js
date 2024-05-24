import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    regularPointAverage: 0,
    regularIncentivePoints: 0,
    upSaleCrossSalePoints: 0,
    bonusPointsPoints: 0,
};

const pmIncentiveSlice = createSlice({
    name: "pmIncentive",
    initialState,
    reducers: {
        regularPointAverage: (state, action) => {
            state.regularPointAverage = action.payload;
        },
        regularIncentivePoints: (state, action) => {
            state.regularIncentivePoints = action.payload;
        },
        upSaleCrossSalePoints: (state, action) => {
            state.upSaleCrossSalePoints = action.payload;
        },
        bonusPointsPoints: (state, action) => {
            state.bonusPointsPoints = action.payload;
        },
    },
});

export const {
    regularPointAverage,
    regularIncentivePoints,
    upSaleCrossSalePoints,
    bonusPointsPoints,
} = pmIncentiveSlice.actions;

export default pmIncentiveSlice.reducer;
