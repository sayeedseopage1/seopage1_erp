import React from 'react';
import CustomAntdModal from '../../ui/CustomAntdModal';
import PropTypes from "prop-types";
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { useForm } from 'react-hook-form';
import { useEditIncentiveTypesMutation } from '../../../../../../services/api/Pm-Sales/PmIncentiveApiSlice';
import { toast } from 'react-toastify';

const CashValuePointEditModal = ({ regularIncentiveTypes, antdModalOpen, setAntdModalOpen }) => {

    const [editIncentiveTypes, { isLoading }] = useEditIncentiveTypesMutation()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const payload = {
                title: regularIncentiveTypes?.title,
                cash_value: data.regularPoint
            }
            const response = await editIncentiveTypes({ id: regularIncentiveTypes?.id, payload }).unwrap();
            if (response?.status == 200) {
                toast.success(response.message);
                setAntdModalOpen(false)
            } else {
                toast.warning(response.message);
            }
        } catch (error) {
            toast.error("Failed to update");
        }
    }

    return (
        <div>
            <CustomAntdModal
                antdModalOpen={antdModalOpen}
                modalWidth={483}
                setAntdModalOpen={setAntdModalOpen}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="point_edit_modal_title">Cash value for every regular point:</h4>
                    <div className='point_edit_modal_content'>
                        <p className="point_edit_modal_text">Current Value: <span style={{ fontWeight: '500', color: '#000', fontSize: '20px' }}>{regularIncentiveTypes?.cash_value} Taka</span></p>
                        <p>New Value (Taka)</p>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input className='point_edit_modal_input' type='number' {...register("regularPoint", { required: true })} placeholder='Write here ' />
                        {errors.regularPoint && <span style={{ color: 'red', fontSize: '12px' }}>This field is required</span>}
                    </div>
                    <div className='pay_now_modal_footer'>
                        <ButtonComponent type='submit' color='#1492E6' textColor='#fff' font='18px'>Save</ButtonComponent>
                    </div>
                </form>
            </CustomAntdModal>
        </div>
    );
};

export default CashValuePointEditModal;

CashValuePointEditModal.propTypes = {
    antdModalOpen: PropTypes.bool,
    setAntdModalOpen: PropTypes.func
};