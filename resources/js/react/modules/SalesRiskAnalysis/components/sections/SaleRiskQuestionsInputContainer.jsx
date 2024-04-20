import _ from "lodash";
import React, { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// Ui components
import Switch from "../Switch";
import CustomInputs from "../ui/CustomInputs/CustomInputs";
import CustomButtons from "../ui/CustomButtons/CustomButtons";
import CustomAccordion from "../ui/CustomAccordion/CustomAccordion";

const SaleRiskQuestionsInputContainer = ({
    questions,
    isChild = false,
    inputsData,
    isSubmitting,
    allQuestions,
    focusedQuestion,
    inputContainerActions,
    currencyData,
}) => {
    const {
        setInputsData,
        handleQuestionFocus,
        getItsFocused,
        handleListYesNoQuestion,
        getYesNoQuestionValue,
    } = inputContainerActions;

    const [listItem, setListItem] = useState(null);

    // Get input value from inputsData array by question id and return it or empty string
    const getInputValue = (questionId) => {
        if (inputsData?.length) {
            const data = inputsData?.find((item) => item.id === questionId);
            if (!_.isEmpty(data)) {
                return data[`question_${questionId}`];
            } else {
                return "";
            }
        } else {
            return "";
        }
    };
    // Check if question is active and return boolean value
    const handleActiveData = (question) => {
        const getQuestion = inputsData?.find((item) => item.id === question.id);
        if (!_.isEmpty(getQuestion)) {
            return getQuestion.is_Active_YesNo ? true : false;
        }
    };

    // Check if question is active and return boolean value
    const getBooleanValue = (question) => {
        return question?.questions?.length ? true : false;
    };

    // Add number on title if question is not child
    const addNumberOnTitle = (index, title, isChild) => {
        if (isChild) {
            return title;
        }
        return `${index + 1}. ${title}`;
    };

    console.log(currencyData);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <React.Fragment>
                {questions?.map((question, index) => {
                    return (
                        <Switch key={question?.id}>
                            <Switch.Case condition={question.type === "text"}>
                                <CustomInputs
                                    type={"text"}
                                    isChild={isChild}
                                    placeholder={question?.placeholder}
                                    label={addNumberOnTitle(
                                        index,
                                        question?.title,
                                        isChild
                                    )}
                                    isCurrencyHave={{
                                        status: question?.currency,
                                        currency: currencyData,
                                    }}
                                    isSubmitting={isSubmitting}
                                    value={getInputValue(question.id)}
                                    onChange={(e) => {
                                        setInputsData((prev) => {
                                            return prev?.map((item) => {
                                                if (item.id === question.id) {
                                                    return {
                                                        ...item,
                                                        [`question_${question.id}`]:
                                                            e?.target?.value,
                                                    };
                                                }
                                                return item;
                                            });
                                        });
                                    }}
                                    comment={question.comment}
                                    onFocus={() => {
                                        handleQuestionFocus(question);
                                    }}
                                />
                                <Switch.Case
                                    condition={
                                        getItsFocused(question) &&
                                        getBooleanValue(question)
                                    }
                                >
                                    <SaleRiskQuestionsInputContainer
                                        questions={question.questions}
                                        isChild={true}
                                        inputsData={inputsData}
                                        isSubmitting={isSubmitting}
                                        allQuestions={allQuestions}
                                        focusedQuestion={focusedQuestion}
                                        currencyData={currencyData}
                                        inputContainerActions={{
                                            getItsFocused,
                                            handleQuestionFocus,
                                            setInputsData,
                                            handleListYesNoQuestion,
                                            getYesNoQuestionValue,
                                        }}
                                    />
                                </Switch.Case>
                            </Switch.Case>
                            <Switch.Case condition={question.type === "yesNo"}>
                                <CustomButtons
                                    label={addNumberOnTitle(
                                        index,
                                        question?.title,
                                        isChild
                                    )}
                                    isCurrencyHave={{
                                        status: question?.currency,
                                        currency: currencyData,
                                    }}
                                    isChild={isChild}
                                    comment={question.comment}
                                    onChange={(value) => {
                                        handleListYesNoQuestion(
                                            question,
                                            value,
                                            "yesNo"
                                        );
                                    }}
                                    isSubmitting={isSubmitting}
                                    value={getInputValue(question.id)}
                                />
                                <Switch.Case
                                    condition={
                                        getBooleanValue(question) &&
                                        handleActiveData(question)
                                    }
                                >
                                    <SaleRiskQuestionsInputContainer
                                        questions={question?.questions?.filter(
                                            (item) =>
                                                item?.value ===
                                                getInputValue(question.id)
                                        )}
                                        inputsData={inputsData}
                                        isChild={true}
                                        isSubmitting={isSubmitting}
                                        allQuestions={allQuestions}
                                        focusedQuestion={focusedQuestion}
                                        currencyData={currencyData}
                                        inputContainerActions={{
                                            getItsFocused,
                                            handleQuestionFocus,
                                            setInputsData,
                                            handleListYesNoQuestion,
                                            getYesNoQuestionValue,
                                        }}
                                    />
                                </Switch.Case>
                            </Switch.Case>
                            <Switch.Case
                                condition={question?.type === "numeric"}
                            >
                                <CustomInputs
                                    type={"numeric"}
                                    isChild={isChild}
                                    comment={question.comment}
                                    isSubmitting={isSubmitting}
                                    value={getInputValue(question.id)}
                                    placeholder={question?.placeholder}
                                    label={addNumberOnTitle(
                                        index,
                                        question?.title,
                                        isChild
                                    )}
                                    isCurrencyHave={{
                                        status: question?.currency,
                                        currency: currencyData,
                                    }}
                                    onFocus={() => {
                                        handleQuestionFocus(question);
                                    }}
                                    onChange={(e) => {
                                        setInputsData((prev) => {
                                            return prev?.map((item) => {
                                                if (item.id === question.id) {
                                                    return {
                                                        ...item,
                                                        [`question_${question.id}`]:
                                                            e?.target?.value,
                                                    };
                                                }
                                                return item;
                                            });
                                        });
                                    }}
                                />
                                <Switch.Case
                                    condition={
                                        getItsFocused(question) &&
                                        getBooleanValue(question)
                                    }
                                >
                                    <SaleRiskQuestionsInputContainer
                                        questions={question.questions}
                                        isChild={true}
                                        inputsData={inputsData}
                                        isSubmitting={isSubmitting}
                                        allQuestions={allQuestions}
                                        focusedQuestion={focusedQuestion}
                                        currencyData={currencyData}
                                        inputContainerActions={{
                                            getItsFocused,
                                            handleQuestionFocus,
                                            setInputsData,
                                            handleListYesNoQuestion,
                                            getYesNoQuestionValue,
                                        }}
                                    />
                                </Switch.Case>
                            </Switch.Case>
                            <Switch.Case condition={question.type === "list"}>
                                <CustomAccordion
                                    label={addNumberOnTitle(
                                        index,
                                        question?.title,
                                        isChild
                                    )}
                                    isCurrencyHave={{
                                        status: question?.currency,
                                        currency: currencyData,
                                    }}
                                    comment={question.comment}
                                    isChild={isChild}
                                    accordionData={
                                        question.type === "list"
                                            ? question.value
                                            : []
                                    }
                                    placeholder={question?.placeholder}
                                    onChange={(value) => {
                                        setListItem(value);
                                        handleListYesNoQuestion(
                                            question,
                                            value,
                                            "list"
                                        );
                                    }}
                                    isSubmitting={isSubmitting}
                                    value={getInputValue(question.id)}
                                />

                                <Switch.Case
                                    condition={
                                        !_.isEmpty(listItem) &&
                                        getBooleanValue(question)
                                    }
                                >
                                    <SaleRiskQuestionsInputContainer
                                        questions={question?.questions?.filter(
                                            (item) =>
                                                item?.value ===
                                                getInputValue(question.id)
                                        )}
                                        isChild={true}
                                        inputsData={inputsData}
                                        isSubmitting={isSubmitting}
                                        allQuestions={allQuestions}
                                        focusedQuestion={focusedQuestion}
                                        currencyData={currencyData}
                                        inputContainerActions={{
                                            getItsFocused,
                                            handleQuestionFocus,
                                            setInputsData,
                                            handleListYesNoQuestion,
                                            getYesNoQuestionValue,
                                        }}
                                    />
                                </Switch.Case>
                            </Switch.Case>
                            <Switch.Case
                                condition={question.type === "longText"}
                            >
                                <CustomInputs
                                    isChild={isChild}
                                    type={"longText"}
                                    comment={question.comment}
                                    isSubmitting={isSubmitting}
                                    value={getInputValue(question.id)}
                                    placeholder={question?.placeholder}
                                    label={addNumberOnTitle(
                                        index,
                                        question?.title,
                                        isChild
                                    )}
                                    isCurrencyHave={{
                                        status: question?.currency,
                                        currency: currencyData,
                                    }}
                                    onFocus={() => {
                                        handleQuestionFocus(question);
                                    }}
                                    onChange={(e) => {
                                        setInputsData((prev) => {
                                            return prev.map((item) => {
                                                if (item.id === question.id) {
                                                    return {
                                                        ...item,
                                                        [`question_${question.id}`]:
                                                            e?.target?.value,
                                                    };
                                                }
                                                return item;
                                            });
                                        });
                                    }}
                                />
                                <Switch.Case
                                    condition={
                                        getItsFocused(question) &&
                                        getBooleanValue(question)
                                    }
                                >
                                    <SaleRiskQuestionsInputContainer
                                        questions={question.questions}
                                        isChild={true}
                                        inputsData={inputsData}
                                        isSubmitting={isSubmitting}
                                        allQuestions={allQuestions}
                                        focusedQuestion={focusedQuestion}
                                        currencyData={currencyData}
                                        inputContainerActions={{
                                            getItsFocused,
                                            handleQuestionFocus,
                                            setInputsData,
                                            handleListYesNoQuestion,
                                            getYesNoQuestionValue,
                                        }}
                                    />
                                </Switch.Case>
                            </Switch.Case>
                        </Switch>
                    );
                })}
            </React.Fragment>
        </motion.div>
    );
};

export default SaleRiskQuestionsInputContainer;

SaleRiskQuestionsInputContainer.propTypes = {
    questions: PropTypes.array,
    isChild: PropTypes.bool,
    inputsData: PropTypes.array,
    isSubmitting: PropTypes.bool,
    allQuestions: PropTypes.array,
    focusedQuestion: PropTypes.array,
    inputContainerActions: PropTypes.object,
    currencyData: PropTypes.array,
};
