import React from 'react';
import BonusPointsPointBanner from './BonusPointsPointBanner';
import IncentiveBarChart from '../../Charts/IncentiveBarChart';
import IncentiveThickChart from '../../Charts/IncentiveThickChart';
import useIncentiveTypes from '../../../hooks/useIncentiveTypes';
import { IncentiveFormattedData } from '../../../utils/formattedChartData';

const BonusPoints = () => {
    const { bonusIncentiveTypes, incentiveTypesLoading } = useIncentiveTypes();

    const bonusPointsChartData = IncentiveFormattedData(bonusIncentiveTypes)

    // console.log(allIncentiveTypes?.data?.total_previous_assigned_amount)
    // console.log(Number(allIncentiveTypes?.data?.total_previous_assigned_amount))
    // console.log(bonusPointsChartData)


    // const totalPrevAssignedAmount = parseFloat(allIncentiveTypes?.data?.total_previous_assigned_amount.replace(/,/g, ''));
    // const totalPrevAssignedAmount = 5000;
    // let bonusChartData;

    // if (totalPrevAssignedAmount >= 6000) {
    //     bonusChartData = bonusPointsChartData?.filter(item => item?.achieved?.id !== 11);
    // } else {
    //     bonusChartData = bonusPointsChartData?.filter(item => item?.achieved?.id !== 9)?.reverse();
    // }

    // console.log(totalPrevAssignedAmount)

    return (
        <>
            <div className="title_wrapper">
                <p className="section_title">
                    Bonus Points
                </p>
            </div>
            <div id='bonus_points' className='chart_section_container'>
                {
                    bonusPointsChartData?.map((item, ind) => (
                        <div key={ind} className="chart_parent">

                            <div className="secondary_chart_wrapper">
                                <IncentiveBarChart chartData={item?.ideal} />
                            </div>

                            <div className="secondary_chart_wrapper">
                                <IncentiveThickChart chartData={item?.achieved} />
                            </div>
                        </div>

                    ))
                }
                <BonusPointsPointBanner />
            </div>
        </>
    );
};

export default BonusPoints;