import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    isOpen: false,
    sectionModalIsOpen: false,
    sectionModalOpenFrom: "",
};

// slice
const newDashboardCreatingModalSlice = createSlice({
    name: "dashboardModal",
    initialState,
    reducers: {
        openDashboardCreatingModal: (state, action) => {
            state.isOpen = true;
        },
        closeDashboardCreatingModal: (state, action) => {
            state.isOpen = false;
        },
        openAddDashboardSectionModal: (state, action) => {
            state.sectionModalIsOpen = true;
            state.sectionModalOpenFrom = action.payload || "";
        },
        closeAddDashboardSectionModal: (state, action) => {
            state.sectionModalIsOpen = false;
            state.sectionModalOpenFrom = "";
        },
    },
});

export const { openDashboardCreatingModal, closeDashboardCreatingModal } =
    newDashboardCreatingModalSlice.actions;

export default newDashboardCreatingModalSlice.reducer;
