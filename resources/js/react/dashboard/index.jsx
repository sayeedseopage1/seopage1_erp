import React from "react";
import ReactDOM from "react-dom/client";
import { DndProvider, useDragLayer } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";

// Pages
import PMDashboard from "./page/PMDashboard.jsx";
import DeveloperDashboard from "./page/DeveloperDashboard.jsx";
import SalesExecutiveDashboard from "./page/SalesExecutiveDashboard.jsx";
import LeadDeveloperDashboard from "./page/LeadDeveloperDashboard.jsx";

// styles
import './dashboard.css'


// Store
import { store } from "../services/store";

// Notifications component
import Toaster from "../global/Toaster";

// Error boundary component
import ErrorBoundary from "./helper/ErrorBoundary.jsx";

// Content component
const Content = () => {
    return (
        <React.Fragment>
            <DragLayer />
            <Outlet />
            <Toaster />
        </React.Fragment>
    );
};

// Custom drag layer
const DragLayer = () => {
    const { item, itemType, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getClientOffset(),
    }));

    if (!currentOffset) {
        return null;
    }
    return (
        <div
            style={{
                position: "fixed",
                pointerEvents: "none",
                zIndex: 999999,
                left: currentOffset.x,
                top: currentOffset.y,
            }}
        >
            {/* Render your custom preview here based on the dragged item */}
            {itemType === "column" && (
                <div
                    className="py-2 px-2 pl-3 bg-white shadow border"
                    style={{ width: item.columnDef.size }}
                >
                    {item.columnDef.header}
                </div>
            )}
        </div>
    );
};

// Dashboard components map
const dashboardComponents = {
    4: PMDashboard,
    5: DeveloperDashboard,
    6: LeadDeveloperDashboard,
    7: SalesExecutiveDashboard,
};

// Function to render the appropriate dashboard based on user role
const renderEmployeeDashboardById = () => {
    const user = window?.Laravel?.user;
    const DashboardComponent =
        dashboardComponents[user?.role_id] || PMDashboard;
    return <DashboardComponent />;
};



// Define your routes data
const routes = [
    {
        id: 1,
        containerId: "employeeDashboard",
        baseUrl: "/account/dashboard/temp",
        contextProvider: null,
        pageComponent: renderEmployeeDashboardById(),
    },
    {
        id: 2,
        containerId: "pmDashboard",
        baseUrl: "account/dashboard-pm-performance/:pm_id",
        contextProvider: null,
        pageComponent: <PMDashboard />,
    },
    {
        id: 2,
        containerId: "pmDashboard",
        baseUrl: "account/dashboard-lead-dev-performance/:lead_dev_id",
        contextProvider: null,
        pageComponent: <LeadDeveloperDashboard />,
    },
    {
        id: 3,
        containerId: "developerDashboard",
        baseUrl: "/account/dashboard-developer-performance/:developer_id",
        contextProvider: null,
        pageComponent: <DeveloperDashboard />,
    },

    {
        id: 4,
        containerId: "salesExecutiveDashboard",
        baseUrl:
            "/account/dashboard-sales-performance/:sales_executive_id",
        contextProvider: null,
        pageComponent: <SalesExecutiveDashboard />,
    },
];



// Render your routes
const renderRoutes = () => {
    return routes.map((route) => {
        // Get the container element
        const container = document.getElementById(route.containerId);

        // Set default context provider to React.Fragment if not provided
        const ContextProvider = route.contextProvider || React.Fragment;
        if (container) {
            ReactDOM.createRoot(container).render(
                <React.StrictMode key={route.id}>
                    <ErrorBoundary>
                        <Provider store={store}>
                            <ContextProvider>
                                <DndProvider backend={HTML5Backend}>
                                    <BrowserRouter basename={route.baseUrl}>
                                        <Routes>
                                            <Route
                                                path="/"
                                                element={<Content />}
                                                key={route.id}
                                            >
                                                <Route
                                                    path="/"
                                                    element={
                                                        route.pageComponent
                                                    }
                                                    key={route.id}
                                                />
                                            </Route>
                                        </Routes>
                                    </BrowserRouter>
                                </DndProvider>
                            </ContextProvider>
                        </Provider>
                    </ErrorBoundary>
                </React.StrictMode>
            );
        }
        return null;
    });
};

// Call the renderRoutes function
renderRoutes();
