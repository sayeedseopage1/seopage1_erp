import React from 'react';
import CustomAntdModal from '../../ui/CustomModal/CustomAntdModal';

const AveragePointModal = ({ antdModalOpen, setAntdModalOpen }) => {

    return (
        <div>
            <CustomAntdModal
                title="Total incentive average:"
                antdModalOpen={antdModalOpen}
                setAntdModalOpen={setAntdModalOpen}
            >
                <p>Total incentive average...</p>
            </CustomAntdModal>
        </div>
    );
};

export default AveragePointModal;