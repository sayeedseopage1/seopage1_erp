import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
// import Toaster from "../../../global/Toaster";
// import { store } from "../../../services/store";
import FreelancerProjectDetails from "./FreelancerProjectDetails";
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

const container = document.getElementById("marketplaceProject");
if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter basename="/account/marketeplace-projects">
                    <Routes>
                        <Route path="/" element={<Content />}>
                            <Route index element={<FreelancerProjectDetails />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}