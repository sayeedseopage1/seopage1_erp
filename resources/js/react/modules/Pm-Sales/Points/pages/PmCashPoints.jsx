import React, { useState } from 'react';
import CashPointsFilter from '../components/CashPointsFilter';
import PointHistoryTable from '../components/table/PointHistoryTable';
import { useGetPmCashPointsQuery } from '../../../../services/api/Pm-Sales/pmSalesApiSlice';
import PointHistoryTablePagination from '../components/PointHistoryTablePagination';
import PointHistoryNav from '../components/section/PointHistoryNav';
import Switch from '../../../../global/Switch';
import ComingSoon from '../../PmIncentive/components/ui/ComingSoon';

const PmCashPoints = () => {
    const [navActive, setNavActive] = useState("Cash Point");
    const [query, setQuery] = useState({});
    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // table data
    const { data: pmCashPoints, isLoading: dataFetchingStateIsLoading, refetch: pmCashPointHistoryRefetch, isFetching: pmCashPointHistoryIsFetching } = useGetPmCashPointsQuery(query)
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
                <PointHistoryNav navActive={navActive} setNavActive={setNavActive} data={tableData} isLoading={dataFetchingStateIsLoading} isFetching={pmCashPointHistoryIsFetching} refetch={pmCashPointHistoryRefetch} />
                <main className='sp1_point_page_main'>
                    <Switch>
                        <Switch.Case condition={navActive === "Cash Point"}>
                            <div className="cnx__table_wrapper" style={{ padding: '16px' }}>
                                <PointHistoryTable data={tableData?.cash_points} isLoading={dataFetchingStateIsLoading} isFetching={pmCashPointHistoryIsFetching} onPageChange={onPageChange} />
                                <PointHistoryTablePagination
                                    tableData={tableData?.cash_points}
                                    handlePageSizeChange={handlePageSizeChange}
                                    handlePageChange={onPageChange}
                                    pageSize={pageSize}
                                />
                            </div>
                        </Switch.Case>
                        {/* TODO: it will be available soon when it's ready */}
                        <Switch.Case condition={navActive === "Non Cash Point"}>
                            <ComingSoon pageName="Non Cash Point" />
                        </Switch.Case>
                        <Switch.Case condition={navActive === "Redeem Points"}>
                            <ComingSoon pageName="Redeem Points" />
                        </Switch.Case>
                    </Switch>
                </main>
            </div >
        </div >

    )
}

export default PmCashPoints;