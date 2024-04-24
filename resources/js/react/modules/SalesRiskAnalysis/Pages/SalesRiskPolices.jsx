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
import AddQuestionsListModal from "../components/modal/AddQuestionsListModal";

const inputSateData = {
    mainDetails: {
        policyName: "",
        department: {},
        key: {},
        comment: "",
    },
    inputState: {
        policyName: "",
        department: {},
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
    },
    inputValidation: {
        isSubmitting: false,
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
    },
    singleQuestion: {
        title: "",
        type: {},
        placeholder: "",
        question_key: {},
        parent_question: {},
        parent_question_for: "",
        listItem: [],
        comment: "",
        policy_id: {},
    },
};

const SalesRiskPolices = () => {
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [isRuleUpdating, setIsRuleUpdating] = React.useState(false);

    // modal open close state
    const [addNewPolicyModalOpen, setAddNewPolicyModalOpen] =
        React.useState(false);
    const [addQuestionsModalOpen, setAddQuestionsModalOpen] =
        React.useState(false);
    const [newPolicyInputData, setNewPolicyInputData] = React.useState([]);
    // modal state data
    const [newPolicyData, setNewPolicyData] = React.useState(
        inputSateData.inputState
    );
    const [newPolicyMainDetails, setNewPolicyMainDetails] = React.useState(
        inputSateData.mainDetails
    );
    const [singleQuestion, setSingleQuestion] = React.useState(
        inputSateData.singleQuestion
    );
    // modal state validation
    const [newPolicyDataValidation, setNewPolicyDataValidation] =
        React.useState(inputSateData.inputValidation);

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

    const resetFormForPolicy = (type) => {
        switch (type) {
            case "single":
                setNewPolicyData({
                    ...newPolicyData,
                    policyType: {},
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
                setNewPolicyDataValidation(inputSateData.inputValidation);
                break;
            case "all":
                setNewPolicyData(inputSateData.inputState);
                setNewPolicyDataValidation(inputSateData.inputValidation);
                setNewPolicyMainDetails(inputSateData.mainDetails);
                setNewPolicyInputData([]);
                break;
            default:
                break;
        }
    };

    // handle cancel rule on policy
    const handleCancelRuleOnPolicy = () => {
        resetFormForPolicy("single");
        setIsRuleUpdating(false);
    };

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        // for testing
        if (
            name === "department" ||
            name === "policyName" ||
            name === "key" ||
            name === "comment"
        ) {
            setNewPolicyData({ ...newPolicyData, [name]: value });
            setNewPolicyMainDetails({
                ...newPolicyMainDetails,
                [name]: value,
            });
        } else if (name === "policyType") {
            // add default value for valueType on policy type change when if have any rules data on the form
            setNewPolicyData({
                ...newPolicyData,
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
        if (isExist && isExist.id !== "") {
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
        resetFormForPolicy("single");
    };

    const formatRuleForPayload = (item) => {
        const rule = {
            policyType: item.policyType?.name,
            title: item.title,
        };

        const optionalFields = ["value", "from", "to", "points", "ruleComment"];
        optionalFields.forEach((field) => {
            if (item[field]) rule[field] = item[field];
        });

        if (!_.isEmpty(item.valueType)) rule.valueType = item.valueType.name;

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

        return rule;
    };

    // handle add new policy  with rules data to the server
    const handlePolicyAdded = async () => {
        if (newPolicyInputData?.length === 0) {
            toast.error("Please add a policy first");
            return;
        }

        const formatPayloadForMainDetailsValidation = {
            ...newPolicyMainDetails,
            policyType: {
                name: "mainDetails",
            },
        };
        const validation = addNewRulesValidation(
            formatPayloadForMainDetailsValidation,
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

        try {
            // prepare payload for api
            const payload = {
                title: newPolicyMainDetails.policyName,
                department: newPolicyMainDetails.department?.id,
                comment: newPolicyMainDetails.comment,
                key: newPolicyMainDetails.key?.name,
                ruleList: newPolicyInputData.map((item) =>
                    formatRuleForPayload(item)
                ),
            };

            const response = await submitData(payload);
            if (response?.data) {
                toast.success("New policy added successfully");
                handleAddNewPolicyModal();
                setNewPolicyInputData([]);
                resetFormForPolicy("all");
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
        resetFormForPolicy("all");
    };

    const handleOpenAddQuestionsModal = () => {
        setAddQuestionsModalOpen(true);
    };
    const handleCloseAddQuestionsModal = () => {
        setAddQuestionsModalOpen(false);
    };

    // add title on change
    useMemo(() => {
        setNewPolicyData({
            ...newPolicyData,
            title: autoGenerateTitle(newPolicyData),
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
    useEffect(() => {
        if (newPolicyDataValidation?.isSubmitting) {
            const formatPayloadForMainDetailsValidation = {
                ...newPolicyMainDetails,
                policyType: {
                    name: "mainDetails",
                },
            };
            const validation = addNewRulesValidation(
                formatPayloadForMainDetailsValidation,
                newPolicyDataValidation
            );
            setNewPolicyDataValidation(validation);
        }
    }, [newPolicyMainDetails]);

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
                            onClick={handleOpenAddQuestionsModal}
                            className="btn btn-info ml-3"
                            style={{
                                padding: "9px 12px",
                            }}
                        >
                            <i className="fa fa-plus mr-2" aria-hidden="true" />{" "}
                            Add New Question
                        </button>
                        <button
                            onClick={() => {
                                window.open(
                                    "/account/sales-risk-policies/question",
                                    "_blank"
                                );
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

            {addQuestionsModalOpen && (
                <AddQuestionsListModal
                    open={addQuestionsModalOpen}
                    closeModal={handleCloseAddQuestionsModal}
                    addQuestionsData={singleQuestion}
                    singleQuestion={singleQuestion}
                    setSingleQuestion={setSingleQuestion}
                    isTableShow={false}
                    setAddQuestionsData={setSingleQuestion}
                    setIsQuestionUpdating={() => {}}
                    refetchSaleRiskAnalysis={refetch}
                />
            )}
        </React.Fragment>
    );
};

export default SalesRiskPolices;
