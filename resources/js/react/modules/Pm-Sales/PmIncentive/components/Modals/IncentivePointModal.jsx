import React from 'react';
import CustomAntdModal from '../../ui/CustomModal/CustomAntdModal';

const IncentivePointModal = ({ antdModalOpen, setAntdModalOpen }) => {

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
                        <span className="text-sm">500</span>
                    </div>
                    <div className="modal_point_row">
                        <p>incentive points: </p>{" "}
                        <span className="text-sm">80%</span>
                    </div>
                    <hr />
                    <div className="modal_point_row">
                        <p>Your actual incentive points: <span>(500*80)</span></p>{" "}
                        <span className="text-sm">400</span>
                    </div>
                </>
            </CustomAntdModal>
        </div>
    );
};

export default IncentivePointModal;