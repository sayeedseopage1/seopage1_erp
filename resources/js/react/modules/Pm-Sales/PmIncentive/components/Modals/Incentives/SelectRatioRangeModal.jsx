import React from 'react';
import PropTypes from "prop-types";
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { useForm } from 'react-hook-form';
import { Modal } from 'antd';

const SelectRatioRangeModal = ({ antdModalOpen, setAntdModalOpen }) => {

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
                        <h4 className="" >Select Range</h4>
                    </div>
                }
                open={antdModalOpen}
                footer={null}
                modalWidth={422}
                className='add_new_axis_item_modal'
                centered={true}
            >
                <div className='add_new_axis_item_modal_body'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className='select_ratio_range_modal_inputs'>
                                <p className="axis_item_modal_inputs_title" style={{ marginBottom: '0' }}>Starting Point (X Axis)</p>
                                <div className='d-flex align-items-center'>
                                    <input className='point_edit_modal_input' style={{ width: '96px' }} type='number' {...register("xAxisStartPoint", { required: true })} />
                                    <span className='axis_item_modal_inputs_title' style={{ margin: '0 0 0 7px' }}>%</span>
                                </div>
                            </div>
                            {errors.xAxisStartPoint && <p style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>This field is required</p>}
                            <div className='select_ratio_range_modal_inputs' style={{ marginTop: '18px' }}>
                                <p className="axis_item_modal_inputs_title" style={{ marginBottom: '0' }}>Ending Point (X Axis)</p>
                                <div className='d-flex align-items-center'>
                                    <input className='point_edit_modal_input' style={{ width: '96px' }} type='number' {...register("xAxisEndPoint", { required: true })} />
                                    <span className='axis_item_modal_inputs_title' style={{ margin: '0 0 0 7px' }}>%</span>
                                </div>
                            </div>
                            {errors.xAxisEndPoint && <p style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>This field is required</p>}
                        </div>
                        <div className='pay_now_modal_footer' style={{ marginTop: '18px' }}>
                            <ButtonComponent type='submit' color='#1492E6' textColor='#fff' font='14px'>Save</ButtonComponent>
                            <ButtonComponent onClick={handleCancel} font='14px'>Do it later</ButtonComponent>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default SelectRatioRangeModal;

SelectRatioRangeModal.propTypes = {
    antdModalOpen: PropTypes.bool,
    setAntdModalOpen: PropTypes.func
};