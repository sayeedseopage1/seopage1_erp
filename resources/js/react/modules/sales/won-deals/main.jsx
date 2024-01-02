import * as React from "react";
import ReactDOM from "react-dom/client";
import { DndProvider, useDragLayer } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../services/store";

import Deals from "./pages/Deals";
import Toaster from "../../../global/Toaster";
import DealContextProvider from "./components/context/DealContext";

// custom drag layer
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

const Content = () => {
    return (
        <React.Fragment>
            <DragLayer />
                <Outlet />
            <Toaster />
        </React.Fragment>
    );
};

// filter container 
// id: dealTableFilterBarContainer

const container = document.getElementById("wonDealTableContainer");
if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <Provider store={store}>
                <DndProvider backend={HTML5Backend}>
                    <DealContextProvider>
                        <BrowserRouter basename="/account/contracts">
                            <Routes>
                                <Route path="/" element={<Content />}>
                                <Route index element={<Deals />} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </DealContextProvider> 
                </DndProvider>
            </Provider>
        </React.StrictMode>
    );
}
