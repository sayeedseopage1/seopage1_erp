import { useEffect, useState } from "react";
import { filterNullValues } from "../utils/removeNull";
import { useGetFactorsFieldsByCriteriaQuery } from "../../../../services/api/Pm-Sales/pmSalesApiSlice";

const useActiveFactorFields = ({ newFactorData }) => {
    const [activeCriteriaId, setActiveCriteria] = useState(null)
    //factor fields by criteria 
    useEffect(() => {
        setActiveCriteria(newFactorData?.criteria?.id)
    }, [newFactorData?.criteria])

    const { data: factorFields } = useGetFactorsFieldsByCriteriaQuery(activeCriteriaId, {
        skip: !activeCriteriaId
    })

    let activeFactorFields = filterNullValues(factorFields?.data)

    return { activeFactorFields, setActiveCriteria }
};

export default useActiveFactorFields;