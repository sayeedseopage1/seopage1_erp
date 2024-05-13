import React from 'react';
import CustomAntdModal from '../../ui/CustomAntdModal';
import PropTypes from "prop-types";
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { useForm } from 'react-hook-form';
import { Modal } from 'antd';

const AddNewAxisItemModal = ({ antdModalOpen, setAntdModalOpen, chartData }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
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
                        <h4 className="" >Add New Items</h4>
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
                            <p className='axis_item_modal_inputs_title'>X Axis ratio (Percentage)</p>
                            <div className='axis_item_modal_inputs_inner'>
                                <div>
                                    <input className='point_edit_modal_input' type='number' {...register("xAxisLowerLimit", { required: true })} placeholder='Write here ' />

                                    {errors.xAxisLowerLimit && <span style={{ color: 'red', fontSize: '12px' }}>This field is required</span>}
                                </div>

                                <div>
                                    <input className='point_edit_modal_input' type='number' {...register("xAxisUpperLimit", { required: true })} placeholder='Write here ' />

                                    {errors.xAxisUpperLimit && <span style={{ color: 'red', fontSize: '12px' }}>This field is required</span>}
                                </div>
                            </div>
                        </div>
                        <div style={{ marginBottom: '32px' }}>
                            <p className='axis_item_modal_inputs_title'>Y Axis ratio (Percentage)</p>
                            <div className='axis_item_modal_inputs_inner'>
                                <div className='w-100'>
                                    <input className='point_edit_modal_input' type='number' {...register("yAxisRation", { required: true })} placeholder='Write here ' />
                                    {errors.yAxisRation && <span style={{ color: 'red', fontSize: '12px' }}>This field is required</span>}
                                </div>
                            </div>
                        </div>
                        <div className='pay_now_modal_footer'>
                            <ButtonComponent type='submit' color='#1492E6' textColor='#fff' font='14px'>Add Now</ButtonComponent>
                            <ButtonComponent onClick={handleCancel} font='14px'>Do it later</ButtonComponent>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default AddNewAxisItemModal;

AddNewAxisItemModal.propTypes = {
    antdModalOpen: PropTypes.bool,
    setAntdModalOpen: PropTypes.func
};