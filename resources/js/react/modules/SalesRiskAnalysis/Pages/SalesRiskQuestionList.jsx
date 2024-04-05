import React, { useContext } from "react";

// local styled components
import { SalesRiskAnalysisContainer } from "../components/ui/Styles/ui";

// ui components
import RefreshButton from "../components/RefreshButton";

// modal components
import AddQuestionsListModal from "../components/modal/AddQuestionsListModal";

// table components
import QuestionsListTable from "../components/table/QuestionsListTable";
import { QuestionsListTableColumns } from "../components/table/QuestionsListTableColumns";
import { useSaleAnalysisQuestionsListQuery } from "../../../services/api/salesRiskAnalysisSlice";

const SalesRiskQuestionList = () => {
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

    // api call
    const {
        data,
        isFetching,
        isLoading: isQuestionsListLoading,
        refetch,
    } = useSaleAnalysisQuestionsListQuery("", {
        refetchOnMountOrArgChange: true,
    });

    const handleScrollToBottom = () => {};

    const handleCloseAddQuestionsModal = () => {
        setAddQuestionsModalOpen(false);
    };

    // pagination
    const onPageChange = (paginate) => {
        setPagination(paginate);
    };


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
                        tableData={data}
                        tableColumns={QuestionsListTableColumns}
                        tableName="Questions"
                        setSingleQuestion={setSingleQuestion}
                        setIsQuestionUpdating={setIsQuestionUpdating}
                        isFetching={isFetching}
                        isLoading={isQuestionsListLoading}
                        setAllQuestions={setAllQuestions}
                        allQuestions={allQuestions}
                        handleScrollToBottom={handleScrollToBottom}
                        onPageChange={onPageChange}
                        handleOpenAddQuestionsModal={() => {
                            setAddQuestionsModalOpen(true);
                        }}
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
                    setAddQuestionsData={setSingleQuestion}
                    refetchSaleRiskAnalysis={refetch}
                />
            )}
        </React.Fragment>
    );
};

export default SalesRiskQuestionList;
