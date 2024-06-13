import React from 'react';

const IncentiveCriteriaFactorNote = ({ content, isImportant, isFullWidth }) => {
    return (
        <div className={`incentive_criteria_factor_note`} style={isFullWidth ? { maxWidth: '100%' } : {}}>{content}{isImportant && <span style={{ color: '#F00' }}>***</span>}</div>
    );
};

export default IncentiveCriteriaFactorNote;