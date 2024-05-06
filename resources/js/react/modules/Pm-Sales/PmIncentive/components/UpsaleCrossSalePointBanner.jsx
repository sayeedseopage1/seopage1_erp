import React, { useState } from 'react';
import pointIconDark from '../assets/pointIconDark.svg'
import cashBag from '../assets/cashBag.svg'
import UpsaleCrossSalePointModal from './Modals/UpsaleCrossSalePointModal';

const UpsaleCrossSalePointBanner = () => {
    const [upsaleCrossSalePointsModalOpen, setUpsaleCrossSalePointsModalOpen] = useState(false);
    return (
        <div className="secondary_point_banner">
            <div className="secondary_point_card_wrapper">
                <div className="secondary_point_card">
                    <span className="">
                        <img src={pointIconDark} alt="pointIcon" />
                    </span>
                    <div className="point_details_wrapper">
                        <p className='point_title' style={{ color: "#000000" }}>Your upsale/cross sales points:</p>
                        <span onClick={() => setUpsaleCrossSalePointsModalOpen(true)} className='point_score clickable_link' style={{ color: "#1492E6" }}>
                            60.05pt
                        </span>
                        <UpsaleCrossSalePointModal antdModalOpen={upsaleCrossSalePointsModalOpen}
                            setAntdModalOpen={setUpsaleCrossSalePointsModalOpen} />
                    </div>
                </div>
            </div>

            <div className="custom_divider"></div>

            <div className="secondary_point_card_wrapper">
                <div className="secondary_point_card">
                    <span className="secondary_point_card_image_wrapper">
                        <img src={cashBag} style={{ width: "24px", height: "24px" }} alt="taka" />
                    </span>
                    <div className="point_details_wrapper">
                        <p className='point_title' style={{ color: "#000000" }}>
                            Cash value of every upsale/cross sale point:
                        </p>
                        <span className='point_score' style={{ color: "#1492E6" }}>
                            100 Taka
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpsaleCrossSalePointBanner;