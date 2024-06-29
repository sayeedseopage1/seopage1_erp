import React from 'react';
import { Skeleton } from 'antd';
import PropTypes from 'prop-types';

const ChartDataLoader = ({ count }) => {
    return (
        <div>
            {
                Array(count).fill(0).map((_, index) => (
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
    );
};

export default ChartDataLoader;

ChartDataLoader.propTypes = {
    count: PropTypes.number
}