import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from '../services/store';
import IncentiveCurrent from './pages/IncentiveCurrent';
import './incentives.css'
import { useUsers } from '../hooks/useUsers';
import DisbursedAmounts from './pages/DisbursedAmounts';
import HeldAmounts from './pages/HeldAmounts';

const IncentiveContainer  = () => {  
    const { usersIsFetching } = useUsers();
    if(usersIsFetching){
        <div style={{ display: 'flex', alignItems: 'center', "justifyContent": 'center', width: "100%", height: '100vh' }}>
                <div>Loading...</div>
            </div>
    }else {
        return <Outlet />
    };
}


const Incentives = () => {
    return (
        <DndProvider backend={HTML5Backend}>
          <Provider store={store}>
          <BrowserRouter basename="/account/incentives">
              <Routes>
                  <Route path='/' element={<IncentiveContainer/>}>
                    <Route index element={<Navigate to="/current/monthly"  />} />
                    <Route path="/current" element={<Navigate to="/current/monthly"  />} /> 
                    <Route path='/current/:period' element={<IncentiveCurrent />} />
                    <Route path="/disbursed-amounts" element={<DisbursedAmounts/>} />
                    <Route path="/held-amounts" element={<HeldAmounts/>} />
                  </Route> 
              </Routes>
          </BrowserRouter> 
          </Provider>
        </DndProvider>
    )
}


export default Incentives;