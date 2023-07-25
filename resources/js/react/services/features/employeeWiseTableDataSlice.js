import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    data: [],
    status: 'idle',
    error: ''
}


const employeeWiseTableDataSlice = createSlice({
    name: 'employeeWiseTableData',
    initialState,
    reducers:{
        setEmployeeWiseData: (state, action) => {
            state.data = action.payload
        },

        setStatus: (state, action) => {state.status = action.payload}

    }
})


export const {setEmployeeWiseData, setStatus} = employeeWiseTableDataSlice.actions;
export default employeeWiseTableDataSlice.reducer;