import './daterangepicker.css';
import "../Insights/insights.css";
import './points-page.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CashPoints from './pages/CashPoints';
import NonCashPoint from './pages/NonCashPoints';
import NonCashPointHistory from './pages/NonCashPointHistory';
import PointPageFilterBar from "./components/FilterBar";
import PointPageNavbar from "./components/Navbar";


const PointsPageContainer = () => {
    return(
        <div className='sp1_point_page'>
            <PointPageFilterBar />
            
            <div className='sp1_point_page_container'>
            <PointPageNavbar />
                <main className='sp1_point_page_main'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}



const PointsPage = () => {
    return (
        <DndProvider backend={HTML5Backend}>
          <BrowserRouter basename="/account/points">
              <Routes>
                  <Route path='/' element={<PointsPageContainer />}>
                     <Route index element={<CashPoints />} />
                     <Route path='non-cash-points' element={<NonCashPoint />}>
                        <Route index element={ <Navigate to='/non-cash-points/history' /> } />
                        <Route path="history" element={<NonCashPointHistory />} />
                        <Route path="earn-non-cash-points" element={<div>Earn non-cash points</div>} />
                     </Route>
                      <Route path='redeem-points' element={<div>Redeem points</div>} />
                     
                  </Route>
              </Routes>
          </BrowserRouter>
        </DndProvider>
    )
}


export default PointsPage;
