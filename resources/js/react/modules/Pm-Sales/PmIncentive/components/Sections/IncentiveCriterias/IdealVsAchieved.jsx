import React from 'react';
import IncentiveBarChart from '../../Charts/IncentiveBarChart';
import IncentiveThickChart from '../../Charts/IncentiveThickChart';
import useIncentiveTypes from '../../../hooks/useIncentiveTypes';
import { IncentiveFormattedData } from '../../../utils/formattedChartData';
// import { Placeholder } from '../../../../../../global/Placeholder';
import ChartDataLoader from '../../loader/ChartDataLoader';

const IdealVsAchieved = () => {
    const { regularIncentiveTypes, incentiveTypesLoading } = useIncentiveTypes();

    const regularChartData = IncentiveFormattedData(regularIncentiveTypes)

    return (
        <div className='ideal_vs_achieved_container'>
            <p className="section_title">
                Ideal vs achieved :
            </p>
            {
                incentiveTypesLoading ? <ChartDataLoader count={7} /> : regularChartData?.length > 0 && regularChartData?.map((item) =>
                    <div key={item?.id} className="chart_parent">
                        <div className="chart_wrapper">
                            <IncentiveBarChart chartData={item?.ideal} />
                        </div>
                        <div className="chart_wrapper">
                            <IncentiveThickChart chartData={item?.achieved} />
                        </div>
                    </div>
                )
            }
            {/* {regularChartData?.map((item) =>
                <div key={item?.id} className="chart_parent">
                    <div className="chart_wrapper">
                        <IncentiveBarChart chartData={item?.ideal} />
                    </div>
                    <div className="chart_wrapper">
                        <IncentiveThickChart chartData={item?.achieved} />
                    </div>
                </div>
            )} */}

        </div>
    );
};

export default IdealVsAchieved;