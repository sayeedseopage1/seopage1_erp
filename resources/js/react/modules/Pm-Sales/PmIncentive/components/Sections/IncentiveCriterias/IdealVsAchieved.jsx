import React from 'react';
import IncentiveBarChart from '../../Charts/IncentiveBarChart';
import IncentiveThickChart from '../../Charts/IncentiveThickChart';
import useIncentiveTypes from '../../../hooks/useIncentiveTypes';
import { IncentiveFormattedData } from '../../../utils/formattedChartData';

const IdealVsAchieved = () => {
    const { regularIncentiveTypes, incentiveTypesLoading } = useIncentiveTypes();

    const regularChartData = IncentiveFormattedData(regularIncentiveTypes)


    // TODO: handle loading state here as well
    return (
        <div className='ideal_vs_achieved_container'>
            <p className="section_title">
                Ideal vs achieved :
            </p>
            {regularChartData?.map((item, ind) =>
                <div key={ind} className="chart_parent">
                    <div className="chart_wrapper">
                        <IncentiveBarChart chartData={item?.ideal} />
                    </div>
                    <div className="chart_wrapper">
                        <IncentiveThickChart chartData={item?.achieved} />
                    </div>
                </div>
            )}

        </div>
    );
};

export default IdealVsAchieved;