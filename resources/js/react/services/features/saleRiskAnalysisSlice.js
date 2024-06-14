import { createSlice } from "@reduxjs/toolkit";
import { update } from "lodash";



const initialState = {
  settings: [
    {
      id: 1,
      name: "enable_add_policy_button",
      label: "Enable Add Policy Button",
      value: false,
    },
    {
      id: 2,
      name: "enable_edit_policy",
      label: "Enable Edit Policy",
      value: false,
    }
  ]
}




const saleRiskAnalysisSlice = createSlice({
  name: 'saleRiskAnalysis',
  initialState,
  reducers: {
    updateSetting(state, action) {
      const { value, name } = action.payload;
      const setting = state.settings.find(setting => setting.name === name);
      setting.value = value;
    }
  }
});

export const { updateSetting } = saleRiskAnalysisSlice.actions;


export default saleRiskAnalysisSlice.reducer;