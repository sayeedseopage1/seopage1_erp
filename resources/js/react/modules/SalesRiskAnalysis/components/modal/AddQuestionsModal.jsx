import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

// ui components
import CustomModal from "../ui/CustomModal/CustomModal";

// sections components

// local styled components
import { ModalTitle } from "../ui/Styles/ui";

// api services
import {
    useGetSinglePolicySalesRiskAnalysisQuery,
    useSaleAnalysisQuestionsListQuery,
} from "../../../../services/api/salesRiskAnalysisSlice";

// helper functions
import { getValidFields } from "../../helper/createFromValidation";
import { formatQuestionData } from "../../helper/formatEditPolicyData";

// table components
import QuestionsModalTable from "../table/QuestionsModalTable";
import { QuestionsModalTableColumns } from "../table/QuestionsModalTableColumns";

const AddQuestionsModal = ({
    open,
    closeModal,
    addQuestionsData,
    setAddQuestionsData,
}) => {
    const modalRef = useRef(null);
    const [{ pageIndex, pageSize }] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [isQuestionUpdating, setIsQuestionUpdating] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const [singleQuestion, setSingleQuestion] = useState({
        title: "",
        type: {},
        placeholder: "",
        parent_question: {},
        parent_question_for: "",
        listItem: [],
        ruleList: [],
        comment: "",
    });
    const [singleQuestionValidation, setSingleQuestionValidation] = useState({
        title: false,
        type: false,
        placeholder: false,
        isSubmitting: false,
    });

    const { data: singlePolicyData, isLoading: isLoadingSinglePolicyData } =
        useGetSinglePolicySalesRiskAnalysisQuery(
            `policy_id=${addQuestionsData?.id}`,
            {
                skip: !addQuestionsData?.id,
                staleTime: 0,
                refetchOnMountOrArgChange: true,
            }
        );

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    // api call
    const { data, isLoading: isQuestionsListLoading } =
        useSaleAnalysisQuestionsListQuery(
            queryString({
                page: pageIndex + 1,
                limit: pageSize,
                policy_id: addQuestionsData?.id,
            }),
            {
                skip: !addQuestionsData?.id,
                refetchOnMountOrArgChange: true,
            }
        );

    const questionsList = data?.data || [];

    useEffect(() => {
        if (questionsList?.data?.length) {
            const formatQuestionsList = formatQuestionData(
                questionsList?.data,
                setAllQuestions
            );
            setQuestions(formatQuestionsList);
        }
    }, [questionsList?.data]);

    // Scroll to Bottom
    const handleScrollToBottom = () => {
        const scrollTarget = document.getElementById("scrollTarget");
        if (scrollTarget) {
            scrollTarget.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        }
    };

    // Placeholder Generator
    const questionsPlaceholderGenerator = (type) => {
        switch (type?.name) {
            case "text":
                return "Write here your text";
            case "yesNo":
                return "Select Yes or No";
            case "numeric":
                return "Enter Number";
            case "list":
                return "Select from List";
            case "longText":
                return "Describe Here";
        }
    };

    // Close Modal
    const handleCloseAddQuestionsModal = () => {
        closeModal();
        resetQuestionForm();
        setQuestions([]);
        setAddQuestionsData({});
        setAllQuestions([]);
    };

    // Reset Question Form
    const resetQuestionForm = () => {
        setSingleQuestion({
            title: "",
            type: {},
            placeholder: "",
            parent_question: {},
            ruleList: [],
            comment: "",
        });
        setSingleQuestionValidation({
            title: false,
            type: false,
            placeholder: false,
            isSubmitting: false,
        });
    };

    // Set Placeholder
    useEffect(() => {
        setSingleQuestion({
            ...singleQuestion,
            placeholder: questionsPlaceholderGenerator(singleQuestion?.type),
        });
    }, [singleQuestion?.type]);

    // Set Validation on Submit
    useEffect(() => {
        if (singleQuestionValidation.isSubmitting) {
            const validation = getValidFields(
                singleQuestion,
                singleQuestionValidation
            );
            setSingleQuestionValidation({
                ...validation,
            });
        }
    }, [singleQuestion]);

    // Scroll to Bottom on Question Update
    useEffect(() => {
        if (isQuestionUpdating && modalRef?.current) {
            modalRef?.current?.scrollTo({
                top: modalRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [isQuestionUpdating]);

    // Set Data on Edit
    useEffect(() => {
        if (singlePolicyData?.data?.length) {
            setAddQuestionsData((prev) => ({
                ...prev,
                department: singlePolicyData?.data[0].department,
                ruleList: singlePolicyData?.data[0].ruleList,
            }));
        }
    }, [isLoadingSinglePolicyData]);

    return (
        <CustomModal
            id="saleRiskAddQuestionsModal"
            scroLlBottom={isQuestionUpdating}
            open={open}
            closeModal={handleCloseAddQuestionsModal}
            contentLabel="Add New Policy"
            width="1200px"
            maxWidth="1200px"
            height="fit-content"
            maxHeight={"550px"}
            isCloseButtonShow={true}
        >
            {/* Modal Content */}
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Policy Questions</ModalTitle>
                </div>
                {/* 
                Questions Table
                */}
                <div
                    className="d-flex flex-column mb-4 px-4  w-100"
                    style={{
                        maxHeight: "500px",
                        overflowY: "scroll",
                    }}
                >
                    <div
                        className="row px-0 py-4 px-2 mb-2"
                        style={{
                            border: "1px dotted #E5E5E5",
                            borderRadius: "5px",
                        }}
                    >
                        <QuestionsModalTable
                            tableData={questions}
                            tableColumns={QuestionsModalTableColumns}
                            tableName="Questions"
                            setSingleQuestion={setSingleQuestion}
                            setIsQuestionUpdating={setIsQuestionUpdating}
                            isFetching={isQuestionsListLoading}
                            isLoading={isQuestionsListLoading}
                            setAllQuestions={setAllQuestions}
                            allQuestions={allQuestions}
                            handleScrollToBottom={handleScrollToBottom}
                        />
                    </div>
                </div>
            </div>
        </CustomModal>
    );
};

export default AddQuestionsModal;

AddQuestionsModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    addQuestionsData: PropTypes.object,
    setAddQuestionsData: PropTypes.func,
};
