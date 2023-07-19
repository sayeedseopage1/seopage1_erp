import React from 'react';
import ReactDOM from 'react-dom/client';
import TimeLogTable from "./TimeLogTable";
import { Provider } from 'react-redux';
import {store} from '../services/store';
import './styles/time-log-table.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import EmployeeWiseTimeLogTable from './pages/EmployeeWiseTimeLogTable';
import TimeLogHistory from './pages/TimeLogHistory';
import ProjectWiseTimeLog from './pages/ProjectWiseTimeLog';
import TaskWiseLogReport from './pages/TaskWiseTable';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



// get time log table container
const timeLogTableContainer = document.getElementById("timeLogTable");

// if container exist, render time log table
if (timeLogTableContainer) {
    const root = ReactDOM.createRoot(timeLogTableContainer);
    root.render(
        <React.StrictMode>
            <Provider store={store}>    
                <DndProvider backend={HTML5Backend}>
                    <BrowserRouter basename='/account/time-log-report'>
                        <Routes>
                            <Route path="/" element={<TimeLogTable />} >
                                <Route index element={<Navigate to="employee-wise" replace />} />
                                <Route path='/employee-wise' element={<EmployeeWiseTimeLogTable />} />
                                <Route path='/project-wise' element={<ProjectWiseTimeLog />} />
                                <Route path='/task-wise' element={<TaskWiseLogReport />} />
                                <Route path='/time-log-history' element={<TimeLogHistory />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </DndProvider>
            </Provider>
        </React.StrictMode>
    );
}
