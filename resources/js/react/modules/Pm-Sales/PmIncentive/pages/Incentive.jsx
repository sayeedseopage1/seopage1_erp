import React, { useState } from 'react';
import IncentiveFilter from '../components/IncentiveFilter';
import FilterBar from '../components/Filterbar';
import PointBanner from '../components/PointBanner';
import IdealVsAchieved from '../components/IdealVsAchieved';
import StatsInfo from '../components/StatsInfo';
import UpsaleCrossSale from '../components/UpsaleCrossSale';

const Incentive = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDataFetching, setIsDataFetching] = useState(true);
    const [tab, setTab] = useState(1);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div>
            <IncentiveFilter
                setData={setData}
                setIsDataFetching={setIsDataFetching}
            />
            <div className='incentive_wrapper'>
                <FilterBar tab={tab} setTab={setTab} />
                <div className='incentive_inner_wrapper'>
                    <PointBanner />
                    <IdealVsAchieved />
                    <StatsInfo />
                    <UpsaleCrossSale />
                </div>
            </div>
        </div>
    );
};

export default Incentive;