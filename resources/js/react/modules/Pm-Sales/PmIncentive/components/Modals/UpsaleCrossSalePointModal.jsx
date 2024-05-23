import React, { useEffect, useState } from 'react';
import CustomAntdModal from '../ui/CustomAntdModal';

const UpsaleCrossSalePointModal = ({ antdModalOpen, setAntdModalOpen, upsaleCrossSalePoints, setUpsaleCrossSalePoints, item: upsaleCrossSaleData }) => {

    const { incentive_criterias } = upsaleCrossSaleData || {};
    const [upsaleCrossSale, setUpsaleCrossSale] = useState(0);
    const [upsaleCrossSaleIncentive, setUpsaleCrossSaleIncentive] = useState(0);

    useEffect(() => {
        // Only run the effect if incentive_criterias is defined
        if (incentive_criterias) {
            setUpsaleCrossSale(incentive_criterias[0].acquired_percent);
            setUpsaleCrossSaleIncentive(incentive_criterias[0].obtained_incentive);

            setUpsaleCrossSalePoints((upsaleCrossSale * upsaleCrossSaleIncentive) / 100);

        }
    }, [incentive_criterias, setUpsaleCrossSalePoints]);

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
                        <span className="text-sm">{upsaleCrossSaleIncentive}%</span>
                    </div>
                    <hr />
                    <div className="modal_point_row">
                        <p>Upsale/cross sale point: <span>({upsaleCrossSale}*{upsaleCrossSaleIncentive}%)</span></p>{" "}
                        <span className="text-sm">{upsaleCrossSalePoints}</span>
                    </div>
                </div>
            </CustomAntdModal>
        </div>
    );
};

export default UpsaleCrossSalePointModal;