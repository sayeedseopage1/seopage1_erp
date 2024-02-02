import React from "react";
import { DndProvider, useDragLayer } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { store } from "../services/store";
// import Toaster from "../global/Toaster";
import ProjectStatus from "./pages/ProjectStatus";

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

const Container = () => {
    return (
        <React.Fragment>
            {/* <Toaster /> */}
            <DragLayer />
            <Outlet />
        </React.Fragment>
    );
};

const container = document.getElementById("projectStatusTableContainer");

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <Provider store={store}>
                <DndProvider backend={HTML5Backend}>
                    <BrowserRouter basename="/account/project-status">
                        <Routes>
                            <Route path="/" element={<Container />}>
                                <Route index element={<ProjectStatus />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </DndProvider>
            </Provider>
        </React.StrictMode>
    );
}

// http://127.0.0.1:8000/account/get-project-status-date

// http://127.0.0.1:8000/account/project-status
