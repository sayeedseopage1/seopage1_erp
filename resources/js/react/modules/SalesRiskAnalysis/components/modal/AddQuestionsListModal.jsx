import _ from "lodash";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import React, { useContext, useEffect, useRef, useState } from "react";

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
    ModalButton,
    ModalInput,
    ModalTitle,
    ModalInputLabel,
    ModalSelectContainer,
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
    useSaleAnalysisQuestionSaveMutation,
    useSinglePolicyQuestionsQuery,
} from "../../../../services/api/salesRiskAnalysisSlice";

// helper functions
import { getValidFields } from "../../helper/createFromValidation";
import { generateUniqueString } from "../../../../utils/customUidGenerate";
import { formatAPIErrors } from "../../../../utils/formatAPIErrors";
import { formatQuestionData } from "../../helper/formatEditPolicyData";

// table components

import { SalesRiskAnalysisContext } from "../../context/SalesRiskAnalysisProvider";

const AddQuestionsListModal = ({
    open,
    closeModal,
    singleQuestion,
    setSingleQuestion,
    addQuestionsData,
    setAddQuestionsData,
    refetchSaleRiskAnalysis,
    isQuestionUpdating,
}) => {
    const modalRef = useRef(null);
    const { questionsAnswerType, policies, allQuestions } = useContext(
        SalesRiskAnalysisContext
    );
    const [questions, setQuestions] = useState([]);
    const [isListEmpty, setIsListEmpty] = useState(false);
    const [yesNoValueEmpty, setYesNoValueEmpty] = useState(false);
    const [singleQuestionValidation, setSingleQuestionValidation] = useState({
        title: false,
        type: false,
        question_key: false,
        placeholder: false,
        isSubmitting: false,
    });

    const [
        submitQuestionAddonPolicy,
        { isLoading, isFetching: isQuestionAddonPolicyFetching },
    ] = useQuestionAddonPolicyMutation();

    const [editSinglePolicySalesRiskAnalysis] =
        useEditQuestionSalesRiskAnalysisMutation();

    const { data: singlePolicyData, isLoading: isLoadingSinglePolicyData } =
        useGetSinglePolicySalesRiskAnalysisQuery(addQuestionsData?.id, {
            skip: !addQuestionsData?.id,
            staleTime: 0,
            refetchOnMountOrArgChange: true,
        });

    const [
        saleAnalysisQuestionSave,
        { isLoading: isSaleAnalysisQuestionSaveLoading },
    ] = useSaleAnalysisQuestionSaveMutation();

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
            title: singleQuestion?.title,
            type: singleQuestion?.type?.name,
            placeholder: singleQuestion?.placeholder,
            key: singleQuestion?.question_key?.name,
        };
        if (typeof singleQuestion?.id === "number") {
            payload.id = singleQuestion?.id;
        }
        if (singleQuestion?.policy_id?.id) {
            payload.policy_id = singleQuestion?.policy_id?.id;
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
                    id: `${singleQuestion?.policy_id?.id}_${index + 1}`,
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
                : await saleAnalysisQuestionSave(payload).unwrap();

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

    // Close Modal
    const handleCloseAddQuestionsModal = () => {
        closeModal();
        resetQuestionForm();
        setQuestions([]);
        setAddQuestionsData({});
    };

    // Reset Question Form
    const resetQuestionForm = () => {
        setSingleQuestion({
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
        setSingleQuestionValidation({
            title: false,
            type: false,
            question_key: false,
            placeholder: false,
            isSubmitting: false,
        });
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
            maxWidth="1200px"
            height={
                questions.length > 0 || !_.isEmpty(singleQuestion?.type)
                    ? "650px"
                    : "550px"
            }
            maxHeight={
                questions.length > 0 || !_.isEmpty(singleQuestion?.type)
                    ? "650px"
                    : "550px"
            }
            isCloseButtonShow={true}
        >
            {/* Modal Content */}
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Questions</ModalTitle>
                </div>
                {/* 
                Questions Table
                */}
                <div className="d-flex flex-column mb-4 px-4  w-100">
                    <div className="row mb-4 align-items-first">
                        <ModalInputLabel className="col-4">
                            Question Title <sup>*</sup>{" "}
                        </ModalInputLabel>
                        <div className="col-8 flex-column px-0">
                            <ModalInput
                                type="text"
                                className="w-100"
                                name="title"
                                value={singleQuestion?.title}
                                onChange={handleChange}
                                placeholder="Write Here"
                            />
                            {singleQuestionValidation?.title && (
                                <p className="text-danger py-1">
                                    Question Title is required
                                </p>
                            )}
                        </div>
                    </div>
                    <div
                        id="scrollTarget"
                        className="row mb-4 align-items-first"
                    >
                        <ModalInputLabel className="col-4">
                            Question Key<sup>*</sup>
                        </ModalInputLabel>
                        <div className="col-8 px-0 flex-column">
                            <ModalSelectContainer>
                                <CustomDropDown
                                    filedName="question_key"
                                    data={questionsAnswerType}
                                    selected={singleQuestion?.question_key}
                                    setSelected={handleChange}
                                />
                            </ModalSelectContainer>
                            {singleQuestionValidation?.question_key && (
                                <p className="text-danger py-1">
                                    Question Key is required
                                </p>
                            )}
                        </div>
                    </div>
                    <div
                        id="scrollTarget"
                        className="row mb-4 align-items-first"
                    >
                        <ModalInputLabel className="col-4">
                            Answer Type<sup>*</sup>
                        </ModalInputLabel>
                        <div className="col-8 px-0 flex-column">
                            <ModalSelectContainer>
                                <CustomDropDown
                                    filedName="type"
                                    data={QuestionsTypes}
                                    selected={singleQuestion?.type}
                                    setSelected={handleChange}
                                />
                            </ModalSelectContainer>
                            {singleQuestionValidation?.type && (
                                <p className="text-danger py-1">
                                    Answer Type is required
                                </p>
                            )}
                        </div>
                    </div>
                    {/* 
                    Add Question Form
                    */}
                    <Switch>
                        <Switch.Case
                            condition={!_.isEmpty(singleQuestion?.type)}
                        >
                            <Switch.Case
                                condition={
                                    singleQuestion?.type?.name === "list"
                                }
                            >
                                <AddQuestionTypeListInputs
                                    isListEmpty={isListEmpty}
                                    singleQuestion={singleQuestion}
                                    setSingleQuestion={setSingleQuestion}
                                />
                            </Switch.Case>
                            <div className="row mb-4 align-items-first">
                                <ModalInputLabel className="col-4">
                                    Parent Question
                                </ModalInputLabel>
                                <div className="col-8 px-0 flex-column">
                                    <ModalSelectContainer>
                                        <QuestionsSelect
                                            filedName="parent_question"
                                            data={allQuestions}
                                            selected={
                                                singleQuestion?.parent_question
                                            }
                                            setSelected={handleChange}
                                        />
                                    </ModalSelectContainer>
                                </div>
                            </div>
                            <Switch.Case
                                condition={
                                    singleQuestion?.parent_question?.type ===
                                    "yesNo"
                                }
                            >
                                <div className="row mb-4 align-items-first">
                                    <ModalInputLabel className="col-4">
                                        Parent Question <br /> For
                                    </ModalInputLabel>
                                    <div className="col-8 flex-column px-0">
                                        <div className="d-flex">
                                            <div className="d-flex">
                                                <ModalInput
                                                    type="radio"
                                                    className="w-100"
                                                    name="parent_question_for"
                                                    id="parent_question_for_yes"
                                                    value="yes"
                                                    checked={
                                                        singleQuestion?.parent_question_for ===
                                                        "yes"
                                                    }
                                                    onChange={handleChange}
                                                    placeholder="Write Here"
                                                />
                                                <ModalInputLabel
                                                    htmlFor="parent_question_for_yes"
                                                    className="ml-2"
                                                >
                                                    Yes
                                                </ModalInputLabel>
                                            </div>
                                            <div className="d-flex ml-2">
                                                <ModalInput
                                                    type="radio"
                                                    className="w-100"
                                                    name="parent_question_for"
                                                    id="parent_question_for_no"
                                                    value="no"
                                                    checked={
                                                        singleQuestion?.parent_question_for ===
                                                        "no"
                                                    }
                                                    onChange={handleChange}
                                                    placeholder="Write Here"
                                                />
                                                <ModalInputLabel
                                                    htmlFor="parent_question_for_no"
                                                    className="ml-2"
                                                >
                                                    No
                                                </ModalInputLabel>
                                            </div>
                                        </div>
                                        {yesNoValueEmpty &&
                                            !singleQuestion?.parent_question_for && (
                                                <p className="text-danger py-1">
                                                    Parent Question For is
                                                    required
                                                </p>
                                            )}
                                    </div>
                                </div>
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    singleQuestion?.parent_question?.type ===
                                    "list"
                                }
                            >
                                <div className="row mb-4 align-items-first">
                                    <ModalInputLabel className="col-4">
                                        Parent Question For
                                    </ModalInputLabel>
                                    <div className="col-8 flex-column px-0">
                                        <div className="d-flex flex-column justify-content-start">
                                            {singleQuestion?.parent_question?.listItem?.map(
                                                (list) => (
                                                    <div
                                                        className="d-flex justify-content-start align-items-center mb-2"
                                                        key={list.id}
                                                    >
                                                        <ModalInput
                                                            type="radio"
                                                            className="ml-2"
                                                            name="parent_question_for"
                                                            id={`parent_question_for_${list.id}`}
                                                            value={list.id}
                                                            checked={
                                                                singleQuestion?.parent_question_for ===
                                                                list?.id
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder="Write Here"
                                                        />
                                                        <ModalInputLabel
                                                            htmlFor={`parent_question_for_${list?.id}`}
                                                            className="ml-2"
                                                        >
                                                            {list?.title}
                                                        </ModalInputLabel>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        {yesNoValueEmpty &&
                                            !singleQuestion?.parent_question_for && (
                                                <p className="text-danger py-1">
                                                    Parent Question For is
                                                    required
                                                </p>
                                            )}
                                    </div>
                                </div>
                            </Switch.Case>
                            <div className="row mb-4 align-items-first">
                                <ModalInputLabel className="col-4">
                                    Policy Name
                                </ModalInputLabel>
                                <div className="col-8 px-0 flex-column">
                                    <ModalSelectContainer>
                                        <CustomDropDown
                                            filedName="policy_id"
                                            data={policies}
                                            selected={singleQuestion?.policy_id}
                                            setSelected={handleChange}
                                        />
                                    </ModalSelectContainer>
                                </div>
                            </div>
                            <div className="row mb-4 align-items-first">
                                <ModalInputLabel className="col-4">
                                    Placeholder <sup>*</sup>{" "}
                                </ModalInputLabel>
                                <div className="col-8 flex-column px-0">
                                    <ModalInput
                                        type="text"
                                        className="w-100"
                                        name="placeholder"
                                        value={singleQuestion?.placeholder}
                                        onChange={handleChange}
                                        placeholder="Write Here"
                                    />
                                    {singleQuestionValidation?.placeholder && (
                                        <p className="text-danger py-1">
                                            Placeholder is required
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Switch.Case>
                    </Switch>
                    <div className="row mb-4 align-items-first">
                        <ModalInputLabel className="col-4">
                            Comment
                        </ModalInputLabel>
                        <div className="col-8 flex-column px-0">
                            <ModalInput
                                type="text"
                                className="w-100"
                                name="comment"
                                value={singleQuestion?.comment}
                                onChange={handleChange}
                                placeholder="Write Here"
                            />
                        </div>
                    </div>
                    <Flex gap="10px" justifyContent="center">
                        <ModalButton onClick={handleAddQuestion} width="200px">
                            {isLoading || isSaleAnalysisQuestionSaveLoading
                                ? "Saving..."
                                : isQuestionUpdating
                                ? "Update Question"
                                : "Save Question"}
                        </ModalButton>
                        <ModalButton
                            onClick={handleCloseAddQuestionsModal}
                            width="200px"
                            color="white"
                            border="1px solid #1492E6"
                            textColor="#1492E6"
                        >
                            Do it latter
                        </ModalButton>
                    </Flex>
                </div>
            </div>
        </CustomModal>
    );
};

export default AddQuestionsListModal;

AddQuestionsListModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    addQuestionsData: PropTypes.object,
    singlePolicyQuestions: PropTypes.array,
    setAddQuestionsData: PropTypes.func,
    refetchSaleRiskAnalysis: PropTypes.func,
};
