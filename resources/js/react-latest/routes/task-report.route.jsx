import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "../services/store";
import TaskReport from "../pages/task-report";

const container = document.getElementById("task-report-container");

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter basename="/account/task-report-issues">
                    <DndProvider backend={HTML5Backend}>
                        <Routes>
                            <Route index element={<TaskReport />}/>
                        </Routes>
                    </DndProvider>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}
