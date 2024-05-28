import React, { useEffect, useState } from 'react';
import DataTable from '../ui/DataTable'
import CashPointsFilter from '../components/CashPointsFilter';
import PointPageNavbar from '../components/Navbar';
import { TableColumns } from '../ui/TableColumns';
import PointHistoryTable from '../components/table/PointHistoryTable';
import PointHistoryTableLoader from '../components/loader/PointHistoryTableLoader';

const PmCashPoints = () => {
    // const [totalPointData, setTotalPointData] = React.useState({});
    const [data, setData] = useState([]);
    const [isDataFetching, setIsDataFetching] = useState(true);

    // console.log(data)


    return (
        <div className='sp1_point_page'>
            <CashPointsFilter
                setData={setData}
                setIsDataFetching={setIsDataFetching}
            />

            <div className='sp1_point_page_container'>
                <PointPageNavbar />
                <main className='sp1_point_page_main'>

                    {/* <DataTable
                            data={data}
                            isLoading={isDataFetching}
                            defaultColumns={TableColumns}
                        /> */}

                    <PointHistoryTable data={data} isLoading={isDataFetching} />
                </main>
            </div>
        </div>

    )
}

export default PmCashPoints;