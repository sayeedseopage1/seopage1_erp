import { configureStore } from "@reduxjs/toolkit";
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

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        goals: goalReducer,
        goalModal : goalModalReducer,
        goalFormModal: goalFormModalReducer,
        dashboards: dashboardReducer,
        dashboardModal: dashboardModalReducer,
        reports: reportReducer,
        reportModal: reportModalReducer,
        sectionModal: sectionModalReducer,

    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});
