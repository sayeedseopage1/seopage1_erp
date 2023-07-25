import React from 'react'
import ReactDOM from 'react-dom/client'
import Incentives from './Incentives'


const container = document.getElementById("incentivesPageContainer");

if(container){
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <Incentives />
    </React.StrictMode>
  )
}