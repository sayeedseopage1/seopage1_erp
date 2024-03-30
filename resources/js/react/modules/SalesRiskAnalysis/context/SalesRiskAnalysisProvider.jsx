import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { useGetAllFilterOptionQuery } from "../../../services/api/FilterBarOptionsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetSalesRiskAnalysisInputsQuery } from "../../../services/api/salesRiskAnalysisSlice";
import {
    setFilterCountriesState,
    setFilterOptionsState,
} from "../../../services/features/filterOptionSlice";

export const SalesRiskAnalysisContext = createContext();

const SalesRiskAnalysisProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { departments, countries } = useSelector(
        (state) => state.filterOptions
    );

    // fetch filter options
    const { data: filterOptions, isFetching: isFilterOptionsFetching } =
        useGetAllFilterOptionQuery("", {
            refetchOnMountOrArgChange: true,
            skip: departments?.length,
        });

    const { data: salesRiskInputs, isFetching: isSalesRiskInputsFetching } =
        useGetSalesRiskAnalysisInputsQuery("", {
            refetchOnMountOrArgChange: true,
            skip: countries?.length,
        });

    // set filter options state
    useEffect(() => {
        if (filterOptions && !isFilterOptionsFetching) {
            dispatch(setFilterOptionsState(filterOptions));
        }
    }, [filterOptions, isFilterOptionsFetching]);

    React.useEffect(() => {
        if (salesRiskInputs && !isSalesRiskInputsFetching) {
            dispatch(setFilterCountriesState(salesRiskInputs));
        }
    }, [salesRiskInputs, isSalesRiskInputsFetching]);

    return (
        <SalesRiskAnalysisContext.Provider value={{}}>
            {children}
        </SalesRiskAnalysisContext.Provider>
    );
};
export default SalesRiskAnalysisProvider;
