import { Modal } from 'antd';
import React, { useState } from 'react';
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { RxCross1 } from "react-icons/rx";
import AddNewAxisItemModal from './AddNewAxisItemModal';
import EditXAxisModal from './EditXAxisModal';
import EditYAxisModal from './EditYAxisModal';
import SelectRatioRangeModal from './SelectRatioRangeModal';

const ChartIdealVsAchievedEditModal = ({ antdModalOpen, showIdealVsAchievedEditModal, chartData }) => {
    // console.log(chartData)
    const [addNewAxisDataModalOpen, setAddNewAxisDataModalOpen] = useState(false);
    const [editXAxisDataModalOpen, setEditXAxisDataModalOpen] = useState(false);
    const [editYAxisDataModalOpen, setEditYAxisDataModalOpen] = useState(false);
    const [selectRatioRange, setSelectRatioRange] = useState(false);

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
            centered={true}
        >
            <div className='pay_now_modal_body' style={{ paddingTop: "0px" }}>
                <div className='edit_chart_data_modal_top'>
                    <div className='ideal_vs_achieved_chart_data_actions'>
                        <div className='ideal_vs_achieved_chart_data_actions_buttons'>
                            <button onClick={() => setAddNewAxisDataModalOpen(true)} className='chart_data_add'>Add</button>
                            <button className='chart_data_remove'>Remove</button>
                        </div>
                        <button onClick={() => setSelectRatioRange(true)} className='ideal_vs_achieved_chart_data_actions_range'>Select Range</button>
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
                            <button onClick={() => setEditXAxisDataModalOpen(true)} className='ratio_edit_button'>Edit</button>

                        </div>
                        <div className='ratio_wrapper'>
                            <p className='ratio_text'>100%</p>
                            <button onClick={() => setEditYAxisDataModalOpen(true)} className='ratio_edit_button'>Edit</button>

                        </div>
                    </div>
                    <div className='edit_chart_data_modal_content ratio_card'>
                        <div className='ratio_wrapper'>
                            <p className='ratio_text'>0-10%</p>
                            <button onClick={() => setEditXAxisDataModalOpen(true)} className='ratio_edit_button'>Edit</button>
                        </div>
                        <div className='ratio_wrapper'>
                            <p className='ratio_text'>100%</p>
                            <button onClick={() => setEditYAxisDataModalOpen(true)} className='ratio_edit_button'>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pay_now_modal_footer'>
                <ButtonComponent color='#1492E6' textColor='#fff' font='18px'>Save</ButtonComponent>
                <ButtonComponent onClick={handleCancel} font='18px'>Do it later</ButtonComponent>
            </div>
            <AddNewAxisItemModal antdModalOpen={addNewAxisDataModalOpen} setAntdModalOpen={setAddNewAxisDataModalOpen} />
            <EditXAxisModal antdModalOpen={editXAxisDataModalOpen} setAntdModalOpen={setEditXAxisDataModalOpen} />
            <EditYAxisModal antdModalOpen={editYAxisDataModalOpen} setAntdModalOpen={setEditYAxisDataModalOpen} />
            <SelectRatioRangeModal antdModalOpen={selectRatioRange} setAntdModalOpen={setSelectRatioRange} />

        </Modal>
    );
};

export default ChartIdealVsAchievedEditModal;