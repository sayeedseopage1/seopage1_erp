import React, { useState } from 'react';
import pointIconDark from '../assets/pointIconDark.svg'
import cashBag from '../assets/cashBag.svg'
import { IoInformationCircle } from 'react-icons/io5';
import FinalPointsModal from './Modals/FinalPointsModal';
import { Popover } from 'antd';

const BonusPointsPointBanner = () => {
    const [finalPointsModalOpen, setFinalPointsModalOpen] = useState(false);
    return (
        <div className="secondary_point_banner_bonus">
            <div className="secondary_point_card_wrapper">
                <div className="secondary_point_card">
                    <span className="">
                        <img src={pointIconDark} alt="pointIcon" />
                    </span>
                    <div className="">
                        <p className='point_title point_details_wrapper' style={{ color: "#000000" }}>Your bonus points: <span className='point_score' style={{ color: "#1492E6" }}>
                            60.05pt
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
                                80%
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
                            Final points: <span onClick={() => setFinalPointsModalOpen(true)} className='point_score clickable_link' style={{ color: "#1492E6" }}>
                                48pt
                            </span>
                        </p>

                        <FinalPointsModal antdModalOpen={finalPointsModalOpen}
                            setAntdModalOpen={setFinalPointsModalOpen} />
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
                            Cash value of every bonus  point: <span className='point_score' style={{ color: "#1492E6" }}>
                                100 Taka
                            </span>
                        </p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default BonusPointsPointBanner;