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
            <div className='chart_section_container'>
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
                <UpsaleCrossSalePointBanner />
            </div>
        </>
    );
};

export default UpsaleCrossSale;