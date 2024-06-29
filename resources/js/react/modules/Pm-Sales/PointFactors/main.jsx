import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import PointFactors from "./pages/PointFactors";
import Toaster from "../../../global/Toaster";
import { store } from "../../../services/store";

const Content = () => {
    return (
        <React.Fragment>
            <Outlet />
            <Toaster />
        </React.Fragment>
    );
};

const container = document.getElementById("projectMangerCriteriaContainer");
if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter basename="/account/pm-point-factors">
                    <Routes>
                        <Route path="/" element={<Content />}>
                            <Route index element={<PointFactors />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}