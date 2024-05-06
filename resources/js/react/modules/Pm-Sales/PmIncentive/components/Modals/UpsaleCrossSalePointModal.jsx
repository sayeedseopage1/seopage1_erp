import React from 'react';
import CustomAntdModal from '../../ui/CustomModal/CustomAntdModal';

const UpsaleCrossSalePointModal = ({ antdModalOpen, setAntdModalOpen }) => {

    return (
        <div>
            <CustomAntdModal
                title="Upsale/cross sale points:"
                antdModalOpen={antdModalOpen}
                setAntdModalOpen={setAntdModalOpen}
            >
                <p>Upsale/cross sale points...</p>
            </CustomAntdModal>
        </div>
    );
};

export default UpsaleCrossSalePointModal;