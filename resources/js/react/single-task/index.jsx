import React from 'react'
import ReactDOM from 'react-dom/client'
import SingleTask from './SingleTask';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from '../services/store';

const container = document.getElementById("sp1SingleTaskPage");

if(container){
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
     <Provider store={store}>
      <BrowserRouter>
          <Routes>
              <Route path="/account/tasks/:taskId" element={<SingleTask />} />
          </Routes>
      </BrowserRouter> 
     </Provider>
    </React.StrictMode>
  )
}