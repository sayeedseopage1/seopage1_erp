import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import employeeWiseTableDataReducer from "./features/employeeWiseTableDataSlice";
import projectWiseDataTableReducer from "./features/projectWiseTableDataSlice";
import taskWiseDataTableReducer from "./features/taskWiseTableDataSlice";
import usersReducer from "./features/usersSlice";
import pointPageFilterReducer from "./features/pointPageFilterSlice";
import subtaskReducer from "./features/subTaskSlice";
import timeLogHistoryReducer from "./features/timeLogHistorySlice";
import tasksReducer from "./features/tasksSlice";
import errorSlice from "./features/errorSlice";
import filterOptionReducer from "./features/filterOptionSlice";
import saleRiskAnalysisReducer from './features/saleRiskAnalysisSlice';
import PmIncentiveSliceReducer from "./features/Pm-Sales/pmIncentiveSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        employeeWiseTableData: employeeWiseTableDataReducer,
        projectWiseDataTable: projectWiseDataTableReducer,
        taskWiseDataTable: taskWiseDataTableReducer,
        saleRiskAnalysis: saleRiskAnalysisReducer,
        users: usersReducer,
        pointPageFilterOption: pointPageFilterReducer,
        subTask: subtaskReducer,
        timeLogHistory: timeLogHistoryReducer,
        tasks: tasksReducer,
        filterOptions: filterOptionReducer,
        error: errorSlice,
        pmIncentive: PmIncentiveSliceReducer,
    },

    // serializableCheck: false,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    serializableCheck: false,
    devTools: true,
});
