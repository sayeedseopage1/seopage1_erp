import { Empty, Modal } from 'antd';
import React, { useState } from 'react';
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import { RxCross1 } from "react-icons/rx";
import AddNewAxisItemModal from './AddNewAxisItemModal';
import EditXAxisModal from './EditXAxisModal';
import EditYAxisModal from './EditYAxisModal';
import SelectRatioRangeModal from './SelectRatioRangeModal';
import RemoveRatioItemsModal from './RemoveRatioItemsModal';
import { toast } from 'react-toastify';

const ChartIdealVsAchievedEditModal = ({ antdModalOpen, showIdealVsAchievedEditModal, chartData }) => {
    // console.log(chartData)

    // Modal states for each modal
    const [addNewAxisDataModalOpen, setAddNewAxisDataModalOpen] = useState(false);
    const [editXAxisDataModalOpen, setEditXAxisDataModalOpen] = useState(false);
    const [editYAxisDataModalOpen, setEditYAxisDataModalOpen] = useState(false);
    const [selectRatioRange, setSelectRatioRange] = useState(false);
    const [removeRatioItemsModalOpen, setRemoveRatioItemsModalOpen] = useState(false);

    //state for x axis and y axis edit 
    const [axisEditItem, setAxisEditItem] = useState({})
    // x axis and y axis data state
    const [chartAxisData, setChartAxisData] = useState([
        {
            id: '1',
            xAxisLowerLimit: 5,
            xAxisUpperLimit: 15,
            yAxisRatio: 100,
        },
        {
            id: '2',
            xAxisLowerLimit: 10,
            xAxisUpperLimit: 50,
            yAxisRatio: 80,
        },
        {
            id: '3',
            xAxisLowerLimit: 50,
            xAxisUpperLimit: 80,
            yAxisRatio: 50,
        },
        {
            id: '4',
            xAxisLowerLimit: 90,
            xAxisUpperLimit: 95,
            yAxisRatio: 50,
        },
    ])

    const [xAxisStartAndEndValue, setXAxisStartAndEndValue] = useState({
        xAxisStaring: 0,
        xAxisEnding: 100
    })

    // Function to close the modal visibility
    const handleCancel = () => {
        showIdealVsAchievedEditModal();  // Assuming this function toggles the modal's visibility
    }

    const xAxisEditHandler = (item) => {
        setAxisEditItem(item)
        setEditXAxisDataModalOpen(true)
    }
    const yAxisEditHandler = (item) => {
        setAxisEditItem(item)
        setEditYAxisDataModalOpen(true)
    }

    //submit
    const handleChartDataSave = () => {
        // Sort chartAxisData based on xAxisLowerLimit
        const sortedChartData = chartAxisData.sort((a, b) => a.xAxisLowerLimit - b.xAxisLowerLimit);

        // Validation 0: Check if starting point is valid
        if ((sortedChartData[0].xAxisLowerLimit < xAxisStartAndEndValue.xAxisStaring) || (sortedChartData[sortedChartData.length - 1].xAxisUpperLimit > xAxisStartAndEndValue.xAxisEnding)) {
            toast.error(`X Axis range must be between ${xAxisStartAndEndValue?.xAxisStaring} and ${xAxisStartAndEndValue?.xAxisEnding}`);
            return;
        }

        // Validation 1: Check if starting point is less than the minimum xAxisLowerLimit
        if (sortedChartData.length > 0 && sortedChartData[0].xAxisLowerLimit > xAxisStartAndEndValue.xAxisStaring) {
            toast.error('Starting Point (X Axis) is invalid.');
            return;
        }

        // Validation 4: Check if ending point is greater than the maximum xAxisUpperLimit
        if (sortedChartData.length > 0 && sortedChartData[sortedChartData.length - 1].xAxisUpperLimit < xAxisStartAndEndValue.xAxisEnding) {
            toast.error('Ending Point (X Axis) is invalid.');
            return;
        }

        // Validation 2: Check for conflicts between ranges
        for (let i = 0; i < sortedChartData.length - 1; i++) {
            if (sortedChartData[i].xAxisUpperLimit > sortedChartData[i + 1].xAxisLowerLimit) {
                toast.error('Conflicting ranges detected.');
                return;
            }
        }

        // Validation 3: Check for missing ranges
        for (let i = 0; i < sortedChartData.length - 1; i++) {
            if (sortedChartData[i].xAxisUpperLimit < sortedChartData[i + 1].xAxisLowerLimit - 1) {
                toast.error('Missing range detected.');
                return;
            }
        }

        // If all validations passed, proceed with saving the data
        console.log(sortedChartData);
        // Add your save logic here
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
                        <p>Starting Point (X Axis): <span>{xAxisStartAndEndValue?.xAxisStaring}</span>%</p>
                        <p>Ending Point (X Axis): <span>{xAxisStartAndEndValue?.xAxisEnding}</span>%</p>
                    </div>
                </div>

                {/* Modal Content */}
                <div className='edit_chart_data_modal_content' style={{ padding: "28px 0 0 0" }}>
                    <h3 className='edit_chart_data_sub_title'>X Axis Ratio</h3>
                    <h3 className='edit_chart_data_sub_title'>Y Axis Ratio</h3>
                </div>

                <div className='edit_chart_data_modal_content_wrapper'>
                    {
                        chartAxisData?.length == 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }
                    {
                        chartAxisData?.sort((a, b) => a?.xAxisLowerLimit - b?.xAxisLowerLimit)?.map((item) => (
                            <div key={item?.id} className='edit_chart_data_modal_content ratio_card'>
                                <div className='ratio_wrapper'>
                                    <p className='ratio_text'>{item?.xAxisLowerLimit}-{item?.xAxisUpperLimit}%</p>
                                    <button onClick={() => xAxisEditHandler(item)} className='ratio_edit_button'>Edit</button>

                                </div>
                                <div className='ratio_wrapper'>
                                    <p className='ratio_text'>{item?.yAxisRatio}%</p>
                                    <button onClick={() => yAxisEditHandler(item)} className='ratio_edit_button'>Edit</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Modal Footer */}
            <div className='pay_now_modal_footer'>
                <ButtonComponent onClick={handleChartDataSave} color='#1492E6' textColor='#fff' font='18px'>Save</ButtonComponent>
                <ButtonComponent onClick={handleCancel} font='18px'>Do it later</ButtonComponent>
            </div>

            {/* Modals for add, edit and remove */}
            <AddNewAxisItemModal
                xAxisStartAndEndValue={xAxisStartAndEndValue}
                chartAxisData={chartAxisData}
                setChartAxisData={setChartAxisData}
                antdModalOpen={addNewAxisDataModalOpen}
                setAntdModalOpen={setAddNewAxisDataModalOpen}
            />

            <EditXAxisModal
                axisEditItem={axisEditItem}
                chartAxisData={chartAxisData}
                setChartAxisData={setChartAxisData}
                antdModalOpen={editXAxisDataModalOpen}
                setAntdModalOpen={setEditXAxisDataModalOpen}
            />

            <EditYAxisModal
                axisEditItem={axisEditItem}
                chartAxisData={chartAxisData}
                setChartAxisData={setChartAxisData}
                antdModalOpen={editYAxisDataModalOpen}
                setAntdModalOpen={setEditYAxisDataModalOpen}
            />

            <SelectRatioRangeModal
                xAxisStartAndEndValue={xAxisStartAndEndValue}
                setXAxisStartAndEndValue={setXAxisStartAndEndValue}
                antdModalOpen={selectRatioRange}
                setAntdModalOpen={setSelectRatioRange}
            />

            <RemoveRatioItemsModal
                chartAxisData={chartAxisData}
                setChartAxisData={setChartAxisData}
                antdModalOpen={removeRatioItemsModalOpen}
                setAntdModalOpen={setRemoveRatioItemsModalOpen}
            />

        </Modal>
    );
};

export default ChartIdealVsAchievedEditModal;