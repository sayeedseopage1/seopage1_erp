import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import FreelancerProjectDetails from "./pages/freelancerProjectDetails/FreelancerProjectDetails";
import Toaster from "../../global/Toaster";
import { store } from "../../services/store";
import './index.css';
import FreelancerMessage from "./pages/message/FreelancerMessage";

const Content = () => {
    return (
        <React.Fragment>
            <Outlet />
            <Toaster />
        </React.Fragment>
    );
};

const marketPlaceRoutes = [
    {
        id: 1,
        rootId: 'marketplaceProject',
        path: 'marketeplace-projects',
        element: <FreelancerProjectDetails />,
        contextProvider: React.Fragment
    },
    {
        id: 2,
        rootId: 'marketplaceMessage',
        path: 'marketeplace-message',
        element: <FreelancerMessage />,
        contextProvider: React.Fragment
    },
]

marketPlaceRoutes.map((route) => {
    const { rootId, path, element } = route;
    const container = document.getElementById(rootId);
    if (container) {
        ReactDOM.createRoot(container).render(
            <React.StrictMode>
                <Provider store={store}>
                    <route.contextProvider>
                        <BrowserRouter basename={`account/${path}`}>
                            <Routes>
                                <Route path="/" element={<Content />}>
                                    <Route index element={element} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </route.contextProvider>
                </Provider>
            </React.StrictMode>
        );
    }
});