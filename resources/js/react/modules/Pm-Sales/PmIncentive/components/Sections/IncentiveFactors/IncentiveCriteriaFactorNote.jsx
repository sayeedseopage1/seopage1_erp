import React from 'react';

const IncentiveCriteriaFactorNote = ({ content, isImportant }) => {
    return (
        <div className='incentive_criteria_factor_note'>{content}{isImportant && <span style={{ color: '#F00' }}>***</span>}</div>
    );
};

export default IncentiveCriteriaFactorNote;