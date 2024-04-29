import React from 'react';
import pointIconDark from '../assets/pointIconDark.svg'
import cashBag from '../assets/cashBag.svg'

const UpsaleCrossSalePointBanner = () => {
    return (
        <div className="secondary_point_banner">
            <div className="secondary_point_card_wrapper">
                <div className="secondary_point_card">
                    <span className="">
                        <img src={pointIconDark} alt="pointIcon" />
                    </span>
                    <div className="point_details_wrapper">
                        <p style={{ fontWeight: "500", fontSize: "16px", color: "#000000" }}>Your upsale/cross sales points:</p>
                        <span className='clickable_link' style={{ fontWeight: "600", fontSize: "20px", color: "#1492E6" }}>
                            60.05pt
                        </span>
                        {/* <UpsaleCrossSaleModal /> */}
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
                        <p style={{ fontWeight: "500", fontSize: "16px", color: "#000000" }}>
                            Cash value of every upsale/cross sale point:
                        </p>
                        <span style={{ fontWeight: "600", fontSize: "20px", color: "#1492E6" }}>
                            100 Taka
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpsaleCrossSalePointBanner;