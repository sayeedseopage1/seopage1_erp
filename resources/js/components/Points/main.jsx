import React from 'react'
import ReactDOM from 'react-dom/client'
import PointsPage from './PointsPage'



const container = document.getElementById("pointPageContainer");

if(container){
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <PointsPage />
    </React.StrictMode>
  )
}