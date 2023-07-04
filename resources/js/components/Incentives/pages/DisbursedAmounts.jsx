import * as React from 'react'
import IncentiveNavbar from '../components/IncentiveNavbar'
import DataTable from '../table/DisbursedAmountTable';
import FilterBar from '../components/FilterBar';
import { useLazyGetDisbursedAmountQuery } from '../../services/api/IncentiveApiSlice';
import _ from 'lodash';
import dayjs from 'dayjs';



const DisbursedAmounts = () => {
    const [period, setPeriod]  = React.useState("Monthly");
    const [dataShowFor, setDataShowFor] = React.useState("Shift");
    const [data, setData] = React.useState([]);
    const [firstLoading, setFirstLoading] = React.useState(true);
    const [tableDataIsFetching, setTableDataIsFetching] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(true);
    
    const [
        getDisbursedAmount,
        {isFetching}
    ] = useLazyGetDisbursedAmountQuery();

    const handleDataShowFor = (e, type) => {
        e.preventDefault(); 
        setDataShowFor(type);
    }


    const handleDataRequest = (filter) => {
       const query = {
        employee_id: filter?.employee_id,
        start_date: filter?._startDate,
        end_date: filter?._endDate
       }

       let queryString = new URLSearchParams(query);

       // fetch data
       getDisbursedAmount(`?${queryString.toString()}`).unwrap().then(res => {
        if(!_.isArray(res)){
            let r = {...res}
            r.id = 1; 
            setData([r]);
        }else{
            setData([]);
        }
       }).catch(err => {
        console.log(err)
       }).finally(() => {
        setIsLoading(false);
       })

    }
 

    return (
       <>
        <FilterBar handleDataRequest={handleDataRequest} /> 
        <div className='sp1_point_page_container'>
            <IncentiveNavbar />

            <main className="sp1_point_page_main">
                
                {/* <section className="sp1__incentive_item_container">
                <div className='d-flex align-items-center'>
                    <div className="d-flex align-items-center px-2 py-2 rounded" style={{background: 'rgba(29, 130, 245, 0.1)' }}> 
                        <div 
                            className={period === "Monthly" ? 'sp1_da_tab active': 'sp1_da_tab'} 
                            onClick={() => setPeriod("Monthly")}> Monthly
                        </div> 
                        
                        <div 
                            className={period === "Quarterly" ? 'sp1_da_tab active': 'sp1_da_tab'} 
                            onClick={() => setPeriod("Quarterly")}> Quarterly
                        </div> 
                        
                        <div 
                            className={period === "Yearly" ? 'sp1_da_tab active mr-0': 'sp1_da_tab mr-0'} 
                            onClick={() => setPeriod("Yearly")}> Yearly
                        </div>
 
                    </div>
                    <i className="bi bi-chevron-double-right mx-2 text-primary" style={{fontSize: '24px'}}></i>
                    <div className='d-flex align-items-center px-2 py-2 rounded' style={{background: 'rgba(29, 130, 245, 0.1)' }}>
                        <div 
                            className={dataShowFor === "Shift" ? 'sp1_da_tab active': 'sp1_da_tab'} 
                            onClick={(e) => handleDataShowFor(e, "Shift")}>Shift</div> 
                        <div 
                            className={dataShowFor === "Team" ? 'sp1_da_tab active mr-0': 'sp1_da_tab mr-0'} 
                            onClick={(e) => handleDataShowFor(e, "Team")}>Team</div> 
                    </div>
                </div> 
                </section> */}
                
                <section className='border-top'>
                    <div className='d-flex align-items-center justify-content-center font-weight-bold py-3'>
                        <h4> Total disbursed amount during this period: {data[0]?.total_disbursed_amount_during_this_period} BDT</h4>
                    </div>
                <DataTable
                        data={data}
                        isLoading={isFetching || isLoading}
                        pagination={false}
                        defaultColumns={[
                            {
                                header: 'Month',
                                accessor: 'month',
                                id: 'month',
                                cell: (row) => {
                                    return <span>{dayjs(row?.month).format('MMM DD, YYYY')}</span>
                                } 
                            },
                            {
                                header: "Earned Points",
                                accessor: "earned_points",
                                id: "earned_points",
                                cell: (row) => {
                                    return <span>{row?.earned_points}</span>
                                }
                            },
                            {
                                header: "Total Points",
                                accessor: "total_points",
                                id: "total_points",
                                cell: (row) => {
                                    return <span>{row?.total_points}</span>
                                }
                            },
                            {
                                header: "Disbursed amount",
                                accessor: "disbursed_amount",
                                id: "disbursed_amount",
                                cell: (row) => {
                                    return <span>BDT {row?.disbursed_Amount}</span>
                                }
                            },
                            {
                                header: "Held amount",
                                accessor: "held_amount",
                                id: "held_amount",
                                cell: (row) => {
                                    return <span>BDT {row?.held_amount}</span>
                                }
                            }
                        ]}
                    />
                </section>
            </main>
        </div>  
       </> 
    )
}

export default DisbursedAmounts