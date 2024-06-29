import React, { useState } from 'react';
import GradientProgressBar from './GradientProgressBar';
import AveragePointModal from '../../Modals/AveragePointModal';
import PropTypes from 'prop-types';

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
                <button onClick={() => setAveragePointsModalOpen(true)} className={`${regularPointAverage > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'} stats_info_link bg-transparent`}>
                    {regularPointAverage}%
                </button>

                <AveragePointModal
                    antdModalOpen={averagePointsModalOpen}
                    setAntdModalOpen={setAveragePointsModalOpen}
                    item={item}
                />
            </div>
            <div className="progress_card_stats_wrapper">
                <div className="progress_card_stats_inner">
                    <span style={{ marginBottom: '6px' }}>Average</span>
                    <span style={{ marginBottom: '6px' }}>{regularPointAverage}/100%</span>
                </div>
                <GradientProgressBar incentive={regularPointAverage} isAverage={true} />
            </div>
        </div>
    );
};

export default AverageProgressCard;

AverageProgressCard.propTypes = {
    item: PropTypes.object,
    regularPointAverage: PropTypes.number
}