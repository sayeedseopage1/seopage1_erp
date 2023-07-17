import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PendingAction from './PendingAction';
import ActivePendingActions from './pages/ActivePendingActions';
import './pending-action.css';


const container = document.getElementById("pendingAction");

if(container){
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
       <BrowserRouter basename="/account/settings/pending-action">
          <Routes>
            <Route path="/" element={<PendingAction />}>
              <Route index element={<Navigate to="active" replace />} />
              <Route path="active" element={<ActivePendingActions/>} />
              <Route path="past" element={<h3>Past</h3>} />
            </Route>
          </Routes> 
       </BrowserRouter> 
    </React.StrictMode>
  )
}