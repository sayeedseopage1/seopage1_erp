import React from 'react';
import GradientProgressBar from './GradientProgressBar';

const StatsInfoProgressCard = () => {
    let value = 80;
    return (
        <div className="progress_card_wrapper">
            <div className="progress_card_desc_wrapper">
                <span className={`${value > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>
                    Revision vs task ratio:
                </span>
            </div>
            <div className="w-100">
                <span className={`${value > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>
                    Achieved: 0%
                </span>
            </div>
            <div className="progress_card_stats_wrapper">
                <div className="progress_card_stats_inner">
                    <label>Revision vs task ratio</label>
                    <label>0/100%</label>
                </div>
                <GradientProgressBar progress={value} />
            </div>
        </div>
    );
};

export default StatsInfoProgressCard;