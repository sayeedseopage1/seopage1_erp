import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
// import SingleTask from './SingleTask';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { store } from "../services/store";
import Loading from "./components/Loading";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ErrorContextProvider from "../context/ErrorHandleServiceContextProvider";
// import SingleIndependentTask from "../single-independent-task/SingleIndependentTask";

const SingleIndependentTask = React.lazy(() => import("../single-independent-task/SingleIndependentTask"))
const SingleTask = React.lazy(() => import("./SingleTask"));
const container = document.getElementById("sp1SingleTaskPage");


const TaskChecker = ()=>{
    const [taskStatus, setTaskStatus] = useState('not-setted');
    const {taskId} = useParams();

    useEffect(()=>{
    //   console.log({taskId});
      fetch(`/account/check-independent-task/${taskId}`)
          .then(res=> res.json())
          .then(({is_independent})=> {
            // console.log({is_independent});
            setTaskStatus(is_independent);
        })
    },[taskId])


    if (taskStatus === 'not-setted') {
      return <Loading />;
    }


    return(
        <>
        {/* <Toaster /> */}
        <React.Suspense fallback={<Loading />}>
            {
                taskStatus===true?<SingleIndependentTask /> : <SingleTask />
            }
        </React.Suspense>
      </>
    )
  }


if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <DndProvider backend={HTML5Backend}>
                <Provider store={store}>
                    <ErrorContextProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route
                                    path="/account/tasks/:taskId"
                                    element={<TaskChecker />}
                                />
                            </Routes>
                        </BrowserRouter>
                    </ErrorContextProvider>
                </Provider>
            </DndProvider>
        </React.StrictMode>
    );
}
