import { useGetIncentiveFactorsQuery } from "../../../../services/api/Pm-Sales/PmIncentiveApiSlice";

const useIncentiveTypes = (query) => {
    const { data: allIncentiveTypes, isLoading: incentiveTypesLoading } = useGetIncentiveFactorsQuery(query);
    const incentiveTypesData = allIncentiveTypes?.data?.incentive_data;

    const regularIncentiveTypes = incentiveTypesData?.find((item) => item?.id == 1);
    const upSaleCrossSaleTypes = incentiveTypesData?.find((item) => item?.id == 2);
    const bonusData = incentiveTypesData?.find((item) => item?.id == 3);

    // console.log(query)


    const totalPrevAssignedAmount = parseFloat(allIncentiveTypes?.data?.total_previous_assigned_amount).toFixed(2);

    let bonusFormattedData;
    if (totalPrevAssignedAmount && totalPrevAssignedAmount >= 6000) {
        bonusFormattedData = bonusData?.incentive_criterias?.filter(item => item?.id !== 11);
    }
    if (totalPrevAssignedAmount && totalPrevAssignedAmount < 6000) {
        bonusFormattedData = bonusData?.incentive_criterias?.filter(item => item?.id !== 9)?.reverse();
    }

    const bonusIncentiveTypes = { ...bonusData, incentive_criterias: bonusFormattedData };

    return { allIncentiveTypes, regularIncentiveTypes, upSaleCrossSaleTypes, bonusIncentiveTypes, incentiveTypesLoading }
};

export default useIncentiveTypes;