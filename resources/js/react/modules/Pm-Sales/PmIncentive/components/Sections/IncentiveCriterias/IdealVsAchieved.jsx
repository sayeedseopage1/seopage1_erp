import React from 'react';
import IncentiveBarChart from '../../Charts/IncentiveBarChart';
import IncentiveThickChart from '../../Charts/IncentiveThickChart';
import { IncentiveFormattedData } from '../../../utils/formattedChartData';
import ChartDataLoader from '../../loader/ChartDataLoader';
import useIncentive from '../../../hooks/useIncentive';
// import RegularPointsThickChart from '../../Charts/RegularPointsThickChart';
import RegularThickChart from '../../Charts/RegularThickChart';

const IdealVsAchieved = () => {
    const { regularIncentiveTypes, incentiveTypesLoading } = useIncentive();

    const regularChartData = IncentiveFormattedData(regularIncentiveTypes)

    return (
        <div className='ideal_vs_achieved_container'>
            <p className="section_title">
                Ideal vs achieved :
            </p>
            {
                incentiveTypesLoading ? <ChartDataLoader count={7} /> : regularChartData?.length > 0 && regularChartData?.map((item) => {
                    return <div key={item?.id} className="chart_parent">
                        <div className="chart_wrapper">
                            <IncentiveBarChart chartData={item?.ideal} />
                        </div>
                        <div className="chart_wrapper">
                            {/* <IncentiveThickChart chartData={item?.achieved} /> */}
                            <RegularThickChart chartData={item?.achieved} />
                        </div>
                    </div>
                }

                )
            }
        </div>
    );
};

export default IdealVsAchieved;