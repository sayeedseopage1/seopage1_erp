import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sections: [],
};


const sectionsSlice = createSlice({
    name: 'dashboards',
    initialState,
    reducers: {
        addSection: (state, action) => {
            state.sections = [...state.sections, action.payload];
        },
        setSections: (state, action) => {
            state.sections= action.payload;
        },
    },
});


export const { addSection, setSections } = sectionsSlice.actions;
export default sectionsSlice.reducer;