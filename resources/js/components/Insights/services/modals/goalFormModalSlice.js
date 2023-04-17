import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    entry: "",
    entryType: "",
    title: "",
    showPrevious: false,
    edit: null,
};

const goalFormSlice = createSlice({
    name: "goalFormModal",
    initialState,
    reducers: {
        openGoalFormModal: (state, action) => {
            state.isOpen = true;
            state.title = action.payload.title || "";
            state.entry = action.payload.entry || "";
            state.entryType = action.payload.entryType || "";
            state.showPrevious = action.payload.showPrevious || false;
            state.edit = action.payload.edit || null;
        },

        closeGoalFormModal: (state, action) => {
            state.isOpen = false;
            state.entry = "";
            state.title = "";
            state.entryType = "";
            state.showPrevious = "";
            state.edit = null;
        },
    },
});

export const { openGoalFormModal, closeGoalFormModal } = goalFormSlice.actions;

export default goalFormSlice.reducer;
