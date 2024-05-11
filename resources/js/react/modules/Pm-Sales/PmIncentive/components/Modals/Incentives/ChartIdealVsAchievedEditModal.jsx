import { Modal } from 'antd';
import React from 'react';
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { RxCross1 } from "react-icons/rx";

const ChartIdealVsAchievedEditModal = ({ antdModalOpen, showIdealVsAchievedEditModal, chartData }) => {
    console.log(chartData)

    const handleCancel = () => {
        showIdealVsAchievedEditModal();  // Assuming this function toggles the modal's visibility
    }

    return (
        <Modal className='pay_now_modal'
            closable={false}
            maskClosable={false}
            title={
                <div className='pay_now_modal_header'>
                    <p className='pay_now_title'>Ideal vs Achieved</p>
                    <button className='incentives_modal_close' onClick={handleCancel}>
                        <RxCross1 size={20} />
                    </button>
                </div>
            }
            open={antdModalOpen}
            width={528}
            footer={null}
        >
            <div className='pay_now_modal_body' style={{ paddingTop: "0px" }}>
                <div className='edit_chart_data_modal_top'>
                    <div className='ideal_vs_achieved_chart_data_actions'>
                        <div className='ideal_vs_achieved_chart_data_actions_buttons'>
                            <button className='chart_data_add'>Add</button>
                            <button className='chart_data_remove'>Remove</button>
                        </div>
                        <button className='ideal_vs_achieved_chart_data_actions_range'>Select Range</button>
                    </div>
                    <div className='ideal_vs_achieved_axis_data'>
                        <p>Starting Point (X Axis): <span>0</span>%</p>
                        <p>Ending Point (X Axis): <span>100</span>%</p>
                    </div>
                </div>
                <div className='edit_chart_data_modal_content' style={{ padding: "28px 0 0 0" }}>
                    <h3 className='edit_chart_data_sub_title'>X Axis Ratio</h3>
                    <h3 className='edit_chart_data_sub_title'>Y Axis Ratio</h3>
                </div>

                <div className='edit_chart_data_modal_content_wrapper'>
                    <div className='edit_chart_data_modal_content ratio_card'>
                        <div className='ratio_wrapper'>
                            <p className='ratio_text'>0-10%</p>
                            <button className='ratio_edit_button'>Edit</button>
                        </div>
                        <div className='ratio_wrapper'>
                            <p className='ratio_text'>100%</p>
                            <button className='ratio_edit_button'>Edit</button>
                        </div>
                    </div>
                    <div className='edit_chart_data_modal_content ratio_card'>
                        <div className='ratio_wrapper'>
                            <p className='ratio_text'>0-10%</p>
                            <button className='ratio_edit_button'>Edit</button>
                        </div>
                        <div className='ratio_wrapper'>
                            <p className='ratio_text'>100%</p>
                            <button className='ratio_edit_button'>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pay_now_modal_footer'>
                <ButtonComponent color='#1492E6' textColor='#fff' font='18px'>Save</ButtonComponent>
                <ButtonComponent onClick={handleCancel} font='18px'>Do it later</ButtonComponent>
            </div>
        </Modal>
    );
};

export default ChartIdealVsAchievedEditModal;