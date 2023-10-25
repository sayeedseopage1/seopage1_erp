import React, {lazy} from 'react';
import ReactDOM from 'react-dom/client';
import TimeLogTable from "./TimeLogTable";
import { Provider } from 'react-redux';
import {store} from '../services/store';
import './styles/time-log-table.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import EmployeeWiseTimeLogTable from './pages/EmployeeWiseTimeLogTable';

// import TimeLogHistory from './pages/TimeLogHistory';
// import ProjectWiseTimeLog from './pages/ProjectWiseTimeLog';
// import TaskWiseLogReport from './pages/TaskWiseTable';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ContextProvider from './context/ContextProvider';
import PageLoader from './components/PageLoader';
import DailySubmission_Page from './pages/DailySubmission_Page';

const EmployeeWiseTimeLogTable = lazy(() => import('./pages/EmployeeWiseTimeLogTable'));
const ProjectWiseTimeLog = lazy(() => import('./pages/ProjectWiseTimeLog'));
const TaskWiseLogReport = lazy(() => import('./pages/TaskWiseTable'));
const TimeLogHistory = lazy(() => import('./pages/TimeLogHistory'));
// get time log table container
const timeLogTableContainer = document.getElementById("timeLogTable");

// if container exist, render time log table
if (timeLogTableContainer) {
    const root = ReactDOM.createRoot(timeLogTableContainer);
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <DndProvider backend={HTML5Backend}>
                   <ContextProvider>
                        <BrowserRouter basename='/account/time-log-report'>
                            <Routes>
                                <Route path="/" element={<TimeLogTable />} >
                                    <Route index element={<Navigate to="task-wise" replace />} />
                                    <Route path='/employee-wise' element={
                                            <React.Suspense fallback={<PageLoader />}>
                                                <EmployeeWiseTimeLogTable />
                                            </React.Suspense>
                                        }
                                    />
                                    <Route path='/project-wise' element={
                                        <React.Suspense fallback={<PageLoader />}>
                                            <ProjectWiseTimeLog />
                                        </React.Suspense>
                                    } />
                                    <Route path='/task-wise' element={
                                        <React.Suspense fallback={<PageLoader />}>
                                            <TaskWiseLogReport />
                                        </React.Suspense>
                                    } />
                                    <Route path='/time-log-history' element={
                                        <React.Suspense fallback={<PageLoader />}>
                                            <TimeLogHistory />
                                        </React.Suspense>
                                    } />
                                    <Route path="/daily-submission" element={
                                        <React.Suspense fallback={<PageLoader />}>
                                            <DailySubmission_Page />
                                        </React.Suspense>
                                    } />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </ContextProvider>
                </DndProvider>
            </Provider>
        </React.StrictMode>
    );
}
