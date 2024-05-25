import React, { useEffect, useState } from 'react';
import DataTable from '../ui/DataTable'
import CashPointsFilter from '../components/CashPointsFilter';
import PointPageNavbar from '../components/Navbar';
import { TableColumns } from '../ui/TableColumns';

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
                    <div className="" style={{ padding: '16px' }}>
                        <DataTable
                            data={data}
                            isLoading={isDataFetching}
                            defaultColumns={TableColumns}
                        />
                    </div>
                </main>
            </div>
        </div>

    )
}

export default PmCashPoints;