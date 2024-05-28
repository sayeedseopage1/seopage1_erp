import React, { useEffect, useState } from 'react';
import DataTable from '../ui/DataTable'
import CashPointsFilter from '../components/CashPointsFilter';
import PointPageNavbar from '../components/Navbar';
import PointHistoryTable from '../components/table/PointHistoryTable';
import { useGetPmCashPointsQuery } from '../../../../services/api/Pm-Sales/pmSalesApiSlice';

const PmCashPoints = () => {
    const [query, setQuery] = useState({});
    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // table data
    const { data: pmCashPoints, isLoading: dataFetchingStateIsLoading } = useGetPmCashPointsQuery(query)
    const tableData = pmCashPoints?.data

    const onPageChange = (paginate) => {
        setPagination(paginate);
        setQuery(prev => ({ ...prev, limit: pageSize, page: pageIndex + 1 }));
        // setQuery({ ...query, limit: pageSize, page: pageIndex + 1 });
    };

    return (
        <div className='sp1_point_page'>
            <CashPointsFilter
                setQuery={setQuery}
            />

            <div className='sp1_point_page_container'>
                <PointPageNavbar />
                <main className='sp1_point_page_main'>

                    {/* <DataTable
                            data={data}
                            isLoading={isDataFetching}
                            defaultColumns={TableColumns}
                        /> */}

                    <PointHistoryTable data={tableData} isLoading={dataFetchingStateIsLoading} onPageChange={onPageChange} />
                </main>
            </div>
        </div>

    )
}

export default PmCashPoints;