import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../services/store';

import Leads from './pages/Leads';


const container = document.getElementById("leadTableContainer");
if(container){
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
     <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter basename='/account/leads'>
            <Routes>
              <Route index element={<Leads />} />
            </Routes>
        </BrowserRouter>
      </DndProvider>
     </Provider>
    </React.StrictMode>
  )
}
