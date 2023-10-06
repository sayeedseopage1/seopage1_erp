import React from 'react';
import TaskReportDataTable from '../components/task-report-page/TaskReportDataTable';
import FilterContainer from '../components/task-report-page/Filter-bar/FilterContainer';
import Filterbar from '../components/task-report-page/Filter-bar/Filterbar';

const TaskReport = () => {

  const handleFilter = (filter, status)=>{
    console.log({filter,status});
  }


  return (
    <div>
      
      <FilterContainer>
        <Filterbar onFilter={handleFilter} page="task-report" /> 
      </FilterContainer>

      <TaskReportDataTable />
    </div>
  );
};

export default TaskReport;