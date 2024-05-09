import React, { useState } from 'react';
import IncentiveFilter from '../components/IncentiveFilter';
import PointBanner from '../components/PointBanner';
import IdealVsAchieved from '../components/IdealVsAchieved';
import StatsInfo from '../components/StatsInfo';
import UpsaleCrossSale from '../components/UpsaleCrossSale';
import BonusPoints from '../components/BonusPoints';
import FinalIncentiveBanner from '../components/FinalIncentiveBanner';
import Switch from '../../../../global/Switch';
import IncentiveFactors from '../components/incentiveFactors/IncentiveFactors';
import FilterBar from '../components/FilterBar';
import QuarterlyAndYearlyTable from '../components/QuarterlyAndYearly/QuarterlyAndYearlyTable';
import HeldAmounts from '../components/Sections/HeldAmounts/HeldAmounts';

const Incentive = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDataFetching, setIsDataFetching] = useState(true);
    const [tab, setTab] = useState("held_amount");
    const [filterByPeriod, setFilterByPeriod] = useState("monthly");


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

                {/*  <FilterBar tab={tab} setTab={setTab} filterByPeriod={filterByPeriod} setFilterByPeriod={setFilterByPeriod} isPayNowModalOpen={isPayNowModalOpen} setIsPayNowModalOpen={setIsPayNowModalOpen} showPayNowModal={showPayNowModal} handlePayNowOk={handlePayNowOk} handlePayNowCancel={handlePayNowCancel} /> */}

                <FilterBar tab={tab} setTab={setTab} filterByPeriod={filterByPeriod} setFilterByPeriod={setFilterByPeriod} />

                <Switch>
                    <Switch.Case condition={tab == "current"}>

                        <Switch>
                            <Switch.Case condition={filterByPeriod == "monthly"}>
                                <div className='incentive_inner_wrapper'>
                                    <PointBanner />
                                    <IdealVsAchieved />
                                    <StatsInfo />
                                    <UpsaleCrossSale />
                                    <BonusPoints />
                                    <FinalIncentiveBanner />
                                </div>
                            </Switch.Case>
                            <Switch.Case condition={filterByPeriod == "quarterly"}>
                                <div className='incentive_inner_wrapper'>
                                    <QuarterlyAndYearlyTable period={3} />
                                </div>
                            </Switch.Case>
                            <Switch.Case condition={filterByPeriod == "yearly"}>
                                <div className='incentive_inner_wrapper'>
                                    <QuarterlyAndYearlyTable />
                                </div>
                            </Switch.Case>
                        </Switch>
                    </Switch.Case>
                    <Switch.Case condition={tab == "held_amount"}>
                        <div className='incentive_inner_wrapper'>
                            <HeldAmounts />
                        </div>
                    </Switch.Case>
                    <Switch.Case condition={tab == "incentive_factors"}>
                        <div className='incentive_inner_wrapper'>
                            <IncentiveFactors />
                        </div>
                    </Switch.Case>
                </Switch>
            </div>
        </div>
    );
};

export default Incentive;