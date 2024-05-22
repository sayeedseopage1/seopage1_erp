import React from 'react';
import GradientProgressBar from './GradientProgressBar';

const StatsInfoProgressCard = ({ item }) => {
    const { title, obtained_incentive, acquired_percent, incentive_factors } = item || {}

    return (
        <div className="progress_card_wrapper">
            <div className="progress_card_desc_wrapper">
                <span className={`${parseFloat(obtained_incentive) > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>
                    {title}:
                </span>
            </div>
            <div className="w-100">
                <span className={`${parseFloat(obtained_incentive) > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>
                    Achieved: {parseFloat(obtained_incentive)}%
                </span>
            </div>
            <div className="progress_card_stats_wrapper">
                <div className="progress_card_stats_inner">
                    <label>{title}</label>
                    <label>{parseFloat(acquired_percent)}/{parseFloat(incentive_factors[incentive_factors.length - 1]?.upper_limit)}%</label>
                </div>
                <GradientProgressBar progress={parseFloat(acquired_percent)} />
            </div>
        </div>
    );
};

export default StatsInfoProgressCard;