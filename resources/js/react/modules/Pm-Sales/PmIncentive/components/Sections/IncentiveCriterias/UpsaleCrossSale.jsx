import React from 'react';
import IncentiveBarChart from '../../Charts/IncentiveBarChart';
import IncentiveThickChart from '../../Charts/IncentiveThickChart';
import useIncentiveTypes from '../../../hooks/useIncentiveTypes'
import UpsaleCrossSalePointBanner from './UpsaleCrossSalePointBanner';
import { IncentiveFormattedData } from '../../../utils/formattedChartData';
import ChartDataLoader from '../../loader/ChartDataLoader';


const UpsaleCrossSale = () => {
    const { upSaleCrossSaleTypes, incentiveTypesLoading } = useIncentiveTypes();

    const upSaleCrossSaleChartData = IncentiveFormattedData(upSaleCrossSaleTypes)

    return (
        <>
            <div className="title_wrapper">
                <p className="section_title">
                    Upsale/cross sale amount
                </p>
            </div>
            <div className='chart_section_container'>
                {
                    incentiveTypesLoading ? <ChartDataLoader count={1} /> : upSaleCrossSaleChartData?.length > 0 && upSaleCrossSaleChartData?.map((item) => (
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