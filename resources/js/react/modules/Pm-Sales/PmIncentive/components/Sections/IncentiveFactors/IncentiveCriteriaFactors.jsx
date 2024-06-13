import React from 'react';
import IncentiveCriteriaFactorTitleBar from './IncentiveCriteriaFactorTitleBar';
import IncentiveCriteriaFactorNote from './IncentiveCriteriaFactorNote';
import useIncentive from '../../../hooks/useIncentive';
import { formattedFactorData } from '../../../utils/formattedFactorData';
import IncentiveCriteriaFactorCard from './IncentiveCriteriaFactorCard';

const IncentiveCriteriaFactors = () => {
    const { allIncentiveTypes, regularIncentiveTypes, upSaleCrossSaleTypes, bonusIncentiveTypes, incentiveTypesLoading, incentiveTypesIsFetching } = useIncentive()

    const regularData = formattedFactorData(regularIncentiveTypes)
    const bonusData = formattedFactorData(bonusIncentiveTypes)
    const upSaleCrossSaleData = formattedFactorData(upSaleCrossSaleTypes)
    // console.log(regularData)

    return (
        <div>
            {/* regular points */}
            <div style={{ marginBottom: '50px' }}>
                <IncentiveCriteriaFactorTitleBar title={'Regular Points'} />
                <IncentiveCriteriaFactorNote content={'Actual regular points will be dependent on the following criteria:'} isImportant={true} isFullWidth={true} />
                <div className='incentive_criteria_factors'>
                    {
                        regularData?.map(item => <IncentiveCriteriaFactorCard key={item?.id} item={item} />)
                    }
                </div>
            </div>
            {/* bonus points */}
            <div style={{ marginBottom: '50px' }}>
                <IncentiveCriteriaFactorTitleBar title={'Bonus Points'} />
                <div className='incentive_criteria_factors_parent'>
                    <div className='criteria_factor_notes_wrapper'>
                        <IncentiveCriteriaFactorNote content={'Bonus Points Based on the Released Amounts'} />
                        <IncentiveCriteriaFactorNote content={'However, the final bonus points will be determined by the amount of unreleased payment he had (Previous + current month) as below:'} />
                    </div>
                    <div className='incentive_criteria_factors'>
                        {/* <div>
                            <IncentiveCriteriaFactorNote content={'Bonus Points Based on the Released Amounts'} />
                            {
                                bonusData?.slice(0, 1)?.map(item => <IncentiveCriteriaFactorCard key={item?.id} item={item} />)
                            }
                        </div>
                        <div>
                            <IncentiveCriteriaFactorNote content={'However, the final bonus points will be determined by the amount of unreleased payment he had (Previous + current month) as below:'} />
                            {
                                bonusData?.slice(1, 2)?.map(item => <IncentiveCriteriaFactorCard key={item?.id} item={item} />)
                            }
                        </div> */}
                        {
                            bonusData?.map(item => <IncentiveCriteriaFactorCard key={item?.id} item={item} />)
                        }
                    </div>
                </div>
            </div>
            {/* upSaleCrossSaleData points */}
            <div style={{ marginBottom: '50px' }}>
                <IncentiveCriteriaFactorTitleBar title={'Up sale/Cross Sale Points'} />
                <div className='incentive_criteria_factors'>
                    {
                        upSaleCrossSaleData?.map(item => <IncentiveCriteriaFactorCard key={item?.id} item={item} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default IncentiveCriteriaFactors;