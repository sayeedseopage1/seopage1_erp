import React, { useState } from 'react';
import { auth, heldAmountsData } from '../../../constants';
import Pagination from '../../ui/Pagination';
import { ConfigProvider, Table } from 'antd';

const columns = [
    {
        title: 'Month',
        dataIndex: 'month',
        key: 'month',
        render: (text) => <span className='held_amount_table_td'>{text}</span>,
    },
    {
        title: (
            <div className='text-center'>
                <p>Title</p>
            </div>
        ),
        dataIndex: 'monthly_incentive',
        key: 'monthly_incentive',
        render: (_, record) => <div className='held_amount_table_td'>
            <p>Monthly Incentive</p>
            <span>(For the month of {record?.monthly_incentive})</span>
        </div>,
        width: '300px',
    },
    {
        title: 'Total Amount',
        dataIndex: 'total_amount',
        key: 'total_amount',
        render: (text) => <span className='held_amount_table_td'>{text} taka</span>,
        align: 'center'
    },
    {
        title: (
            <div>
                <p>Disbursed Amount</p>
                <span>(80% of the total amount)</span>
            </div>
        ),
        dataIndex: 'disbursed_amount',
        key: 'disbursed_amount',
        render: (text) => <span className='held_amount_table_td'>{text} taka</span>,
        width: '245px',
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
        render: (text) => <span className='held_amount_table_td'>{text} taka</span>,
        width: '245px',
        align: 'center'
    },
    {
        title: 'Held Amount Balance',
        dataIndex: 'held_amount_balance',
        key: 'held_amount_balance',
        render: (text) => <span className='held_amount_table_td'>{text} taka</span>,
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
        align: 'center',
        hidden: auth?.isHasRolePermission(1) ? false : true
    }
];


const HeldAmounts = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageData, setCurrentPageData] = useState([]);
    const [numberOfRowPerPage, setNumberOfRowPerPage] = useState(10);

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
                        },
                    },
                }}
            >
                <Table rowKey="id" columns={columns} dataSource={currentPageData} pagination={false} scroll={{ x: 1400, y: 1000 }} bordered />
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
                    Showing {currentPageData.length > 0 ? 1 : 0} to {currentPageData.length} of {heldAmountsData?.length} entries
                </div>

                {/* pagination */}
                <Pagination
                    data={heldAmountsData}
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