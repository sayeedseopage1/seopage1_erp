import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import FreelancerProjectDetails from "./pages/freelancerProjectDetails/FreelancerProjectDetails";
import Toaster from "../../global/Toaster";
import { store } from "../../services/store";
import './index.css';
import FreelancerMessage from "./pages/message/FreelancerMessage";
import FreelancerProjects from "./pages/freelancerProjects/FreelancerProjects";
import ListOfMileStones from "./pages/listOfMilestones/ListOfMileStones";

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
        rootId: 'marketplaceMessage',
        path: 'marketeplace-message',
        element: <FreelancerMessage />,
        contextProvider: React.Fragment
    },
    {
        id: 2,
        rootId: 'marketplaceProjects',
        path: 'marketeplace-projects',
        element: <FreelancerProjects />,
        contextProvider: React.Fragment
    },
    {
        id: 3,
        rootId: 'marketplaceProjectDetails',
        path: 'marketeplace-project-details',
        element: <FreelancerProjectDetails />,
        contextProvider: React.Fragment
    },
    {
        id: 4,
        rootId: 'marketplaceBidInsights',
        path: 'marketeplace-bid-insights',
        element: <h2>Marketplace Bid Insights</h2>,
        contextProvider: React.Fragment
    },
    {
        id: 5,
        rootId: 'marketplaceMilestones',
        path: 'marketeplace-milestones',
        element: <ListOfMileStones />,
        contextProvider: React.Fragment
    },
    {
        id: 6,
        rootId: 'marketplaceProfile',
        path: 'marketeplace-profile',
        element: <h2>Marketplace Profile</h2>,
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