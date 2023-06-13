import React from 'react'
import QualifiedSalesTable from './table/QualifiedSalesTable'
import { useGetQualifiedSalesQuery } from '../services/api/qualifiedSalesApiSlice'
import {useUsers} from '../hooks/useUsers';

const QualifiedSales = () => {
  const { users, usersObject } = useUsers();
  const {
    data,
    isFetching
  } = useGetQualifiedSalesQuery();


  return (
    <div className='d-flex flex-column'>
        {/* filter section */}
        <div className='bg-white w-100 py-2 px-3'>
            Filter bar
        </div>



        {/*table section */}
        <div className='p-4'>
            <QualifiedSalesTable data={data || []} users={users || []} usersObject ={usersObject} isLoading={isFetching}/>
        </div>
    </div>
  )
}

export default QualifiedSales