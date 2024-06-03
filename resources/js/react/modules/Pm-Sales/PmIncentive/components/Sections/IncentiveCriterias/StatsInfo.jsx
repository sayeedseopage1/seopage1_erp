import React, { useEffect, useState } from 'react';
import StatsInfoProgressCard from './StatsInfoProgressCard';
import pointIconDark from '../../../assets/pointIconDark.svg'
import { IoInformationCircle } from "react-icons/io5";
import IncentivePointModal from '../../Modals/IncentivePointModal';
import { Popover, Skeleton } from 'antd';
import useIncentiveTypes from '../../../hooks/useIncentiveTypes';
import AverageProgressCard from './AverageProgressCard';
import { useDispatch, useSelector } from 'react-redux';
import { regularIncentivePoints } from '../../../../../../services/features/Pm-Sales/pmIncentiveSlice';

const StatsInfo = () => {
    const [incentivePointsModalOpen, setIncentivePointsModalOpen] = useState(false);
    const { allIncentiveTypes, regularIncentiveTypes, incentiveTypesLoading } = useIncentiveTypes();

    const pmIncentive = useSelector((state) => state.pmIncentive)
    const dispatch = useDispatch();

    const { regularPointAverage, regularIncentivePoints: regularIncentivePointsData } = pmIncentive || {}

    useEffect(() => {
        if (allIncentiveTypes) {
            dispatch(regularIncentivePoints((parseFloat(allIncentiveTypes?.data?.total_points) * regularPointAverage) / 100));
        }
    }, [allIncentiveTypes, regularPointAverage]);

    return (
        <div className='stats_info_wrapper'>
            {/* point stats */}
            <div className='stats_info_outer'>
                {
                    incentiveTypesLoading ? <Skeleton size="large" paragraph={{ rows: 7 }} active title={false} /> : <>
                        {
                            regularIncentiveTypes?.incentive_criterias?.map((item) => <StatsInfoProgressCard key={item?.id} item={item} />)
                        }
                        <AverageProgressCard item={regularIncentiveTypes} regularPointAverage={regularPointAverage} />
                    </>
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
                                className='stats_info_link' style={{ textDecoration: 'none' }}>
                                {parseFloat(allIncentiveTypes?.data?.total_points)}pt
                            </span></p>
                        </div>
                    </div>
                    {/* Your actual incentive points  */}
                    <div className="stats_score_child">
                        <span className="">
                            <img src={pointIconDark} alt="pointIconDark" />
                        </span>
                        <div className="">
                            <p className="stats_info_desc point_details_wrapper">
                                Your actual incentive points: <button className={`${regularIncentivePointsData > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'} stats_info_link bg-transparent`} onClick={() => setIncentivePointsModalOpen(true)}>
                                    {regularIncentivePointsData}pt
                                </button>
                                <Popover
                                    content='This is after multiplying your regular points with the average percentage calculated earlier'
                                    overlayStyle={{
                                        width: "220px"
                                    }}
                                >
                                    <IoInformationCircle className='informationCircle' />
                                </Popover>
                            </p>
                            <div
                                className="d-flex align-items-center"
                            >

                            </div>
                            <IncentivePointModal
                                antdModalOpen={incentivePointsModalOpen}
                                setAntdModalOpen={setIncentivePointsModalOpen}
                                regularPointAverage={regularPointAverage}
                                regularIncentivePointsData={regularIncentivePointsData}
                                totalPoints={parseFloat(allIncentiveTypes?.data?.total_points)}
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