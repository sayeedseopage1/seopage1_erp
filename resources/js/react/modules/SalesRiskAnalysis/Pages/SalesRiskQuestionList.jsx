import React, {  useEffect } from "react";

// ui components
import RefreshButton from "../components/RefreshButton";

// modal components
import AddQuestionsListModal from "../components/modal/AddQuestionsListModal";

// table components
import QuestionsListTable from "../components/table/QuestionsListTable";
import { QuestionsListTableColumns } from "../components/table/QuestionsListTableColumns";

//APi services
import { useSaleAnalysisQuestionsListQuery } from "../../../services/api/salesRiskAnalysisSlice";


const SalesRiskQuestionList = () => {
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

    // questions list data
    const questionsList = data?.data;


    const handleOpenAddQuestionsModal = () => {
        setAddQuestionsModalOpen(true);
    }

    // close modal
    const handleCloseAddQuestionsModal = () => {
        setAddQuestionsModalOpen(false);
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



    return (
        <React.Fragment>
            {/* refresh button */}
            <div className="d-flex justify-content-between align-items-center">
                <button
                    onClick={() => {
                        setAddQuestionsModalOpen(true);
                    }}
                    className="btn btn-primary"
                >
                    <i className="fa fa-plus mr-2" aria-hidden="true" /> Add New
                    Questions
                </button>
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
                        handleOpenAddQuestionsModal={handleOpenAddQuestionsModal}
                    />
                </div>
            </div>
            {addQuestionsModalOpen && (
                <AddQuestionsListModal
                    open={addQuestionsModalOpen}
                    closeModal={handleCloseAddQuestionsModal}
                    addQuestionsData={singleQuestion}
                    singleQuestion={singleQuestion}
                    setSingleQuestion={setSingleQuestion}
                    isTableShow={false}
                    isQuestionUpdating={isQuestionUpdating}
                    setIsQuestionUpdating={setIsQuestionUpdating}
                    setAddQuestionsData={setSingleQuestion}
                    refetchSaleRiskAnalysis={refetch}
                />
            )}
        </React.Fragment>
    );
};

export default SalesRiskQuestionList;
