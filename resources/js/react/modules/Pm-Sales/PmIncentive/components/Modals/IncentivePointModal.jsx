import React from 'react';
import CustomAntdModal from '../ui/CustomAntdModal';
import PropTypes from 'prop-types';


const IncentivePointModal = ({ antdModalOpen, setAntdModalOpen, regularPointAverage, regularIncentivePointsData, totalPoints }) => {

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
                        <span className="text-sm">{totalPoints}</span>
                    </div>
                    <div className="modal_point_row">
                        <p>incentive points: </p>{" "}
                        <span className={`${regularPointAverage > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>{regularPointAverage}%</span>
                    </div>
                    <hr />
                    <div className="modal_point_row">
                        <p>Your actual incentive points: <span>({totalPoints}*{regularPointAverage}%)</span></p>{" "}
                        <span className={`${regularIncentivePointsData > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>{regularIncentivePointsData}</span>
                    </div>
                </>
            </CustomAntdModal>
        </div>
    );
};

export default IncentivePointModal;

IncentivePointModal.propTypes = {
    antdModalOpen: PropTypes.bool,
    setAntdModalOpen: PropTypes.func,
    regularPointAverage: PropTypes.number,
    regularIncentivePointsData: PropTypes.number,
    totalPoints: PropTypes.number
}