import React from 'react';
import cashBag from '../assets/cashBag.svg'


const FinalIncentiveBanner = () => {
    return (
        <div className='final_incentive_banner_wrapper'>
            {/* amount siblings  */}
            <div className="incentive_amount_details">
                {/* card 1 */}
                <div className="incentive_amount_list">
                    <p>
                        Your regular points: <span style={{ fontWeight: '600' }}>500pt</span>
                    </p>
                    <p>
                        Your actual regular points:{" "}
                        <span style={{ fontWeight: '600' }}>400pt</span>
                    </p>
                    <p>
                        Cash value for every regular point:{" "}
                        <span style={{ fontWeight: '600' }}>20 Taka</span>
                    </p>
                    <p>
                        Final incentive amount for the regular points: 400*20={" "}
                        <span style={{ fontWeight: '600' }}>8000 Taka</span>
                    </p>
                </div>
                <div className="custom_divider_two"></div>
                {/* card 2 */}
                <div className="incentive_amount_list">
                    <p>
                        Your regular points: <span style={{ fontWeight: '600' }}>500pt</span>
                    </p>
                    <p>
                        Your actual regular points:{" "}
                        <span style={{ fontWeight: '600' }}>400pt</span>
                    </p>
                    <p>
                        Cash value for every regular point:{" "}
                        <span style={{ fontWeight: '600' }}>20 Taka</span>
                    </p>
                    <p>
                        Final incentive amount for the regular points: 400*20={" "}
                        <span style={{ fontWeight: '600' }}>8000 Taka</span>
                    </p>
                </div>
                <div className="custom_divider_two"></div>
                {/* card 3 */}
                <div className="incentive_amount_list">
                    <p>
                        Your regular points: <span style={{ fontWeight: '600' }}>500pt</span>
                    </p>
                    <p>
                        Your actual regular points:{" "}
                        <span style={{ fontWeight: '600' }}>400pt</span>
                    </p>
                    <p>
                        Cash value for every regular point:{" "}
                        <span style={{ fontWeight: '600' }}>20 Taka</span>
                    </p>
                    <p>
                        Final incentive amount for the regular points: 400*20={" "}
                        <span style={{ fontWeight: '600' }}>8000 Taka</span>
                    </p>
                </div>
            </div>

            {/* amount card  */}
            <div className="incentive_amount_card">
                <span className="secondary_point_card_image_wrapper">
                    <img src={cashBag} className="w-6 h-6" alt="cashBag" />
                </span>
                <p style={{ fontSize: "14px" }}>Your final incentive amount:</p>
                <span className='point_score'>16005 Taka</span>
            </div>
        </div>
    );
};

export default FinalIncentiveBanner;