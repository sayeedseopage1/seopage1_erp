import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "../services/store";
import RequiredActions from "../pages/required-action";

const container = document.getElementById("required-actions-container");

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter basename="/account/settings/pending-action">
                    <DndProvider backend={HTML5Backend}>
                        <Routes>
                            <Route path="/" element={<RequiredActions />} />
                        </Routes>
                    </DndProvider>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}
