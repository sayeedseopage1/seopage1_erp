import React, { useEffect } from 'react'; // Added useEffect import
import PropTypes from "prop-types";
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { useForm } from 'react-hook-form';
import { Modal } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNewAxisItemModal = ({ singleCriteria, chartAxisData, setChartAxisData, antdModalOpen, setAntdModalOpen, chartData }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { min_limit, max_limit } = singleCriteria?.data || {};

    const validateFields = (data) => {
        let isValid = true;

        if (Number(data.lower_limit) >= Number(data.upper_limit) || Number(data.upper_limit) < Number(data.lower_limit)) {
            toast.error('X Axis Lower Limit cannot be greater than or equal to Upper Limit');
            isValid = false;
        }

        if (Number(data.lower_limit) < Number(min_limit) || Number(data.upper_limit) > Number(max_limit)) {
            toast.error(`X Axis range must be between ${min_limit} and ${max_limit}`);
            isValid = false;
        }

        return isValid;
    };

    // Make unique id
    const uniqueId = () => {
        return Math.floor(Math.random() * 1000000000).toString(32);
    };

    const onSubmit = (data) => {
        if (validateFields(data)) {
            const newData = [...chartAxisData, { ...data, id: uniqueId() }];
            setChartAxisData(newData);
            reset();
            setAntdModalOpen(false);
            toast.success('Axis item added successfully'); // Only called on successful submission
        }
    };

    const handleCancel = () => {
        setAntdModalOpen(false);
        reset(); // Reset the form when the modal is closed
    };

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
                        <h4 className="">Add New Items</h4>
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
                                <div className='w-50'>
                                    <input className='point_edit_modal_input' type='number' {...register("lower_limit", { required: true })} placeholder='Write here' />
                                    {errors.lower_limit && <span style={{ color: 'red', fontSize: '12px' }}>This field is required</span>}
                                </div>

                                <div className='w-50'>
                                    <input className='point_edit_modal_input' type='number' {...register("upper_limit", { required: true })} placeholder='Write here' />
                                    {errors.upper_limit && <span style={{ color: 'red', fontSize: '12px' }}>This field is required</span>}
                                </div>
                            </div>
                        </div>
                        <div style={{ marginBottom: '32px' }}>
                            <p className='axis_item_modal_inputs_title'>Y Axis ratio (Percentage)</p>
                            <div className='axis_item_modal_inputs_inner'>
                                <div className='w-100'>
                                    <input className='point_edit_modal_input' type='number' {...register("incentive_amount", { required: true })} placeholder='Write here ' />
                                    {errors.incentive_amount && <span style={{ color: 'red', fontSize: '12px' }}>This field is required</span>}
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
            <ToastContainer />
        </div>
    );
};

export default AddNewAxisItemModal;

AddNewAxisItemModal.propTypes = {
    antdModalOpen: PropTypes.bool,
    setAntdModalOpen: PropTypes.func,
    xAxisStartAndEndValue: PropTypes.object,
    chartAxisData: PropTypes.array,
    setChartAxisData: PropTypes.func,
    chartData: PropTypes.array,
};
