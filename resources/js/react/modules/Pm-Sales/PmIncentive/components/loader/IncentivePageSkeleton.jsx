import { Skeleton } from 'antd';
import React from 'react';

const IncentivePageSkeleton = () => {
    return (
        <div>
            <div className="point_banner p-0 mb-3">
                <div className="point_card">
                    <Skeleton.Button active={true} size={'default'} shape={'default'} block={true} />
                </div>

                <div className="point_card">
                    <Skeleton.Button active={true} size={'default'} shape={'default'} block={true} />
                </div>
            </div>
            <div>
                {
                    Array(3).fill(0).map((_, index) => (
                        <div key={index} className="chart_parent">
                            <div className="chart_wrapper">

                                <Skeleton size="large" paragraph={{ rows: 5 }} active title={false} />
                            </div>
                            <div className="chart_wrapper">

                                <Skeleton size="large" paragraph={{ rows: 5 }} active title={false} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default IncentivePageSkeleton;