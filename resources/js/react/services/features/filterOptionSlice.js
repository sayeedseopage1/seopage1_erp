

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    departments: [],
    shift: [],
    employees: [],
    countries: [],
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
        },
        setFilterCountriesState: (state, action) => {
            const countries = _.get(action, 'payload.data', [])
                .find(item => item?.label === "Policy type")
                ?.structure?.list?.structure
                ?.find(item => item?.label === "Type")
                ?.structure?.countries?.structure;
            state.countries = countries
        }
    }
});


export const { setFilterOptionsState, setFilterOptionsStatus, setFilterCountriesState } = filterOptionSlice.actions;


export default filterOptionSlice.reducer;