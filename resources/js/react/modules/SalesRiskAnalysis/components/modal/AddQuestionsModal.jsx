import React, { useEffect, useMemo, useState } from "react";
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
import {
    useQuestionAddonPolicyMutation,
    useQuestionInputFieldsQuery,
    useSinglePolicyQuestionsQuery,
} from "../../../../services/api/salesRiskAnalysisSlice";
import { getValidFields } from "../../helper/createFromValidation";
import RuleMultiSelect from "../RuleMultiSelect";
import { generateUniqueString } from "../../../../utils/customUidGenerate";
import QuestionsModalTable from "../table/QuestionsModalTable";
import { QuestionsModalTableColumns } from "../table/QuestionsModalTableColumns";
import { toast } from "react-toastify";

const AddQuestionsModal = ({
    open,
    closeModal,
    addQuestionsData,
    setAddQuestionsData,
}) => {
    const [isQuestionUpdating, setIsQuestionUpdating] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [singleQuestion, setSingleQuestion] = useState({
        title: "",
        type: {},
        placeholder: "",
        parent_question: {},
        parent_question_for: "",
        ruleList: [],
        comment: "",
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

    const handleAddQuestion = async () => {
        const validation = getValidFields(
            singleQuestion,
            singleQuestionValidation
        );
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

        const payload = {
            policy_id: addQuestionsData?.id,
            title: singleQuestion?.title,
            type: singleQuestion?.type?.name,
            placeholder: singleQuestion?.placeholder,
            ruleList: singleQuestion?.ruleList?.map((item) => item?.id),
        };
        if (singleQuestion?.parent_question?.id) {
            payload.parent_id = singleQuestion?.parent_question?.id;
        }
        if (singleQuestion?.comment) {
            payload.comment = singleQuestion?.comment;
        }

        console.log("singleQuestion", payload);
        try {
            const res = await submitQuestionAddonPolicy(payload).unwrap();
            if (res.status === "success") {
                toast.success("Question Added Successfully");
                handleCloseAddQuestionsModal();
            }
        } catch (error) {
            console.log("error", error);
            toast.error("Something went wrong");
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
        setAddQuestionsData({});
    };

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
            ruleList: false,
            isSubmitting: false,
        });
    };

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
            width="835px"
            maxWidth="835px"
            height={
                questions.length > 0 || !_.isEmpty(singleQuestion.type)
                    ? "650px"
                    : "fit-content"
            }
            maxHeight={
                questions.length > 0 || !_.isEmpty(singleQuestion.type)
                    ? "650px"
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
                    {questions?.length > 0 && (
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
                            />
                        </div>
                    )}
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
                    <div className="row mb-4 align-items-center">
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
                </div>
                <Flex gap="10px" justifyContent="center">
                    <ModalButton onClick={handleAddQuestion} width="177px">
                        {isLoading ? "Saving..." : "Save Question"}
                    </ModalButton>
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
    singlePolicyQuestions: PropTypes.array,
};
