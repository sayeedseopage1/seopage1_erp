import React, { useState } from 'react';
import GradientProgressBar from './GradientProgressBar';
import AveragePointModal from '../../Modals/AveragePointModal';

const AverageProgressCard = ({ item, regularPointAverage }) => {
    const [averagePointsModalOpen, setAveragePointsModalOpen] = useState(false);

    return (
        <div className="progress_card_wrapper">
            <div className="progress_card_desc_wrapper">
                <span className={`${regularPointAverage > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>
                    Average:
                </span>
            </div>
            <div className="w-100">
                <span onClick={() => setAveragePointsModalOpen(true)} className={`${regularPointAverage > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'} stats_info_link`}>
                    {regularPointAverage}%
                </span>

                <AveragePointModal
                    antdModalOpen={averagePointsModalOpen}
                    setAntdModalOpen={setAveragePointsModalOpen}
                    item={item}
                />
            </div>
            <div className="progress_card_stats_wrapper">
                <div className="progress_card_stats_inner">
                    <label>Average</label>
                    <label>{regularPointAverage}/100%</label>
                </div>
                <GradientProgressBar incentive={regularPointAverage} isAverage={true} />
            </div>
        </div>
    );
};

export default AverageProgressCard;