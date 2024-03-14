import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// ui components
import RefreshButton from "../components/RefreshButton";
import { SalesRiskAnalysisContainer } from "../components/ui/Styles/ui";

// api
import {
    useAddSalesRiskAnalysisRuleMutation,
    useGetSalesRiskAnalysisInputsQuery,
    useGetSalesRiskAnalysisRulesQuery,
    useQuestionInputFieldsQuery,
} from "../../../services/api/salesRiskAnalysisSlice";
import { useGetAllFilterOptionQuery } from "../../../services/api/FilterBarOptionsApiSlice";

// table
import SalesRiskAnalysisTable from "../components/table/SalesRiskAnalysisTable";
import { SalesRiskAnalysisTableColumns } from "../components/table/SalesRiskAnalysisTableColumns";

// modal
import AddNewPolicyModal from "../components/modal/AddNewPolicyModal";
import {
    setFilterOptionsState,
    setFilterCountriesState,
} from "../../../services/features/filterOptionSlice";
import { addNewRulesValidation } from "../helper/createFromValidation";
import { toast } from "react-toastify";

const SalesRiskAnalysis = () => {
    const dispatch = useDispatch();
    const { departments, countries } = useSelector(
        (state) => state.filterOptions
    );
    const [dept, setDept] = React.useState(null);
    const [isRuleUpdating, setIsRuleUpdating] = React.useState(false);

    // modal open close state
    const [addNewPolicyModalOpen, setAddNewPolicyModalOpen] =
        React.useState(false);
    const [newPolicyInputData, setNewPolicyInputData] = React.useState([]);
    // modal state data
    const [newPolicyData, setNewPolicyData] = React.useState({
        policyName: "",
        department: {},
        policyType: {},
        title: "",
        rulesType: {},
        value: "",
        from: "",
        to: "",
        yes: "",
        no: "",
        countries: [],
        points: "",
    });
    // modal state validation
    const [newPolicyDataValidation, setNewPolicyDataValidation] =
        React.useState({
            policyName: false,
            department: false,
            policyType: false,
            rulesType: false,
            value: false,
            from: false,
            to: false,
            yes: false,
            no: false,
            countries: false,
            points: false,
            isSubmitting: false,
        });

    // get sales risk analysis rules
    const { data, isFetching, isLoading, refetch } =
        useGetSalesRiskAnalysisRulesQuery(null);

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

    // question input fields
    const {
        data: questionInputFields,
        isFetching: isQuestionInputFieldsFetching,
        isLoading: isQuestionInputFieldsLoading,
    } = useQuestionInputFieldsQuery("");

    // add sales risk analysis rule mutation
    const [submitData, { isLoading: isLoadingAddSalesRiskAnalysisRule }] =
        useAddSalesRiskAnalysisRuleMutation();

    // reset form state
    const resetFormState = () => {
        // reset form data
        setNewPolicyData({
            ...newPolicyData,
            policyType: {},
            title: "",
            rulesType: {},
            value: "",
            from: "",
            to: "",
            yes: "",
            no: "",
            countries: [],
            points: "",
            id: "",
        });
        // reset validation
        setNewPolicyDataValidation({
            policyName: false,
            department: false,
            policyType: false,
            rulesType: false,
            value: false,
            from: false,
            to: false,
            yes: false,
            no: false,
            countries: false,
            points: false,
            isSubmitting: false,
        });
    };

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        // for testing
        if (name === "department" || name === "policyName") {
            setNewPolicyData({ ...newPolicyData, [name]: value });
        } else if (name === "policyType") {
            setNewPolicyData({
                ...newPolicyData,
                rulesType: {},
                value: "",
                from: "",
                to: "",
                yes: "",
                no: "",
                countries: [],
                points: "",
                [name]: value,
            });
        } else {
            setNewPolicyData({ ...newPolicyData, [name]: value });
        }
    };

    // handle add rule on policy data to the state
    const handleAddRuleOnPolicy = () => {
        const validation = addNewRulesValidation(
            newPolicyData,
            newPolicyDataValidation
        );
        if (
            Object.entries(validation).some(
                ([key, value]) => key !== "isSubmitting" && value === true
            )
        ) {
            setNewPolicyDataValidation({
                ...validation,
                isSubmitting: true,
            });
            return;
        }

        // check if policy rule already exist
        const isExist = newPolicyInputData.find(
            (item) => item?.id === newPolicyData?.id
        );

        if (isExist) {
            const updatedData = newPolicyInputData.map((item) => {
                if (item.id === newPolicyData.id) {
                    return {
                        ...item,
                        ...newPolicyData,
                    };
                }
                return item;
            });
            setIsRuleUpdating(false);
            setNewPolicyInputData(updatedData);
        } else {
            setNewPolicyInputData([
                ...newPolicyInputData,
                {
                    ...newPolicyData,
                    id: Math.random().toString(36).substring(7),
                },
            ]);
        }
        resetFormState();
    };

    // handle cancel rule on policy
    const handleCancelRuleOnPolicy = () => {
        setNewPolicyData({
            ...newPolicyData,
            rulesType: {},
            policyType: {},
            value: "",
            from: "",
            to: "",
            yes: "",
            no: "",
            countries: [],
            points: "",
        });
        setIsRuleUpdating(false);
    };

    // handle add new policy  with rules data to the server
    const handlePolicyAdded = async () => {
        if (newPolicyInputData?.length === 0) {
            toast.error("Please add a policy first");
            return;
        }
        try {
            // prepare payload
            const payload = {
                title: newPolicyInputData[0]?.policyName,
                department: newPolicyInputData[0]?.department?.id,
                ruleList: newPolicyInputData.map((item) => {
                    const rule = {
                        policyType: item.policyType?.name,
                        title: item.title,
                    };
                    if (item.value) rule.value = item.value;
                    if (!_.isEmpty(item.rulesType))
                        rule.rulesType = item.rulesType.name;
                    if (item.from) rule.from = item.from;
                    if (item.to) rule.to = item.to;
                    if (item.points) rule.points = item.points;
                    if (item.yes) rule.yes = item.yes;
                    if (item.no) rule.no = item.no;
                    if (item.countries?.length > 0) {
                        rule.countries = item.countries.map((country) => ({
                            [country.iso]: country.niceName,
                        }));
                    }
                    return rule;
                }),
            };

            const response = await submitData(payload);
            if (response?.data) {
                toast.success("New policy added successfully");
                handleAddNewPolicyModal();
                setNewPolicyInputData([]);
            }
        } catch (error) {
            if (error?.status === 403) {
                toast.error("You are not authorized to perform this action");
                return;
            }
            toast.error("Failed to add new policy");
        }
    };

    // set filter options state
    React.useEffect(() => {
        if (filterOptions && !isFilterOptionsFetching) {
            setDept(filterOptions?.department);
            dispatch(setFilterOptionsState(filterOptions));
        }
    }, [filterOptions, isFilterOptionsFetching]);

    React.useEffect(() => {
        if (salesRiskInputs && !isSalesRiskInputsFetching) {
            dispatch(setFilterCountriesState(salesRiskInputs));
        }
    }, [salesRiskInputs, isSalesRiskInputsFetching]);

    // sales risk analysis rules data
    const salesRiskAnalysisRules = data?.data;

    // handle modal open close
    const handleAddNewPolicyModal = () => {
        setAddNewPolicyModalOpen(!addNewPolicyModalOpen);
        resetFormState();
        setNewPolicyInputData([]);
    };

    // add title on change
    useMemo(() => {
        setNewPolicyData({
            ...newPolicyData,
            title: `${newPolicyData?.policyType?.label} ${
                newPolicyData?.rulesType?.name === "currency" ? "$" : ""
            }${newPolicyData?.value}${newPolicyData.from}${
                newPolicyData?.from && newPolicyData?.to ? "-" : ""
            }${newPolicyData.to}${
                newPolicyData?.rulesType?.name === "percentage" ? "%" : ""
            }${newPolicyData?.rulesType?.name === "hourly" ? "hr" : ""}${
                newPolicyData?.rulesType?.name === "days" ? "days" : ""
            }`,
        });
    }, [
        newPolicyData?.policyType?.name,
        newPolicyData?.rulesType?.name,
        newPolicyData.value,
        newPolicyData.from,
        newPolicyData.to,
    ]);

    // add new policy validation on change
    useEffect(() => {
        if (newPolicyDataValidation?.isSubmitting) {
            const validation = addNewRulesValidation(
                newPolicyData,
                newPolicyDataValidation
            );
            setNewPolicyDataValidation(validation);
        }
    }, [newPolicyData]);

    return (
        <React.Fragment>
            <SalesRiskAnalysisContainer>
                {/* refresh button */}
                <div className="d-flex justify-content-between align-items-center">
                    <button
                        onClick={handleAddNewPolicyModal}
                        className="btn btn-primary"
                    >
                        <i className="fa fa-plus mr-2" aria-hidden="true" />
                        Add New Policy
                    </button>
                    <RefreshButton
                        onClick={() => {
                            refetch();
                        }}
                        className="py-2"
                        isLoading={isFetching}
                    />
                </div>
                <div className="sp1_tlr_container">
                    <div className="sp1_tlr_tbl_container mx-0 py-3">
                        {/* sales risk analysis table */}
                        <SalesRiskAnalysisTable
                            tableColumns={SalesRiskAnalysisTableColumns}
                            tableName="SalesRiskAnalysisTable"
                            tableData={salesRiskAnalysisRules}
                            isLoading={isFetching}
                            questionInputFields={questionInputFields}
                        />
                    </div>
                </div>

                {/* Add new Policy Modal */}
                <AddNewPolicyModal
                    departments={dept}
                    countries={countries}
                    handleChange={handleChange}
                    open={addNewPolicyModalOpen}
                    newPolicyData={newPolicyData}
                    isRuleUpdating={isRuleUpdating}
                    setNewPolicyData={setNewPolicyData}
                    closeModal={handleAddNewPolicyModal}
                    setIsRuleUpdating={setIsRuleUpdating}
                    handlePolicyAdded={handlePolicyAdded}
                    newPolicyInputData={newPolicyInputData}
                    handleMultiSelectChange={setNewPolicyData}
                    newPolicyDataValidation={newPolicyDataValidation}
                    handleAddRuleOnPolicy={handleAddRuleOnPolicy}
                    setNewPolicyInputData={setNewPolicyInputData}
                    isLoadingAddSalesRiskAnalysisRule={
                        isLoadingAddSalesRiskAnalysisRule
                    }
                    handleCancelRuleOnPolicy={handleCancelRuleOnPolicy}
                />
            </SalesRiskAnalysisContainer>
        </React.Fragment>
    );
};

export default SalesRiskAnalysis;
