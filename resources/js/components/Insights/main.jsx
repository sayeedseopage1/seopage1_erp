import React from 'react'
import ReactDOM from 'react-dom/client'
import Insights from './Insights'

const container = document.getElementById("insights-container");



if(container){
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <Insights />
    </React.StrictMode>
  )
}