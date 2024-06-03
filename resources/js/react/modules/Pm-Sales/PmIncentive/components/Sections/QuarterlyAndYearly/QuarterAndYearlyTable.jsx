import React from 'react';
import { ConfigProvider, Table } from 'antd';

const columns = [
    {
        title: 'Month',
        dataIndex: 'month',
        key: 'month',
        render: (text) => <span className='held_amount_table_td'>{text}</span>,
        align: 'center'
    },
    {
        title: 'Regular  points',
        dataIndex: 'regularPoints',
        key: 'regularPoints',
        render: (text) => <span className='held_amount_table_td'>{text}</span>,
        align: 'center'
    },
    {
        title: 'Actual points',
        dataIndex: 'actualPoints',
        key: 'actualPoints',
        render: (text) => <span className='held_amount_table_td'>{text}</span>,
        align: 'center'
    },
    {
        title: 'Upsale/cross sale points',
        dataIndex: 'upsaleCrossSalePoints',
        key: 'upsaleCrossSalePoints',
        render: (text) => <span className='held_amount_table_td'>{text}</span>,
        align: 'center'
    },
    {
        title: 'Bonus points',
        dataIndex: 'bonusPoints',
        key: 'bonusPoints',
        render: (text) => <span className='held_amount_table_td'>{text}</span>,
        align: 'center'
    },
    {
        title: 'Incentive amount (BDT)',
        dataIndex: 'incentiveAmount',
        key: 'incentiveAmount',
        render: (text) => <span className='held_amount_table_td'>{text}</span>,
        align: 'center'
    },
    {
        title: 'Cumulative incentive amount (TK)',
        dataIndex: 'cumulativeIncentiveAmount',
        key: 'cumulativeIncentiveAmount',
        render: (text) => <span className='held_amount_table_td'>{text}</span>,
        align: 'center'
    },
];


const QuarterAndYearlyTable = ({ data }) => {
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
                <Table rowKey="id" columns={columns} dataSource={data} pagination={false} scroll={{ x: 1400, y: 1000 }} bordered />
            </ConfigProvider>
        </div>
    );
};

export default QuarterAndYearlyTable;