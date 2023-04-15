import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    modalData: null,
    type: "",
};

const salesDashboardModalSlice = createSlice({
    name: "salesDashboardModal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.modalData = action.payload.data;
            state.type = action.payload.type;
        },

        closeModal: (state) => {
            state.isOpen = false;
            state.modalData = null;
            state.type = "";
        },
    },
});

export const { openModal, closeModal } = salesDashboardModalSlice.actions;

export default salesDashboardModalSlice.reducer;
