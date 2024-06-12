import React from 'react';
import IncentiveCriteriaFactorTitleBar from './IncentiveCriteriaFactorTitleBar';
import IncentiveCriteriaFactorNote from './IncentiveCriteriaFactorNote';
import useIncentive from '../../../hooks/useIncentive';
import { formattedFactorData } from '../../../utils/formattedFactorData';

const IncentiveCriteriaFactors = () => {
    const { allIncentiveTypes, regularIncentiveTypes, upSaleCrossSaleTypes, bonusIncentiveTypes, incentiveTypesLoading, incentiveTypesIsFetching } = useIncentive()

    const regularData = formattedFactorData(regularIncentiveTypes)
    console.log(regularData)

    return (
        <div>
            {/* regular points */}
            <div>
                <IncentiveCriteriaFactorTitleBar title={'Regular Points'} />
                <IncentiveCriteriaFactorNote content={'Actual regular points will be dependent on the following criteria:'} isImportant={true} />
                <div className='incentive_criteria_factors'>

                </div>
            </div>
        </div>
    );
};

export default IncentiveCriteriaFactors;