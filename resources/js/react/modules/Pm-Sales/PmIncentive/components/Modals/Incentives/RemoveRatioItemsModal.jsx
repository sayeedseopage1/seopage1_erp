import React, { useState } from 'react';
import PropTypes from "prop-types";
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { Modal, Table } from 'antd';
import { useDeleteIncentiveFactorMutation } from '../../../../../../services/api/Pm-Sales/PmIncentiveApiSlice';

const RemoveRatioItemsModal = ({ chartAxisData, setChartAxisData, antdModalOpen, setAntdModalOpen, setIsAllItemsRemoved }) => {
    const [selectedRowKeysState, setSelectedRowKeysState] = useState([]);

    const [deleteIncentiveFactor, { isLoading: isDeleteIncentiveFactorLoading }] = useDeleteIncentiveFactorMutation()


    const columns = [
        Table.SELECTION_COLUMN,
        {
            title: (
                <div className='remove_axis_item_table_title' style={{ textAlign: 'center' }}>
                    <span>X Axis ratio</span>
                </div>
            ),
            dataIndex: "lower_limit", // Changed the dataIndex
            key: "lower_limit", // Changed the key
            render: (_text, record) => record?.chartDataId == 10 ?
                <p className='remove_axis_item_table_data' style={{ fontSize: '14px' }}><span title='Previous month %'>{record?.lower_limit}%</span> & <span title='Current month %'>{record?.upper_limit}%</span></p>
                :
                <p className='remove_axis_item_table_data' style={{ fontSize: '14px' }}>{record?.lower_limit}-{record?.limit_type == 1 ? "$" : ""}{record?.upper_limit}{record?.limit_type == 2 ? "%" : ""}</p>


            /* render: (_text, record) => <p className='remove_axis_item_table_data' style={{ fontSize: '14px' }}>{record?.lower_limit}-{record?.limit_type == 1 ? '$' : ''}{record?.upper_limit}{record?.limit_type == 2 ? '%' : ''}</p>, */
        },
        {
            title: (
                <div className='remove_axis_item_table_title' style={{ textAlign: 'center' }}>
                    <span>Y Axis ratio</span>
                </div>
            ),
            dataIndex: "incentive_amount",
            key: "incentive_amount",
            render: (text, record) => <p className='remove_axis_item_table_data' style={{ textAlign: 'center', fontSize: '14px' }}>{text}{record?.incentive_amount_type == 1 ? '' : '%'}</p>,
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeysState(selectedRowKeys);
            setIsAllItemsRemoved(selectedRowKeys?.length == chartAxisData?.length);
        },
        selectedRowKeys: selectedRowKeysState,
    };

    const handleRemove = async () => {
        const selectedIdsForRemoteDelete = selectedRowKeysState?.filter(id => !isNaN(id));

        // Awaiting all deletions to complete before updating the state
        await Promise.all(selectedIdsForRemoteDelete?.map(id => deleteIncentiveFactor(id).unwrap()));

        // Updating chartAxisData and clearing selectedRowKeysState after deletion
        const updatedChartAxisData = chartAxisData?.filter(item => !selectedRowKeysState?.includes(item?.id));
        setChartAxisData(updatedChartAxisData);
        setSelectedRowKeysState([]); // Clearing selectedRowKeysState
        setAntdModalOpen(false);
    };


    const handleCancel = () => {
        setAntdModalOpen(false);
        setSelectedRowKeysState([]); // Clearing selectedRowKeysState on cancel
    };

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
                        <ButtonComponent disabled={isDeleteIncentiveFactorLoading} onClick={handleRemove} color='#F66' border='1px solid #F66' textColor='#fff' font='14px'>{
                            isDeleteIncentiveFactorLoading ? 'Removing...' : 'Remove'
                        }</ButtonComponent>
                        <ButtonComponent disabled={isDeleteIncentiveFactorLoading} onClick={handleCancel} font='14px'>Do it later</ButtonComponent>
                    </div>

                </div>
            </Modal>
        </div>
    );
};

export default RemoveRatioItemsModal;

RemoveRatioItemsModal.propTypes = {
    chartAxisData: PropTypes.array.isRequired,
    setChartAxisData: PropTypes.func.isRequired,
    antdModalOpen: PropTypes.bool.isRequired,
    setAntdModalOpen: PropTypes.func.isRequired,
    setIsAllItemsRemoved: PropTypes.func
};