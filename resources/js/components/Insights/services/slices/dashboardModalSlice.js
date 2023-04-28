import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    dashboardModalOpen : false, 
    section: null,
    dashboardName: "",
}


const dashboardModalSlice = createSlice({
    name: 'dashboardModal',
    initialState,
    reducers: {
        openDashboardModal: (state) => {
            state.dashboardModalOpen = true;
        },
        closeDashboardModal: (state) => {
            state.dashboardModalOpen = false;
        },
        setDashboardModalData: (state, action) => {
            state.section = action.payload.section;
            state.dashboardName = action.payload.dashboardName === undefined ? state.dashboardName : action.payload.dashboardName;
        },
    },
});

export const { openDashboardModal, closeDashboardModal, setDashboardModalData} = dashboardModalSlice.actions;

export default dashboardModalSlice.reducer;