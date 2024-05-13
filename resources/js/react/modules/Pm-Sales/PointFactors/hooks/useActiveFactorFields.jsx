import { useEffect, useState } from "react";
import { useGetFactorsFieldsByCriteriaQuery } from "../../../../services/api/pmSalesApiSlice";
import { filterNullValues } from "../utils/removeNull";

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