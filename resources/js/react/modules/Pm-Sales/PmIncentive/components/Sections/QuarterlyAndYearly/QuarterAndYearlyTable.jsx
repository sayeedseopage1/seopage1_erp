import React from 'react';
import { ConfigProvider, Table } from 'antd';
import PropTypes from 'prop-types';
import PointHistoryTableLoader from '../../../../Points/components/loader/PointHistoryTableLoader';

const columns = [
    {
        title: 'Month',
        dataIndex: 'date',
        key: 'date',
        render: (text) => <span className='held_amount_table_td'>{moment(text).format("MMM, YYYY")}</span>,
        align: 'center'
    },
    {
        title: 'Regular  points',
        dataIndex: 'regular_points',
        key: 'regular_points',
        render: (text) => <span className='held_amount_table_td'>{parseFloat(text)}</span>,
        align: 'center'
    },
    {
        title: 'Actual points',
        dataIndex: 'actual_points',
        key: 'actual_points',
        render: (text) => <span className='held_amount_table_td'>{parseFloat(text)}</span>,
        align: 'center'
    },
    {
        title: 'Upsale/cross sale points',
        dataIndex: 'upsale_points',
        key: 'upsale_points',
        render: (text) => <span className='held_amount_table_td'>{parseFloat(text)}</span>,
        align: 'center'
    },
    {
        title: 'Bonus points',
        dataIndex: 'bonus_points',
        key: 'bonus_points',
        render: (text) => <span className='held_amount_table_td'>{parseFloat(text)}</span>,
        align: 'center'
    },
    {
        title: 'Incentive amount (BDT)',
        dataIndex: 'incentive_amount',
        key: 'incentive_amount',
        render: (text) => <span className='held_amount_table_td'>{parseFloat(text)}</span>,
        align: 'center'
    },
    {
        title: 'Cumulative incentive amount (TK)',
        dataIndex: 'comulative_incentive_amount',
        key: 'comulative_incentive_amount',
        render: (text) => <span className='held_amount_table_td'>{parseFloat(text)}</span>,
        align: 'center'
    },
];


const QuarterAndYearlyTable = ({ data, isFetching, isLoading }) => {

    if (isLoading || isFetching) {
        return <table className='cnx__table_body'><tbody><PointHistoryTableLoader prevItemLength={5} tableCol={columns?.length} /></tbody></table>
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
                        },
                    },
                }}
            >
                <Table rowKey="date" columns={columns} dataSource={data} pagination={false} scroll={{ x: 1400, y: 1000 }} bordered />
            </ConfigProvider>
        </div>
    );
};

export default QuarterAndYearlyTable;

QuarterAndYearlyTable.propTypes = {
    data: PropTypes.array
}