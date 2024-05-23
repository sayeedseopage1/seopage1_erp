import React, { useEffect } from 'react';
import CustomAntdModal from '../ui/CustomAntdModal';
import useIncentiveTypes from '../../hooks/useIncentiveTypes';
import { useDispatch } from 'react-redux';
import { regularIncentivePoints } from '../../../../../services/features/Pm-Sales/PmIncentiveSlice';


const IncentivePointModal = ({ antdModalOpen, setAntdModalOpen, regularPointAverage, regularIncentivePoints: regularIncentivePointsData }) => {
    const { allIncentiveTypes, incentiveTypesLoading } = useIncentiveTypes();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(regularIncentivePoints((allIncentiveTypes?.data?.total_points * regularPointAverage) / 100));
    }, [allIncentiveTypes]);


    return (
        <div>
            <CustomAntdModal
                title="Your antual incentive points:"
                antdModalOpen={antdModalOpen}
                setAntdModalOpen={setAntdModalOpen}
            >
                <>
                    <div className="modal_point_row">
                        <p>Your obtained points: </p>{" "}
                        <span className="text-sm">{parseFloat(allIncentiveTypes?.data?.total_points)}</span>
                    </div>
                    <div className="modal_point_row">
                        <p>incentive points: </p>{" "}
                        <span className={`${regularPointAverage > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>{regularPointAverage}%</span>
                    </div>
                    <hr />
                    <div className="modal_point_row">
                        <p>Your actual incentive points: <span>({parseFloat(allIncentiveTypes?.data?.total_points)}*{regularPointAverage}%)</span></p>{" "}
                        <span className={`${regularIncentivePointsData > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>{regularIncentivePointsData}</span>
                    </div>
                </>
            </CustomAntdModal>
        </div>
    );
};

export default IncentivePointModal;