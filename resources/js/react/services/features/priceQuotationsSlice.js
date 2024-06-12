import { createSlice } from "@reduxjs/toolkit";
import { update } from "lodash";



const initialState = {
    otherWorkError: {
        status: false,
        message: "",
    } ,
}


const priceQuotationsSlice = createSlice({
    name: 'priceQuotations',
    initialState,
    reducers:{
          updateOtherWorkError(state, action){
            state.otherWorkError = action.payload;
          }
    }
})


export const { updateOtherWorkError } = priceQuotationsSlice.actions;
export default priceQuotationsSlice.reducer;