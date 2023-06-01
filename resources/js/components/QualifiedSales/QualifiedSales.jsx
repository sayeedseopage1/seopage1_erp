import React from 'react'
import QualifiedSalesTable from './table/QualifiedSalesTable'
import { useGetQualifiedSalesQuery } from '../services/api/qualifiedSalesApiSlice'


const QualifiedSales = () => {
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
            <div className="w-100 bg-white p-3 rounded sp1_qs_tbl_container">
                <div className='bg-white'>
                  <QualifiedSalesTable data={data || []} isLoading={isFetching}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default QualifiedSales