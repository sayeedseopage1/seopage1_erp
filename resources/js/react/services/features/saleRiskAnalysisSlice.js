import { createSlice } from "@reduxjs/toolkit";
import { update } from "lodash";



const initialState = {
  settings: {
    id: 1,
    name: "enable_Edit_Delete",
    label: "Enable Edit & Delete Mode",
    value: false,
  }
}




const saleRiskAnalysisSlice = createSlice({
  name: 'saleRiskAnalysis',
  initialState,
  reducers: {
    updateSetting(state, action) {
      const { value, name } = action.payload;
      state.settings.value = value;
    }
  }
});

export const { updateSetting } = saleRiskAnalysisSlice.actions;


export default saleRiskAnalysisSlice.reducer;