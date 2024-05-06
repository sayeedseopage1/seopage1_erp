import React, { useState } from 'react';
import StatsInfoProgressCard from './StatsInfoProgressCard';
import pointIconDark from '../assets/pointIconDark.svg'
import { IoInformationCircle } from "react-icons/io5";
import RegularPointsModal from './Modals/RegularPointsModal';
import CustomAntdModal from '../ui/CustomModal/CustomAntdModal';
import IncentivePointModal from './Modals/IncentivePointModal';

const StatsInfo = () => {
    const [regularPointsModalOpen, setRegularPointsModalOpen] = useState(false);
    const [incentivePointsModalOpen, setIncentivePointsModalOpen] = useState(false);

    return (
        <div className='stats_info_wrapper'>
            {/* point stats */}
            <div className='stats_info_outer'>
                <StatsInfoProgressCard />
                <StatsInfoProgressCard />
                <StatsInfoProgressCard />
                <StatsInfoProgressCard />
                <StatsInfoProgressCard />
                <StatsInfoProgressCard />
                <StatsInfoProgressCard />
            </div>
            {/* point score */}
            <div className='stats_score_outer'>
                <div className="stats_score_inner">
                    {/* regular point  */}
                    <div className="stats_score_child">
                        <span className="">
                            <img src={pointIconDark} alt="pointIconDark" />
                        </span>
                        <div className="point_details_wrapper">
                            <p className="stats_info_desc">Your Regular points:</p>
                            <span
                                onClick={() => setRegularPointsModalOpen(true)}
                                className="stats_info_link"
                            >
                                80pt
                            </span>
                        </div>
                        <RegularPointsModal
                            antdModalOpen={regularPointsModalOpen}
                            setAntdModalOpen={setRegularPointsModalOpen}
                        />
                    </div>
                    {/* Your actual incentive points  */}
                    <div className="stats_score_child">
                        <span className="">
                            <img src={pointIconDark} alt="pointIconDark" />
                        </span>
                        <div className="point_details_wrapper">
                            <p className="stats_info_desc">
                                Your actual incentive points:
                            </p>
                            <div
                                className="d-flex align-items-center"
                            >
                                <span className="stats_info_link" onClick={() => setIncentivePointsModalOpen(true)}>
                                    400pt
                                </span>
                                <span
                                    title='This is after multiplying your regular points with the average percentage calculated earlier'
                                >
                                    <IoInformationCircle style={{ color: "#8F8F8F" }} />
                                </span>
                            </div>
                            <IncentivePointModal
                                antdModalOpen={incentivePointsModalOpen}
                                setAntdModalOpen={setIncentivePointsModalOpen}
                            />
                        </div>
                    </div>
                    <div>
                        <p className="stats_info_note">
                            <span style={{ color: "#F66" }}>Note: </span>If you fail to maintain
                            the minimum incentive slab for any of the criteria, your overall
                            incentive percentage will be zero.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsInfo;