// ! This is deprecated Component. Use new one.


import React from 'react';
import CustomAntdModal from '../../ui/CustomAntdModal';
import PropTypes from "prop-types";
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';

const EditChartDataModal = ({ chartData, antdModalOpen, setAntdModalOpen }) => {

    console.log(chartData)

    return (
        <div>
            <CustomAntdModal
                // title="Ideal Vs Achieved"
                antdModalOpen={antdModalOpen}
                modalWidth={817}
                setAntdModalOpen={setAntdModalOpen}
            >
                <h1 className="edit_chart_data_modal_title">Ideal Vs Achieved</h1>
                <div className='edit_chart_data_modal_content'>
                    <div>
                        <h3 className='edit_chart_data_sub_title'>X Axis Ratio</h3>
                        <div>
                            <div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className='edit_chart_data_sub_title'>Y Axis Ratio</h3>
                        <div>
                            forms here...
                        </div>
                    </div>
                </div>
                <div className='pay_now_modal_footer'>
                    <ButtonComponent color='#1492E6' textColor='#fff' font='18px'>Save</ButtonComponent>
                    <ButtonComponent onClick={() => setAntdModalOpen(false)} font='18px'>Do it later</ButtonComponent>
                </div>
            </CustomAntdModal>
        </div>
    );
};

export default EditChartDataModal;

EditChartDataModal.propTypes = {
    antdModalOpen: PropTypes.bool,
    setAntdModalOpen: PropTypes.func
};