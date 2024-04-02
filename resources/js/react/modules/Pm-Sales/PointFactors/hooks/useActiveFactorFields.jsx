import { useEffect, useState } from "react";
import { useGetFactorsFieldsByCriteriaQuery } from "../../../../services/api/pmSalesApiSlice";
import { filterNullValues } from "../utils/removeNull";

const useActiveFactorFields = ({ newFactorData }) => {
    const [activeCriteria, setActiveCriteria] = useState(null)
    //factor fields by criteria 
    useEffect(() => {
        setActiveCriteria(newFactorData?.criteria?.id)
    }, [newFactorData?.criteria])

    const { data: factorFields } = useGetFactorsFieldsByCriteriaQuery(activeCriteria, {
        skip: !activeCriteria
    })
    const activeFactorFields = filterNullValues(factorFields?.data)

    return { activeFactorFields }
};

export default useActiveFactorFields;