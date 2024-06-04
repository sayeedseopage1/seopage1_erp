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
import FilterBar from '../components/Sections/IncentiveCriterias/FilterBar';
import Spinner from '../../PointFactors/components/loader/Spinner';
import QuarterAndYearlyTable from '../components/Sections/QuarterlyAndYearly/QuarterAndYearlyTable';
import { quarterlyAndYearlyTableData } from '../constants';
import useIncentive from '../hooks/useIncentive';

const Incentive = () => {
    const [tab, setTab] = useState("current");
    const [filterByPeriod, setFilterByPeriod] = useState("monthly");
    const { incentiveTypesLoading } = useIncentive();

    if (incentiveTypesLoading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spinner />
        </div>
    }

    return (
        <div>
            <IncentiveFilter filterByPeriod={filterByPeriod} />
            <div className='incentive_wrapper'>
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
                            <Switch.Case condition={filterByPeriod == "quarterly" || filterByPeriod == "yearly"}>
                                <div className='incentive_inner_wrapper'>
                                    {/* TODO: this slice will be removed when the api filter is ready */}
                                    <QuarterAndYearlyTable data={filterByPeriod == "quarterly" ? quarterlyAndYearlyTableData.slice(0, 3) : quarterlyAndYearlyTableData} />
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