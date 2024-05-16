import { useGetAllCriteriaQuery } from "../../../../services/api/Pm-Sales/pmSalesApiSlice";

const useCriteriaList = () => {
    const { data: criterias } = useGetAllCriteriaQuery()
    const criteriaList = criterias?.data
    const criteriaConst = criteriaList?.map(c => {
        return {
            id: c?.id,
            label: c?.title,
            name: c?.id,
        }
    })
    const CriteriaConstList = {
        label: "CriteriaLists",
        emptyOptionsLabel: "Select Criteria",
        id: "CriteriaLists",
        data: criteriaConst,
    };

    return { CriteriaConstList }
};

export default useCriteriaList;