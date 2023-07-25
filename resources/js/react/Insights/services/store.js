import { configureStore, miniSerializeError } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

// goal
import goalReducer from "./slices/goalSlice";
import goalModalReducer from "./slices/goalModalSlice";
import goalFormModalReducer from "./slices/goalFormModalSlice";

// dashboard
import dashboardReducer from "./slices/dashboardSlice";
import dashboardModalReducer from "./slices/dashboardModalSlice";

// reports
import reportReducer from "./slices/reportSlice";
import reportModalReducer from "./slices/reportModalSlice";

import sectionModalReducer from "./slices/sectionModalSlice";
import sectionReducer from './slices/sectionsSlice';

import dataTableModalReducer from "./slices/dataTableModalSlice";
// deals
import dealReducer from './slices/dealSlice';


// users
import usersReducer from './slices/usersSlice';
import teamReducer from './slices/teamSlice';


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        deals: dealReducer,
        goals: goalReducer,
        goalModal : goalModalReducer,
        goalFormModal: goalFormModalReducer,
        dashboards: dashboardReducer,
        sections: sectionReducer,
        dashboardModal: dashboardModalReducer,
        reports: reportReducer,
        reportModal: reportModalReducer,
        sectionModal: sectionModalReducer,
        dataTableModal: dataTableModalReducer,
        users: usersReducer,
        teams: teamReducer
    },
   // serializableCheck: false, 

//    middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
//     serializableCheck: false,
//     devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false, 
    }).concat(apiSlice.middleware),
    devTools: true,
});
