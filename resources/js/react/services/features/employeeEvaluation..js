import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: "idle",
    error: "",
};

const evaluationWiseTableDataSlice = createSlice({
    name: "evaluationWiseDataTable",
    initialState,
    reducers: {
        setEvaluationWiseTableData: (state, action) => {
            state.data = action.payload;
        },

        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { setEvaluationWiseTableData, setStatus } =
    evaluationWiseTableDataSlice.actions;
export default evaluationWiseTableDataSlice.reducer;
