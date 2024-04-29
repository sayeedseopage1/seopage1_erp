import React from 'react';
import UpsaleCrossSalePointBanner from './UpsaleCrossSalePointBanner';

const UpsaleCrossSale = () => {
    return (
        <>
            <div className="title_wrapper">
                <p className="section_title">
                    Upsale/cross sale amount
                </p>
            </div>
            <div className='chart_section_wrapper'>
                <div className="chart_row_wrapper">
                    {/* chart 1  */}
                    <div className="secondary_chart_wrapper">
                        UpdateCrossSaleBar
                    </div>
                    {/* chart 2  */}
                    <div className="secondary_chart_wrapper">
                        chart 2
                    </div>
                </div>
                <UpsaleCrossSalePointBanner />
            </div>
        </>
    );
};

export default UpsaleCrossSale;