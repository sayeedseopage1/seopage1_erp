import React, { useState } from 'react';
import pointIconDark from '../../../assets/pointIconDark.svg'
import cashBag from '../../../assets/cashBag.svg'
import UpsaleCrossSalePointModal from '../../Modals/UpsaleCrossSalePointModal';
import IncentiveEditButton from '../../ui/IncentiveEditButton';
import CashValueUpCrossEditModal from '../../Modals/Incentives/CashValueUpCrossEditModal';
import { Placeholder } from '../../../../../../global/Placeholder';
import useIncentiveTypes from '../../../hooks/useIncentiveTypes';
import { auth } from '../../../constants';

const UpsaleCrossSalePointBanner = () => {
    const [upsaleCrossSalePointsModalOpen, setUpsaleCrossSalePointsModalOpen] = useState(false);
    const [editUpsaleCrossSalePointsModalOpen, setEditUpsaleCrossSalePointsModalOpen] = useState(false);
    const { upSaleCrossSaleTypes, incentiveTypesLoading } = useIncentiveTypes();
    const [upsaleCrossSalePoints, setUpsaleCrossSalePoints] = useState(0);

    return (
        <div className="secondary_point_banner">
            <div className="secondary_point_card_wrapper">
                <div className="secondary_point_card">
                    <span className="">
                        <img src={pointIconDark} alt="pointIcon" />
                    </span>
                    <div className="">
                        <p className='point_title point_details_wrapper' style={{ color: "#000000" }}>Your upsale/cross sales points: <span onClick={() => setUpsaleCrossSalePointsModalOpen(true)} className='point_score clickable_link' style={{ color: "#1492E6" }}>
                            {upsaleCrossSalePoints}pt
                        </span></p>

                        <UpsaleCrossSalePointModal
                            antdModalOpen={upsaleCrossSalePointsModalOpen}
                            setAntdModalOpen={setUpsaleCrossSalePointsModalOpen}
                            upsaleCrossSalePoints={upsaleCrossSalePoints}
                            setUpsaleCrossSalePoints={setUpsaleCrossSalePoints}
                            item={upSaleCrossSaleTypes}
                        />
                    </div>
                </div>
            </div>

            <div className="custom_divider"></div>

            <div className="secondary_point_card_wrapper">
                <div className="secondary_point_card">
                    <span className="secondary_point_card_image_wrapper">
                        <img src={cashBag} style={{ width: "24px", height: "24px" }} alt="taka" />
                    </span>
                    {
                        incentiveTypesLoading ? <Placeholder width="60%" height={28} /> : <p className='point_title point_details_wrapper' style={{ color: "#000000" }}>
                            Cash value: <span className='point_score' style={{ color: "#1492E6" }}>
                                {parseFloat(upSaleCrossSaleTypes?.cash_value)} Taka
                            </span> {
                                auth?.isHasRolePermission(1) && <IncentiveEditButton onClick={() => setEditUpsaleCrossSalePointsModalOpen(true)} className={`chart_button`}></IncentiveEditButton>
                            }
                        </p>
                    }
                </div>
            </div>
            <CashValueUpCrossEditModal upSaleCrossSaleTypes={upSaleCrossSaleTypes} antdModalOpen={editUpsaleCrossSalePointsModalOpen} setAntdModalOpen={setEditUpsaleCrossSalePointsModalOpen} />
        </div>
    );
};

export default UpsaleCrossSalePointBanner;