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
                <>
                    <div className="modal_point_row">
                        <p>Upsale/cross sale: </p>{" "}
                        <span className="text-sm">$1201</span>
                    </div>
                    <div className="modal_point_row">
                        <p>incentive: </p>{" "}
                        <span className="text-sm">5%</span>
                    </div>
                    <hr />
                    <div className="modal_point_row">
                        <p>Upsale/cross sale point: <span>(1201*5%)</span></p>{" "}
                        <span className="text-sm">60.5</span>
                    </div>
                </>
            </CustomAntdModal>
        </div>
    );
};

export default UpsaleCrossSalePointModal;