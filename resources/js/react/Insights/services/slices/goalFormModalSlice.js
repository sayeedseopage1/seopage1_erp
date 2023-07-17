import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    goalFormModalOpen: false,
    data: null,
    mode: 'add',
    entry: '',
    entryType: '',
}


const goalFormModalSlice = createSlice({
    name: 'goalFormModal',
    initialState,
    reducers: {
        openGoalFormModal(state, actions) {
            state.goalFormModalOpen = true;
            state.entry = actions.payload.entry;
            state.entryType = actions.payload.entryType; 
            state.data = actions.payload.data;
            state.mode = actions.payload.mode || 'add';
        },

        closeGoalFormModal(state) {
            state.goalFormModalOpen = false;
            state.data = null;
            state.mode = 'add';
            state.entry = '';
            state.entryType = '';
        }
    }
});


export const { openGoalFormModal, closeGoalFormModal} = goalFormModalSlice.actions;

export default goalFormModalSlice.reducer;