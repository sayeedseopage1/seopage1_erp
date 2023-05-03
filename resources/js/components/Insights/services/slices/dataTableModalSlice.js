import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    isOpenDataTable: true,
    data: [],
    title: 'Modal title',
    status: 'idle',
    error: null,
    tableCaption: null,
}



// slice 
const dataTableModalSlice = createSlice({
    name: 'dataTableModal',
    initialState,
    reducers: {
        openDataTableModal: (state, action) => {
            state.isOpenDataTable = true;
            state.data = action.payload.data;
            state.title = action.payload.title;
            state.status = 'idle';
            state.tableCaption = action.payload.tableCaption || null;
            state.error = null;
        },

        closeDataTableModal: (state) => {
            state.isOpenDataTable = false;
            state.data = [];
            state.title = 'Modal title';
            state.status = 'idle';
            state.error = null;
            state.tableCaption = null;
        },

        setStatus: (state, action) => {
            state.status = action.payload.status;
        },

        setError: (state, action) => {
            state.error = action.payload.error;
        }
    }
});


export const { openDataTableModal, closeDataTableModal, setStatus, setError } = dataTableModalSlice.actions;
export default dataTableModalSlice.reducer;