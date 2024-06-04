import React from 'react';
import { Placeholder } from '../../../../../global/Placeholder';
import { Skeleton } from 'antd';

const ChartDataLoader = ({ count }) => {
    return (
        <div>
            {
                Array(count).fill(0).map((_, index) => (
                    <div key={index} className="chart_parent">
                        <div className="chart_wrapper">
                            {/* <Placeholder height={300} /> */}
                            <Skeleton size="large" paragraph={{ rows: 5 }} active title={false} />
                        </div>
                        <div className="chart_wrapper">
                            {/* <Placeholder height={300} /> */}
                            <Skeleton size="large" paragraph={{ rows: 5 }} active title={false} />
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ChartDataLoader;