import React, { useState } from 'react';
import PropTypes from "prop-types";
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { Modal, Table } from 'antd';

const RemoveRatioItemsModal = ({ chartAxisData, setChartAxisData, antdModalOpen, setAntdModalOpen }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);


    const columns = [
        Table.SELECTION_COLUMN,
        {
            title: (
                <div className='remove_axis_item_table_title' style={{ textAlign: 'center' }}>
                    <span>X Axis ratio</span>
                </div>
            ),
            dataIndex: "xAxisLowerLimit", // Changed the dataIndex
            key: "xAxisLowerLimit", // Changed the key
            render: (_text, record) => <p className='remove_axis_item_table_data' style={{ fontSize: '14px' }}>{record.xAxisLowerLimit}-{record.xAxisUpperLimit}%</p>,
        },
        {
            title: (
                <div className='remove_axis_item_table_title' style={{ textAlign: 'center' }}>
                    <span>Y Axis ratio</span>
                </div>
            ),
            dataIndex: "yAxisRatio",
            key: "yAxisRatio",
            render: (text) => <p className='remove_axis_item_table_data' style={{ textAlign: 'center', fontSize: '14px' }}>{text}%</p>,
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    const handleRemove = () => {
        setChartAxisData(chartAxisData.filter(item => !selectedRowKeys.includes(item.id)))
        setAntdModalOpen(false)
    }




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
                            dataSource={chartAxisData}
                            rowKey="id"
                            pagination={false}
                            scroll={{ y: 445 }}
                        />
                    </div>
                    <div className='pay_now_modal_footer' style={{ marginTop: '30px' }}>
                        <ButtonComponent onClick={handleRemove} color='#F66' border='1px solid #F66' textColor='#fff' font='14px'>Remove</ButtonComponent>
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