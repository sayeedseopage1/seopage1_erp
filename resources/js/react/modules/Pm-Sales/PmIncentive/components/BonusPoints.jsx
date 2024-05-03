import React from 'react';
import BonusPointsPointBanner from './BonusPointsPointBanner';

const BonusPoints = () => {
    return (
        <>
            <div className="title_wrapper">
                <p className="section_title">
                    Bonus Points
                </p>
            </div>
            <div id='bonus_points' className='chart_section_container'>
                <div className='chart_parent'>
                    {/* chart 1  */}
                    <div className="secondary_chart_wrapper">
                        Chart 1
                    </div>
                    {/* chart 1  */}
                    <div className="secondary_chart_wrapper">
                        Chart 1
                    </div>
                </div>
                <BonusPointsPointBanner />
            </div>
        </>
    );
};

export default BonusPoints;