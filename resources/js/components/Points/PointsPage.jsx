import './daterangepicker.css';
import "../Insights/insights.css";
import './points-page.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../services/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import CashPoints from './pages/CashPoints';
import NonCashPoint from './pages/NonCashPoints';
import NonCashPointHistory from './pages/NonCashPointHistory';
import PointPageFilterBar from "./components/FilterBar";
import PointPageNavbar from "./components/Navbar";
import { useUsers } from '../hooks/useUsers';
import NonCashPointEarn from './pages/NonCashPointEarn';
import RedeemPoints from './pages/RedeemPoints';
import RedeemPointShop from './pages/RedeemPointShop';
import RedeemHistory from './pages/RedeemHistory';


const PointsPageContainer = () => {
    const { usersIsFetching } = useUsers();
    if(usersIsFetching){
        <div style={{ display: 'flex', alignItems: 'center', "justifyContent": 'center', width: "100%", height: '100vh' }}>
                <div>Loading...</div>
            </div>
    }else {
        return <Outlet />
    };
}



const PointsPage = () => {
    return (
        <DndProvider backend={HTML5Backend}>
          <Provider store={store}>
            <BrowserRouter basename="/account/points">
                <Routes>
                    <Route path='/' element={<PointsPageContainer />}>
                        <Route index element={<CashPoints />} />
                        <Route path='non-cash-points' element={<NonCashPoint />}>
                            <Route index element={ <Navigate to='/non-cash-points/history' /> } />
                            <Route path="history" element={<NonCashPointHistory />} />
                            <Route path="earn-non-cash-points" element={<NonCashPointEarn />} />
                        </Route>
                        <Route path='redeem-points' element={<RedeemPoints />}>
                            <Route index element={ <Navigate to='/redeem-points/point-shop' /> } />
                            <Route path="point-shop" element={<RedeemPointShop />} />
                            <Route path="history" element={<RedeemHistory />} />
                        </Route> 
                    </Route>
                </Routes>
            </BrowserRouter>
          </Provider>
        </DndProvider>
    )
}


export default PointsPage;
