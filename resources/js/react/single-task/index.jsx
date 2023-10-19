import React from "react";
import ReactDOM from "react-dom/client";
// import SingleTask from './SingleTask';
import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../services/store";
import Loading from "./components/Loading";

import { DndProvider, useDragLayer } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ErrorContextProvider from "../context/ErrorHandleServiceContextProvider";

const SingleTask = React.lazy(() => import("./SingleTask"));
const container = document.getElementById("sp1SingleTaskPage");

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <DndProvider backend={HTML5Backend}>
                <Provider store={store}>
                    <ErrorContextProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route
                                    path="/account/tasks/:taskId"
                                    element={
                                        <React.Suspense fallback={<Loading />}>
                                            <SingleTask />
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
