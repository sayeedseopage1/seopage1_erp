import { Modal } from 'antd';
import React, { useState } from 'react';
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { RxCross1 } from "react-icons/rx";
import AddNewAxisItemModal from './AddNewAxisItemModal';
import EditXAxisModal from './EditXAxisModal';
import EditYAxisModal from './EditYAxisModal';
import SelectRatioRangeModal from './SelectRatioRangeModal';
import RemoveRatioItemsModal from './RemoveRatioItemsModal';

const ChartIdealVsAchievedEditModal = ({ antdModalOpen, showIdealVsAchievedEditModal, chartData }) => {
    // console.log(chartData)

    // Modal states for each modal
    const [addNewAxisDataModalOpen, setAddNewAxisDataModalOpen] = useState(false);
    const [editXAxisDataModalOpen, setEditXAxisDataModalOpen] = useState(false);
    const [editYAxisDataModalOpen, setEditYAxisDataModalOpen] = useState(false);
    const [selectRatioRange, setSelectRatioRange] = useState(false);
    const [removeRatioItemsModalOpen, setRemoveRatioItemsModalOpen] = useState(false);


    // x axis and y axis data state
    const [chartAxisData, setChartAxisData] = useState([
        {
            id: '1',
            xAxisLowerLimit: 0,
            xAxisUpperLimit: 10,
            yAxis: 100,
        },
        {
            id: '2',
            xAxisLowerLimit: 10,
            xAxisUpperLimit: 20,
            yAxis: 80,
        },
    ])

    // Function to close the modal visibility
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
                {/* Modal Top */}
                <div className='edit_chart_data_modal_top'>
                    <div className='ideal_vs_achieved_chart_data_actions'>
                        <div className='ideal_vs_achieved_chart_data_actions_buttons'>
                            <button onClick={() => setAddNewAxisDataModalOpen(true)} className='chart_data_add'>Add</button>
                            <button onClick={() => setRemoveRatioItemsModalOpen(true)} className='chart_data_remove'>Remove</button>
                        </div>
                        <button onClick={() => setSelectRatioRange(true)} className='ideal_vs_achieved_chart_data_actions_range'>Select Range</button>
                    </div>
                    <div className='ideal_vs_achieved_axis_data'>
                        <p>Starting Point (X Axis): <span>0</span>%</p>
                        <p>Ending Point (X Axis): <span>100</span>%</p>
                    </div>
                </div>

                {/* Modal Content */}
                <div className='edit_chart_data_modal_content' style={{ padding: "28px 0 0 0" }}>
                    <h3 className='edit_chart_data_sub_title'>X Axis Ratio</h3>
                    <h3 className='edit_chart_data_sub_title'>Y Axis Ratio</h3>
                </div>

                <div className='edit_chart_data_modal_content_wrapper'>
                    {
                        chartAxisData?.map((item, ind) => (
                            <div key={item?.id} className='edit_chart_data_modal_content ratio_card'>
                                <div className='ratio_wrapper'>
                                    <p className='ratio_text'>{item?.xAxisLowerLimit}-{item?.xAxisUpperLimit}%</p>
                                    <button onClick={() => setEditXAxisDataModalOpen(true)} className='ratio_edit_button'>Edit</button>

                                </div>
                                <div className='ratio_wrapper'>
                                    <p className='ratio_text'>{item?.yAxis}%</p>
                                    <button onClick={() => setEditYAxisDataModalOpen(true)} className='ratio_edit_button'>Edit</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Modal Footer */}
            <div className='pay_now_modal_footer'>
                <ButtonComponent color='#1492E6' textColor='#fff' font='18px'>Save</ButtonComponent>
                <ButtonComponent onClick={handleCancel} font='18px'>Do it later</ButtonComponent>
            </div>

            {/* Modals for each modal */}
            <AddNewAxisItemModal antdModalOpen={addNewAxisDataModalOpen} setAntdModalOpen={setAddNewAxisDataModalOpen} />
            <EditXAxisModal antdModalOpen={editXAxisDataModalOpen} setAntdModalOpen={setEditXAxisDataModalOpen} />
            <EditYAxisModal antdModalOpen={editYAxisDataModalOpen} setAntdModalOpen={setEditYAxisDataModalOpen} />
            <SelectRatioRangeModal antdModalOpen={selectRatioRange} setAntdModalOpen={setSelectRatioRange} />
            <RemoveRatioItemsModal antdModalOpen={removeRatioItemsModalOpen} setAntdModalOpen={setRemoveRatioItemsModalOpen} />

        </Modal>
    );
};

export default ChartIdealVsAchievedEditModal;