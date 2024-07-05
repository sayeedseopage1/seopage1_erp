import { Skeleton } from 'antd';
import React from 'react';

const IncentiveFactorPageSkeleton = () => {
    return (
        <div>
            <div style={{ marginBottom: '50px' }}>
                <div className='incentive_criteria_factor_title'>
                    <p style={{ maxWidth: '300px', margin: 'auto' }}><Skeleton.Button active={true} size={'default'} block={true} shape={'default'} /> </p>
                </div>
                <div className={`incentive_criteria_factor_note`} style={{ maxWidth: '100%' }}>
                    <Skeleton.Button active={true} size={'small'} shape={'default'} block={true} />
                </div>
                <div className='incentive_criteria_factors'>
                    {
                        Array(6).fill(0).map((_, index) => (
                            <div key={index} className='criteria_card'>
                                <p style={{ width: '200px', margin: 'auto' }}><Skeleton.Button active={true} size={'small'} block={true} shape={'default'} /> </p>
                                <hr className='criteria_card_divider' style={{ color: "#55BBFF" }} />
                                <div className='factor_header'>
                                    <Skeleton.Button active={true} size={'default'} shape={'default'} block={true} />
                                    <Skeleton.Button active={true} size={'default'} shape={'default'} block={true} />
                                </div>
                                <div className='factor_body'>
                                    {
                                        Array(5).fill(0).map((_, index) => (
                                            <div key={index} className='factor_card'>
                                                <div className='factor_title'><Skeleton.Button active={true} size={'small'} shape={'default'} block={true} /></div>
                                                <div className='factor_description'><Skeleton.Button active={true} size={'small'} shape={'default'} block={true} /></div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default IncentiveFactorPageSkeleton;