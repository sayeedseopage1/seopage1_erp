import React from 'react';
import BonusPointsPointBanner from './BonusPointsPointBanner';
import IncentiveBarChart from '../../Charts/IncentiveBarChart';
// import IncentiveThickChart from '../../Charts/IncentiveThickChart';
// import { bonusPointsChartData } from '../../../constants';
import useIncentiveTypes from '../../../hooks/useIncentiveTypes';
import { IncentiveFormattedData } from '../../../utils/formattedChartData';
import { chartRangesForColor } from '../../../constants/rangesColor';

const BonusPoints = () => {
    const { bonusIncentiveTypes, incentiveTypesLoading } = useIncentiveTypes();

    const bonusPointsChartData = IncentiveFormattedData(bonusIncentiveTypes, chartRangesForColor)

    console.log(bonusPointsChartData)
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

                            {/*  <div className="secondary_chart_wrapper">
                                <IncentiveThickChart chartData={item?.achieved} />
                            </div> */}
                        </div>

                    ))
                }
                <BonusPointsPointBanner />
            </div>
        </>
    );
};

export default BonusPoints;