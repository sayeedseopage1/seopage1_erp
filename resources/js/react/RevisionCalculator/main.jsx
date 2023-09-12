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
              </Route>
          </Routes>
        </DndProvider>
      </BrowserRouter> 
     </Provider>
    </React.StrictMode>
  )
}