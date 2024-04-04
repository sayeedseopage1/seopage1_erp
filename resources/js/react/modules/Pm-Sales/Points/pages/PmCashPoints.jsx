import * as React from 'react';
import DataTable from '../ui/DataTable'
import CashPointsFilter from '../components/CashPointsFilter';
import PointPageNavbar from '../components/Navbar';
import { TableColumns } from '../ui/TableColumns';

const PmCashPoints = () => {
    // const [totalPointData, setTotalPointData] = React.useState({});
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [isDataFetching, setIsDataFetching] = React.useState(true);



    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])


    // React.useEffect(() => {
    //     if (data.length) {
    //         const updatePointData = {};
    //         let cumulativeTotal = 0; // Variable to calculate cumulative total points

    //         const reversedData = [...data].reverse();

    //         reversedData?.forEach(item => {
    //             const totalPoint = Math.max(0, cumulativeTotal + Number(item.points));
    //             const roundedTotalPoint = Number(totalPoint.toFixed(2));
    //             cumulativeTotal = roundedTotalPoint;
    //             updatePointData[item.id] = {
    //                 id: item.id,
    //                 totalPoint: roundedTotalPoint,
    //                 points: item.points,
    //                 project_id: item.project_id
    //             };
    //         });
    //         setTotalPointData(updatePointData); // Update the cumulative total points state
    //     }
    // }, [data]);

    console.log("data", data)

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
                            data={[...data]}
                            isLoading={loading || isDataFetching}
                            defaultColumns={TableColumns}
                        />
                    </div>
                </main>
            </div>
        </div>

    )
}

export default PmCashPoints;