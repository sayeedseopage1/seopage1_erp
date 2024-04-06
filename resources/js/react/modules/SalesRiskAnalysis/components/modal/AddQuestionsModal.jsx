import _ from "lodash";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import React, { useEffect, useRef, useState } from "react";

// ui components
import Switch from "../Switch";
import CustomDropDown from "../CustomDropDown";
import QuestionsSelect from "../QuestionsSelect";
import RuleMultiSelect from "../RuleMultiSelect";
import CustomModal from "../ui/CustomModal/CustomModal";

// sections components
import AddQuestionTypeListInputs from "../sections/AddQuestionTypeListInputs";

// local styled components
import {
    ModalTitle,
} from "../ui/Styles/ui";

// global styled components
import { Flex } from "../../../../global/styled-component/Flex";

// Constants
import { QuestionsTypes } from "../../constant";

// api services
import {
    useEditQuestionSalesRiskAnalysisMutation,
    useGetSinglePolicySalesRiskAnalysisQuery,
    usePolicyQuestionsListByPolicyIdQuery,
    useQuestionAddonPolicyMutation,
    useSaleAnalysisQuestionByPolicyIdQuery,
    useSaleAnalysisQuestionsListQuery,
    useSinglePolicyQuestionsQuery,
} from "../../../../services/api/salesRiskAnalysisSlice";

// helper functions
import { getValidFields } from "../../helper/createFromValidation";
import { generateUniqueString } from "../../../../utils/customUidGenerate";
import { formatAPIErrors } from "../../../../utils/formatAPIErrors";
import { formatQuestionData } from "../../helper/formatEditPolicyData";

// table components
import QuestionsModalTable from "../table/QuestionsModalTable";
import { QuestionsModalTableColumns } from "../table/QuestionsModalTableColumns";

const AddQuestionsModal = ({
    open,
    closeModal,
    addQuestionsData,
    setAddQuestionsData,
    refetchSaleRiskAnalysis,
}) => {
    const modalRef = useRef(null);
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [isQuestionUpdating, setIsQuestionUpdating] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [isListEmpty, setIsListEmpty] = useState(false);
    const [yesNoValueEmpty, setYesNoValueEmpty] = useState(false);
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

    // question input fields
    const {
        data: questionInputFields,
        isFetching: isQuestionInputFieldsFetching,
        isLoading: isQuestionInputFieldsLoading,
        refetch,
    } = useSinglePolicyQuestionsQuery(addQuestionsData?.id, {
        staleTime: 0,
        refetchOnMountOrArgChange: true,
        skip: !addQuestionsData?.id,
    });

    const [
        submitQuestionAddonPolicy,
        { isLoading, isFetching: isQuestionAddonPolicyFetching },
    ] = useQuestionAddonPolicyMutation();

    const [
        editSinglePolicySalesRiskAnalysis,
        { isLoading: isEditSinglePolicySalesRiskAnalysisLoading },
    ] = useEditQuestionSalesRiskAnalysisMutation();

    const { data: singlePolicyData, isLoading: isLoadingSinglePolicyData } =
        useGetSinglePolicySalesRiskAnalysisQuery(addQuestionsData?.id, {
            skip: !addQuestionsData?.id,
            staleTime: 0,
            refetchOnMountOrArgChange: true,
        });

    // const {
    //     data: questionsList,
    //     isFetching: isQuestionsListFetching,
    //     isLoading: isQuestionsListLoading,
    // } = usePolicyQuestionsListByPolicyIdQuery(addQuestionsData?.id, {
    //     staleTime: 0,
    //     refetchOnMountOrArgChange: true,
    //     skip: !addQuestionsData?.id,
    // });

    // const {
    //     data: questionsList,
    //     isFetching: isQuestionsListFetching,
    //     isLoading: isQuestionsListLoading,
    // } = useSaleAnalysisQuestionByPolicyIdQuery(addQuestionsData?.id, {
    //     skip: !addQuestionsData?.id,
    //     refetchOnMountOrArgChange: true,
    // });

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
                limit: pageSize,policy_id: addQuestionsData?.id,
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

    // Handle Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "type") {
            if (value.name === "list") {
                setSingleQuestion({
                    ...singleQuestion,
                    placeholder: "",
                    listItem: [
                        {
                            id: generateUniqueString(15),
                            title: "",
                        },
                    ],
                    [name]: value,
                });
            } else {
                setSingleQuestion({
                    ...singleQuestion,
                    placeholder: "",
                    listItem: [],
                    [name]: value,
                });
            }
        } else if (name === "parent_question") {
            if (value?.type === "list") {
                setSingleQuestion({
                    ...singleQuestion,
                    parent_question: {
                        ...value,
                        listItem: allQuestions?.find(
                            (item) => item?.id === value?.id
                        )?.value,
                    },
                    parent_question_for: "",
                });
            } else {
                setSingleQuestion({
                    ...singleQuestion,
                    parent_question: value,
                    parent_question_for: "",
                });
            }
        } else {
            setSingleQuestion({ ...singleQuestion, [name]: value });
        }
    };

    // Formatting dta for dropdown reuse component
    const QuestionsList =
        questionInputFields?.length > 0 &&
        questionInputFields?.find((item) => item?.label === "Parent Question");
    const updateQuestionsList = {
        label: "Parent Questions",
        emptyOptionsLabel: "Select Parent Question",
        id: "parentQuestion",
        data: QuestionsList?.structure,
    };

    // Check if any field is empty
    const isHaveAnyEmpty = (validation) => {
        if (
            Object.entries(validation).some(
                ([key, value]) => key !== "isSubmitting" && value === true
            )
        ) {
            setSingleQuestionValidation({ ...validation, isSubmitting: true });
            return true;
        }
        return false;
    };

    // Check if List Item is Empty
    const isListEmptyValidation = (singleQuestion) => {
        if (
            singleQuestion?.type?.name === "list" &&
            singleQuestion.listItem.map((item) => item.title).includes("")
        ) {
            setIsListEmpty(true);
            toast.error("List Item Can't be Empty");
            return true;
        }
        return false;
    };

    // Check if Parent Question For is Empty
    const isParentQuestionForEmpty = (singleQuestion) => {
        if (
            singleQuestion?.parent_question?.type === "yesNo" ||
            singleQuestion?.parent_question?.type === "list"
        ) {
            if (singleQuestion?.parent_question_for === "") {
                setYesNoValueEmpty(true);
                toast.error("Parent Question For is required");
                return true;
            }
        }
        return false;
    };

    // Add Question or Update Question Handler Function on Submit
    const handleAddQuestion = async () => {
        const validation = getValidFields(
            singleQuestion,
            singleQuestionValidation
        );

        // check validation
        if (
            isHaveAnyEmpty(validation) ||
            isListEmptyValidation(singleQuestion) ||
            isParentQuestionForEmpty(singleQuestion)
        ) {
            return;
        }

        // Payload for Add Question
        const payload = {
            policy_id: addQuestionsData?.id,
            title: singleQuestion?.title,
            type: singleQuestion?.type?.name,
            placeholder: singleQuestion?.placeholder,
        };
        if (typeof singleQuestion?.id === "number") {
            payload.id = singleQuestion?.id;
        }

        if (singleQuestion?.ruleList?.length) {
            payload.ruleList = singleQuestion?.ruleList.map((item) => item.id);
        }

        if (singleQuestion?.parent_question?.id) {
            payload.parent_id = singleQuestion?.parent_question?.id;
        }
        if (singleQuestion?.comment) {
            payload.comment = singleQuestion?.comment;
        }
        if (
            singleQuestion?.parent_question?.type === "yesNo" ||
            singleQuestion?.parent_question?.type === "list"
        ) {
            payload.value = singleQuestion?.parent_question_for;
        }
        if (singleQuestion?.type?.name === "list") {
            const updateId = singleQuestion?.listItem?.map((item, index) => {
                return {
                    id: `${addQuestionsData?.id}_${index + 1}`,
                    title: item?.title,
                };
            });
            payload.value = JSON.stringify(updateId);
        }

        // console.log(payload);

        try {
            // Condition for Update Question
            const res = isQuestionUpdating
                ? await editSinglePolicySalesRiskAnalysis(payload).unwrap()
                : await submitQuestionAddonPolicy(payload).unwrap();

            if (res.status === "success") {
                toast.success(
                    isQuestionUpdating
                        ? "Question Updated Successfully"
                        : "Question Added Successfully"
                );
                handleCloseAddQuestionsModal();
                refetchSaleRiskAnalysis();
            }
        } catch (error) {
            if (error.status === 403) {
                const errorMessages = formatAPIErrors(error?.data?.data);
                errorMessages.forEach((errorMessage) => {
                    toast.error(errorMessage);
                });
            } else {
                toast.error("Something went wrong");
            }
        }
    };

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
            id="addQuestionsModal"
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
    singlePolicyQuestions: PropTypes.array,
    setAddQuestionsData: PropTypes.func,
    refetchSaleRiskAnalysis: PropTypes.func,
};
