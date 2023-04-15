import React from "react";
import ReactDOM from "react-dom/client";
import Sidebar from "./Sidebar";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./insights.css";
import SalesDashboardModal from "./SalesDashboardModal";
import { Provider, useSelector } from "react-redux";
import { store } from "./services/store";
import AddingNewDashboardModal from "./AddingNewDashboardModal";
import SectionModal from "./SectionModal";

const Insights = () => {
    const { isOpen } = useSelector((s) => s.createDashboardModal);
    const { isOpen: sectionModalIsOpen } = useSelector((s) => s.sectionModal);
    return (
        <div className="d-flex ">
            <Sidebar />
            <main className="flex-grow-1 p-5">
                <Outlet />
            </main>
            <SalesDashboardModal />
            {isOpen ? <AddingNewDashboardModal isOpen={isOpen} /> : null}
            {sectionModalIsOpen ? (
                <SectionModal isOpen={sectionModalIsOpen} />
            ) : null}
        </div>
    );
};

const container = document.getElementById("insights-container");

if (container) {
    const root = ReactDOM.createRoot(container);

    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter basename="/account/insights">
                    <Routes>
                        <Route path="/" element={<Insights />}>
                            <Route
                                path="/dashboard/:id"
                                element={<h5>My Dashboard</h5>}
                            />
                            <Route
                                path="/goals/:id"
                                element={<h5>My Dashboard</h5>}
                            />
                            <Route
                                path="/reports/:id"
                                element={<h5>My Dashboard</h5>}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}
