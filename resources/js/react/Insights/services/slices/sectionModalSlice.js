import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   sectionModalOpen: false, 
   type: "",
   from: ""
}


const sectionModalSlice = createSlice({
    name: 'sectionModal',
    initialState,
    reducers: {
        openSectionModal: (state, action) => {
            state.sectionModalOpen = true;
            state.type = action.payload.type;
            state.from = action.payload.from;
        },
        closeSectionModal: (state) => {
            state.sectionModalOpen = false;
            state.type = "";
            state.from = "";
        }
    },
});

export const { openSectionModal, closeSectionModal } = sectionModalSlice.actions;

export default sectionModalSlice.reducer;