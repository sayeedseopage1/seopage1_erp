import React, { useState } from 'react';
import IncentiveFilter from '../components/IncentiveFilter';
import PointBanner from '../components/Sections/IncentiveCriterias/PointBanner'
import IdealVsAchieved from '../components/Sections/IncentiveCriterias/IdealVsAchieved';
import StatsInfo from '../components/Sections/IncentiveCriterias/StatsInfo';
import UpsaleCrossSale from '../components/Sections/IncentiveCriterias/UpsaleCrossSale';
import BonusPoints from '../components/Sections/IncentiveCriterias/BonusPoints';
import FinalIncentiveBanner from '../components/Sections/IncentiveCriterias/FinalIncentiveBanner';
import Switch from '../../../../global/Switch';
import IncentiveFactors from '../components/Sections/IncentiveFactors/IncentiveFactors';
import HeldAmounts from '../components/Sections/HeldAmounts/HeldAmounts';
import QuarterlyAndYearlyTable from '../components/Sections/QuarterlyAndYearly/QuarterlyAndYearlyTable';
import FilterBar from '../components/Sections/IncentiveCriterias/FilterBar';

const Incentive = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDataFetching, setIsDataFetching] = useState(true);
    const [tab, setTab] = useState("current");
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
                                    {/******* This is regular incentive ***********/}
                                    <IdealVsAchieved />
                                    <StatsInfo />
                                    {/******* This is UpSale CrossSale incentive ***********/}
                                    <UpsaleCrossSale />
                                    {/******* This is Bonus Point incentive ***********/}
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