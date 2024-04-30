import React, { useState } from 'react';
import IncentiveFilter from '../components/IncentiveFilter';
import FilterBar from '../components/Filterbar';
import PointBanner from '../components/PointBanner';
import IdealVsAchieved from '../components/IdealVsAchieved';
import StatsInfo from '../components/StatsInfo';
import UpsaleCrossSale from '../components/UpsaleCrossSale';
import BonusPoints from '../components/BonusPoints';
import FinalIncentiveBanner from '../components/FinalIncentiveBanner';
import Switch from '../../../../global/Switch';

const Incentive = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDataFetching, setIsDataFetching] = useState(true);
    const [tab, setTab] = useState("current");

    const [filterByPeriod, setFilterByPeriod] = useState("monthly");

    console.log("tab", tab);
    console.log("filterByPeriod", filterByPeriod);


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
                <FilterBar tab={tab} setTab={setTab} filterByPeriod={filterByPeriod} setFilterByPeriod={setFilterByPeriod} />
                <Switch>
                    <Switch.Case></Switch.Case>
                </Switch>
                {
                    tab == "current" ? <div className='incentive_inner_wrapper'>
                        <PointBanner />
                        <IdealVsAchieved />
                        <StatsInfo />
                        <UpsaleCrossSale />
                        <BonusPoints />
                        <FinalIncentiveBanner />
                    </div> : <div className='incentive_inner_wrapper'>
                        hello from Held amounts
                    </div>
                }

            </div>
        </div>
    );
};

export default Incentive;