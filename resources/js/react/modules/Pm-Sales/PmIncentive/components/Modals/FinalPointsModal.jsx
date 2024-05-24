import React from 'react';
import CustomAntdModal from '../ui/CustomAntdModal';

const FinalPointsModal = ({ antdModalOpen, setAntdModalOpen }) => {

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
                        <span className="text-sm">60</span>
                    </div>
                    <div className="modal_point_row">
                        <p>Incentive Percentage: </p>{" "}
                        <span className="text-sm">80%</span>
                    </div>
                    <hr />
                    <div className="modal_point_row">
                        <p>Your final points: <span>(60*80%)</span></p>{" "}
                        <span className="text-sm">48pt</span>
                    </div>
                </>
            </CustomAntdModal>
        </div>
    );
};

export default FinalPointsModal;