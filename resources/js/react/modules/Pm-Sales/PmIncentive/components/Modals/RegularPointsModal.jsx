import React from 'react';
import CustomAntdModal from '../../ui/CustomModal/CustomAntdModal';

const RegularPointsModal = ({ antdModalOpen, setAntdModalOpen }) => {

    return (
        <div>
            <CustomAntdModal
                title="Your Regular points:"
                antdModalOpen={antdModalOpen}
                setAntdModalOpen={setAntdModalOpen}
            >
                <p>Your Regular points...</p>
            </CustomAntdModal>
        </div>
    );
};

export default RegularPointsModal;