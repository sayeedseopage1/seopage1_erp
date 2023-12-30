import * as React from "react";
import ReactDOM from "react-dom/client";
import { DndProvider, useDragLayer } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../services/store";

import Leads from "./pages/Leads";
import Toaster from "../../../global/Toaster";

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

const container = document.getElementById("dmLeadTableContainer");
if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <Provider store={store}>
                <DndProvider backend={HTML5Backend}>
                    <BrowserRouter basename="/account/digital-marketing-lead">
                        <Routes>
                            <Route path="/" element={<Content />}>
                                <Route index element={<Leads />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </DndProvider>
            </Provider>
        </React.StrictMode>
    );
}
