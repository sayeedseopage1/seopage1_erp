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
            <div className='chart_section_wrapper'>
                <div className="chart_row_wrapper">
                    {/* chart 1  */}
                    <div className="secondary_chart_wrapper">
                        chart 1
                    </div>
                    {/* chart 2  */}
                    <div className="secondary_chart_wrapper">
                        chart 2
                    </div>
                </div>
                <div className="chart_row_wrapper">
                    {/* chart 1  */}
                    <div className="secondary_chart_wrapper">
                        chart 3
                    </div>
                    {/* chart 2  */}
                    <div className="secondary_chart_wrapper">
                        chart 4
                    </div>
                </div>
                <BonusPointsPointBanner />
            </div>
        </>
    );
};

export default BonusPoints;