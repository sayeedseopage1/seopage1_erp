import React from 'react';
import PropTypes from "prop-types";
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { useForm } from 'react-hook-form';
import { Modal } from 'antd';

const EditYAxisModal = ({ axisEditItem, chartAxisData, setChartAxisData, antdModalOpen, setAntdModalOpen }) => {

    const { yAxisRatio } = axisEditItem || {}

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const newData = {
            ...axisEditItem,
            yAxisRatio: data.yAxisRatio,
        };

        // Filter out items that need to be removed
        const filteredData = chartAxisData.filter(item => item.id !== axisEditItem.id);

        // Concatenate newData with filteredData
        setChartAxisData([...filteredData, newData]);
        setAntdModalOpen(false);
        reset();
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
                        <h4 className="" >Edit Y Axis Ratio</h4>
                    </div>
                }
                open={antdModalOpen}
                footer={null}
                modalWidth={445}
                className='add_new_axis_item_modal'
                centered={true}
            >
                <div className='add_new_axis_item_modal_body'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ marginBottom: '32px' }}>
                            {/* <p className='axis_item_modal_inputs_title'>X Axis ratio (Percentage)</p> */}
                            <p className="axis_item_modal_inputs_title" style={{ fontSize: '16px' }}>Current Percentage: <span style={{ fontWeight: '500', color: '#000', fontSize: '20px' }}>{yAxisRatio}%</span></p>
                            <p className='axis_item_modal_inputs_title' style={{ fontSize: '16px' }}>New Percentage</p>
                            <div className='axis_item_modal_inputs_inner'>
                                <div className='w-100'>
                                    <input defaultValue={yAxisRatio} className='point_edit_modal_input' type='number' {...register("yAxisRatio", { required: true })} placeholder='Write here' />
                                    {errors.yAxisRatio && <span style={{ color: 'red', fontSize: '12px' }}>This field is required</span>}
                                </div>
                            </div>
                        </div>
                        <div className='pay_now_modal_footer'>
                            <ButtonComponent type='submit' color='#1492E6' textColor='#fff' font='14px'>Save</ButtonComponent>
                            <ButtonComponent onClick={handleCancel} font='14px'>Do it later</ButtonComponent>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default EditYAxisModal;

EditYAxisModal.propTypes = {
    antdModalOpen: PropTypes.bool,
    setAntdModalOpen: PropTypes.func
};