import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../services/store";
import Toaster from "../../../global/Toaster";
import Incentive from "./pages/Incentive";
import './styles/Incentive.css';
import './styles/heldAmount.css'
import './styles/incentiveFactors.css'
import './styles/Incentive.responsive.css'
import { ConfigProvider } from "antd";
import IncentiveDataProvider from "./Provider/IncentiveDataProvider";

const Content = () => {
    return (
        <React.Fragment>
            <Outlet />
            <Toaster />
        </React.Fragment>
    );
};

const container = document.getElementById("projectMangerIncentive");
if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>

            <Provider store={store}>
                <IncentiveDataProvider>
                    <ConfigProvider
                        theme={{
                            components: {
                                Modal: {
                                    titleFontSize: 20,
                                    borderRadiusLG: 22,
                                },
                            },

                        }}
                    >
                        <BrowserRouter basename="/account/pm-incentives">
                            <Routes>
                                <Route path="/" element={<Content />}>
                                    <Route index element={<Incentive />} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </ConfigProvider>
                </IncentiveDataProvider>
            </Provider>

        </React.StrictMode>
    );
}