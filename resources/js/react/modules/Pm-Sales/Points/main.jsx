import ReactDOM from "react-dom/client";
import React from 'react';
import './styles/daterangepicker.css';
import "../../../Insights/insights.css";
import './styles/points-page.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { store } from '../../../services/store';
import { useUsers } from '../../../hooks/useUsers';
import PmCashPoints from './pages/PmCashPoints';


const Content = () => {
    const { usersIsFetching } = useUsers();
    if (usersIsFetching) {
        <div style={{ display: 'flex', alignItems: 'center', "justifyContent": 'center', width: "100%", height: '100vh' }}>
            <div>Loading...</div>
        </div>
    } else {
        return <Outlet />
    };
}
// TODO: 
const container = document.getElementById("projectMangerPointsContainer");

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <DndProvider backend={HTML5Backend}>
                <Provider store={store}>
                    <BrowserRouter basename="/account/project-manager-points">
                        <Routes>
                            <Route path='/' element={<Content />}>
                                <Route index element={<PmCashPoints />} />
                                {/* <Route index element={<h2>Hello</h2>} /> */}
                                {/* <Route path='non-cash-points' element={<NonCashPoint />}>
                                <Route index element={<Navigate to='/non-cash-points/history' />} />
                                <Route path="history" element={<NonCashPointHistory />} />
                                <Route path="earn-non-cash-points" element={<NonCashPointEarn />} />
                            </Route>
                            <Route path='redeem-points' element={<RedeemPoints />}>
                                <Route index element={<Navigate to='/redeem-points/point-shop' />} />
                                <Route path="point-shop" element={<RedeemPointShop />} />
                                <Route path="history" element={<RedeemHistory />} />
                            </Route> */}
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </DndProvider>
        </React.StrictMode>
    );
}
