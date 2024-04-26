import React from 'react';
import StatsInfoProgressCard from './StatsInfoProgressCard';

const StatsInfo = () => {
    return (
        <div className='stats_info_wrapper'>
            <div className='stats_info_outer'>
                <StatsInfoProgressCard />
            </div>
            <div className='stats_score_outer'>
                stats_score_outer
            </div>
        </div>
    );
};

export default StatsInfo;