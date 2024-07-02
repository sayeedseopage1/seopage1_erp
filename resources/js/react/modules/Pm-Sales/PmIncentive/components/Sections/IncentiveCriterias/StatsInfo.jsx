import React, { useEffect, useState } from 'react';
import StatsInfoProgressCard from './StatsInfoProgressCard';
import pointIconDark from '../../../assets/pointIconDark.svg'
import IncentivePointModal from '../../Modals/IncentivePointModal';
import { Popover, Skeleton } from 'antd';
import AverageProgressCard from './AverageProgressCard';
import { useDispatch, useSelector } from 'react-redux';
import { regularIncentivePoints } from '../../../../../../services/features/Pm-Sales/pmIncentiveSlice';
import useIncentive from '../../../hooks/useIncentive';
import infoIcon from '../../../assets/info-icon.png';

const StatsInfo = () => {
    const [incentivePointsModalOpen, setIncentivePointsModalOpen] = useState(false);
    const { allIncentiveTypes, regularIncentiveTypes, incentiveTypesLoading } = useIncentive();

    const pmIncentive = useSelector((state) => state.pmIncentive)
    const dispatch = useDispatch();

    const { regularPointAverage, regularIncentivePoints: regularIncentivePointsData } = pmIncentive || {}

    useEffect(() => {
        if (allIncentiveTypes) {
            let res = (parseFloat(allIncentiveTypes?.data?.total_points) * regularPointAverage) / 100
            dispatch(regularIncentivePoints(parseFloat(res).toFixed(2)));
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
                                    {parseFloat(regularIncentivePointsData)?.toFixed(2)}pt
                                </button>
                                <Popover
                                    content='This is after multiplying your regular points with the average percentage calculated earlier'
                                    overlayStyle={{
                                        width: "220px"
                                    }}
                                >
                                    <img src={infoIcon} alt="infoIcon" style={{ marginLeft: "4px" }} />
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