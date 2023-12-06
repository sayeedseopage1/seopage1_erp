import React, { useContext } from "react";
import { DndProvider, useDragLayer } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { store } from "../services/store";
import Loading from "./components/Loading";
import IndependentTaskProvider, { useIndependentTask } from "./context/IndependentTaskProvider";
import Tasks from "./pages/Tasks";
import "./table.css";
import "./tasks.css";
// const SingleTask = React.lazy(() => import('../single-task/SingleTask'));
// const Subtasks = React.lazy(() => import("./pages/Subtasks"));

const container = document.getElementById("independent-task-container");

import _ from "lodash";
import { createContext, useCallback, useEffect, useState } from "react";
import Toaster from "../global/Toaster";
import { useLazyGetIndependentTaskQuery } from "../services/api/independentTaskApiSlice";
import { User } from "../utils/user-details";
import Subtasks from "./pages/Subtasks";

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
                position: "fixed",
                pointerEvents: "none",
                zIndex: 999999,
                left: currentOffset.x,
                top: currentOffset.y,
            }}
        >
            {/* Render your custom preview here based on the dragged item */}
            {itemType === "column" && (
                <div
                    className="py-2 px-2 pl-3 bg-white shadow border"
                    style={{ width: item.columnDef.size }}
                >
                    {item.columnDef.header}
                </div>
            )}
        </div>
    );
};

const Container = () => {
    return (
        <React.Fragment>
            <DragLayer />
            <Outlet />
            <Toaster />
        </React.Fragment>
    );
};

const SubtasksContainer = () => {
    return (
        <React.Fragment>
            <React.Suspense fallback={<Loading />}>
                <Subtasks />
            </React.Suspense>
        </React.Fragment>
    );
};

// // sub task
// const Task = () => {
//   return(
//       <React.Suspense fallback={<Loading />}>
//         <SingleTask />
//       </React.Suspense>
//   )
// }



export const RefreshContext = createContext({});
export function useRefresh(){
    const { refreshState,refresh, handleRefresh } = useContext(RefreshContext);
    return { refreshState,refresh, handleRefresh };
}

const IndependentTask = () => {
    const [refresh, setRefresh] = useState(false);
    const [filter, setFilter] = useState(null);
    const { tableData, setTableData } = useIndependentTask();
    // console.log(data);
    // const { data: tasks } = useGetIndependentTaskQuery();
    const [getIndependentTask, { isFetching, isLoading, }] = useLazyGetIndependentTaskQuery();

    // user and auth
    const user = new User(window.Laravel.user);
    const auth = _.includes([1, 8], user.getRoleId());

    const filteredData = (data=[])=>{
      const newData = data.filter((d)=>{
        return d.assigned_by_id === user.id || d.assigned_to_id === user.id;
      })

      return newData;
    }


    // fetching data against dependencies
    useEffect(() => {
        if (filter) {
            getIndependentTask(filter)
                .unwrap()
                .then(({ data, status }) => {
                    // console.log({status,data});
                    if (Number(status) === 200) {
                        if (auth) {
                            setTableData(data);
                        }else{
                            setTableData(filteredData(data))
                        }
                    } else {
                        setTableData([]);
                    }
                })
        }
    }, [filter, refresh])



    // console.log({ filter, refresh, isLoading, isFetching, tableData });

    // handle filter
    const onFilter = (filter) => {
        const queryObject = _.pickBy(filter, Boolean);
        const queryString = new URLSearchParams(queryObject).toString();
        if (queryString) {
            setFilter(queryString);
        }
    }

    //   return (
    //
    //         {/* <IndependentTaskDataTable tableData={tableData} isLoading={isLoading || isFetching} onFilter={onFilter} filter={filter} /> */}
    //         <Tasks tableData={tableData} isLoading={isLoading || isFetching} onFilter={onFilter} filter={filter} />
    //     </RefreshContext.Provider>
    //   );

    const handleRefresh = useCallback(()=>{
      setRefresh(prev=>!prev);
    },[setRefresh]) ;

    return (
            <RefreshContext.Provider value={{ refreshState:refresh,refresh:isLoading||isFetching, handleRefresh }}>
                <BrowserRouter basename="/account/independent">
                    <Routes>
                        <Route path="/" element={<Container />}>
                            <Route
                                path="/tasks"
                                element={
                                    <Tasks
                                        tableData={tableData}
                                        isLoading={isLoading || isFetching}
                                        onFilter={onFilter}
                                        filter={filter}
                                    />
                                }
                            />

                            <Route
                                path="/subtasks"
                                element={
                                    <Subtasks
                                        tableData={tableData}
                                        isLoading={isLoading || isFetching}
                                        onFilter={onFilter}
                                        filter={filter}
                                    />
                                }
                            />

                            <Route
                                path="/my-tasks"
                                element={
                                    <Subtasks
                                        tableData={tableData}
                                        isLoading={isLoading || isFetching}
                                        onFilter={onFilter}
                                        filter={filter}
                                    />
                                }
                            />


                            {/* <Route
                                path="/subtasks"
                                element={<SubtasksContainer />}
                            />
                            <Route
                                path="/my-tasks"
                                element={<SubtasksContainer />}
                            /> */}
                        </Route>
                    </Routes>
                </BrowserRouter>
            </RefreshContext.Provider>
    )
};



if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <Provider store={store}>
                <DndProvider backend={HTML5Backend}>
                    <IndependentTaskProvider>
                        <IndependentTask />
                    </IndependentTaskProvider>
                </DndProvider>
            </Provider>
        </React.StrictMode>
    );
}

