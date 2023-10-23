import React, { createContext, useState } from 'react';
import IndependentTaskDataTable from '../components/independent-task-page/IndependentTaskDataTable';
import { useGetIndependentTaskQuery, useLazyGetIndependentTaskQuery } from '../services/api/independentTaskApiSlice';
import _ from 'lodash';
import { useEffect } from 'react';

export const RefreshContext = createContext({});

const IndependentTask = () => {
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = React.useState(null);
  const [tableData, setTableData] = useState([]);
  // console.log(data);
  // const { data: tasks } = useGetIndependentTaskQuery();
  const [getIndependentTask,{ isFetching, isLoading}] = useLazyGetIndependentTaskQuery();

  
  // fetching data against dependencies
  useEffect(()=>{
    if (filter) {
      getIndependentTask(filter)
        .unwrap()
        .then(({pendingParentTask,status})=>{
          // console.log({status,pendingParentTask}, typeof status);
          if (Number(status) === 200) {
            setTableData(pendingParentTask);
          } else{
            setTableData([]);
          }
        })
    }
  },[filter,refresh])



  console.log({filter,refresh,isLoading,isFetching,tableData});

  // handle filter
  const onFilter = (filter) => {
    const queryObject = _.pickBy(filter, Boolean);
    const queryString = new URLSearchParams(queryObject).toString();
    setFilter(queryString);
  }

  return (
    <RefreshContext.Provider value={{refresh, setRefresh}}>
      <div>
        <IndependentTaskDataTable tableData={tableData} isLoading={isLoading || isFetching} onFilter={onFilter} filter={filter} />
      </div>
    </RefreshContext.Provider>
  );
};

export default IndependentTask;