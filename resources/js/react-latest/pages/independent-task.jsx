import React from 'react';
import IndependentTaskDataTable from '../components/independent-task-page/IndependentTaskDataTable';
import data from '../components/independent-task-page/tasks/components/demo.json';

const IndependentTask = () => {
  // console.log(data);

  return (
    <div>
      <IndependentTaskDataTable tableData={data} />
    </div>
  );
};

export default IndependentTask;