import { ConfigProvider, Table } from 'antd';
import React from 'react';
import { list_of_milestones_data } from '../../../constants/milestones';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const ListOfMilestonesTable = () => {

    const columns = [
        {
            title: 'Client Description',
            dataIndex: 'client_description',
            key: 'client_description',
            render: (text) => <div className='sp1_marketplace_default_text'>{text}</div>,
        },
        {
            title: 'Project Name',
            dataIndex: 'project_name',
            key: 'project_name',
            width: "258px",
            render: (text) => <div className='sp1_marketplace_default_text'>{text}</div>,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text, record) => <div className='sp1_marketplace_default_text'>{`${record?.currency?.symbol}${text} ${record?.currency?.code}`}</div>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => <div className='sp1_marketplace_default_text'>{text}</div>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <div className='sp1_marketplace_default_text'>{text}</div>,
        },
        {
            title: 'Action',
            key: 'action',
            align: 'right',
            render: (_, record) => <div className='d-flex justify-content-end'>
                <button className='list_of_milestones_btn'>
                    <span>
                        Request Release
                    </span>
                    <span>
                        <MdOutlineKeyboardArrowDown size={20} />
                    </span>
                </button>
            </div>,
        },
    ];

    const rowClassName = (_record, index) => (index % 2 === 0 ? 'table-row-odd' : '');

    return (

        <div className=''>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={list_of_milestones_data}
                scroll={{ x: 768 }}
                pagination={false}
                rowClassName={rowClassName}
            />
        </div>
    );
};

export default ListOfMilestonesTable;