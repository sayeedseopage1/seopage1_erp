import React, { useEffect, useState } from 'react';
import pointIconDark from '../../../assets/pointIconDark.svg'
import cashBag from '../../../assets/cashBag.svg'
import UpsaleCrossSalePointModal from '../../Modals/UpsaleCrossSalePointModal';
import IncentiveEditButton from '../../ui/IncentiveEditButton';
import CashValueUpCrossEditModal from '../../Modals/Incentives/CashValueUpCrossEditModal';
import { Placeholder } from '../../../../../../global/Placeholder';
import useIncentiveTypes from '../../../hooks/useIncentiveTypes';
import { auth } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { upSaleCrossSalePoints } from '../../../../../../services/features/Pm-Sales/pmIncentiveSlice';

const UpsaleCrossSalePointBanner = () => {
    const [upsaleCrossSalePointsModalOpen, setUpsaleCrossSalePointsModalOpen] = useState(false);
    const [editUpsaleCrossSalePointsModalOpen, setEditUpsaleCrossSalePointsModalOpen] = useState(false);
    const { upSaleCrossSaleTypes, incentiveTypesLoading } = useIncentiveTypes();
    const { incentive_criterias } = upSaleCrossSaleTypes || {};

    const pmIncentive = useSelector((state) => state.pmIncentive)
    const dispatch = useDispatch();

    const { upSaleCrossSalePoints: upsaleCrossSalePointsData } = pmIncentive || {}

    useEffect(() => {
        if (upSaleCrossSaleTypes) {
            let res = (parseFloat(incentive_criterias[0]?.acquired_percent) * parseFloat(incentive_criterias[0]?.obtained_incentive)) / 100
            dispatch(upSaleCrossSalePoints(res));
        }
    }, [upSaleCrossSaleTypes, incentive_criterias]);

    return (
        <div className="secondary_point_banner">
            <div className="secondary_point_card_wrapper">
                {
                    incentiveTypesLoading ? <Placeholder width="60%" height={28} /> : <div className="secondary_point_card">
                        <span className="">
                            <img src={pointIconDark} alt="pointIcon" />
                        </span>
                        <div className="">
                            <p className='point_title point_details_wrapper' style={{ color: "#000000" }}>Your upsale/cross sales points: <button onClick={() => setUpsaleCrossSalePointsModalOpen(true)} className='point_score clickable_link bg-transparent' style={{ color: "#1492E6" }}>
                                {upsaleCrossSalePointsData}pt
                            </button></p>

                            <UpsaleCrossSalePointModal
                                antdModalOpen={upsaleCrossSalePointsModalOpen}
                                setAntdModalOpen={setUpsaleCrossSalePointsModalOpen}
                                upSaleCrossSaleTypes={upSaleCrossSaleTypes}
                                upsaleCrossSalePointsData={upsaleCrossSalePointsData}
                            />
                        </div>
                    </div>
                }
            </div>

            <div className="custom_divider"></div>

            <div className="secondary_point_card_wrapper">
                {
                    incentiveTypesLoading ? <Placeholder width="60%" height={28} /> : <div className="secondary_point_card">
                        <span className="secondary_point_card_image_wrapper">
                            <img src={cashBag} style={{ width: "24px", height: "24px" }} alt="taka" />
                        </span>

                        <p className='point_title point_details_wrapper' style={{ color: "#000000" }}>
                            Cash value: <span className='point_score' style={{ color: "#1492E6" }}>
                                {parseFloat(upSaleCrossSaleTypes?.cash_value)} Taka
                            </span> {
                                auth?.isHasRolePermission(1) && <IncentiveEditButton onClick={() => setEditUpsaleCrossSalePointsModalOpen(true)} className={`chart_button`}></IncentiveEditButton>
                            }
                        </p>

                    </div>
                }

            </div>
            <CashValueUpCrossEditModal upSaleCrossSaleTypes={upSaleCrossSaleTypes} antdModalOpen={editUpsaleCrossSalePointsModalOpen} setAntdModalOpen={setEditUpsaleCrossSalePointsModalOpen} />
        </div>
    );
};

export default UpsaleCrossSalePointBanner;