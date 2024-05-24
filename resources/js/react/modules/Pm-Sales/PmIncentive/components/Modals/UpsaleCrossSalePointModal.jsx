import React, { useEffect, useState } from 'react';
import CustomAntdModal from '../ui/CustomAntdModal';

const UpsaleCrossSalePointModal = ({ antdModalOpen, setAntdModalOpen, upsaleCrossSalePointsData, upSaleCrossSaleTypes }) => {
    const { incentive_criterias } = upSaleCrossSaleTypes || {};

    const [upsaleCrossSale, setUpsaleCrossSale] = useState(0)
    const [upsaleCrossSaleIncentive, setUpsaleCrossSaleIncentive] = useState(0)

    useEffect(() => {
        if (incentive_criterias) {
            setUpsaleCrossSale(parseFloat(incentive_criterias[0]?.acquired_percent))
            setUpsaleCrossSaleIncentive(parseFloat(incentive_criterias[0]?.obtained_incentive))
        }
    }, [incentive_criterias])

    return (
        <div>
            <CustomAntdModal
                title="Upsale/cross sale points:"
                antdModalOpen={antdModalOpen}
                setAntdModalOpen={setAntdModalOpen}
            >
                <div>
                    <div className="modal_point_row">
                        <p>Upsale/cross sale: </p>{" "}
                        <span className="text-sm">${upsaleCrossSale}</span>
                    </div>
                    <div className="modal_point_row">
                        <p>incentive: </p>{" "}
                        <span className={`${upsaleCrossSaleIncentive > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>{upsaleCrossSaleIncentive}%</span>
                    </div>
                    <hr />
                    <div className="modal_point_row">
                        <p>Upsale/cross sale point: <span>({upsaleCrossSale}*{upsaleCrossSaleIncentive}%)</span></p>{" "}
                        <span className={`${upsaleCrossSaleIncentive > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>{upsaleCrossSalePointsData}</span>
                    </div>
                </div>
            </CustomAntdModal>
        </div>
    );
};

export default UpsaleCrossSalePointModal;