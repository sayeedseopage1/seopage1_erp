import React, { useState } from 'react';
import { auth, heldAmountsData } from '../../../constants';
import Pagination from '../../ui/Pagination';
import { ConfigProvider, Table } from 'antd';
import PointHistoryTableLoader from '../../../../Points/components/loader/PointHistoryTableLoader';


const tableData = [
    {
        "id": 1,
        "date": "2023-12-31 10:21:11",
        "user_id": 209,
        "total_incentive_amount": "1000.00",
        "held_amount": "200.00",
        "payable_amount": "800.00",
        "paid_amount": "800.00",
        "status": 1,
        "created_at": "2023-12-31T04:06:16.000000Z",
        "updated_at": "2023-12-31T04:06:16.000000Z",
        "title": "Monthly Incentive (for the month of December, 2023)",
        "viewing_month": "January, 2024",
        "held_amount_payment": null,
        "cumulative_held_amount": "1000"
    },
    {
        "id": 2,
        "date": "2024-01-31 10:13:20",
        "user_id": 209,
        "total_incentive_amount": "1000.00",
        "held_amount": "200.00",
        "payable_amount": "800.00",
        "paid_amount": "800.00",
        "status": 1,
        "created_at": "2024-01-31T04:06:16.000000Z",
        "updated_at": "2024-01-31T04:06:16.000000Z",
        "title": "Monthly Incentive (for the month of January, 2024)",
        "viewing_month": "February, 2024",
        "held_amount_payment": "Held incentive amount 400.00 taka for December, 2023 - January, 2024 has been paid on June 10, 2024 by Rajat Chakraborty",
        "cumulative_held_amount": "0"
    },
    {
        "id": 3,
        "date": "2024-02-29 10:13:20",
        "user_id": 209,
        "total_incentive_amount": "10000.00",
        "held_amount": "2000.00",
        "payable_amount": "8000.00",
        "paid_amount": "8000.00",
        "status": 2,
        "created_at": "2024-02-29T04:06:16.000000Z",
        "updated_at": "2024-02-29T04:06:16.000000Z",
        "title": "Monthly Incentive (for the month of February, 2024)",
        "viewing_month": "March, 2024",
        "held_amount_payment": null,
        "cumulative_held_amount": "2200"
    }
]

const columns = [
    {
        title: 'Month',
        dataIndex: 'viewing_month',
        key: 'viewing_month',
        render: (text) => <span className='held_amount_table_td'>{text}</span>,
    },
    {
        title: (
            <div className='text-center'>
                <p>Title</p>
            </div>
        ),
        dataIndex: 'title',
        key: 'title',
        render: (text) => <div className='held_amount_table_td'>
            <p>{text}</p>
        </div>,
        // width: '300px',
    },
    {
        title: 'Total Amount',
        dataIndex: 'total_incentive_amount',
        key: 'total_incentive_amount',
        render: (text) => <span className='held_amount_table_td'>{parseFloat(text)} taka</span>,
        align: 'center',
    },
    {
        title: (
            <div>
                <p>Disbursed Amount</p>
                <span>(80% of the total amount)</span>
            </div>
        ),
        dataIndex: 'payable_amount',
        key: 'payable_amount',
        render: (text) => <span className='held_amount_table_td'>{parseFloat(text)} taka</span>,
        align: 'center'
    },
    {
        title: (
            <div>
                <p>Held Amount</p>
                <span>(20% of the total amount)</span>
            </div>
        ),
        dataIndex: 'held_amount',
        key: 'held_amount',
        render: (text) => <span className='held_amount_table_td'>{parseFloat(text)} taka</span>,
        align: 'center'
    },
    {
        title: 'Held Amount Balance',
        dataIndex: 'held_amount',
        key: 'held_amount',
        render: (text) => <span className='held_amount_table_td'>{parseFloat(text)} taka</span>,
        align: 'center'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_, record) => (
            <div>
                {
                    record?.status === 1 ? <button className='incentive_success_btn'>Paid</button> : <button className='incentive_danger_btn'>Pending</button>
                }
            </div>
        ),
        width: '230px',
        align: 'center',
        hidden: auth?.isHasRolePermission(1) ? false : true
    }
];


const HeldAmounts = ({ data, isFetching, isLoading, expandedRowKeys }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageData, setCurrentPageData] = useState([]);
    const [numberOfRowPerPage, setNumberOfRowPerPage] = useState(10);


    if (isLoading || isFetching) {
        return <table className='cnx__table_body'><tbody><PointHistoryTableLoader tableCol={columns?.length} prevItemLength={5} /></tbody></table>
    }

    return (
        <div className='held_amount_table_wrapper'>
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerBg: '#1492E6',
                            headerColor: '#fff',
                            fontSize: '15px',
                            fontFamily: 'Poppins, sans-serif',
                            rowExpandedBg: '#14B96A'
                        },
                    },
                }}
            >
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={currentPageData}
                    pagination={false}
                    scroll={{ x: 1400, y: 1000 }}
                    bordered
                    expandable={{
                        expandedRowRender: (record) => {
                            return (
                                <div className="held-amount-expanded-row">
                                    <p className="held-amount-expanded-title">{record?.held_amount_payment}</p>
                                    <p className="expanded-held-amount">{parseFloat(record?.held_amount)} taka</p>
                                </div>
                            );
                        },
                        expandedRowKeys,
                        showExpandColumn: false,
                        expandIcon: () => null,
                    }}
                />
            </ConfigProvider>

            {/* table footer  */}
            <div className="cnx__table_footer">
                <div className="__show_entries">
                    <span>Show</span>
                    <select onChange={(e) => setNumberOfRowPerPage(e.target.value)}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                    </select>

                    <span>entries</span>
                </div>
                <div className='__total_entries'>
                    Showing {currentPageData?.length > 0 ? 1 : 0} to {currentPageData?.length} of {data?.length} entries
                </div>

                {/* pagination */}
                <Pagination
                    data={data}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setCurrentPageData={(v) => setCurrentPageData(v)}
                    numOfPerPageRow={Number(numberOfRowPerPage)}
                />
                {/* end pagination */}
            </div>
        </div>
    );
};

export default HeldAmounts;