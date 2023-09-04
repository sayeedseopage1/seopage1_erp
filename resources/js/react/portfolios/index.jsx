import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { store } from '../services/store';
import Portfolio from './Portfolio';


const container = document.getElementById("portfolioPageContainer");

// custom drag layer 
if(container){
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
     <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='/account/portfolio' element={<Portfolio />} />
            </Routes>
        </BrowserRouter> 
     </Provider>
    </React.StrictMode>
  )
}