

import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    departments: [],
    shift: [],
    employees: [],
    status: 'idle',
    error: ''
}




const pointPageFilterSlice = createSlice({
    name: 'pointPageFilter',
    initialState,
    reducers: {
        setFilterState: (state, action) => {
            const { department, team, employee } = action.payload;

            state.departments = department;
            state.shift = team;
            state.employees = employee;
        },

        setStatus: (state, action) => {
            state.status = action.payload
        }
    }
});


export const { setFilterState, setStatus } = pointPageFilterSlice.actions;


export default pointPageFilterSlice.reducer;