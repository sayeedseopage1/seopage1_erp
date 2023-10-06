import React from 'react';
import TaskReportDataTable from '../components/task-report-page/TaskReportDataTable';
import FilterContainer from '../components/task-report-page/Filter-bar/FilterContainer';
import Filterbar from '../components/task-report-page/Filter-bar/Filterbar';
import { useLazyGetTaskReportQuery } from '../services/api/taskReportApiSlice';
import _ from 'lodash';
import { useState } from 'react';

const TaskReport = () => {
  const [getTaskReport,{isLoading}] = useLazyGetTaskReportQuery();
  const [tableData,setTableData] = useState([]);

  const handleFilter = (filter, status)=>{
    const queryObject = _.pickBy(filter, Boolean);
    const searchParams = new URLSearchParams(queryObject).toString();
    // console.log({searchParams,status});
    getTaskReport(searchParams)
            .unwrap()
            .then(({report_issue})=>{
              console.log(report_issue);
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


  return (
    <div>
      
      <FilterContainer>
        <Filterbar onFilter={handleFilter} page="task-report" /> 
      </FilterContainer>

      <TaskReportDataTable isLoading={isLoading} tableData={tableData}/>
    </div>
  );
};

export default TaskReport;