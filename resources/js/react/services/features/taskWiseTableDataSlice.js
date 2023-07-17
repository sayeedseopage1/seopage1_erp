import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    data: [],
    status: 'idle',
    error: ''
}


const taskWiseTableDataSlice = createSlice({
    name: 'taskWiseDataTable',
    initialState,
    reducers:{
        setTaskWiseTableData: (state, action) => {
            state.data = action.payload
        },

        setStatus: (state, action) => {state.status = action.payload}

    }
})


export const {setTaskWiseTableData, setStatus} = taskWiseTableDataSlice.actions;
export default taskWiseTableDataSlice.reducer;