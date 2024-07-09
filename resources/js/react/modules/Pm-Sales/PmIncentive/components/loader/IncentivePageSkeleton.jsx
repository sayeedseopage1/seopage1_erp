import { Skeleton } from 'antd';
import React from 'react';

const heights = [300, 240, 200, 160, 120, 80];

const ChartSkeleton = ({ heights }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '10px' }}>
        {heights.map((height, index) => (
            <Skeleton.Button
                key={index}
                active={true}
                size={'small'}
                block={true}
                shape={'default'}
                style={{ width: '100%', height: `${height}px` }}
            />
        ))}
    </div>
);

const IncentivePageSkeleton = () => {
    return (
        <div className='incentive_inner_wrapper'>
            <div className='ideal_vs_achieved_container'>
                <div className="point_banner p-0 mb-3">
                    <div className="point_card">
                        <Skeleton.Button active={true} size={'default'} shape={'default'} block={true} />
                    </div>

                    <div className="point_card">
                        <Skeleton.Button active={true} size={'default'} shape={'default'} block={true} />
                    </div>
                </div>
            </div>
            <div className='ideal_vs_achieved_container'>
                {
                    Array(7).fill(0).map((_, index) => (
                        <div key={index} className="chart_parent">
                            <div className="chart_wrapper">
                                <ChartSkeleton heights={heights} />
                            </div>
                            <div className="chart_wrapper">
                                <ChartSkeleton heights={heights} />
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>

    );
};

export default IncentivePageSkeleton;