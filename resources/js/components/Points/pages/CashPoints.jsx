import * as React from 'react';
import DataTable from '../ui/DataTable';
import PointPageFilterBar from '../components/FilterBar';
import PointPageNavbar from '../components/Navbar';
import dayjs from 'dayjs';



const CashPoints = () => {
    const [data, setData] = React.useState([]);
    const [pointTableDataIsLoading, setPointTableDataIsLoading] = React.useState([]);
    
    return(
        <div className='sp1_point_page'>
            <PointPageFilterBar setData={setData} setPointTableDataIsLoading={setPointTableDataIsLoading} />
            
            <div className='sp1_point_page_container'>
            <PointPageNavbar />
                <main className='sp1_point_page_main'>
                    <div className="" style={{padding: '16px'}}> 
                    <DataTable
                        data={[...data]}
                        isLoading={pointTableDataIsLoading}
                        defaultColumns={[
                            {
                                header: 'ID',
                                accessor: 'id',
                                id: 'id',
                                cell: (row) => {
                                    return <span>{row['id']}</span>
                                } 
                            },
                            {
                                header: 'Date',
                                accessor: 'created_at',
                                id: 'created_at',
                                cell: (row) => {
                                    return <span>{dayjs(row['created_at']).format('MMMM-DD-YYYY')}</span>
                                } 
                            },
                            {
                                header: 'Action',
                                accessor: 'activity',
                                id: 'activity',
                                cell: (row) => {
                                    return <span>{row['activity']}</span>
                                } 
                            },
                            {
                                header: "Point Earned",
                                accessor: "points",
                                id: "points",
                                cell: (row) => {
                                    return <span>{row['points']}</span>
                                }
                            },
                            {
                                header: "Point Lost",
                                accessor: "total_points_lost",
                                id: "total_points_lost",
                                cell: (row) => {
                                    return <span>{row['total_points_lost']}</span>
                                }
                            },
                            {
                                header: "Balance Point",
                                accessor: "balance",
                                id: "balance",
                                cell: (row) => {
                                    return <span>{row['balance']}</span>
                                }
                            }
                        ]}
                    />
                </div>
                </main>
            </div>
        </div>

    )
}

export default CashPoints;