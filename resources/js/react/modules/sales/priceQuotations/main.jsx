import React from "react";
import ReactDOM from "react-dom/client";
import { DndProvider, useDragLayer } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";

// Style
import "./priceQuotation.css";

// Redux store
import { store } from "../../../services/store";

// Toaster component
import Toaster from "../../../global/Toaster";

// Pages
import PriceQuotations from "./pages/PriceQuotations";
import AccountLists from "./pages/AccountLists";

// Context
import PriceQuotationsProvider from "./context/PriceQuotationsProvider";
import DealStagePriceQuotations from "./pages/DealStagePriceQuotations";

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

// Define your routes data
const routes = [
    {
        id: 1,
        containerId: "priceQuotationContentContainer",
        baseUrl: "/account/all-price-quotations",
        contextProvider: PriceQuotationsProvider,
        pageComponent: <PriceQuotations />,
    },
    {
        id: 2,
        containerId: "platformAccountContainer",
        baseUrl: "/account/all-platform-accounts",
        contextProvider: React.Fragment,
        pageComponent: <AccountLists />,
    },
    {
        id: 3,
        containerId: "priceQuotationForm",
        baseUrl: "/account/deals",
        contextProvider: PriceQuotationsProvider,
        pageComponent: <DealStagePriceQuotations />,
    },
];

// Render your routes
const renderRoutes = () => {
    return routes.map((route) => {
        const container = document.getElementById(route.containerId);
        if (container) {
            ReactDOM.createRoot(container).render(
                <React.StrictMode key={route.id}>
                    <Provider store={store}>
                        <route.contextProvider>
                            <DndProvider backend={HTML5Backend}>
                                <BrowserRouter basename={route?.baseUrl}>
                                    <Routes>
                                        <Route
                                            path="/"
                                            element={<Content />}
                                            key={route.id}
                                        >
                                            <Route
                                                path={
                                                    route.id === 3
                                                        ? "/:dealId"
                                                        : "/"
                                                }
                                                element={route.pageComponent}
                                                key={route.id}
                                            />
                                        </Route>
                                    </Routes>
                                </BrowserRouter>
                            </DndProvider>
                        </route.contextProvider>
                    </Provider>
                </React.StrictMode>
            );
        }
        return null;
    });
};

// Call the renderRoutes function
renderRoutes();
