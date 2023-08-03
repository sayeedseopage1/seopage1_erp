import { configureStore, miniSerializeError } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import employeeWiseTableDataReducer from "./features/employeeWiseTableDataSlice";
import projectWiseDataTableReducer from "./features/projectWiseTableDataSlice";
import taskWiseDataTableReducer from './features/taskWiseTableDataSlice';
import usersReducer from './features/usersSlice';
import pointPageFilterReducer from "./features/pointPageFilterSlice";
import subtaskReducer from './features/subTaskSlice';
import timeLogHistoryReducer from "./features/timeLogHistorySlice";
import tasksReducer from './features/tasksSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        employeeWiseTableData: employeeWiseTableDataReducer,
        projectWiseDataTable: projectWiseDataTableReducer,
        taskWiseDataTable: taskWiseDataTableReducer,
        users: usersReducer,
        pointPageFilterOption: pointPageFilterReducer,
        subTask: subtaskReducer,
        timeLogHistory: timeLogHistoryReducer,
        tasks: tasksReducer
    },

   // serializableCheck: false, 

   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    serializableCheck: false,
    devTools: true,
});
