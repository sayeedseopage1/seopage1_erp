import React from "react";
import { toast } from "react-toastify";

// Ui components
import {
    SalesRiskAnalysisQuestionContainer,
    SalesRiskAnalysisQuestionTitleContainer,
} from "../components/ui/Styles/ui";
import CustomCheckbox from "../components/ui/CustomCheckbox/CustomCheckbox";
import QuestionConfirmModal from "../components/modal/QuestionConfirmModal";
import { Flex } from "../../../global/styled-component/Flex";
import Tooltip from "../components/Tooltip";
import Switch from "../components/Switch";

// Loader
import SaleRiskAnalysisQuestionsLoader from "../components/loader/SaleRiskAnalysisQuestionsLoader";

// Components
import SaleRiskQuestionsInputContainer from "../components/sections/SaleRiskQuestionsInputContainer";

// Utils
import { isArrayObjectEmpty } from "../../../utils/stateValidation";

// Api
import {
    useSaleRiskQuestionAnswerSaveMutation,
    useSalesRiskDealsQuestionListQuery,
} from "../../../services/api/salesRiskAnalysisSlice";

const SalesRiskQuestionsResponse = () => {
    const [focusedQuestion, setFocusedQuestion] = React.useState([]);
    const [inputsData, setInputsData] = React.useState([]);
    const [allQuestions, setAllQuestions] = React.useState([]);
    const [isChecked, setIsChecked] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // modal open close state
    const [questionModalOpen, setQuestionModalOpen] = React.useState(false);

    // fetch policy questions
    const { data, isLoading } = useSalesRiskDealsQuestionListQuery();

    const [saleAnalysisQuestionSave, { isLoading: isSaving, isSuccess }] =
        useSaleRiskQuestionAnswerSaveMutation();

    const questions = data?.data;
    const questionList = questions?.questionList;
    const currencyData = questions?.currency;

    React.useEffect(() => {
        const flattenArray = (arr) =>
            arr?.flatMap((item) => {
                const nestedQuestions = item?.questions || [];
                return [item, ...flattenArray(nestedQuestions)];
            });
        if (questionList?.length > 0) {
            const copyArray = [...questionList];
            const flattenedArray = flattenArray(copyArray);
            setAllQuestions(flattenedArray);
            const addInputFiled = flattenedArray
                .filter((item) => item.parent_id === null)
                .map((item) => {
                    return {
                        id: item?.id,
                        questions: item?.questions,
                        type: item.type,
                        is_Active_YesNo: false,
                        parent_id: item.parent_id,
                        placeholder: item.placeholder,
                        [`question_${item?.id}`]: "",
                    };
                });
            const filterChildQuestion = flattenedArray.filter(
                (item) => item.parent_id !== null
            );
            const addChildInputField = filterChildQuestion
                .map((item) => {
                    if (addInputFiled.find((i) => i.id === item.parent_id)) {
                        if (item?.value === "yes" || item?.value === "no") {
                            return null;
                        } else if (typeof item?.value === "number") {
                            return null;
                        } else {
                            return {
                                id: item?.id,
                                questions: item?.questions,
                                type: item.type,
                                is_Active_YesNo: false,
                                parent_id: item.parent_id,
                                [`question_${item?.id}`]: "",
                            };
                        }
                    }
                })
                .map((item) => item)
                .filter((item) => item !== undefined && item !== null);

            setInputsData([...addInputFiled, ...addChildInputField]);
        }
    }, [questionList]);

    // handle submit
    const handleSubmit = async () => {
        // skip key
        const skipKey = ["is_Active_YesNo", "parent_id", "placeholder"];
        // check if all inputs are empty

        const isEmpty = isArrayObjectEmpty(inputsData, skipKey);
        if (isEmpty) {
            setIsSubmitting(true);
        } else {
            try {
                const payload = inputsData.map((item) => {
                    return {
                        id: item.id,
                        value: item[`question_${item.id}`],
                    };
                });

                const res = await saleAnalysisQuestionSave(payload);

                if (res?.data?.status === "success") {
                    toast.success("Successfully saved");
                    // check if point is less than 0 then show modal else reload page
                    if (res?.data?.data?.points < 0) {
                        setIsSubmitting(false);
                        window.location.reload();
                    } else {
                        window.location.href = res?.data?.redirectUrl;
                    }
                } else {
                    toast.error(res.error?.data?.message);
                    setIsSubmitting(false);
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        }
    };

    // handle redirect url
    const handleSaveQuestionAnswer = async () => {
        window.location.href = redirect;
    };

    // handle question focus
    const handleQuestionFocus = (question) => {
        // check if question already exists
        setFocusedQuestion((prev) => {
            if (prev.some((item) => item.id === question.id)) {
                return prev;
            }
            return [...prev, question];
        });

        const isChild = question.parent_id !== null;
        // check if question already exists
        const alreadyExists = inputsData.some(
            (item) => item.id === question.id
        );

        // check if question is child and already exists
        if (isChild && alreadyExists) {
            const hasChildQuestions = question.questions?.length;
            if (hasChildQuestions) {
                // get all child questions
                const childQuestions = allQuestions.filter(
                    (item) => item.parent_id === question.id
                );
                // get existing child questions
                const existingChildQuestions = inputsData.filter(
                    (item) => item.parent_id === question.id
                );
                // get new child questions
                const newChildQuestions = childQuestions.filter(
                    (item) =>
                        !existingChildQuestions.some(
                            (child) => child.id === item.id
                        )
                );
                // add new child questions
                if (!existingChildQuestions.length) {
                    // add new child questions
                    const newInputs = newChildQuestions.map((item) => ({
                        id: item.id,
                        questions: item.questions,
                        type: item.type,
                        is_Active_YesNo: false,
                        parent_id: item.parent_id,
                        [`question_${item.id}`]: "",
                    }));
                    setInputsData((prev) => [...prev, ...newInputs]);
                }
            }
        }
    };

    // get its focused inputs
    const getItsFocused = (question) => {
        const isExit = focusedQuestion?.find((item) => item.id === question.id);
        return !_.isEmpty(isExit);
    };

    // get yes no question value
    const getYesNoQuestionValue = (question) => {
        const getYesNoValue = inputsData?.find(
            (item) => item.id === question.id
        );
        return getYesNoValue[`question_${question.id}`] ? true : false;
    };

    const handleListYesNoQuestion = (question, value, type) => {
        const getQuestionValue = () => {
            if (type === "list") {
                return value.id;
            }
            return value;
        };
        const removeAlreadyExistChild = inputsData.filter(
            (item) => item.parent_id !== question.id
        );
        const idSet = new Set(inputsData.map((item) => item.id));
        const removeChildIfParentNotExists = removeAlreadyExistChild.filter(
            (item) => {
                // If item has no parent_id, include it
                if (!item.parent_id) {
                    return true;
                }
                return idSet.has(item.parent_id);
            }
        );

        const addSelectValue = removeChildIfParentNotExists.map((item) => {
            if (item.id === question.id) {
                let is_Active_YesNo;

                if (type === "list") {
                    is_Active_YesNo = value.questions?.length;
                } else {
                    is_Active_YesNo = question.questions?.length;
                }

                return {
                    ...item,
                    is_Active_YesNo,
                    [`question_${question.id}`]: getQuestionValue(),
                };
            }
            return item;
        });

        if (question.questions?.length) {
            const getChildWithSelectedValue = allQuestions.filter(
                (item) =>
                    item.parent_id === question.id &&
                    item.value === getQuestionValue()
            );
            const addInputFiled = getChildWithSelectedValue.map((item) => ({
                id: item?.id,
                questions: item?.questions,
                type: item.type,
                parent_id: item.parent_id,
                is_Active_YesNo: false,
                [`question_${item?.id}`]: "",
            }));

            return setInputsData([...addSelectValue, ...addInputFiled]);
        }

        return setInputsData(addSelectValue);
    };

    return (
        <section>
            <SalesRiskAnalysisQuestionContainer>
                <SalesRiskAnalysisQuestionTitleContainer>
                    <h5>Sales Risk Analysis</h5>
                </SalesRiskAnalysisQuestionTitleContainer>
                <>
                    <div>
                        {isLoading ? (
                            <SaleRiskAnalysisQuestionsLoader />
                        ) : (
                            <SaleRiskQuestionsInputContainer
                                isChild={false}
                                questions={questionList}
                                currencyData={currencyData}
                                inputsData={inputsData}
                                allQuestions={allQuestions}
                                isSubmitting={isSubmitting}
                                focusedQuestion={focusedQuestion}
                                inputContainerActions={{
                                    getItsFocused,
                                    handleQuestionFocus,
                                    setInputsData,
                                    handleListYesNoQuestion,
                                    getYesNoQuestionValue,
                                }}
                            />
                        )}
                    </div>
                    <QuestionConfirmModal
                        open={questionModalOpen}
                        closeModal={() => {
                            setQuestionModalOpen(false);
                        }}
                        handleSaveQuestionAnswer={handleSaveQuestionAnswer}
                        isLoading={isSaving}
                    />
                    <CustomCheckbox
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                    />
                    <Flex justifyContent="center" className="my-3">
                        <button
                            onClick={() => {
                                handleSubmit();
                            }}
                            className="btn btn-primary d-flex align-items-center justify-content-center"
                            disabled={
                                // Here we are checking if the checkbox is not checked, or if the data is saving, or if the data is submitting, or if the data is success
                                !isChecked ||
                                isSaving ||
                                isSuccess
                            }
                            style={{
                                width: "250px",
                            }}
                        >
                            <Switch>
                                <Switch.Case condition={!isChecked}>
                                    <Tooltip text="Please confirm the above statement">
                                        Submit
                                    </Tooltip>
                                </Switch.Case>
                                <Switch.Case condition={isChecked}>
                                    {isSaving ? "Saving..." : "Submit"}
                                </Switch.Case>
                            </Switch>
                        </button>
                    </Flex>
                </>
            </SalesRiskAnalysisQuestionContainer>
        </section>
    );
};

export default SalesRiskQuestionsResponse;
