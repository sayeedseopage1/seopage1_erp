import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../services/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import IndependentTask from "../pages/independent-task";


const container = document.getElementById("independent-task-container");

// const loggedUser = new User(window.Laravel.user);
// _.includes([1,5,6,8,9,10], loggedUser.getRoleId());
// console.log(_.includes([1,5,6,8], loggedUser.getRoleId()));
// <ERROR status_code={403} error_mssg={'Permission Denied'}/>

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter basename='/account/independent-task'>
                    <DndProvider backend={HTML5Backend}>
                        <Routes>
                            <Route index element={<IndependentTask/>}/>
                        </Routes>
                    </DndProvider>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}
