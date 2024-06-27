import React, { useContext, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { IoAdd } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";

// ui components
import RefreshButton from "../components/RefreshButton";
import { SalesRiskAnalysisContainer } from "../components/ui/Styles/ui";

// api
import {
    useAddSalesRiskAnalysisRuleMutation,
    useEditSinglePolicySalesRiskAnalysisMutation,
    useGetSalesRiskAnalysisRulesQuery,
    useLazyGetSinglePolicySalesRiskAnalysisQuery,
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
import { PolicyTypeItems } from "../constant";
import {
    formatEditPolicyDataPayload,
    formatMultipleRuleData,
} from "../helper/formatEditPolicyData";
import { SalesRiskAnalysisContext } from "../context/SalesRiskAnalysisProvider";
import { generateUniqueString } from "../../../utils/customUidGenerate";
import { useSelector } from "react-redux";
import Switch from "../components/Switch";
import Loader from "../../../global/Loader";
import SettingDropDown from "../components/SettingDropDown";

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
    const {
        policyKeys,
        isQuestionTypeLoading,
        questionFiledRefetch,
        questionsAnswerType,
        policies,
    } = useContext(SalesRiskAnalysisContext);
    const { settings } = useSelector((state) => state.saleRiskAnalysis);
    const { departments } = useSelector((state) => state.filterOptions);
    const [addModalOpenClicked, setAddModalOpenClicked] = React.useState({
        type: "",
        status: false,
    });
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [isRuleUpdating, setIsRuleUpdating] = React.useState(false);
    const [isPolicyUpdating, setIsPolicyUpdating] = React.useState(false);
    const [newPolicyDeleteData, setNewPolicyDeleteData] = React.useState([]);

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

    // Update dd sales risk analysis rule mutation
    const [
        submitPolicyData,
        { isLoading: isLoadingEditSalesRiskAnalysisPolicy },
    ] = useEditSinglePolicySalesRiskAnalysisMutation();

    // get Single Policy Sales Risk Analysis Query by policy id or key
    const [
        getSinglePolicy,
        {
            data: singlePolicyDataByIDorKey,
            isLoading: isLoadingSinglePolicyDataByIDorKey,
        },
    ] = useLazyGetSinglePolicySalesRiskAnalysisQuery();

    const getSinglePolicyDataByIDorKey = async (key) => {
        try {
            const response = await getSinglePolicy(`key=${key}`);
            return response;
        } catch (error) {
            return error;
        }
    };

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
    const handleChange = async (e) => {
        const { name, value } = e.target;
        // for testing
        if (
            name === "department" ||
            name === "policyName" ||
            name === "key" ||
            name === "comment"
        ) {
            if (name === "key") {
                if (value.name === "yesNoRules") {
                    const singlePolicyDataAll =
                        await getSinglePolicyDataByIDorKey(value.name);
                    if (singlePolicyDataAll?.data?.data?.length) {
                        const formattedRules = formatMultipleRuleData(
                            singlePolicyDataAll?.data?.data[0],
                            policyKeys
                        );
                        setNewPolicyInputData(formattedRules);
                        setNewPolicyMainDetails({
                            ...newPolicyMainDetails,
                            id: singlePolicyDataAll?.data?.data[0]?.id,
                            policyName:
                                singlePolicyDataAll?.data?.data[0]?.title,
                            department: departments?.find(
                                (item) =>
                                    item?.team_name ===
                                    formattedRules[0]?.department?.name
                            ),
                            comment:
                                singlePolicyDataAll?.data?.data[0]?.comment,
                            [name]: value,
                        });
                        setNewPolicyData({
                            ...newPolicyData,
                            policyName:
                                singlePolicyDataAll?.data?.data[0]?.title,
                            department: departments?.find(
                                (item) =>
                                    item?.team_name ===
                                    formattedRules[0]?.department?.name
                            ),
                            comment:
                                singlePolicyDataAll?.data?.data[0]?.comment,
                            policyType: PolicyTypeItems?.data?.find((item) =>
                                item?.name?.includes("yesNo")
                            ),
                            [name]: value,
                        });
                    } else {
                        setNewPolicyData({
                            ...newPolicyData,
                            policyType: PolicyTypeItems?.data?.find((item) =>
                                item?.name?.includes("yesNo")
                            ),
                            [name]: value,
                        });
                        setNewPolicyMainDetails({
                            ...newPolicyMainDetails,
                            [name]: value,
                        });
                    }

                    // this will check if add policy button is enabled or not, if enabled then it will not update the policy
                    // if not enabled then it will update the policy
                    const checkIsAddPolicyButtonEnabled = settings?.find(
                        (setting) =>
                            setting?.name === "enable_add_policy_button"
                    )?.value;

                    if (!checkIsAddPolicyButtonEnabled) {
                        setIsPolicyUpdating(true);
                    }
                } else {
                    setNewPolicyData({
                        ...newPolicyData,
                        [name]: value,
                    });
                    setNewPolicyMainDetails({
                        ...newPolicyMainDetails,
                        id: newPolicyMainDetails.id || "",
                        [name]: value,
                    });
                }
            } else {
                setNewPolicyData({ ...newPolicyData, [name]: value });
                setNewPolicyMainDetails({
                    ...newPolicyMainDetails,
                    [name]: value,
                });
            }
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
                    id: generateUniqueString(15),
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
            let payload = {
                title: newPolicyMainDetails.policyName,
                department: newPolicyMainDetails.department?.id,
                comment: newPolicyMainDetails.comment,
                key: newPolicyMainDetails.key?.name,
                ruleList: newPolicyInputData.map((item) =>
                    formatRuleForPayload(item)
                ),
            };
            //  prepare payload for edit policy only if policy is yesNoRules
            if (isPolicyUpdating) {
                payload = formatEditPolicyDataPayload(
                    newPolicyMainDetails,
                    newPolicyInputData,
                    newPolicyDeleteData
                );
            }

            const addOrUpdatePolicy = isPolicyUpdating
                ? submitPolicyData
                : submitData;

            const response = await addOrUpdatePolicy(payload);
            if (response?.data) {
                if (isPolicyUpdating) {
                    toast.success("Policy updated successfully");
                    setNewPolicyDeleteData([]);
                    setIsPolicyUpdating(false);
                } else {
                    toast.success("New policy added successfully");
                }
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

    const openAddModal = (type) => {
        questionFiledRefetch();
        setAddModalOpenClicked({
            type: type,
            status: true,
        });
    };

    useEffect(() => {
        if (addModalOpenClicked.status) {
            if (!isQuestionTypeLoading) {
                if (addModalOpenClicked.type === "question") {
                    handleOpenAddQuestionsModal();
                    const isYesNoRulesExist = questionsAnswerType.data.find(
                        (item) => item.name === "yesNoRules"
                    );
                    setSingleQuestion({
                        ...singleQuestion,
                        question_key: isYesNoRulesExist,
                        type: isYesNoRulesExist && {
                            id: 2,
                            label: "Yes/No",
                            name: "yesNo",
                        },
                        title: "",
                        policy_id:
                            isYesNoRulesExist &&
                            policies.data.find((item) =>
                                item.key.includes("yesNo")
                            ),
                    });
                } else {
                    handleAddNewPolicyModal();
                }
                setAddModalOpenClicked({
                    type: "",
                    status: false,
                });
            }
        }
    }, [addModalOpenClicked, isQuestionTypeLoading]);

    return (
        <React.Fragment>
            <SalesRiskAnalysisContainer>
                {/* refresh button */}
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
                        <Switch>
                            <Switch.Case
                                condition={
                                    settings?.find(
                                        (item) =>
                                            item?.name ===
                                            "enable_add_policy_button"
                                    )?.value === true
                                }
                            >
                                <button
                                    onClick={
                                        isQuestionTypeLoading
                                            ? null
                                            : () => openAddModal("policy")
                                    }
                                    className="btn btn-info mb-3 mb-md-0 mr-3"
                                >
                                    <Switch.Case
                                        condition={isQuestionTypeLoading}
                                    >
                                        <Loader title="Loading Policy Key" />
                                    </Switch.Case>
                                    <Switch.Case
                                        condition={!isQuestionTypeLoading}
                                    >
                                        <IoAdd className="mr-1" size={20} /> Add
                                        New Policy
                                    </Switch.Case>
                                </button>
                            </Switch.Case>
                        </Switch>
                        <button
                            onClick={
                                isQuestionTypeLoading
                                    ? null
                                    : () => openAddModal("question")
                            }
                            className="btn btn-primary ml-0 mb-3 mb-md-0 d-flex align-items-center"
                            style={{
                                padding: "9px 12px",
                            }}
                        >
                            <Switch>
                                <Switch.Case condition={isQuestionTypeLoading}>
                                    <Loader title="Loading Question Key" />
                                </Switch.Case>
                                <Switch.Case condition={!isQuestionTypeLoading}>
                                    <IoAdd className="mr-1" size={20} /> Add New
                                    Question
                                </Switch.Case>
                            </Switch>
                        </button>
                        <button
                            onClick={() => {
                                window.open(
                                    "/account/sales-risk-policies/question",
                                    "_blank"
                                );
                            }}
                            className="btn btn-info ml-0 mb-3 mb-md-0 ml-md-3"
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
                    <div className="d-flex">
                        <RefreshButton
                            onClick={() => {
                                refetch();
                            }}
                            className="sales_risk_refresh_button"
                            isLoading={isFetching}
                        />
                        <SettingDropDown />
                    </div>
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
                    isPolicyUpdating={isPolicyUpdating}
                    newPolicyDataValidation={newPolicyDataValidation}
                    isLoadingAddSalesRiskAnalysisRule={
                        isLoadingAddSalesRiskAnalysisRule ||
                        isLoadingEditSalesRiskAnalysisPolicy ||
                        isLoadingSinglePolicyDataByIDorKey
                    }
                    handlerAction={{
                        handleChange,
                        setNewPolicyData,
                        setIsRuleUpdating,
                        handlePolicyAdded,
                        handleAddRuleOnPolicy,
                        setNewPolicyInputData,
                        handleCancelRuleOnPolicy,
                        setNewPolicyDeleteData,
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
