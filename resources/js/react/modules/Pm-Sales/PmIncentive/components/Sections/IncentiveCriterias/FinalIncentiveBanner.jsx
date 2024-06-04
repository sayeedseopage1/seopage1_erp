import React from 'react';
import cashBag from '../../../assets/cashBag.svg'
import { useSelector } from 'react-redux';
import useIncentive from '../../../hooks/useIncentive';

const FinalIncentiveBanner = () => {
    const { allIncentiveTypes, regularIncentiveTypes, upSaleCrossSaleTypes, bonusIncentiveTypes } = useIncentive();
    const pmIncentive = useSelector((state) => state.pmIncentive)
    const { regularIncentivePoints, upSaleCrossSalePoints, bonusPointsPoints } = pmIncentive || {}

    const finalRegularTaka = parseFloat(regularIncentivePoints) * parseFloat(regularIncentiveTypes?.cash_value)
    const finalUpSaleCrossTaka = parseFloat(upSaleCrossSalePoints) * parseFloat(upSaleCrossSaleTypes?.cash_value)
    const finalBonusTaka = parseFloat(bonusPointsPoints) * parseFloat(bonusIncentiveTypes?.cash_value)

    const finalIncentiveTaka = finalRegularTaka + finalUpSaleCrossTaka + finalBonusTaka

    return (
        <div className='final_incentive_banner_wrapper'>
            {/* amount siblings  */}
            <div className="incentive_amount_details">
                {/* card 1 */}
                <div className="incentive_amount_list">
                    <p>
                        Your regular points: <span style={{ fontWeight: '600' }}>{parseFloat(allIncentiveTypes?.data?.total_points)}pt</span>
                    </p>
                    <p>
                        Your actual regular points:{" "}
                        <span style={{ fontWeight: '600' }}>{regularIncentivePoints}pt</span>
                    </p>
                    <p>
                        Cash value for every regular point:{" "}
                        <span style={{ fontWeight: '600' }}>{parseFloat(regularIncentiveTypes?.cash_value)} Taka</span>
                    </p>
                    <p>
                        Final incentive amount for the regular points: {regularIncentivePoints}*{parseFloat(regularIncentiveTypes?.cash_value)}={" "}
                        <span style={{ fontWeight: '600' }}>{finalRegularTaka} Taka</span>
                    </p>
                </div>
                <div className="custom_divider_two"></div>
                {/* card 2 */}
                <div className="incentive_amount_list">
                    <p>
                        Your upsale/cross sale points: <span style={{ fontWeight: '600' }}>{upSaleCrossSalePoints}pt</span>
                    </p>
                    <p>
                        Cash value for upsale cross points:{" "}
                        <span style={{ fontWeight: '600' }}>{parseFloat(upSaleCrossSaleTypes?.cash_value)} Taka</span>
                    </p>
                    <p>
                        Incentive amount from the upsale/cross sales points: {upSaleCrossSalePoints}*{parseFloat(upSaleCrossSaleTypes?.cash_value)}={" "}
                        <span style={{ fontWeight: '600' }}>{finalUpSaleCrossTaka} Taka</span>
                    </p>
                </div>
                <div className="custom_divider_two"></div>
                {/* card 3 */}
                <div className="incentive_amount_list">
                    <p>
                        Your bonus points based on released amount: <span style={{ fontWeight: '600' }}>{bonusPointsPoints}pt</span>
                    </p>
                    <p>
                        Cash value for bonus points:{" "}
                        <span style={{ fontWeight: '600' }}>{parseFloat(bonusIncentiveTypes?.cash_value)} Taka</span>
                    </p>
                    <p>
                        Incentive amount from bonus points: {bonusPointsPoints}*{parseFloat(bonusIncentiveTypes?.cash_value)}={" "}
                        <span style={{ fontWeight: '600' }}>{finalBonusTaka} Taka</span>
                    </p>
                </div>
            </div>

            {/* amount card  */}
            <div className="incentive_amount_card">
                <span className="secondary_point_card_image_wrapper">
                    <img src={cashBag} className="w-6 h-6" alt="cashBag" />
                </span>
                <p style={{ fontSize: "14px" }}>Your final incentive amount:</p>
                <span className='point_score'>{finalIncentiveTaka} Taka</span>
            </div>
        </div>
    );
};

export default FinalIncentiveBanner;