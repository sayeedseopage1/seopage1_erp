import React from 'react';
import PropTypes from "prop-types";
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { useForm } from 'react-hook-form';
import { Modal } from 'antd';

const EditXAxisModal = ({ axisEditItem, chartAxisData, setChartAxisData, antdModalOpen, setAntdModalOpen }) => {

    const { xAxisLowerLimit, xAxisUpperLimit } = axisEditItem || {}

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);
        const newData = {
            ...axisEditItem,
            xAxisLowerLimit: data.xAxisLowerLimit,
            xAxisUpperLimit: data.xAxisUpperLimit
        };

        // Filter out items that need to be removed
        const filteredData = chartAxisData.filter(item => item.id !== axisEditItem.id);

        // Concatenate newData with filteredData
        setChartAxisData([...filteredData, newData]);
        setAntdModalOpen(false);
        reset();
    };


    const handleCancel = () => {
        setAntdModalOpen(false)
        reset()
    }

    return (
        <div>
            <Modal
                closable={false}
                maskClosable={false}
                title={
                    <div className='add_new_axis_item_modal_header'>
                        <h4 className="" >Edit X Axis Ratio</h4>
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
                            <p className="axis_item_modal_inputs_title" style={{ fontSize: '16px' }}>Current Value: <span style={{ fontWeight: '500', color: '#000', fontSize: '20px' }}>{xAxisLowerLimit}-{xAxisUpperLimit}%</span></p>
                            <p className='axis_item_modal_inputs_title' style={{ fontSize: '16px' }}>New X Axis ratio (Percentage)</p>
                            <div className='axis_item_modal_inputs_inner'>
                                <div className='w-50'>
                                    <input defaultValue={xAxisLowerLimit} className='point_edit_modal_input' type='number' {...register("xAxisLowerLimit", { required: true })} placeholder='Write here ' />

                                    {errors.xAxisLowerLimit && <span style={{ color: 'red', fontSize: '12px' }}>This field is required</span>}
                                </div>

                                <div className='w-50'>
                                    <input defaultValue={xAxisUpperLimit} className='point_edit_modal_input' type='number' {...register("xAxisUpperLimit", { required: true })} placeholder='Write here ' />

                                    {errors.xAxisUpperLimit && <span style={{ color: 'red', fontSize: '12px' }}>This field is required</span>}
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

export default EditXAxisModal;

EditXAxisModal.propTypes = {
    antdModalOpen: PropTypes.bool,
    setAntdModalOpen: PropTypes.func
};