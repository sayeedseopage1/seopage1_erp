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
                <p>Your antual incentive points...</p>
            </CustomAntdModal>
        </div>
    );
};

export default IncentivePointModal;