import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from '../services/store';
import RevisionCalculator from './RevisionCalculator';

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import ProjectElaboration from './ProjectElaboration';
import NumberOfTask from './NumberOfTask';
import NumberOfRevision from './NumberOfRevision';
import SalesIssuesTable from './SalesIssuesTable';
import ClientIssuesTable from './ClientIssuesTable';
import PMIssuesTable from './PMIssuesTable';
import LeadDevIssue from './LedDevIssues';
import DevIssuesTable from './DevIssues';
import TotalDisputeTable from './TotalDisputeTable';
import TotalUnsolvedDisputeTable from './TotalUnsolvedDisputeTable';
import PendingRevisionTable from './PendingRevisions/PendingRevisions';
 
const container = document.getElementById("revisionCalculator");

if(container){
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
     <Provider store={store}>
      <BrowserRouter basename='/account/revision-calculator'>
        <DndProvider backend={HTML5Backend} >
          <Routes>
              <Route path='/' element={ <RevisionCalculator /> } > 
                <Route path='project-elaboration' element={<ProjectElaboration />} />
                <Route path="number-of-project-table" element={<NumberOfTask />} />
                <Route path="number-of-revision-table" element={<NumberOfRevision />} />
                <Route path="sales-issues-table" element={<SalesIssuesTable />} />
                <Route path="client-issues-table" element={<ClientIssuesTable />} />
                <Route path="project-manager-issues-table" element={<PMIssuesTable />} />
                <Route path="lead-developer-issues-table" element={<LeadDevIssue />} />
                <Route path="developer-issues-table" element={<DevIssuesTable />} />
                <Route path="total-dispute-table" element= {<TotalDisputeTable />} />
                <Route path="total-unsolved-dispute-table" element= {<TotalUnsolvedDisputeTable />} />
                <Route path="pending-revisions" element= {<PendingRevisionTable />} />
              </Route>
          </Routes>
        </DndProvider>
      </BrowserRouter> 
     </Provider>
    </React.StrictMode>
  )
}