import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    filter: null,
}


const timeLogHistorySlice = createSlice({
    name: 'timeLogHistory',
    initialState,
    reducers:{ 
        storeData: (state, action) => {
            state.data = action.payload.data
        },
        setFilterOption: (state, action) =>{
            state.filter = action.payload.filter
        }
    }
})


export const {storeData, setFilterOption} = timeLogHistorySlice.actions;
export default timeLogHistorySlice.reducer;