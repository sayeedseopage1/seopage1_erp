import React from 'react';
import PropTypes from "prop-types";
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { Modal, Table } from 'antd';

const tableData = [
    {
        _id: '1',
        xAxis: '0-10%',
        yAxis: '100%',
    },
    {
        _id: '2',
        xAxis: '0-10%',
        yAxis: '100%',
    },
    {
        _id: '3',
        xAxis: '0-10%',
        yAxis: '100%',
    },
    {
        _id: '4',
        xAxis: '0-10%',
        yAxis: '100%',
    },
    {
        _id: '5',
        xAxis: '0-10%',
        yAxis: '100%',
    },
    {
        _id: '6',
        xAxis: '0-10%',
        yAxis: '100%',
    },
    {
        _id: '7',
        xAxis: '0-10%',
        yAxis: '100%',
    },
    {
        _id: '8',
        xAxis: '0-10%',
        yAxis: '100%',
    },
];

const RemoveRatioItemsModal = ({ antdModalOpen, setAntdModalOpen }) => {
    const columns = [
        Table.SELECTION_COLUMN,
        {
            title: (
                <div className='remove_axis_item_table_title' style={{ textAlign: 'center' }}>
                    <span>X Axis ratio</span>
                </div>
            ),
            dataIndex: "xAxis",
            key: "xAxis",
            render: (text) => <p className='remove_axis_item_table_data' style={{ fontSize: '14px' }}>{text}</p>,
        },
        {
            title: (
                <div className='remove_axis_item_table_title' style={{ textAlign: 'center' }}>
                    <span>Y Axis ratio</span>
                </div>
            ),
            dataIndex: "yAxis",
            key: "yAxis",
            render: (text) => <p className='remove_axis_item_table_data' style={{ textAlign: 'center', fontSize: '14px' }}>{text}</p>,
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };



    const handleCancel = () => {
        setAntdModalOpen(false)
    }

    return (
        <div>
            <Modal
                closable={false}
                maskClosable={false}
                title={
                    <div className='add_new_axis_item_modal_header'>
                        <h4 className="" >Remove Items</h4>
                    </div>
                }
                open={antdModalOpen}
                footer={null}
                modalWidth={445}
                className='add_new_axis_item_modal'
                centered={true}
            >
                <div className='add_new_axis_item_modal_body' style={{ paddingTop: '10px' }}>
                    <div className='remove_axis_item_table_wrapper'>
                        <Table
                            columns={columns}
                            rowSelection={rowSelection}
                            dataSource={tableData}
                            rowKey="_id"
                            pagination={false}
                            scroll={{ y: 445 }}
                        />
                    </div>
                    <div className='pay_now_modal_footer' style={{ marginTop: '30px' }}>
                        <ButtonComponent color='#F66' border='1px solid #F66' textColor='#fff' font='14px'>Remove</ButtonComponent>
                        <ButtonComponent onClick={handleCancel} font='14px'>Do it later</ButtonComponent>
                    </div>

                </div>
            </Modal>
        </div>
    );
};

export default RemoveRatioItemsModal;

RemoveRatioItemsModal.propTypes = {
    antdModalOpen: PropTypes.bool,
    setAntdModalOpen: PropTypes.func
};