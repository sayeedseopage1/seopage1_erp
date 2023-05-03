import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    deals: [],
    status: "idle",
    error: null,
}


const dealSlice = createSlice({
    name: 'deals',
    initialState,
    reducers: {
        setDeals: (state, action) => {
            state.deals = action.payload;
        },
        
        setStatus: (state, action) => {
            state.status = action.payload.status;
        },

        setError: (state, action) => {
            state.error = action.payload.error;
        } 
    }
});


export const {setDeals, setStatus, setError} = dealSlice.actions;

export default dealSlice.reducer;