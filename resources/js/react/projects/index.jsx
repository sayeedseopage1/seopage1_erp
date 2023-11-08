import React from 'react';
import { DndProvider, useDragLayer } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from '../services/store';
import '../tasks/table.css';
import '../tasks/tasks.css';
import './project.css';
import ProjectTasks from './pages/ProjectTasksTable';
import Toaster from '../global/Toaster';


const Subtasks = React.lazy(() => import('../tasks/pages/Subtasks'))

const container = document.getElementById("projectTasksTableContainer");



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
        zIndex: 999999,
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

const Container = ({children}) => {
  return(
    <React.Fragment>
      <Toaster />
      <DragLayer />
      <ProjectTasks />
    </React.Fragment>
  )
}

// const SubtasksContainer = () => {
//   return(
//     <React.Fragment>
//       <React.Suspense fallback={<>Loading...</>}>
//         <Subtasks />
//       </React.Suspense>
//     </React.Fragment>
//   )
// }

if(container){
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
     <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter basename='/account/projects'>
            <Routes>
                <Route path='/:projectId' element={<Container />} />
            </Routes>
        </BrowserRouter>
      </DndProvider>
     </Provider>
    </React.StrictMode>
  )
}
