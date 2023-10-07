import React, { createContext, useEffect, useRef, useState }  from 'react';
import TaskReportDataTable from '../components/task-report-page/TaskReportDataTable';
import FilterContainer from '../components/task-report-page/Filter-bar/FilterContainer';
import Filterbar from '../components/task-report-page/Filter-bar/Filterbar';
import { useLazyGetTaskReportQuery } from '../services/api/taskReportApiSlice';
import _ from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const RefetchContext = createContext({});

const TaskReport = () => {
  const [getTaskReport,{isLoading}] = useLazyGetTaskReportQuery();
  const [tableData,setTableData] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [filter, setFilter] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(()=>{
    // console.log({filter,status,refetch});
    if (filter && status) {
      // console.log('insert-condition');
      getTaskReport(filter)
            .unwrap()
            .then(({report_issue})=>{
              // console.log(report_issue);
              const allData = [...report_issue].filter(data=>{
                if (status.title === "all") {
                  return true;
                } else if(status.title === "resolved"){
                  return data.status === "approved" || data.status === "denied"
                } else{
                  return data.status === status.title;
                }
              })
                setTableData(allData);
            });
    }
  },[refetch,filter,status])

  const handleFilter = (filter, status)=>{
    const queryObject = _.pickBy(filter, Boolean);
    const searchParams = new URLSearchParams(queryObject).toString();
    setFilter(searchParams);
    setStatus(status);
  }


  return (
    <RefetchContext.Provider value={{refetch, setRefetch}}>
      
      <FilterContainer>
        <Filterbar onFilter={handleFilter} page="task-report" /> 
      </FilterContainer>

      <TaskReportDataTable isLoading={isLoading} tableData={tableData}/>
      <ToastContainer />
    </RefetchContext.Provider>
  );
};

export default TaskReport;