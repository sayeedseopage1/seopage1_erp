import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../services/store";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { DndProvider, useDragLayer } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import IndependentTask from "../pages/independent-task";
import '../components/independent-task-page/tasks/table.css';
import '../components/independent-task-page/tasks/tasks.css';


const container = document.getElementById("independent-task-container");

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
                <div className='py-2 px-2 pl-3 bg-white shadow border' style={{ width: item.columnDef.size }}>
                    {item.columnDef.header}
                </div>
            }
        </div>
    );
}

const Container = () => {
    return (
        <React.Fragment>
            <DragLayer />
            <Outlet />
        </React.Fragment>
    )
}

// const loggedUser = new User(window.Laravel.user);
// _.includes([1,5,6,8,9,10], loggedUser.getRoleId());
// console.log(_.includes([1,5,6,8], loggedUser.getRoleId()));
// <ERROR status_code={403} error_mssg={'Permission Denied'}/>

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter basename='/account/independent-task'>
                    <DndProvider backend={HTML5Backend}>
                        <Routes>
                            <Route path='/' element={<Container />}>
                                <Route index element={<IndependentTask />} />
                            </Route>
                        </Routes>
                    </DndProvider>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}
