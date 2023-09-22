import React, {useState, useMemo, useEffect} from 'react'
import {Outlet} from 'react-router-dom';
import DataTable from '../global/data-table/table';
import { revisionColumns } from './RevisionColumns';
import { fakeData } from './faker';
import styles from './styles.module.css';
import JqueryDateRangePicker from './JqueryDateRangePicker';
import { useLazyGetRevisionCalculatorDataQuery } from '../services/api/revisionCalculatorApiSlice';

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

  useEffect(() => { 
    if(_startDate && _endDate){
      (async() => {
      
        let query = {
          start_date: _startDate,
          end_date: _endDate
        }
  
        const queryObject = _.pickBy(query, Boolean);
          const queryString = new URLSearchParams(queryObject).toString();
   
        try{
          let res = await getRevisionCalculatorData(`?${queryString}`).unwrap();
          setData(res);
          console.log(res)
        }catch(err){
          console.log(err)
        }
      })()
    }

  }, [_startDate, _endDate])

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
            <JqueryDateRangePicker
              startDate = {startDate}
              endDate ={endDate}
              setStartDate = {setStartDate}
              setEndDate = {setEndDate}
              className={styles.table_date_picker}
            />
          }
        /> 

        <Outlet />   
    </div>
    </section>
  )
}

export default RevisionCalculator