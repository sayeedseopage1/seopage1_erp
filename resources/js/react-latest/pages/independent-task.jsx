import React from 'react';
import IndependentTaskDataTable from '../components/independent-task-page/IndependentTaskDataTable';
import data from '../components/independent-task-page/tasks/components/demo.json';
import { useGetIndependentTaskQuery } from '../services/api/independentTaskApiSlice';

const IndependentTask = () => {
  // console.log(data);
  const {data:tasks} = useGetIndependentTaskQuery();
  console.log(tasks);

  return (
    <div>
      <IndependentTaskDataTable tableData={data} />
    </div>
  );
};

export default IndependentTask;