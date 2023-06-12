import React from 'react'
import ReactDOM from 'react-dom/client'
import SingleTask from './SingleTask';




const container = document.getElementById("sp1SingleTaskPage");

if(container){
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
     <SingleTask /> 
    </React.StrictMode>
  )
}