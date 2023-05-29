import React from 'react'
import ReactDOM from 'react-dom/client'
import QualifiedSales from './QualifiedSales';
import './qualified-sales.css';
import QualifiedSalesContextProvider from './context';
import { DndProvider } from 'react-dnd'; 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';


const container = document.getElementById("qualifiedSales");

if(container){
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
          <QualifiedSalesContextProvider>
            <QualifiedSales />
        </QualifiedSalesContextProvider> 
      </DndProvider>
    </React.StrictMode>
  )
}