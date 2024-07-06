import React from 'react';
import GradientProgressBar from './GradientProgressBar';
import PropTypes from 'prop-types';

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
                    Achieved: {parseFloat(obtained_incentive)?.toFixed(2)}%
                </span>
            </div>
            <div className="progress_card_stats_wrapper">
                <div className="progress_card_stats_inner">
                    <span style={{ marginBottom: '6px' }}>{title}</span>
                    <span style={{ marginBottom: '6px' }}>{parseFloat(acquired_percent)?.toFixed(2)}/{parseFloat(incentive_factors[incentive_factors.length - 1]?.upper_limit)}%</span>
                </div>
                <GradientProgressBar progress={parseFloat(acquired_percent)} incentive={parseFloat(obtained_incentive)?.toFixed(2)} />
            </div>
        </div>
    );
};

export default StatsInfoProgressCard;

StatsInfoProgressCard.propTypes = {
    item: PropTypes.object
}