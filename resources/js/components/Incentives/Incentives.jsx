import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from '../services/store';
import IncentiveCurrent from './pages/IncentiveCurrent';


const IncentiveContainer  = () => {

    return <Outlet />;
}


const Incentives = () => {
    return (
        <DndProvider backend={HTML5Backend}>
          <Provider store={store}>
          <BrowserRouter basename="/account/incentives">
              <Routes>
                  <Route path='/' element={<IncentiveContainer/>}>
                    <Route index element={<Navigate to="/current/monthly"  />} />
                    <Route path='/current/:period' element={<IncentiveCurrent />} />
                  </Route> 
              </Routes>
          </BrowserRouter> 
          </Provider>
        </DndProvider>
    )
}


export default Incentives;