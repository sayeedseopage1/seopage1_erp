import * as React from 'react';
import DataTable from '../ui/DataTable';
import PointPageFilterBar from '../components/FilterBar';
import PointPageNavbar from '../components/Navbar';
import dayjs from 'dayjs';
import CashPointsFilter from '../components/CashPointsFilter';



const CashPoints = () => {
    const [data, setData] = React.useState([]);
    const [ loading, setLoading ] = React.useState(true);
    const [isDataFetching, setIsDataFetching] = React.useState(true);
   


    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)

        return () =>  clearTimeout(timer)
    }, [])

    
    return(
        <div className='sp1_point_page'>
            <CashPointsFilter
                setData={setData} 
                setIsDataFetching={setIsDataFetching}
            />
            {/* <PointPageFilterBar setData={setData} setPointTableDataIsLoading={setPointTableDataIsLoading} /> */}
            
            <div className='sp1_point_page_container'>
            <PointPageNavbar />
                <main className='sp1_point_page_main'>
                    <div className="" style={{padding: '16px'}}> 
                    <DataTable
                        data={[...data]}
                        isLoading={loading || isDataFetching }
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
                                    let data = row['activity'];
                                    if(data){
                                        return <span dangerouslySetInnerHTML={{__html: data}} />
                                    }
                                    return <span> - </span>
                                } 
                            },
                            {
                                header: "Points Earned",
                                accessor: "points",
                                id: "points",
                                cell: (row) => {
                                    return <span>{Number(row['points']).toFixed(2)}</span>
                                }
                            },
                            {
                                header: "Points Lost",
                                accessor: "total_points_lost",
                                id: "total_points_lost",
                                cell: (row) => {
                                    return <span>{Number(row['total_points_lost']).toFixed(2)}</span>
                                }
                            },
                            {
                                header: "Balance Points",
                                accessor: "total_points_earn",
                                id: "total_points_earn",
                                cell: (row) => {
                                    return <span>{Number(row['total_points_earn']).toFixed(2)}</span>
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