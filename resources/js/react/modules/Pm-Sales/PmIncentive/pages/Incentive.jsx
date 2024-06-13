import React, { useState } from 'react';
import IncentiveFilter from '../components/IncentiveFilter';
import PointBanner from '../components/Sections/IncentiveCriterias/PointBanner'
import IdealVsAchieved from '../components/Sections/IncentiveCriterias/IdealVsAchieved';
import StatsInfo from '../components/Sections/IncentiveCriterias/StatsInfo';
import UpsaleCrossSale from '../components/Sections/IncentiveCriterias/UpsaleCrossSale';
import BonusPoints from '../components/Sections/IncentiveCriterias/BonusPoints';
import FinalIncentiveBanner from '../components/Sections/IncentiveCriterias/FinalIncentiveBanner';
import Switch from '../../../../global/Switch';
// import IncentiveFactors from '../components/Sections/IncentiveFactors/IncentiveFactors';
import HeldAmounts from '../components/Sections/HeldAmounts/HeldAmounts';
import FilterBar from '../components/Sections/IncentiveCriterias/FilterBar';
import Spinner from '../../PointFactors/components/loader/Spinner';
import QuarterAndYearlyTable from '../components/Sections/QuarterlyAndYearly/QuarterAndYearlyTable';
import useIncentive from '../hooks/useIncentive';
import { useGetAchievedIncentiveQuery, useGetIncentiveHeldAmountQuery } from '../../../../services/api/Pm-Sales/PmIncentiveApiSlice';
import _ from 'lodash';
import IncentiveCriteriaFactors from '../components/Sections/IncentiveFactors/IncentiveCriteriaFactors';

const Incentive = () => {
    const [tab, setTab] = useState("current");
    const [filterByPeriod, setFilterByPeriod] = useState("monthly");
    const { incentiveTypesLoading } = useIncentive();
    const [queryForAchievedIncentive, setQueryForAchievedIncentive] = useState({})
    const [queryForIncentiveHeldAmounts, setQueryForIncentiveHeldAmounts] = useState({})

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    //make query string for held amounts
    const queryStringForIncentiveHeldAmounts = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    // get pm point factors
    const { data: achievedIncentiveHistory, isFetching: achievedIncentiveHistoryIsFetching, isLoading: achievedIncentiveHistoryLoading } =
        useGetAchievedIncentiveQuery(
            queryString(queryForAchievedIncentive),
            { skip: filterByPeriod == "monthly" },
        );

    const achievedIncentiveHistoryData = achievedIncentiveHistory?.data

    // get incentive held amounts 
    const { data: incentiveHeldAmounts, isLoading: incentiveHeldAmountsLoading, isFetching: incentiveHeldAmountsIsFetching } = useGetIncentiveHeldAmountQuery(
        queryStringForIncentiveHeldAmounts(queryForIncentiveHeldAmounts),
        { skip: tab != "held_amount" }
    )

    const incentiveHeldAmountsData = incentiveHeldAmounts?.data

    if (incentiveTypesLoading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spinner />
        </div>
    }

    return (
        <div>
            <IncentiveFilter filterByPeriod={filterByPeriod} setQueryForAchievedIncentive={setQueryForAchievedIncentive} setQueryForIncentiveHeldAmounts={setQueryForIncentiveHeldAmounts} tab={tab} />
            <div className='incentive_wrapper'>
                <FilterBar tab={tab} queryStringForIncentiveHeldAmounts={queryStringForIncentiveHeldAmounts} queryForIncentiveHeldAmounts={queryForIncentiveHeldAmounts} setTab={setTab} filterByPeriod={filterByPeriod} setFilterByPeriod={setFilterByPeriod} />

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
                                    <QuarterAndYearlyTable data={achievedIncentiveHistoryData} isFetching={achievedIncentiveHistoryIsFetching} isLoading={achievedIncentiveHistoryLoading} />
                                </div>
                            </Switch.Case>
                        </Switch>
                    </Switch.Case>
                    <Switch.Case condition={tab == "held_amount"}>
                        <div className='incentive_inner_wrapper'>
                            <HeldAmounts data={incentiveHeldAmountsData} isFetching={incentiveHeldAmountsIsFetching} isLoading={incentiveHeldAmountsLoading} />
                        </div>
                    </Switch.Case>
                    <Switch.Case condition={tab == "incentive_factors"}>
                        <div className='incentive_inner_wrapper'>
                            {/* <IncentiveFactors /> */}
                            <IncentiveCriteriaFactors />
                        </div>
                    </Switch.Case>
                </Switch>
            </div>
        </div>
    );
};

export default Incentive;