import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "../services/store";
import TaskReport from "../pages/task-report";
import { User } from "../utils/user-details";
import _ from "lodash";
import ERROR from "../pages/error";

const container = document.getElementById("task-report-container");

const loggedUser = new User(window.Laravel.user);
// _.includes([1,5,6,8], loggedUser.getRoleId())
// console.log(_.includes([1,5,6,8], loggedUser.getRoleId()));

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter basename='/account/task-report-issues'>
                    <DndProvider backend={HTML5Backend}>
                        <Routes>
                            <Route index element={
                                _.includes([1,5,6,8,9,10], loggedUser.getRoleId())?
                                <TaskReport />:
                                <ERROR status_code={403} error_mssg={'Permission Denied'}/>
                                }/>
                        </Routes>
                    </DndProvider>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}
