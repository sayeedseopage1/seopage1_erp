import React, { createContext, useEffect, useRef, useState } from 'react';
import TaskReportDataTable from '../components/task-report-page/TaskReportDataTable';
import FilterContainer from '../components/task-report-page/Filter-bar/FilterContainer';
import Filterbar from '../components/task-report-page/Filter-bar/Filterbar';
import { useLazyGetTaskReportQuery } from '../services/api/taskReportApiSlice';
import _ from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Button from '../ui/Button';
import { User } from '../utils/user-details';

export const RefetchContext = createContext({});

const TaskReport = () => {
  const [getTaskReport, { isLoading,isFetching }] = useLazyGetTaskReportQuery();
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [filter, setFilter] = useState(null);
  const [status, setStatus] = useState("all");

  useEffect(() => {
    // console.log({filter,status,refetch});
    if (filter?.start_date) {
      // console.log('insert-useeffect-condition',filter);
    
    const queryObject = _.pickBy(filter, Boolean);
    const loggedUser = new User(window.Laravel.user);

    if (_.includes([5, 6, 9, 10], loggedUser.getRoleId())) {
      queryObject.report_issuer_id = loggedUser.userId;
    }
    const searchParams = new URLSearchParams(queryObject).toString();
    // console.log({queryObject,searchParams});

      getTaskReport(searchParams)
        .unwrap()
        .then(({ report_issue }) => {
          // console.log("fetched data");
          setTableData(report_issue);
        });
    }
  }, [refetch, filter])


  useEffect(()=>{
    const allData = [...tableData].filter(data => {
      if (status.title === "all") {
        return true;
      } else if (status.title === "resolved") {
        return data.status === "approved" || data.status === "denied"
      } else {
        return data.status === status.title;
      }
    })
    setFilteredData(allData);
  },[status,tableData])

  const handleFilter = (filter, status) => {
    setFilter(filter);
    setStatus(status);
  }

  const handleRefresh = ()=>{
    // console.log('btn clicked');
    setRefetch(prev=>!prev);
  }

  return (
    <RefetchContext.Provider value={{ refetch, setRefetch }}>

      <FilterContainer>
        <Filterbar onFilter={handleFilter} page="task-report" />
        <div style={{display:'flex', justifyContent:'right', padding:'16px 16px 0'}}>
          <Button
            variant="primary"
            onClick={handleRefresh}
            className="d-flex align-items-center btn-outline-dark"
            isLoading={isLoading || isFetching}
          >
            <span className="d-inline ml-1"> Refresh </span>
          </Button>
        </div>
      </FilterContainer>

      <TaskReportDataTable isLoading={isLoading || isFetching} tableData={filteredData} />
      <ToastContainer />
    </RefetchContext.Provider>
  );
};

export default TaskReport;