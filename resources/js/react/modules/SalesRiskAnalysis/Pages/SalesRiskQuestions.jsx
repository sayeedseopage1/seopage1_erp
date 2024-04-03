import React from "react";
import { useParams } from "react-router-dom";
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
    useSaleAnalysisQuestionsListQuery,
    useSaleRiskQuestionAnswerSaveMutation,
} from "../../../services/api/salesRiskAnalysisSlice";

// icon
import InfoIcon from "../components/ui/InfoIcon";

const SalesRiskQuestions = () => {
    const [focusedQuestion, setFocusedQuestion] = React.useState([]);
    const [inputsData, setInputsData] = React.useState([]);
    const [allQuestions, setAllQuestions] = React.useState([]);
    const [isChecked, setIsChecked] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [redirectUrl, setRedirectUrl] = React.useState("");

    // modal open close state
    const [questionModalOpen, setQuestionModalOpen] = React.useState(false);

    // fetch policy questions
    const { data, isLoading } = useSaleAnalysisQuestionsListQuery(null);

    const [
        saleAnalysisQuestionSave,
        { isLoading: isSaving },
    ] = useSaleRiskQuestionAnswerSaveMutation();

    const questions = data?.data;

    React.useEffect(() => {
        const flattenArray = (arr) =>
            arr?.flatMap((item) => {
                const nestedQuestions = item?.questions || [];
                return [item, ...flattenArray(nestedQuestions)];
            });
        if (questions?.length > 0) {
            const copyArray = [...questions];
            const flattenedArray = flattenArray(copyArray);
            setAllQuestions(flattenedArray);
            const addInputFiled = flattenedArray
                .filter((item) => item.parent_id === null)
                .map((item) => {
                    return {
                        id: item?.id,
                        questions: item?.questions,
                        type: item.type,
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
    }, [questions]);

    const handleSubmit = async () => {
        const isEmpty = isArrayObjectEmpty(inputsData, "parent_id");
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
                console.log(payload);

                const res = await saleAnalysisQuestionSave(payload);
                if (res?.data?.status === "success") {
                    toast.success("Successfully saved");
                    if (res?.data?.data.point < 0) {
                        setQuestionModalOpen(true);
                        setIsSubmitting(false);
                        setRedirectUrl(res?.data?.redirect_url);
                    } else {
                        console.log(res?.data);
                        debugger;
                        window.location.href = res?.data?.redirect_url;
                    }
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        }
    };

    const handleSaveQuestionAnswer = async () => {
        window.location.href = redirect;
    };

    const handleQuestionFocus = (question) => {
        setFocusedQuestion((prev) => {
            if (prev.some((item) => item.id === question.id)) {
                return prev;
            }
            return [...prev, question];
        });

        const isChild = question.parent_id !== null;
        const alreadyExists = inputsData.some(
            (item) => item.id === question.id
        );

        if (isChild && alreadyExists) {
            const hasChildQuestions = question.questions?.length;
            if (hasChildQuestions) {
                const childQuestions = allQuestions.filter(
                    (item) => item.parent_id === question.id
                );
                const existingChildQuestions = inputsData.filter(
                    (item) => item.parent_id === question.id
                );
                const newChildQuestions = childQuestions.filter(
                    (item) =>
                        !existingChildQuestions.some(
                            (child) => child.id === item.id
                        )
                );

                if (!existingChildQuestions.length) {
                    const newInputs = newChildQuestions.map((item) => ({
                        id: item.id,
                        questions: item.questions,
                        type: item.type,
                        parent_id: item.parent_id,
                        [`question_${item.id}`]: "",
                    }));
                    setInputsData((prev) => [...prev, ...newInputs]);
                }
            }
        }
    };

    const getItsFocused = (question) => {
        const isExit = focusedQuestion?.find((item) => item.id === question.id);
        return !_.isEmpty(isExit);
    };

    const handleListYesNoQuestion = (question, value, type) => {
        const getValue = () => {
            if (type === "list") {
                return value.id;
            }
            return value;
        };

        const removeAlreadyExistChild = inputsData.filter(
            (item) => item.parent_id !== question.id
        );
        const addSelectValue = removeAlreadyExistChild.map((item) => ({
            ...item,
            [`question_${question.id}`]: getValue(),
        }));

        if (question.questions?.length) {
            const getChildWithSelectedValue = allQuestions.filter(
                (item) =>
                    item.parent_id === question.id && item.value === getValue()
            );
            const addInputFiled = getChildWithSelectedValue.map((item) => ({
                id: item?.id,
                questions: item?.questions,
                type: item.type,
                parent_id: item.parent_id,
                [`question_${item?.id}`]: "",
            }));

            return setInputsData([...addSelectValue, ...addInputFiled]);
        }

        return setInputsData(addSelectValue);
    };

    console.log(inputsData);

    return (
        <section>
            <SalesRiskAnalysisQuestionContainer>
                <SalesRiskAnalysisQuestionTitleContainer>
                    <h5>Sale Risk Analysis</h5>
                </SalesRiskAnalysisQuestionTitleContainer>
                {redirectUrl ? (
                    <div
                        className="d-flex align-items-center justify-content-center flex-column py-4 px-3 px-md-5"
                        style={{
                            height: "calc(100vh - 190px)",
                        }}
                    >
                        <InfoIcon />
                        <p
                            className="text-center py-4"
                            style={{
                                textAlign: "center",
                                fontFamily: "Poppins",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "normal",
                            }}
                        >
                            This won deal has a negative risk analysis score
                            hence it has to be authorized by the top management.
                            You can still submit the larger form and it will be
                            assigned to a project manager right after it will be
                            authorized.
                        </p>
                        <button
                            className="btn btn-primary"
                            style={{
                                width: "250px",
                            }}
                            onClick={handleSaveQuestionAnswer}
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Continue"}
                        </button>
                    </div>
                ) : (
                    <>
                        <div>
                            {isLoading ? (
                                <SaleRiskAnalysisQuestionsLoader />
                            ) : (
                                <SaleRiskQuestionsInputContainer
                                    isChild={false}
                                    questions={questions}
                                    inputsData={inputsData}
                                    allQuestions={allQuestions}
                                    isSubmitting={isSubmitting}
                                    focusedQuestion={focusedQuestion}
                                    inputContainerActions={{
                                        getItsFocused,
                                        handleQuestionFocus,
                                        setInputsData,
                                        handleListYesNoQuestion,
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
                                disabled={!isChecked}
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
                )}
            </SalesRiskAnalysisQuestionContainer>
        </section>
    );
};

export default SalesRiskQuestions;
