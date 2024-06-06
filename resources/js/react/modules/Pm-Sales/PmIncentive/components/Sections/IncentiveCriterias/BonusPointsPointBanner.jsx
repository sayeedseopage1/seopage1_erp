import React, { useEffect, useState } from 'react';
import pointIconDark from '../../../assets/pointIconDark.svg'
import cashBag from '../../../assets/cashBag.svg'
import { IoInformationCircle } from 'react-icons/io5';
import FinalPointsModal from '../../Modals/FinalPointsModal';
import { Popover } from 'antd';
import IncentiveEditButton from '../../ui/IncentiveEditButton';
import CashValueBonusEditModal from '../../Modals/Incentives/CashValueBonusEditModal';
import { Placeholder } from '../../../../../../global/Placeholder';
import { auth } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { bonusPointsPoints } from '../../../../../../services/features/Pm-Sales/pmIncentiveSlice';
import useIncentive from '../../../hooks/useIncentive';

const BonusPointsPointBanner = () => {
    const [finalPointsModalOpen, setFinalPointsModalOpen] = useState(false);
    const [editBonusPointsModalOpen, setEditBonusPointsModalOpen] = useState(false);

    const { bonusIncentiveTypes, incentiveTypesLoading } = useIncentive();
    const { incentive_criterias } = bonusIncentiveTypes || {};

    const unreleasedIncentive = parseFloat(incentive_criterias?.find((item) => item?.id == 10)?.obtained_incentive);

    const bonusPointsIncentive = parseFloat(incentive_criterias?.filter(item => item?.id === 9 || item?.id === 11)?.[0]?.obtained_incentive);

    const pmIncentive = useSelector((state) => state.pmIncentive)
    const dispatch = useDispatch();

    const { bonusPointsPoints: bonusPointsData } = pmIncentive || {}

    useEffect(() => {
        if (bonusIncentiveTypes) {
            dispatch(bonusPointsPoints((parseFloat(bonusPointsIncentive) * parseFloat(unreleasedIncentive)) / 100));
        }
    }, [bonusIncentiveTypes, incentive_criterias]);

    return (
        <div className="secondary_point_banner_bonus">
            <div className="secondary_point_card_wrapper">
                <div className="secondary_point_card">
                    <span className="">
                        <img src={pointIconDark} alt="pointIcon" />
                    </span>
                    <div className="">
                        <p className='point_title point_details_wrapper' style={{ color: "#000000" }}>Your bonus points: <span className='point_score' style={{ color: "#1492E6" }}>
                            {bonusPointsIncentive}pt
                        </span>
                            <Popover
                                content='This value is Bonus Points Based 
                                on Released Amount'
                                overlayStyle={{
                                    width: "220px"
                                }}
                            >
                                <IoInformationCircle className='informationCircle' />
                            </Popover>
                        </p>

                    </div>
                </div>
            </div>

            {/* <div className="custom_divider"></div> */}

            <div className="secondary_point_card_wrapper">
                <div className="secondary_point_card">
                    <span className="secondary_point_card_image_wrapper">
                        <img src={cashBag} style={{ width: "24px", height: "24px" }} alt="taka" />
                    </span>
                    <div className="">
                        <p className='point_title point_details_wrapper' style={{ color: "#000000" }}>
                            Incentive Percentage: <span className='point_score' style={{ color: "#1492E6" }}>
                                {parseFloat(unreleasedIncentive)}%
                            </span>
                            <Popover
                                content='This value is Unreleased Payment Amount'
                                overlayStyle={{
                                    width: "220px"
                                }}
                            >
                                <IoInformationCircle className='informationCircle' />
                            </Popover>
                        </p>

                    </div>
                </div>
            </div>

            {/* <div className="custom_divider"></div> */}

            <div className="secondary_point_card_wrapper">
                <div className="secondary_point_card">
                    <span className="secondary_point_card_image_wrapper">
                        <img src={cashBag} style={{ width: "24px", height: "24px" }} alt="taka" />
                    </span>
                    <div className="">
                        <p className='point_title point_details_wrapper' style={{ color: "#000000" }}>
                            Final points: <button onClick={() => setFinalPointsModalOpen(true)} className='point_score clickable_link bg-transparent' style={{ color: "#1492E6" }}>
                                {bonusPointsData}pt
                            </button>
                        </p>

                        <FinalPointsModal
                            antdModalOpen={finalPointsModalOpen}
                            setAntdModalOpen={setFinalPointsModalOpen}
                            unreleasedIncentive={unreleasedIncentive}
                            bonusPointsIncentive={bonusPointsIncentive}
                            bonusPointsData={bonusPointsData}
                        />
                    </div>
                </div>
            </div>

            {/* <div className="custom_divider"></div> */}

            <div className="secondary_point_card_wrapper">
                <div className="secondary_point_card">
                    <span className="secondary_point_card_image_wrapper">
                        <img src={cashBag} style={{ width: "24px", height: "24px" }} alt="taka" />
                    </span>
                    {
                        incentiveTypesLoading ? <Placeholder width="60%" height={28} /> : <p className='point_title point_details_wrapper' style={{ color: "#000000" }}>
                            Cash value: <span className='point_score' style={{ color: "#1492E6" }}>
                                {parseFloat(bonusIncentiveTypes?.cash_value)} Taka
                            </span> {
                                auth?.isHasRolePermission(1) && <IncentiveEditButton onClick={() => setEditBonusPointsModalOpen(true)} className={`chart_button`}></IncentiveEditButton>
                            }
                        </p>
                    }
                </div>
            </div>

            <CashValueBonusEditModal bonusIncentiveTypes={bonusIncentiveTypes} antdModalOpen={editBonusPointsModalOpen} setAntdModalOpen={setEditBonusPointsModalOpen} />
        </div>
    );
};

export default BonusPointsPointBanner;