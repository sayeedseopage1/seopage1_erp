import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    type: "",
};

// slice
const SectionModalSlice = createSlice({
    name: "sectionModal",
    initialState,
    reducers: {
        openSectionModal: (state, action) => {
            state.isOpen = true;
            state.type = action.payload.type;
        },

        closeSectionModal: (state) => {
            state.isOpen = false;
            state.type = "";
        },
    },
});

export const { openSectionModal, closeSectionModal } =
    SectionModalSlice.actions;
export default SectionModalSlice.reducer;
