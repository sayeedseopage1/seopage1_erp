import React from 'react';
import ReactDOM from 'react-dom/client';
import TimeLogTable from "./TimeLogTable";
import { Provider } from 'react-redux';
import {store} from '../services/store';
import './styles/time-log-table.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import EmployeeWiseTimeLogTable from './pages/EmployeeWiseTimeLogTable';



// get time log table container
const timeLogTableContainer = document.getElementById("timeLogTable");

// if container exist, render time log table
if (timeLogTableContainer) {
    const root = ReactDOM.createRoot(timeLogTableContainer);
    root.render(
        <React.StrictMode>
            <Provider store={store}>    
                <BrowserRouter basename='/account/time-log-report'>
                    <Routes>
                        <Route path="/" element={<TimeLogTable />} >
                            <Route index element={<Navigate to="employee-wise" replace />} />
                            <Route path='/employee-wise' element={<EmployeeWiseTimeLogTable />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}
