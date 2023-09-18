import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    data: [],
    status: 'idle',
    error: ''
}


const projectWiseDataTableSlice = createSlice({
    name: 'projectWiseDataTable',
    initialState,
    reducers:{
        setProjectWiseTable: (state, action) => {
            state.data = action.payload
        },

        setStatus: (state, action) => {state.status = action.payload}

    }
})


export const {setProjectWiseTable, setStatus} = projectWiseDataTableSlice.actions;
export default projectWiseDataTableSlice.reducer;