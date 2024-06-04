import React, { createContext, useState } from 'react';
import { useGetIncentiveFactorsQuery } from '../../../../services/api/Pm-Sales/PmIncentiveApiSlice';
import _ from 'lodash';

export const IncentiveContext = createContext(null);
const IncentiveDataProvider = ({ children }) => {

    const [query, setQuery] = useState({})

    const { user_id, start_date, end_date } = query || {};

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    // get pm point factors
    const { data: allIncentiveTypes, isLoading: incentiveTypesLoading, isFetching: incentiveTypesIsFetching, error } =
        useGetIncentiveFactorsQuery(
            queryString({
                user_id,
                start_date,
                end_date,
            }),
            // { skip: !user_id },
        );

    const incentiveTypesData = allIncentiveTypes?.data?.incentive_data;

    const regularIncentiveTypes = incentiveTypesData?.find((item) => item?.id == 1);
    const upSaleCrossSaleTypes = incentiveTypesData?.find((item) => item?.id == 2);
    const bonusData = incentiveTypesData?.find((item) => item?.id == 3);

    const totalPrevAssignedAmount = parseFloat(allIncentiveTypes?.data?.total_previous_assigned_amount).toFixed(2);

    let bonusFormattedData;
    if (totalPrevAssignedAmount && totalPrevAssignedAmount >= 6000) {
        bonusFormattedData = bonusData?.incentive_criterias?.filter(item => item?.id !== 11);
    }
    if (totalPrevAssignedAmount && totalPrevAssignedAmount < 6000) {
        bonusFormattedData = bonusData?.incentive_criterias?.filter(item => item?.id !== 9)?.reverse();
    }

    const bonusIncentiveTypes = { ...bonusData, incentive_criterias: bonusFormattedData };



    const incentiveInfo = { allIncentiveTypes, regularIncentiveTypes, upSaleCrossSaleTypes, bonusIncentiveTypes, incentiveTypesLoading, incentiveTypesIsFetching, setQuery }


    return (
        <IncentiveContext.Provider value={incentiveInfo}>
            {children}
        </IncentiveContext.Provider>
    );
};

export default IncentiveDataProvider;