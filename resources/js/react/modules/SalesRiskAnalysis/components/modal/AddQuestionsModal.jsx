import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// ui components
import CustomModal from "../ui/CustomModal/CustomModal";
import {
    ModalButton,
    ModalInput,
    ModalTitle,
    ModalInputLabel,
    ModalSelectContainer,
} from "../ui/Styles/ui";
import CustomDropDown from "../CustomDropDown";
import DepartmentSelect from "../DepartmentSelect";

// Constants
import { QuestionsTypes } from "../../constant";
import { Flex } from "../../../../global/styled-component/Flex";
import QuestionsSelect from "../QuestionsSelect";
import Switch from "../Switch";
import _ from "lodash";
import { useQuestionInputFieldsQuery, useSinglePolicyQuestionsQuery } from "../../../../services/api/salesRiskAnalysisSlice";
import { getValidFields } from "../../helper/createFromValidation";
import RuleMultiSelect from "../RuleMultiSelect";

const AddQuestionsModal = ({ open, closeModal, addQuestionsData }) => {
    const [isQuestionUpdating, setIsQuestionUpdating] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [singleQuestion, setSingleQuestion] = useState({
        title: "",
        type: {},
        placeholder: "",
        parent_question: {},
        ruleList: [],
    });
    const [singleQuestionValidation, setSingleQuestionValidation] = useState({
        title: false,
        type: false,
        placeholder: false,
        ruleList: false,
        isSubmitting: false,
    });

    // question input fields
    const {
        data: questionInputFields,
        isFetching: isQuestionInputFieldsFetching,
        isLoading: isQuestionInputFieldsLoading,
    } = useSinglePolicyQuestionsQuery(addQuestionsData?.id);

    // Handle Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "type") {
            setSingleQuestion({
                ...singleQuestion,
                placeholder: "",
                [name]: value,
            });
            return;
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

    const handleAddSingleQuestionOnQuestions = () => {
        const validation = getValidFields(
            singleQuestion,
            singleQuestionValidation
        );
        console.log(validation);
        if (
            Object.entries(validation).some(
                ([key, value]) => key !== "isSubmitting" && value === true
            )
        ) {
            setSingleQuestionValidation({
                ...validation,
                isSubmitting: true,
            });
            return;
        }

        const isExist = questions?.find(
            (item) => item?.id === singleQuestion?.id
        )
        if(isExist){
            const updateQuestions = questions.map((item) => {
                if (item?.id === singleQuestion?.id) {
                    return {
                        ...item,
                        ...singleQuestion,
                    };
                }
                return item;
            });
            setQuestions(updateQuestions);
            resetQuestionForm();
        } else {
            setQuestions([...questions, singleQuestion]);
            resetQuestionForm();
        }

    };

    // Placeholder Generator
    const questionsPlaceholderGenerator = (type) => {
        switch (type?.name) {
            case "text":
                return "Write here your text";
            case "yes_no":
                return "Select Yes or No";
            case "nemeric":
                return "Enter Number";
            case "list":
                return "Select from List";
            case "long_text":
                return "Describe Here";
        }
    };

    const handleCloseAddQuestionsModal = () => {
        closeModal();
        resetQuestionForm();
        setQuestions([]);
    };

    const resetQuestionForm = () => {
        setSingleQuestion({
            title: "",
            type: {},
            placeholder: "",
            parent_question: {},
            ruleList: [],
        });
        setSingleQuestionValidation({
            title: false,
            type: false,
            placeholder: false,
            parent_question: false,
            ruleList: false,
            isSubmitting: false,
        });
    }

    // Set Placeholder
    useEffect(() => {
        setSingleQuestion({
            ...singleQuestion,
            placeholder: questionsPlaceholderGenerator(singleQuestion.type),
        });
    }, [singleQuestion.type]);

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

    console.log(singleQuestion);
    console.log(questions);

    return (
        <CustomModal
            open={open}
            closeModal={handleCloseAddQuestionsModal}
            contentLabel="Add New Policy"
            width="700px"
            height={
                questions.length > 0 || !_.isEmpty(singleQuestion.type)
                    ? "600px"
                    : "fit-content"
            }
            maxHeight={
                questions.length > 0 || !_.isEmpty(singleQuestion.type)
                    ? "600px"
                    : "fit-content"
            }
            isCloseButtonShow={true}
        >
            {/* Modal Content */}
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Questions</ModalTitle>
                </div>
                <div className="d-flex flex-column mb-4 px-3  w-100">
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Policy Name
                        </ModalInputLabel>
                        <div className="col-8 flex-column px-0">
                            <ModalInputLabel>
                                {addQuestionsData?.title}
                            </ModalInputLabel>
                        </div>
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Department Name
                        </ModalInputLabel>
                        <div className="col-8 flex-column px-0">
                            <ModalInputLabel>
                                {addQuestionsData?.department?.name}
                            </ModalInputLabel>
                        </div>
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Type<sup>*</sup>
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
                        </div>
                    </div>
                    <Switch>
                        <Switch.Case
                            condition={!_.isEmpty(singleQuestion.type)}
                        >
                            <div className="row mb-4 align-items-center">
                                <ModalInputLabel className="col-4">
                                    Title <sup>*</sup>{" "}
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
                                            Title is required
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="row mb-4 align-items-center">
                                <ModalInputLabel className="col-4">
                                    Parent Question
                                </ModalInputLabel>
                                <div className="col-8 px-0 flex-column">
                                    <ModalSelectContainer>
                                        <QuestionsSelect
                                            filedName="parent_question"
                                            data={updateQuestionsList}
                                            selected={
                                                singleQuestion?.parent_question
                                            }
                                            setSelected={handleChange}
                                        />
                                    </ModalSelectContainer>
                                </div>
                            </div>
                            <div className="row mb-4 align-items-center">
                                <ModalInputLabel className="col-4">
                                    Rule List<sup>*</sup>
                                </ModalInputLabel>
                                <div className="col-8 px-0 flex-column">
                                    <ModalSelectContainer>
                                        <RuleMultiSelect
                                            filedName="ruleList"
                                            data={addQuestionsData?.ruleList}
                                            selected={singleQuestion?.ruleList}
                                            singleQuestion={singleQuestion}
                                            setSelected={setSingleQuestion}
                                        />
                                    </ModalSelectContainer>
                                    {singleQuestionValidation?.ruleList && (
                                        <p className="text-danger py-1">
                                            Please select at least one rule
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="row mb-4 align-items-center">
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
                    <div className="d-flex justify-content-end">
                        <button
                            className="d-flex btn btn-success align-items-center"
                            style={{
                                fontSize: "13px",
                            }}
                            disabled={_.isEmpty(singleQuestion?.type)}
                            onClick={handleAddSingleQuestionOnQuestions}
                        >
                            {isQuestionUpdating
                                ? "Update Question"
                                : "Create Question"}
                        </button>
                        <button
                            className="d-flex btn btn-warning align-items-center text-white"
                            style={{
                                fontSize: "13px",
                                marginLeft: "10px",
                            }}
                            disabled={_.isEmpty(singleQuestion?.type)}
                            onClick={handleCloseAddQuestionsModal}
                        >
                            {isQuestionUpdating ? "Cancel Edit" : "Cancel"}
                        </button>
                    </div>
                </div>
                <Flex gap="10px" justifyContent="center">
                    <ModalButton width="177px">Save Question</ModalButton>
                    <ModalButton
                        onClick={handleCloseAddQuestionsModal}
                        width="177px"
                        color="white"
                        border="1px solid #1492E6"
                        textColor="#1492E6"
                    >
                        Do it latter
                    </ModalButton>
                </Flex>
            </div>
        </CustomModal>
    );
};

export default AddQuestionsModal;

AddQuestionsModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    addQuestionsData: PropTypes.object,
    questionInputFields: PropTypes.array,
};
