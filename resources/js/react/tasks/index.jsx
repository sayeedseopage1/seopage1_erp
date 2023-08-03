import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './tasks.css';
import './table.css';
import { DndProvider, useDragLayer } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from '../services/store';
import Loading from './components/Loading';
import Tasks from './pages/tasks';
import { useMouse } from 'react-use';
// const SingleTask = React.lazy(() => import('../single-task/SingleTask'));
const Subtasks = React.lazy(() => import('./pages/Subtasks'));

const container = document.getElementById("tasksTableContainer");



// custom drag layer 
const DragLayer = () => {
  const { item, itemType, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getClientOffset(),
  }));
 
  if (!currentOffset) {
    return null;
  }  
  return (
    <div 
      style={{ 
        position: 'fixed', 
        pointerEvents: 'none', 
        zIndex: 100, 
        left: currentOffset.x, 
        top: currentOffset.y, 
      }}>
      {/* Render your custom preview here based on the dragged item */} 
      {itemType === 'column' && 
        <div  className='py-2 px-2 pl-3 bg-white shadow border' style={{width: item.columnDef.size}}>
          {item.columnDef.header} 
        </div>
      }
    </div>
  );
}

const Container = () => {
  return(
    <React.Fragment>
      <DragLayer />
      <Outlet />
    </React.Fragment>
  )
}

const SubtasksContainer = () => {
  return(
    <React.Fragment>
      <React.Suspense fallback={<Loading />}>
        <Subtasks />
      </React.Suspense>
    </React.Fragment>
  )
}


// // sub task
// const Task = () => {
//   return(
//       <React.Suspense fallback={<Loading />}>
//         <SingleTask />
//       </React.Suspense>
//   )
// }


if(container){
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
     <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter basename='/account/tasks'>
            <Routes>
                <Route path='/' element={<Container />}>
                  <Route index element={<Tasks />} /> 
                  <Route path='/subtasks' element ={<SubtasksContainer />} />
                  <Route path='/my-tasks' element ={<h1>My Tasks</h1>} /> 
                </Route>
            </Routes>
        </BrowserRouter> 
      </DndProvider>
     </Provider>
    </React.StrictMode>
  )
}