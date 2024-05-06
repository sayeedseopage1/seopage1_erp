import React from 'react';
import CustomAntdModal from '../../ui/CustomModal/CustomAntdModal';

const FinalPointsModal = ({ antdModalOpen, setAntdModalOpen }) => {

    return (
        <div>
            <CustomAntdModal
                title="Final points:"
                antdModalOpen={antdModalOpen}
                setAntdModalOpen={setAntdModalOpen}
            >
                <p>Final points...</p>
            </CustomAntdModal>
        </div>
    );
};

export default FinalPointsModal;