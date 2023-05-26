import { configureStore, miniSerializeError } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import employeeWiseTableDataReducer from "./features/employeeWiseTableDataSlice";
import projectWiseDataTableReducer from "./features/projectWiseTableDataSlice";
import taskWiseDataTableReducer from './features/taskWiseTableDataSlice';
import usersReducer from './features/usersSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        employeeWiseTableData: employeeWiseTableDataReducer,
        projectWiseDataTable: projectWiseDataTableReducer,
        taskWiseDataTable: taskWiseDataTableReducer,
        users: usersReducer,
    },
   // serializableCheck: false, 

   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    serializableCheck: false,
    devTools: true,
});
