import React from 'react';
import UpsaleCrossSalePointBanner from './UpsaleCrossSalePointBanner';
import { upSaleCrossSaleChartData } from '../constants';
import IncentiveBarChart from './Charts/IncentiveBarChart';
import IncentiveThickChart from './Charts/IncentiveThickChart';

const UpsaleCrossSale = () => {
    return (
        <>
            <div className="title_wrapper">
                <p className="section_title">
                    Upsale/cross sale amount
                </p>
            </div>
            <div className='chart_section_container'>
                {
                    upSaleCrossSaleChartData?.map(item => (
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

                <UpsaleCrossSalePointBanner />
            </div>
        </>
    );
};

export default UpsaleCrossSale;