import React from 'react';
import BonusPointsPointBanner from './BonusPointsPointBanner';
import IncentiveBarChart from './Charts/IncentiveBarChart';
import IncentiveThickChart from './Charts/IncentiveThickChart';
import { bonusPointsChartData } from '../constants';

const BonusPoints = () => {
    return (
        <>
            <div className="title_wrapper">
                <p className="section_title">
                    Bonus Points
                </p>
            </div>
            <div id='bonus_points' className='chart_section_container'>
                {
                    bonusPointsChartData?.map(item => (
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