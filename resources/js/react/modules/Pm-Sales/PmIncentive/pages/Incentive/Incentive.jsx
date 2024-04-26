import React, { useState } from 'react';
import IncentiveFilter from '../../components/IncentiveFilter';

const Incentive = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDataFetching, setIsDataFetching] = useState(true);



    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div>
            <IncentiveFilter setData={setData}
                setIsDataFetching={setIsDataFetching}
            />
        </div>
    );
};

export default Incentive;