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
import "./dashboard.css";

// Store
import { store } from "../services/store";

// Notifications component
import Toaster from "../global/Toaster";

// Error boundary component
import ErrorBoundary from "./helper/ErrorBoundary.jsx";

// Context for user
import { LeadDeveloperProvider } from "./context/LeadDeveloperContext.jsx";
import { DeveloperDashboardProvider } from "./context/DeveloperDashboardContext.jsx";
import { SaleExecutiveDashboardProvider } from "./context/SalesExecutiveDashboardContext.jsx";

// Context for admin
import { SaleExecutiveAdminDashboardProvider } from "./context/SalesExecutiveAdminDashboardContext.jsx";

// Context for admin

// Content component
const Content = () => (
    <>
        <DragLayer />
        <Outlet />
        <Toaster />
    </>
);

const user = window?.Laravel?.user;

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

// Mapping roles to their respective dashboard components
const dashboardComponents = {
    4: PMDashboard,
    5: DeveloperDashboard,
    6: LeadDeveloperDashboard,
    7: SalesExecutiveDashboard,
};

// Mapping roles to their respective context providers for user
const dashboardContextProviders = {
    5: DeveloperDashboardProvider,
    6: LeadDeveloperProvider,
    7: SaleExecutiveDashboardProvider,
};

//Function to get the appropriate dashboard component based on user role
const renderEmployeeDashboardById = () => {
    const DashboardComponent =
        dashboardComponents[user?.role_id] || PMDashboard;
    return <DashboardComponent />;
};

// Define your routes data
const routes = [
    {
        id: 1,
        containerId: "employeeDashboard",
        baseUrl: "/account/dashboard",
        contextProvider: dashboardContextProviders[user?.role_id] || null,
        pageComponent: renderEmployeeDashboardById(),
    },
    {
        id: 2,
        containerId: "employeeDashboard",
        baseUrl: "/account/dashboard-pm-performance",
        contextProvider: null,
        pageComponent: <PMDashboard />,
    },
    {
        id: 3,
        containerId: "leadAdminDashboard",
        baseUrl: "/account/dashboard-lead-dev-performance",
        contextProvider: LeadDeveloperProvider,
        pageComponent: <LeadDeveloperDashboard />,
    },
    {
        id: 4,
        containerId: "devAdminDashboard",
        baseUrl: "/account/dashboard-developer-performance",
        contextProvider: DeveloperDashboardProvider,
        pageComponent: <DeveloperDashboard />,
    },
    {
        id: 5,
        containerId: "salesAdminDashboard",
        baseUrl: "/account/dashboard-sales-performance",
        contextProvider: SaleExecutiveAdminDashboardProvider,
        pageComponent: <SalesExecutiveDashboard />,
    },
];

// Render your routes
const renderRoutes = () => {
    const filterRoutes =
        user?.role_id === 1
            ? routes.filter((route) =>
                  window?.location?.pathname?.includes(
                      route.baseUrl.split("/")[2]
                  )
              )
            : routes.slice(0, 1);

    filterRoutes.forEach((route) => {
        const container = document.getElementById(route.containerId);
        if (!container) return;

        const ContextProvider = route.contextProvider || React.Fragment;
        ReactDOM.createRoot(container).render(
            <React.StrictMode key={route.id}>
                <ErrorBoundary>
                    <Provider store={store}>
                        <ContextProvider>
                            <DndProvider backend={HTML5Backend}>
                                <BrowserRouter basename={route.baseUrl}>
                                    <Routes>
                                        <Route path="/" element={<Content />}>
                                            <Route
                                                path={
                                                    route.id === 1 ? "" : ":id"
                                                }
                                                element={route.pageComponent}
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
    });
};

// Call the renderRoutes function
renderRoutes();
