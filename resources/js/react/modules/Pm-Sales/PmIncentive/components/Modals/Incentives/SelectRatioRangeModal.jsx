import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { useForm } from 'react-hook-form';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { useEditIncentiveCriteriaMutation } from '../../../../../../services/api/Pm-Sales/PmIncentiveApiSlice';

const SelectRatioRangeModal = ({ singleCriteria, chartDataId, antdModalOpen, setAntdModalOpen, singleCriteriaLimitType }) => {
    const [editIncentiveCriteria, { isLoading: isEditIncentiveCriteriaLoading }] = useEditIncentiveCriteriaMutation()

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        if (Number(data?.min_limit) >= Number(data?.max_limit)) {
            toast.error('Starting Point (X Axis) cannot be greater than or equal to Ending Point (X Axis)')
            return
        }

        try {
            const payload = {
                min_limit: parseFloat(data?.min_limit),
                max_limit: parseFloat(data?.max_limit),
            }
            const response = await editIncentiveCriteria({ id: chartDataId, payload }).unwrap();
            if (response?.status == 200) {
                // toast.success(response.message);
                toast.success('X Axis range updated successfully');
                reset();
                setAntdModalOpen(false)
            } else {
                toast.warning(response.message);
            }
        } catch (error) {
            toast.error("Failed to update");
        }


        // setXAxisStartAndEndValue(data)

        reset()
        setAntdModalOpen(false)
    }

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
                                    <input defaultValue={parseFloat(singleCriteria?.data?.min_limit)} className='point_edit_modal_input' style={{ width: '96px' }} type='number' {...register("min_limit", { required: true })} />
                                    <span className='axis_item_modal_inputs_title' style={{ margin: '0 0 0 7px' }}>{singleCriteriaLimitType == 1 ? "$" : "%"}</span>
                                </div>
                            </div>
                            {errors.min_limit && <p style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>This field is required</p>}
                            <div className='select_ratio_range_modal_inputs' style={{ marginTop: '18px' }}>
                                <p className="axis_item_modal_inputs_title" style={{ marginBottom: '0' }}>Ending Point (X Axis)</p>
                                <div className='d-flex align-items-center'>
                                    <input defaultValue={parseFloat(singleCriteria?.data?.max_limit)} className='point_edit_modal_input' style={{ width: '96px' }} type='number' {...register("max_limit", { required: true })} />
                                    <span className='axis_item_modal_inputs_title' style={{ margin: '0 0 0 7px' }}>{singleCriteriaLimitType == 1 ? "$" : "%"}</span>
                                </div>
                            </div>
                            {errors.max_limit && <p style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>This field is required</p>}
                        </div>
                        <div className='pay_now_modal_footer' style={{ marginTop: '18px' }}>
                            <ButtonComponent disabled={isEditIncentiveCriteriaLoading} type='submit' color='#1492E6' textColor='#fff' font='14px'>{isEditIncentiveCriteriaLoading ? 'Saving...' : 'Save'}</ButtonComponent>
                            <ButtonComponent disabled={isEditIncentiveCriteriaLoading} onClick={handleCancel} font='14px'>Do it later</ButtonComponent>
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