import * as React from 'react'
import IncentiveNavbar from '../components/IncentiveNavbar'
import DataTable from '../table/DisbursedAmountTable';


const DisbursedAmounts = () => {
    const [period, setPeriod]  = React.useState("Monthly");
    const [dataShowFor, setDataShowFor] = React.useState("Shift");
 


    const handleDataShowFor = (e, type) => {
        e.preventDefault(); 
        setDataShowFor(type);
    }


    return (
        <div className='sp1_point_page_container'>
            <IncentiveNavbar />

            <main className="sp1_point_page_main">
                
                <section className="sp1__incentive_item_container">
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
                </section>
                
                <section className='border-top'>
                    <div className='d-flex align-items-center justify-content-center font-weight-bold py-3'>
                        <h4> Total disbursed amount during this period: 50000 Tk</h4>
                    </div>
                <DataTable
                        data={[]}
                        isLoading={false}
                        defaultColumns={[
                            {
                                header: 'Month',
                                accessor: 'month',
                                id: 'month',
                                cell: (row) => {
                                    return <span>Month</span>
                                } 
                            },
                            {
                                header: "Earned Points",
                                accessor: "earned_points",
                                id: "earned_points",
                                cell: (row) => {
                                    return <span>Earned Points</span>
                                }
                            },
                            {
                                header: "Total Points",
                                accessor: "total_points",
                                id: "total_points",
                                cell: (row) => {
                                    return <span>89239</span>
                                }
                            },
                            {
                                header: "Disbursed amount",
                                accessor: "disbursed_amount",
                                id: "disbursed_amount",
                                cell: (row) => {
                                    return <span>12313 BDT</span>
                                }
                            },
                            {
                                header: "Held amount",
                                accessor: "held_amount",
                                id: "held_amount",
                                cell: (row) => {
                                    return <span>12313 BDT</span>
                                }
                            }
                        ]}
                    />
                </section>
            </main>
        </div>
    )
}

export default DisbursedAmounts