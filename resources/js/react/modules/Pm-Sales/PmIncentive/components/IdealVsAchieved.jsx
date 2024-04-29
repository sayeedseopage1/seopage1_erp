import React from 'react';
import '../styles/IdealVsAchieved.css'
import IncentiveBarChart from './Charts/IncentiveBarChart';
import { idealVsAchievedChartData } from '../constants';

const IdealVsAchieved = () => {
    return (
        <div className='ideal_vs_achieved_container'>
            <p className="section_title">
                Ideal vs achieved :
            </p>
            {idealVsAchievedChartData.map(item =>
                <div key={item.id} className="chart_parent">
                    {/* Ideal */}
                    <div className="chart_wrapper">
                        <IncentiveBarChart chartData={item.ideal} />
                    </div>
                    {/* Achieved */}
                    <div className="chart_wrapper">
                        <IncentiveBarChart chartData={item.achieved} />
                    </div>
                </div>
            )}

        </div>
    );
};

export default IdealVsAchieved;