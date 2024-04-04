import { createContext } from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

// Api services
import {
    useGetAllCountryOptionsQuery,
    useGetAllFilterOptionQuery,
} from "../../../services/api/FilterBarOptionsApiSlice";
import {
    useGetSalesRiskAnalysisInputsQuery,
    useSaleRiskQuestionsListFiledTypeQuery,
} from "../../../services/api/salesRiskAnalysisSlice";
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
    const [questionsAnswerType, setQuestionsAnswerType] = React.useState({});
    const [policies, setPolicies] = React.useState({});
    const [policyKeys, setPolicyKeys] = React.useState({});
    const [allQuestions, setAllQuestions] = React.useState({});

    // fetch filter options
    const { data: filterOptions, isFetching: isFilterOptionsFetching } =
        useGetAllFilterOptionQuery("", {
            refetchOnMountOrArgChange: true,
            skip: departments?.length,
        });

    // fetch all countries

    const {
        data: salesRiskInputs,
        isFetching: isSalesRiskInputsFetching,
        isLoading: isSalesRiskInputsLoading,
    } = useGetSalesRiskAnalysisInputsQuery("", {
        refetchOnMountOrArgChange: true,
        skip: policyKeys?.data?.length,
    });

    // fetch question fields
    const { data: questionFieldsData, isLoading: isQuestionType } =
        useSaleRiskQuestionsListFiledTypeQuery("", {
            refetchOnMountOrArgChange: true,
        });

    // set filter options state
    useEffect(() => {
        if (filterOptions && !isFilterOptionsFetching) {
            dispatch(setFilterOptionsState(filterOptions));
        }
    }, [filterOptions, isFilterOptionsFetching]);

    // set policy keys
    React.useEffect(() => {
        if (salesRiskInputs && !isSalesRiskInputsFetching) {
            const policyKeysData = Object.entries(
                salesRiskInputs?.data?.policyKeys
            ).map(([key, value], index) => {
                return {
                    id: index + 1,
                    name: key,
                    label: value,
                };
            });
            dispatch(setFilterCountriesState(salesRiskInputs?.data?.countries));
            setPolicyKeys({
                label: "Policy Keys",
                emptyOptionsLabel: "Select Policy Key",
                id: "policyKey",
                data: policyKeysData,
            });
        }
    }, [salesRiskInputs, isSalesRiskInputsFetching]);

    React.useEffect(() => {
        if (questionFieldsData && !isQuestionType) {
            const questionTypeData = Object.entries(
                questionFieldsData?.data?.questionKeys
            ).map(([key, value], index) => {
                return {
                    id: index + 1,
                    name: key,
                    label: value,
                };
            });
            const policyList = questionFieldsData?.data?.policies.map(
                (policy) => {
                    return {
                        id: policy.id,
                        title: policy.title,
                        label: policy.title,
                    };
                }
            );
            const questionList = questionFieldsData?.data?.questionList.map(
                (question) => {
                    return {
                        ...question,
                        id: question.id,
                        title: question.title,
                        label: question.title,
                    };
                }
            );
            setAllQuestions({
                label: "Parent Questions",
                emptyOptionsLabel: "Select Parent Question",
                id: "parentQuestion",
                data: questionList,
            });
            setPolicies({
                label: "Policy",
                emptyOptionsLabel: "Select Policy",
                id: "policy",
                data: policyList,
            });
            setQuestionsAnswerType({
                label: "Question Type",
                emptyOptionsLabel: "Select Question Type",
                id: "question_type",
                data: questionTypeData,
            });
        }
    }, [questionFieldsData, isQuestionType]);

    console.log("questionsAnswerType", policyKeys);
    return (
        <SalesRiskAnalysisContext.Provider
            value={{
                questionsAnswerType,
                policies,
                allQuestions,
                policyKeys,
                isSalesRiskInputsLoading,
            }}
        >
            {children}
        </SalesRiskAnalysisContext.Provider>
    );
};
export default SalesRiskAnalysisProvider;

SalesRiskAnalysisProvider.propTypes = {
    children: PropTypes.node,
};
