import React from 'react'
import ReactDOM from 'react-dom/client'
import QualifiedSales from './QualifiedSales';
import './qualified-sales.css';
import QualifiedSalesContextProvider from './context';
import { DndProvider } from 'react-dnd'; 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { store } from '../services/store';
import { BrowserRouter } from 'react-router-dom';


const container = document.getElementById("qualifiedSales");

if(container){
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
     <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
            <QualifiedSalesContextProvider>
              <BrowserRouter>
                <QualifiedSales />
              </BrowserRouter> 
          </QualifiedSalesContextProvider> 
        </DndProvider>
      </Provider> 
    </React.StrictMode>
  )
}