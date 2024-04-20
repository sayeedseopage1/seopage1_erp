// pendingActionsSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pendingActionId: null,
    status: "idle",
    error: "",
};

const pendingActionsSlice = createSlice({
    name: "pendingActions",
    initialState,
    reducers: {
        setPendingActionId: (state, action) => {
            state.pendingActionId = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { setPendingActionId, setStatus } = pendingActionsSlice.actions;
export default pendingActionsSlice.reducer;
