

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    departments: [],
    shift: [],
    employees: [],
    status: 'idle',
    error: ''
}




const filterOptionSlice = createSlice({
    name: 'filterOptions',
    initialState,
    reducers: {
        setFilterOptionsState: (state, action) => {
            const { department, team, employee } = action.payload;
            state.departments = department;
            state.shift = team;
            state.employees = employee;
        },
        setFilterOptionsStatus: (state, action) => {
            state.status = action.payload
        }
    }
});


export const { setFilterOptionsState, setFilterOptionsStatus } = filterOptionSlice.actions;


export default filterOptionSlice.reducer;