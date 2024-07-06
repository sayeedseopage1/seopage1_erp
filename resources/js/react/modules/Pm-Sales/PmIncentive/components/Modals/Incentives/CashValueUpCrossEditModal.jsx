import React from 'react';
import CustomAntdModal from '../../ui/CustomAntdModal';
import PropTypes from "prop-types";
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { useForm } from 'react-hook-form';
import { useEditIncentiveTypesMutation } from '../../../../../../services/api/Pm-Sales/PmIncentiveApiSlice';
import { toast } from 'react-toastify';

const CashValueUpCrossEditModal = ({ upSaleCrossSaleTypes, antdModalOpen, setAntdModalOpen }) => {

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
                title: upSaleCrossSaleTypes?.title,
                cash_value: data?.upsaleCrossSalePoint
            }
            const response = await editIncentiveTypes({ id: upSaleCrossSaleTypes?.id, payload }).unwrap();
            if (response?.status == 200) {
                toast.success('Upsale/Cross sale point cash value updated successfully');
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
                modalWidth={576}
                setAntdModalOpen={setAntdModalOpen}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="point_edit_modal_title">Cash value of every upsale/cross sale point:</h4>
                    <div className='point_edit_modal_content'>
                        <p className="point_edit_modal_text">Current Value: <span style={{ fontWeight: '500', color: '#000', fontSize: '20px' }}>{parseFloat(upSaleCrossSaleTypes?.cash_value)} Taka</span></p>
                        <p>New Value (Taka)</p>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input className='point_edit_modal_input' defaultValue={parseFloat(upSaleCrossSaleTypes?.cash_value)} type='number' {...register("upsaleCrossSalePoint", { required: true })} placeholder='Write here ' />
                        {errors.upsaleCrossSalePoint && <span style={{ color: 'red', fontSize: '12px' }}>This field is required</span>}
                    </div>
                    <div className='pay_now_modal_footer'>
                        <ButtonComponent type='submit' color='#1492E6' textColor='#fff' font='18px'>
                            {
                                isEditIncentiveTypesLoading ? 'Loading...' : 'Save'
                            }
                        </ButtonComponent>
                    </div>
                </form>
            </CustomAntdModal>
        </div>
    );
};

export default CashValueUpCrossEditModal;

CashValueUpCrossEditModal.propTypes = {
    upSaleCrossSaleTypes: PropTypes.object,
    antdModalOpen: PropTypes.bool,
    setAntdModalOpen: PropTypes.func
};