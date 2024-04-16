import React, { useEffect, useMemo } from "react";
import { toast } from "react-toastify";

// ui components
import RefreshButton from "../components/RefreshButton";
import { SalesRiskAnalysisContainer } from "../components/ui/Styles/ui";

// api
import {
    useAddSalesRiskAnalysisRuleMutation,
    useGetSalesRiskAnalysisRulesQuery,
} from "../../../services/api/salesRiskAnalysisSlice";

// table
import SalesRiskAnalysisTable from "../components/table/SalesRiskAnalysisTable";
import { SalesRiskAnalysisTableColumns } from "../components/table/SalesRiskAnalysisTableColumns";

// modal
import AddNewPolicyModal from "../components/modal/AddNewPolicyModal";

// helper
import { addNewRulesValidation } from "../helper/createFromValidation";

// styles
import "../components/Styles/SalesRiskAnalysis.css";

const SalesRiskPolices = () => {
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
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
        key: {},
        title: "",
        valueType: {},
        value: "",
        from: "",
        to: "",
        yes: "",
        no: "",
        comment: "",
        yesComment: "",
        noComment: "",
        ruleComment: "",
        countries: [],
        points: "",
    });
    // modal state validation
    const [newPolicyDataValidation, setNewPolicyDataValidation] =
        React.useState({
            policyName: false,
            department: false,
            policyType: false,
            valueType: false,
            key: false,
            value: false,
            from: false,
            to: false,
            yes: false,
            no: false,
            countries: false,
            points: false,
            isSubmitting: false,
        });

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    // get sales risk analysis rules
    const { data, isFetching, refetch } = useGetSalesRiskAnalysisRulesQuery(
        queryString({
            page: pageIndex + 1,
            limit: pageSize,
        })
    );
    // sales risk analysis rules data
    const salesRiskAnalysisRules = data?.data;

    // add sales risk analysis rule mutation
    const [submitData, { isLoading: isLoadingAddSalesRiskAnalysisRule }] =
        useAddSalesRiskAnalysisRuleMutation();

    // reset form state
    const resetFormState = (type) => {
        // reset form data
        if (type === "all") {
            setNewPolicyData({
                policyName: "",
                department: {},
                policyType: {},
                title: "",
                valueType: {},
                value: "",
                from: "",
                key: {},
                to: "",
                comment: "",
                yesComment: "",
                noComment: "",
                ruleComment: "",
                yes: "",
                no: "",
                countries: [],
                points: "",
                id: "",
            });
        } else {
            setNewPolicyData({
                ...newPolicyData,
                policyType: {},
                title: "",
                valueType: {},

                value: "",
                from: "",
                to: "",
                yes: "",
                no: "",
                yesComment: "",
                noComment: "",
                ruleComment: "",
                countries: [],
                points: "",
                id: "",
            });
        }
        // reset validation
        setNewPolicyDataValidation({
            policyName: false,
            department: false,
            policyType: false,
            valueType: false,
            value: false,
            from: false,
            to: false,
            key: false,
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
            // add default value for valueType on policy type change when if have any rules data on the form
            const getValueType =
                newPolicyInputData?.length > 0
                    ? newPolicyInputData[0]?.valueType
                    : {};
            setNewPolicyData({
                ...newPolicyData,
                valueType: getValueType,
                value: "",
                from: "",
                to: "",
                yes: "",
                no: "",
                yesComment: "",
                noComment: "",
                ruleComment: "",
                countries: [],
                points: "",
                [name]: value,
            });
        } else {
            setNewPolicyData({
                ...newPolicyData,
                [name]: value,
            });
        }
    };

    const autoGenerateTitle = (data) => {
        return `${data?.policyType?.label} ${
            data?.valueType?.name === "currency" ? "$" : ""
        }${data?.value}${data.from}${data?.from && data?.to ? "-" : ""}${
            data.to
        }${data?.valueType?.name === "percentage" ? "%" : ""}${
            data?.valueType?.name === "hourly" ? "hr" : ""
        }${data?.valueType?.name === "days" ? "days" : ""}`;
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
                if (newPolicyData.index === 0) {
                    return {
                        ...item,
                        title: autoGenerateTitle({
                            ...item,
                            valueType: newPolicyData.valueType,
                        }),
                        valueType: newPolicyData.valueType,
                    };
                } else {
                    return item;
                }
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

    // handle add new policy  with rules data to the server
    const handlePolicyAdded = async () => {
        if (newPolicyInputData?.length === 0) {
            toast.error("Please add a policy first");
            return;
        }
        try {
            // prepare payload for api
            const payload = {
                title: newPolicyInputData[0]?.policyName,
                department: newPolicyInputData[0]?.department?.id,
                comment: newPolicyInputData[0]?.comment,
                key: newPolicyInputData[0]?.key?.name,
                ruleList: newPolicyInputData.map((item) => {
                    const rule = {
                        policyType: item.policyType?.name,
                        title: item.title,
                    };
                    if (item.value) rule.value = item.value;
                    if (!_.isEmpty(item.valueType))
                        rule.valueType = item.valueType.name;
                    if (item.from) rule.from = item.from;
                    if (item.to) rule.to = item.to;

                    if (item.points) rule.points = item.points;
                    if (item.yes && item.no) {
                        rule.value = {
                            yes: {
                                point: item.yes,
                                comment: item.yesComment,
                            },
                            no: {
                                point: item.no,
                                comment: item.noComment,
                            },
                        };
                    }
                    if (item.countries?.length > 0) {
                        rule.countries = item.countries.map((country) => ({
                            [country.iso]: country.niceName,
                        }));
                    }
                    if (item.ruleComment) rule.comment = item.ruleComment;
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
            } else {
                toast.error("Failed to add new policy");
            }
        }
    };

    // handle modal open close
    const handleAddNewPolicyModal = () => {
        setAddNewPolicyModalOpen(!addNewPolicyModalOpen);
        resetFormState("all");
        setNewPolicyInputData([]);
    };

    // handle cancel rule on policy
    const handleCancelRuleOnPolicy = () => {
        setNewPolicyData({
            ...newPolicyData,
            valueType: {},
            policyType: {},
            value: "",
            from: "",
            to: "",
            yes: "",
            no: "",
            comment: "",
            yesComment: "",
            noComment: "",
            ruleComment: "",
            countries: [],
            points: "",
        });
        setNewPolicyDataValidation({
            policyName: false,
            department: false,
            policyType: false,
            valueType: false,
            value: false,
            from: false,
            to: false,
            yes: false,
            no: false,
            countries: false,
            points: false,
            isSubmitting: false,
        });
        setIsRuleUpdating(false);
        
    };

    // add title on change
    useMemo(() => {
        setNewPolicyData({
            ...newPolicyData,
            title: `${newPolicyData?.policyType?.label} ${
                newPolicyData?.valueType?.name === "currency" ? "$" : ""
            }${newPolicyData?.value}${newPolicyData.from}${
                newPolicyData?.from && newPolicyData?.to ? "-" : ""
            }${newPolicyData.to}${
                newPolicyData?.valueType?.name === "percentage" ? "%" : ""
            }${newPolicyData?.valueType?.name === "hourly" ? "hr" : ""}${
                newPolicyData?.valueType?.name === "days" ? "days" : ""
            }`,
        });
    }, [
        newPolicyData?.policyType?.name,
        newPolicyData?.valueType?.name,
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

    // main Table page change

    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

    return (
        <React.Fragment>
            <SalesRiskAnalysisContainer>
                {/* refresh button */}
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column flex-md-row align-items-center">
                        <button
                            onClick={handleAddNewPolicyModal}
                            className="btn btn-primary"
                        >
                            <i className="fa fa-plus mr-2" aria-hidden="true" />{" "}
                            Add New Policy
                        </button>
                        <button
                            onClick={() => {
                                window.location.href =
                                    "/account/sales-risk-policies/question";
                            }}
                            className="btn btn-info ml-3"
                            style={{
                                padding: "9px 12px",
                            }}
                        >
                            <i
                                className="fa-solid fa-circle-question mr-2"
                                aria-hidden="true"
                            ></i>{" "}
                            Questions List
                        </button>
                    </div>
                    <RefreshButton
                        onClick={() => {
                            refetch();
                        }}
                        className="sales_risk_refresh_button"
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
                            refetch={refetch}
                            onPageChange={onPageChange}
                        />
                    </div>
                </div>
            </SalesRiskAnalysisContainer>
            {/* Add new Policy Modal */}
            {addNewPolicyModalOpen && (
                <AddNewPolicyModal
                    open={addNewPolicyModalOpen}
                    newPolicyData={newPolicyData}
                    isRuleUpdating={isRuleUpdating}
                    closeModal={handleAddNewPolicyModal}
                    newPolicyInputData={newPolicyInputData}
                    newPolicyDataValidation={newPolicyDataValidation}
                    isLoadingAddSalesRiskAnalysisRule={
                        isLoadingAddSalesRiskAnalysisRule
                    }
                    handlerAction={{
                        handleChange,
                        setNewPolicyData,
                        setIsRuleUpdating,
                        handlePolicyAdded,
                        handleAddRuleOnPolicy,
                        setNewPolicyInputData,
                        handleCancelRuleOnPolicy,
                    }}
                />
            )}
        </React.Fragment>
    );
};

export default SalesRiskPolices;
