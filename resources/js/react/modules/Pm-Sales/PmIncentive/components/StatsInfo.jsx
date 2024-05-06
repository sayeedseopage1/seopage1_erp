import React, { useState } from 'react';
import StatsInfoProgressCard from './StatsInfoProgressCard';
import pointIconDark from '../assets/pointIconDark.svg'
import { IoInformationCircle } from "react-icons/io5";
import RegularPointsModal from './Modals/RegularPointsModal';
import CustomAntdModal from '../ui/CustomModal/CustomAntdModal';
import IncentivePointModal from './Modals/IncentivePointModal';
import { statsInfoData } from '../constants';

const StatsInfo = () => {
    const [regularPointsModalOpen, setRegularPointsModalOpen] = useState(false);
    const [incentivePointsModalOpen, setIncentivePointsModalOpen] = useState(false);

    return (
        <div className='stats_info_wrapper'>
            {/* point stats */}
            <div className='stats_info_outer'>
                {
                    statsInfoData?.stats_info?.map((item) => <StatsInfoProgressCard key={item?.id} item={item} />)
                }
            </div>
            {/* point score */}
            <div className='stats_score_outer'>
                <div className="stats_score_inner">
                    {/* regular point  */}
                    <div className="stats_score_child">
                        <span className="">
                            <img src={pointIconDark} alt="pointIconDark" />
                        </span>
                        <div className="">
                            <p className="stats_info_desc point_details_wrapper">Your Regular points: <span
                                onClick={() => setRegularPointsModalOpen(true)}
                                className="stats_info_link"
                            >
                                80pt
                            </span></p>
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
                        <div className="">
                            <p className="stats_info_desc point_details_wrapper">
                                Your actual incentive points: <span className="stats_info_link" onClick={() => setIncentivePointsModalOpen(true)}>
                                    400pt
                                </span>
                                <span
                                    title='This is after multiplying your regular points with the average percentage calculated earlier'
                                >
                                    <IoInformationCircle className='informationCircle' />
                                </span>
                            </p>
                            <div
                                className="d-flex align-items-center"
                            >

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