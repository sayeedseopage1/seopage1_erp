import React from 'react';
import CustomAntdModal from '../ui/CustomAntdModal';

const FinalPointsModal = ({ antdModalOpen, setAntdModalOpen, unreleasedIncentive, bonusPointsAcquired, bonusPointsData }) => {

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
                        <span className="text-sm">{parseFloat(bonusPointsAcquired)}</span>
                    </div>
                    <div className="modal_point_row">
                        <p>Incentive Percentage: </p>{" "}
                        <span className={`${unreleasedIncentive > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>{parseFloat(unreleasedIncentive)}%</span>
                    </div>
                    <hr />
                    <div className="modal_point_row">
                        <p>Your final points: <span>({parseFloat(bonusPointsAcquired)}*{parseFloat(unreleasedIncentive)}%)</span></p>{" "}
                        <span className={`${bonusPointsData > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>{parseFloat(bonusPointsData)}pt</span>
                    </div>
                </>
            </CustomAntdModal>
        </div>
    );
};

export default FinalPointsModal;