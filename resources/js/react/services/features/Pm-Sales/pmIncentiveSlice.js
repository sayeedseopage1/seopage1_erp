import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    regularPointAverage: 0,
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
    },
});

export const { regularPointAverage } = pmIncentiveSlice.actions;

export default pmIncentiveSlice.reducer;
