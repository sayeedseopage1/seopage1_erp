import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { useForm } from 'react-hook-form';
import { Modal } from 'antd';
import { toast } from 'react-toastify';

const EditXAxisModal = ({ singleCriteria, axisEditItem, setChartAxisData, antdModalOpen, setAntdModalOpen }) => {

    const { lower_limit, upper_limit, limit_type, chartDataId } = axisEditItem || {}
    const { min_limit, max_limit } = singleCriteria?.data || {};


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const validateFields = (data) => {
        let isValid = true;

        if (chartDataId != 10) {
            if (Number(data.lower_limit) >= Number(data.upper_limit) || Number(data.upper_limit) < Number(data.lower_limit)) {
                toast.error('X Axis Lower Limit cannot be greater than or equal to Upper Limit');
                isValid = false;
            }

            if (Number(data.lower_limit) < Number(min_limit) || Number(data.upper_limit) > Number(max_limit)) {
                toast.error(`X Axis range must be between ${min_limit} and ${max_limit}`);
                isValid = false;
            }
        }

        return isValid;
    };

    const onSubmit = (data) => {
        if (validateFields(data)) {
            setChartAxisData((prev) => {
                const update = prev?.map(item => {
                    if (item.id === axisEditItem.id) {
                        return {
                            ...item,
                            lower_limit: parseFloat(data.lower_limit),
                            upper_limit: parseFloat(data.upper_limit)
                        }
                    }
                    return item
                })
                return update
            });
            setAntdModalOpen(false);
            reset();
        }
    };


    const handleCancel = () => {
        reset()
        setAntdModalOpen(false)
    }

    useEffect(() => {
        if (antdModalOpen) {
            reset(); // Reset the form when the modal is opened
        }
    }, [antdModalOpen, reset]); // Dependency array includes antdModalOpen and reset

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
                            {
                                chartDataId == 10 ? <p className="axis_item_modal_inputs_title" style={{ fontSize: '16px' }}>Current Condition: <span style={{ fontWeight: '500', color: '#000', fontSize: '20px' }}>{lower_limit}% & {upper_limit}%</span></p> : <p className="axis_item_modal_inputs_title" style={{ fontSize: '16px' }}>Current Value: <span style={{ fontWeight: '500', color: '#000', fontSize: '20px' }}>{lower_limit}-{limit_type == 1 ? "$" : ""}{upper_limit}{limit_type == 2 ? '%' : ''}</span></p>
                            }

                            {
                                chartDataId == 10 ? <p className='axis_item_modal_inputs_title' style={{ fontSize: '16px' }}>New X Axis condition (Percentage)</p> : <p className='axis_item_modal_inputs_title' style={{ fontSize: '16px' }}>New X Axis ratio ({limit_type == 1 ? "Amount" : "Percentage"})</p>
                            }

                            <div className='axis_item_modal_inputs_inner'>
                                <div className='w-50'>
                                    <input defaultValue={lower_limit} className='point_edit_modal_input' type='number' {...register("lower_limit", { required: true })} placeholder={`${chartDataId == 10 ? 'Previous month %' : 'Write here'}`} />

                                    {errors.lower_limit && <span style={{ color: 'red', fontSize: '12px' }}>This field is required</span>}
                                </div>

                                <div className='w-50'>
                                    <input defaultValue={upper_limit} className='point_edit_modal_input' type='number' {...register("upper_limit", { required: true })} placeholder={`${chartDataId == 10 ? 'Previous month %' : 'Write here'}`} />

                                    {errors.upper_limit && <span style={{ color: 'red', fontSize: '12px' }}>This field is required</span>}
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
    singleCriteria: PropTypes.object,
    axisEditItem: PropTypes.object,
    chartAxisData: PropTypes.array,
    setChartAxisData: PropTypes.func,
    antdModalOpen: PropTypes.bool,
    setAntdModalOpen: PropTypes.func
};