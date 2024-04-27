import React from 'react';
import StatsInfoProgressCard from './StatsInfoProgressCard';

const StatsInfo = () => {
    return (
        <div className='stats_info_wrapper'>
            {/* point stats */}
            <div className='stats_info_outer'>
                <StatsInfoProgressCard />
                <StatsInfoProgressCard />
                <StatsInfoProgressCard />
                <StatsInfoProgressCard />
                <StatsInfoProgressCard />
                <StatsInfoProgressCard />
                <StatsInfoProgressCard />
            </div>
            {/* point score */}
            <div className='stats_score_outer'>
                stats_score_outer
            </div>
        </div>
    );
};

export default StatsInfo;