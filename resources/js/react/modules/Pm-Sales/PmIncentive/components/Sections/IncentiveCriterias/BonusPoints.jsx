import React from 'react';
import BonusPointsPointBanner from './BonusPointsPointBanner';
import IncentiveBarChart from '../../Charts/IncentiveBarChart';
import IncentiveThickChart from '../../Charts/IncentiveThickChart';
import useIncentiveTypes from '../../../hooks/useIncentiveTypes';
import { IncentiveFormattedData } from '../../../utils/formattedChartData';
import ChartDataLoader from '../../loader/ChartDataLoader';

const BonusPoints = () => {
    const { bonusIncentiveTypes, incentiveTypesLoading } = useIncentiveTypes();

    const bonusPointsChartData = IncentiveFormattedData(bonusIncentiveTypes)

    return (
        <>
            <div className="title_wrapper">
                <p className="section_title">
                    Bonus Points
                </p>
            </div>
            <div id='bonus_points' className='chart_section_container'>
                {
                    incentiveTypesLoading ? <ChartDataLoader count={2} /> : bonusPointsChartData?.length > 0 && bonusPointsChartData?.map((item) => (
                        <div key={item?.id} className="chart_parent">

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