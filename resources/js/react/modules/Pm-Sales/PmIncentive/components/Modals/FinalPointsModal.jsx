import React from 'react';
import CustomAntdModal from '../ui/CustomAntdModal';
import PropTypes from 'prop-types';

const FinalPointsModal = ({ antdModalOpen, setAntdModalOpen, unreleasedIncentive, bonusPointsIncentive, bonusPointsData }) => {
    return (
        <div>
            <CustomAntdModal
                title="Final points:"
                antdModalOpen={antdModalOpen}
                setAntdModalOpen={setAntdModalOpen}
            >
                <>
                    <div className="modal_point_row">
                        <p>Your bonus points: </p>{" "}
                        <span className="text-sm">{parseFloat(bonusPointsIncentive)}</span>
                    </div>
                    <div className="modal_point_row">
                        <p>Incentive Percentage: </p>{" "}
                        <span className={`${unreleasedIncentive > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>{parseFloat(unreleasedIncentive)}%</span>
                    </div>
                    <hr />
                    <div className="modal_point_row">
                        <p>Your final points: <span>({parseFloat(bonusPointsIncentive)}*{parseFloat(unreleasedIncentive)}%)</span></p>{" "}
                        <span className={`${bonusPointsData > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>{parseFloat(bonusPointsData)?.toFixed(2)}pt</span>
                    </div>
                </>
            </CustomAntdModal>
        </div>
    );
};

export default FinalPointsModal;

FinalPointsModal.propTypes = {
    antdModalOpen: PropTypes.bool,
    setAntdModalOpen: PropTypes.func,
    unreleasedIncentive: PropTypes.any,
    bonusPointsIncentive: PropTypes.any,
    bonusPointsData: PropTypes.any,
}