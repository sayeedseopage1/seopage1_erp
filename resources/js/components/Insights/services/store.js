import { configureStore } from "@reduxjs/toolkit";
import salesDashboardModalReducer from "./salesDashboardModalSlice";

export const store = configureStore({
    reducer: {
        salesDashboardModal: salesDashboardModalReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});
