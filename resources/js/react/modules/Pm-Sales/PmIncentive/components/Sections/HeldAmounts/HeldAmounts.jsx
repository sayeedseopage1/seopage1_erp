import React, { useEffect, useState } from 'react';
import { auth } from '../../../constants';
import Pagination from '../../ui/Pagination';
import { ConfigProvider, Table } from 'antd';
import PointHistoryTableLoader from '../../../../Points/components/loader/PointHistoryTableLoader';

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
        dataIndex: 'cumulative_held_amount',
        key: 'cumulative_held_amount',
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
                    record?.status === 2 ? <button className='incentive_success_btn'>Paid</button> : <button className='incentive_danger_btn'>Pending</button>
                }
            </div>
        ),
        width: '230px',
        align: 'center',
        hidden: auth?.isHasRolePermission(1) ? false : true
    }
];

const HeldAmounts = ({ data, isFetching, isLoading }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageData, setCurrentPageData] = useState([]);
    const [numberOfRowPerPage, setNumberOfRowPerPage] = useState(10);

    const modifiedData = [];
    data?.forEach(item => {
        if (item?.held_amount_payment) {
            const newObject = {
                "id": item?.id + "abcd",
                "held_amount_payment_details": item?.held_amount_payment,
            };
            modifiedData?.push(newObject);
        }
        modifiedData?.push(item);
    });

    const expandedRowKeys = modifiedData?.filter((item) => item?.held_amount_payment_details)?.map((item) => item?.id)

    const expandable = {
        expandedRowRender: (record) => {
            return record?.held_amount_payment_details ? (
                <div className="held-amount-expanded-row">
                    <p className="held-amount-expanded-title" dangerouslySetInnerHTML={{ __html: record?.held_amount_payment_details }}></p>
                    <p className="expanded-held-amount">00 taka</p>
                </div>
            ) : null;
        },
        expandedRowKeys,
        showExpandColumn: false,
        expandIcon: () => null,
    };

    useEffect(() => {
        expandedRowKeys?.forEach((key) => {
            const tr = document?.querySelector(`tr[data-row-key="${key}"]`);
            if (tr) {
                tr.style.display = 'none';
            }
        });
    }, [expandedRowKeys]);


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
                    dataSource={modifiedData}
                    pagination={false}
                    scroll={{ x: 1400, y: 1000 }}
                    bordered
                    expandable={expandable}
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