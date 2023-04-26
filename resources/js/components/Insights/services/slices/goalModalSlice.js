import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    goalModalOpen: false,
    entry: 'Deal',
    entryType: null
}


const goalModalSlice = createSlice({
    name: 'goalModal',
    initialState,
    reducers: {
        openGoalModal(state, action) {
            state.goalModalOpen = true;
            state.entry = action.payload?.entry || 'Deal'; 
            state.entryType = action.payload?.entryType || null;
        },

        closeGoalModal(state) {
            state.goalModalOpen = false;
        }
    }
});


export const {openGoalModal, closeGoalModal} = goalModalSlice.actions;

export default goalModalSlice.reducer;
