import React from "react";
import ReactDOM from "react-dom/client";
// import SingleTask from './SingleTask';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../services/store";
import Loading from "./components/Loading";

import { DndProvider, useDragLayer } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ErrorContextProvider from "../context/ErrorHandleServiceContextProvider";

const SingleIndependentTask = React.lazy(() => import("./SingleIndependentTask"));
const container = document.getElementById("single-independent-task-container");

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <DndProvider backend={HTML5Backend}>
                <Provider store={store}>
                    <ErrorContextProvider>
                        <BrowserRouter basename="/account/independent-task-show">
                            <Routes>
                                <Route
                                    // path="/:taskId"
                                    index
                                    element={
                                        <React.Suspense fallback={<Loading />}>
                                            <SingleIndependentTask />
                                        </React.Suspense>
                                    }
                                />
                            </Routes>
                        </BrowserRouter>
                    </ErrorContextProvider>
                </Provider>
            </DndProvider>
        </React.StrictMode>
    );
}
