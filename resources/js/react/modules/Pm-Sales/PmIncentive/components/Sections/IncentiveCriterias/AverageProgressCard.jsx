import React, { useState } from 'react';
import GradientProgressBar from './GradientProgressBar';
import AveragePointModal from '../../Modals/AveragePointModal';

const AverageProgressCard = ({ item }) => {
    // const { title, obtained_incentive, acquired_percent, incentive_factors } = item || {}
    const [averagePointsModalOpen, setAveragePointsModalOpen] = useState(false);
    const [averagePoints, setAveragePoints] = useState(0);
    console.log(item)

    return (
        <div className="progress_card_wrapper">
            <div className="progress_card_desc_wrapper">
                <span className={`${averagePoints > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>
                    Average:
                </span>
            </div>
            <div className="w-100">
                <span onClick={() => setAveragePointsModalOpen(true)} className={`${averagePoints > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'} stats_info_link`}>
                    {0}%
                </span>

                <AveragePointModal
                    antdModalOpen={averagePointsModalOpen}
                    setAntdModalOpen={setAveragePointsModalOpen}
                    averagePoints={averagePoints}
                    setAveragePoints={setAveragePoints}
                    item={item}
                />
            </div>
            <div className="progress_card_stats_wrapper">
                <div className="progress_card_stats_inner">
                    <label>Average</label>
                    <label>{averagePoints}/100%</label>
                </div>
                <GradientProgressBar progress={0} />
            </div>
        </div>
    );
};

export default AverageProgressCard;