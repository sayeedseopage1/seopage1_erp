import { useContext } from "react";
import { IncentiveContext } from "../Provider/IncentiveDataProvider";

const useIncentive = () => {
    const incentiveData = useContext(IncentiveContext);
    return incentiveData;
};

export default useIncentive;
