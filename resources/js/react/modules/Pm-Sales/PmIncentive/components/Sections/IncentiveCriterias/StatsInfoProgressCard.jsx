import React, { useState } from 'react';
import GradientProgressBar from './GradientProgressBar';
import AveragePointModal from '../../Modals/AveragePointModal';

const StatsInfoProgressCard = ({ item }) => {
    const { title, achieved } = item || {}
    const [averagePointsModalOpen, setAveragePointsModalOpen] = useState(false);

    return (
        <div className="progress_card_wrapper">
            <div className="progress_card_desc_wrapper">
                <span className={`${achieved > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>
                    {title}:
                </span>
            </div>
            <div className="w-100">
                {
                    title == "Average" ?
                        <span onClick={() => setAveragePointsModalOpen(true)} className={`${achieved > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'} stats_info_link`}>
                            {achieved}%
                        </span>
                        : <span className={`${achieved > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>
                            Achieved: {achieved}%
                        </span>
                }
                <AveragePointModal
                    antdModalOpen={averagePointsModalOpen}
                    setAntdModalOpen={setAveragePointsModalOpen}
                />
            </div>
            <div className="progress_card_stats_wrapper">
                <div className="progress_card_stats_inner">
                    <label>{title}</label>
                    <label>{achieved}/100%</label>
                </div>
                <GradientProgressBar progress={achieved} />
            </div>
        </div>
    );
};

export default StatsInfoProgressCard;