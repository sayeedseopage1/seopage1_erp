import { configureStore } from "@reduxjs/toolkit";
import salesDashboardModalReducer from "./modals/salesDashboardModalSlice";
import newDashboardCreatingModalReducer from "./modals/newDashboardCreatingModalSlice";
import dashboardsReducer from "./dashboardsSlice";
import reportsReducer from "./reportsSlice";
import goalsReducer from "./goalsSlice";
import sectionModalReducer from "./modals/sectionModalSlice";
import goalFormModalReducer from "./modals/goalFormModalSlice";
import assigneeReducer from "./assigneeSlice";
// store
export const store = configureStore({
    reducer: {
        goals: goalsReducer,
        reports: reportsReducer,
        dashboards: dashboardsReducer,
        sectionModal: sectionModalReducer,
        salesDashboardModal: salesDashboardModalReducer,
        createDashboardModal: newDashboardCreatingModalReducer,
        goalFormModal: goalFormModalReducer,
        assignee: assigneeReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});
