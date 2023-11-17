import React, { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../global/Loader';
import DataTable from '../global/data-table/table';
import { Flex } from '../global/styled-component/Flex';
import { useLazyGetRevisionCalculatorDataQuery } from '../services/api/revisionCalculatorApiSlice';
import JqueryDateRangePicker from './JqueryDateRangePicker';
import { RefreshButton } from './RefreshButton';
import { revisionColumns } from './RevisionColumns';
import styles from './styles.module.css';

// const data = fakeData(300);

const RevisionCalculator = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [nRows, setNRows] = useState(10);
  const [data, setData] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
 
  const _startDate = useMemo(() => startDate, [startDate]);
  const _endDate = useMemo(() => endDate, [endDate]);

 const [
  getRevisionCalculatorData,
  {
    isFetching
  }
 ] = useLazyGetRevisionCalculatorDataQuery();

  const fetchData = async (_startDate, _endDate) => {
    let query = {
      start_date: _startDate,
      end_date: _endDate
    }

    const queryObject = _.pickBy(query, Boolean);
      const queryString = new URLSearchParams(queryObject).toString();

    try{
      let res = await getRevisionCalculatorData(`?${queryString}`).unwrap();
      setData(res);
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => { 
    if(_startDate && _endDate){
      fetchData(_startDate, _endDate)
    }

  }, [_startDate, _endDate])

  // handle refresh
  const handleRefresh = () =>{
    fetchData(_startDate, _endDate)
  }

  return (
    <section className='p-3'>
      <div
        className='p-3 bg-white'
      > 
        <DataTable
          data={data} 
          margeRow={false}
          columns={revisionColumns}
          pageIndex={pageIndex}
          perPageRow={nRows}
          onPageChange={(value) => setPageIndex(value)}
          onPageRowChange={(n) => setNRows(n)} 
          total={data.length }
          tableClass={styles.table}
          tableContainerClass={styles.tableContainer}
          uniq_id="project_manager_id"
          isLoading={isFetching}
          state={{
            startDate,
            endDate
          }}
          navbar={ 
            <Flex alignItem="center" justifyContent="space-between" className='w-100'>
              <JqueryDateRangePicker
                startDate = {startDate}
                endDate ={endDate}
                setStartDate = {setStartDate}
                setEndDate = {setEndDate}
                className={styles.table_date_picker}
              />
              <RefreshButton onClick={handleRefresh} className='ml-auto'>
                {isFetching ? 
                  <Loader title='Loading...' />:
                  "Refresh"
                }
              </RefreshButton>
            </Flex>
          }
        /> 

        <Outlet />   
    </div>
    </section>
  )
}

export default RevisionCalculator