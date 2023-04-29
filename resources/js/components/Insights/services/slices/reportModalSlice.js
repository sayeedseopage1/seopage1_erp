import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    reportModalOpen: false,
}


const reportModalSlice = createSlice({
    name: 'reportModal',
    initialState,
    reducers: {
        openReportModal(state) {
            state.reportModalOpen = true;
        },

        closeReportModal(state) {
            state.reportModalOpen = false;
        }
    }
});


export const {openReportModal, closeReportModal} = reportModalSlice.actions;

export default reportModalSlice.reducer;
