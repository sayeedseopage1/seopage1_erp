import React, { useContext, useEffect } from "react";
import { IoAdd } from "react-icons/io5";

// ui components
import RefreshButton from "../components/RefreshButton";

// modal components
import AddQuestionsListModal from "../components/modal/AddQuestionsListModal";

// table components
import QuestionsListTable from "../components/table/QuestionsListTable";
import { QuestionsListTableColumns } from "../components/table/QuestionsListTableColumns";

//APi services
import {
    useLazyGetSinglePolicySalesRiskAnalysisQuery,
    useSaleAnalysisQuestionsListQuery,
} from "../../../services/api/salesRiskAnalysisSlice";
import { set } from "lodash";
import { SalesRiskAnalysisContext } from "../context/SalesRiskAnalysisProvider";
import Switch from "../components/Switch";
import Loader from "../../../global/Loader";
import SettingDropDown from "../components/SettingDropDown";
import { useSelector } from "react-redux";

const SalesRiskQuestionList = () => {
    const [isYesNoRulesLoading, setIsYesNoRulesLoading] = React.useState(false);
    const { settings } = useSelector((state) => state.saleRiskAnalysis);
    const isEditEnabled = settings?.value;
    const {
        isQuestionTypeLoading,
        questionFiledRefetch,
        questionsAnswerType,
        setYesNoRules,
        policies,
    } = useContext(SalesRiskAnalysisContext);
    const [addQuestionsModalOpenClicked, setAddQuestionsModalOpenClicked] =
        React.useState(false);
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    // modal state management
    const [addQuestionsModalOpen, setAddQuestionsModalOpen] =
        React.useState(false);

    const [isQuestionUpdating, setIsQuestionUpdating] = React.useState(false);
    const [allQuestions, setAllQuestions] = React.useState([]);
    const [singleQuestion, setSingleQuestion] = React.useState({
        title: "",
        type: {},
        placeholder: "",
        question_key: {},
        parent_question: {},
        parent_question_for: "",
        listItem: [],
        comment: "",
        policy_id: {},
    });

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    // api call
    const {
        data,
        isFetching,
        isLoading: isQuestionsListLoading,
        refetch,
    } = useSaleAnalysisQuestionsListQuery(
        queryString({
            page: pageIndex + 1,
            limit: pageSize,
        })
    );

    // get single policy data by id or key
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

    // questions list data
    const questionsList = data?.data;

    const handleOpenAddQuestionsModal = () => {
        setAddQuestionsModalOpen(true);
    };

    // close modal
    const handleCloseAddQuestionsModal = () => {
        setAddQuestionsModalOpen(false);
        setIsQuestionUpdating(false);
    };

    // pagination
    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

    useEffect(() => {
        if (questionsList?.data?.length > 0) {
            // flat the questions list data
            const flattenArray = (arr) =>
                arr?.flatMap((item) => {
                    const nestedQuestions = item?.questions || [];
                    return [item, ...flattenArray(nestedQuestions)];
                });

            setAllQuestions(flattenArray(questionsList?.data));
        }
    }, [questionsList]);

    const openAddQuestionsModal = () => {
        questionFiledRefetch();
        setAddQuestionsModalOpenClicked(true);
        setYesNoRules((prev) => {
            return {
                ...prev,
                data: prev?.data?.filter((item) => {
                    if (prev?.mainData?.map((i) => i?.id).includes(item?.id)) {
                        return item;
                    }
                }),
            };
        });
    };

    useEffect(() => {
        if (addQuestionsModalOpenClicked) {
            if (!isQuestionTypeLoading) {
                handleOpenAddQuestionsModal();
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
                setAddQuestionsModalOpenClicked(false);
            }
        }
    }, [addQuestionsModalOpenClicked, isQuestionTypeLoading]);

    return (
        <React.Fragment>
            {/* refresh button */}
            <div className="d-flex justify-content-between align-items-center">
                <button
                    onClick={
                        isQuestionTypeLoading
                            ? null
                            : () => openAddQuestionsModal()
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
                    <QuestionsListTable
                        tableData={questionsList}
                        tableColumns={QuestionsListTableColumns}
                        tableName="Questions"
                        setSingleQuestion={setSingleQuestion}
                        setIsQuestionUpdating={setIsQuestionUpdating}
                        isFetching={isFetching}
                        isLoading={isQuestionsListLoading}
                        setAllQuestions={setAllQuestions}
                        allQuestions={allQuestions}
                        onPageChange={onPageChange}
                        setIsYesNoRulesLoading={setIsYesNoRulesLoading}
                        handleOpenAddQuestionsModal={
                            handleOpenAddQuestionsModal
                        }
                        getSinglePolicyDataByIDorKey={
                            getSinglePolicyDataByIDorKey
                        }
                        questionFiledRefetch={questionFiledRefetch}
                    />
                </div>
            </div>
            {addQuestionsModalOpen && (
                <AddQuestionsListModal
                    open={addQuestionsModalOpen}
                    isYesNoRulesLoading={isYesNoRulesLoading}
                    closeModal={handleCloseAddQuestionsModal}
                    addQuestionsData={singleQuestion}
                    singleQuestion={singleQuestion}
                    setSingleQuestion={setSingleQuestion}
                    isTableShow={false}
                    isQuestionUpdating={isQuestionUpdating}
                    setIsQuestionUpdating={setIsQuestionUpdating}
                    setAddQuestionsData={setSingleQuestion}
                    refetchSaleRiskAnalysis={refetch}
                    singlePolicyDataByIDorKey={singlePolicyDataByIDorKey}
                />
            )}
        </React.Fragment>
    );
};

export default SalesRiskQuestionList;
