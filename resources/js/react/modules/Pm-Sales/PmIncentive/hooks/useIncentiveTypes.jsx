import { useGetIncentiveTypeQuery } from '../../../../services/api/Pm-Sales/PmIncentiveApiSlice';

const useIncentiveTypes = () => {
    const { data: incentiveTypes, isLoading: incentiveTypesLoading } = useGetIncentiveTypeQuery();
    const incentiveTypesData = incentiveTypes?.data;

    const regularIncentiveTypes = incentiveTypesData?.find((item) => item?.id == 1);
    const upSaleCrossSaleTypes = incentiveTypesData?.find((item) => item?.id == 2);
    const bonusIncentiveTypes = incentiveTypesData?.find((item) => item?.id == 3);


    return { regularIncentiveTypes, upSaleCrossSaleTypes, bonusIncentiveTypes, incentiveTypesLoading }
};

export default useIncentiveTypes;