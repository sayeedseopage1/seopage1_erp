import React from 'react';
import CustomAntdModal from '../../ui/CustomAntdModal';
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { useForm } from 'react-hook-form';
import { useEditIncentiveTypesMutation } from '../../../../../../services/api/Pm-Sales/PmIncentiveApiSlice';
import { toast } from 'react-toastify';
import propTypes from "prop-types";

const CashValueBonusEditModal = ({ bonusIncentiveTypes, antdModalOpen, setAntdModalOpen }) => {

    const [editIncentiveTypes, { isLoading: isEditIncentiveTypesLoading }] = useEditIncentiveTypesMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const payload = {
                title: bonusIncentiveTypes?.title,
                cash_value: data.bonusPoint
            }
            const response = await editIncentiveTypes({ id: bonusIncentiveTypes?.id, payload }).unwrap();
            if (response?.status == 200) {
                toast.success(response.message);
                reset();
                setAntdModalOpen(false)
            } else {
                toast.warning(response.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to update");
        }
    }

    return (
        <div>
            <CustomAntdModal
                antdModalOpen={antdModalOpen}
                modalWidth={474}
                setAntdModalOpen={setAntdModalOpen}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="point_edit_modal_title">Cash value of every bonus  point:</h4>
                    <div className='point_edit_modal_content'>
                        <p className="point_edit_modal_text">Current Value: <span style={{ fontWeight: '500', color: '#000', fontSize: '20px' }}>{parseFloat(bonusIncentiveTypes?.cash_value)} Taka</span></p>
                        <p>New Value (Taka)</p>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input className='point_edit_modal_input' type='number' defaultValue={parseFloat(bonusIncentiveTypes?.cash_value)} {...register("bonusPoint", { required: true })} placeholder='Write here ' />
                        {errors.bonusPoint && <span style={{ color: 'red', fontSize: '12px' }}>This field is required</span>}
                    </div>
                    <div className='pay_now_modal_footer'>
                        <ButtonComponent type='submit' color='#1492E6' textColor='#fff' font='18px'>
                            {isEditIncentiveTypesLoading ? 'Loading...' : 'Save'}
                        </ButtonComponent>
                    </div>
                </form>
            </CustomAntdModal>
        </div>
    );
};

export default CashValueBonusEditModal;

CashValueBonusEditModal.propTypes = {
    bonusIncentiveTypes: propTypes.object,
    antdModalOpen: propTypes.bool,
    setAntdModalOpen: propTypes.func
};