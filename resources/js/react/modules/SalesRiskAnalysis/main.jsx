import * as React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

// Ui components
import Toaster from "../../global/Toaster";
// redux store
import { store } from "../../services/store";
// components
import SalesRiskAnalysis from "./Pages/SalesRiskAnalysis";



const Content = () => {
  return (
      <React.Fragment>
          <Outlet />
          <Toaster />
      </React.Fragment>
  );
};

const container = document.getElementById("salesRiskPolicies");
if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <Provider store={store}>
                  <BrowserRouter basename="/account/sales-risk-policies">
                      <Routes>
                        <Route path="/" element={<Content />}>
                          <Route index element={<SalesRiskAnalysis />} />
                        </Route>
                      </Routes>
                  </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}