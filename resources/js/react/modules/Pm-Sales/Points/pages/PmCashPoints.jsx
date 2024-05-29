import React, { useEffect, useState } from 'react';
import DataTable from '../ui/DataTable'
import CashPointsFilter from '../components/CashPointsFilter';
import PointPageNavbar from '../components/Navbar';
import PointHistoryTable from '../components/table/PointHistoryTable';
import { useGetPmCashPointsQuery } from '../../../../services/api/Pm-Sales/pmSalesApiSlice';
import PointHistoryTablePagination from '../components/PointHistoryTablePagination';
import PointHistoryNav from '../components/section/PointHistoryNav';

const PmCashPoints = () => {
    const [navActive, setNavActive] = useState("Cash Point");
    const [query, setQuery] = useState({});
    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // table data
    const { data: pmCashPoints, isLoading: dataFetchingStateIsLoading } = useGetPmCashPointsQuery(query)
    const tableData = pmCashPoints?.data


    const onPageChange = ({ selected }) => {
        setPagination(prev => {
            const newPagination = { ...prev, pageIndex: selected };
            setQuery(prevQuery => ({
                ...prevQuery,
                per_page: newPagination.pageSize,
                page: newPagination.pageIndex + 1,
            }));
            return newPagination;
        });
    };

    const handlePageSizeChange = (e) => {
        const newPageSize = parseInt(e.target.value, 10);
        setPagination(prev => {
            const newPagination = { ...prev, pageSize: newPageSize, pageIndex: 0 };
            setQuery(prevQuery => ({
                ...prevQuery,
                per_page: newPageSize,
                page: 1,
            }));
            return newPagination;
        });
    };

    return (
        <div className='sp1_point_page'>
            <CashPointsFilter
                setQuery={setQuery}
            />

            <div className='sp1_point_page_container'>
                {/* <PointPageNavbar /> */}
                <PointHistoryNav navActive={navActive} setNavActive={setNavActive} data={tableData?.data} isLoading={dataFetchingStateIsLoading} />
                <main className='sp1_point_page_main'>

                    {/* <DataTable
                            data={data}
                            isLoading={isDataFetching}
                            defaultColumns={TableColumns}
                        /> */}
                    <div className="cnx__table_wrapper" style={{ padding: '16px' }}>
                        <PointHistoryTable data={tableData} isLoading={dataFetchingStateIsLoading} onPageChange={onPageChange} />
                        <PointHistoryTablePagination
                            tableData={tableData}
                            handlePageSizeChange={handlePageSizeChange}
                            handlePageChange={onPageChange}
                            pageSize={pageSize}
                        />
                    </div>
                </main>
            </div >
        </div >

    )
}

export default PmCashPoints;