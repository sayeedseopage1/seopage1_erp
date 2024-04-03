import _ from "lodash";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
}) => {
    const {
        setInputsData,
        handleQuestionFocus,
        getItsFocused,
        handleListYesNoQuestion,
    } = inputContainerActions;

    const [yesNoValue, setYesNoValue] = useState(null);
    const [listItem, setListItem] = useState(null);

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
                                    label={`${isChild ? "" : `${index + 1}. `}${
                                        question?.title
                                    }`}
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
                                        question.questions?.length
                                    }
                                >
                                    <SaleRiskQuestionsInputContainer
                                        questions={question.questions}
                                        isChild={true}
                                        inputsData={inputsData}
                                        isSubmitting={isSubmitting}
                                        allQuestions={allQuestions}
                                        focusedQuestion={focusedQuestion}
                                        inputContainerActions={{
                                            getItsFocused,
                                            handleQuestionFocus,
                                            setInputsData,
                                            handleListYesNoQuestion,
                                        }}
                                    />
                                </Switch.Case>
                            </Switch.Case>
                            <Switch.Case condition={question.type === "yesNo"}>
                                <CustomButtons
                                    label={`${isChild ? "" : `${index + 1}. `}${
                                        question.title
                                    }`}
                                    isChild={isChild}
                                    comment={question.comment}
                                    onChange={(value) => {
                                        setYesNoValue(value);
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
                                        yesNoValue && question.questions?.length
                                    }
                                >
                                    <SaleRiskQuestionsInputContainer
                                        questions={question?.questions?.filter(
                                            (item) => item?.value === yesNoValue
                                        )}
                                        inputsData={inputsData}
                                        isChild={true}
                                        isSubmitting={isSubmitting}
                                        allQuestions={allQuestions}
                                        focusedQuestion={focusedQuestion}
                                        inputContainerActions={{
                                            getItsFocused,
                                            handleQuestionFocus,
                                            setInputsData,
                                            handleListYesNoQuestion,
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
                                    label={`${isChild ? "" : `${index + 1}. `}${
                                        question.title
                                    }`}
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
                                        question.questions?.length
                                    }
                                >
                                    <SaleRiskQuestionsInputContainer
                                        questions={question.questions}
                                        isChild={true}
                                        inputsData={inputsData}
                                        isSubmitting={isSubmitting}
                                        allQuestions={allQuestions}
                                        focusedQuestion={focusedQuestion}
                                        inputContainerActions={{
                                            getItsFocused,
                                            handleQuestionFocus,
                                            setInputsData,
                                            handleListYesNoQuestion,
                                        }}
                                    />
                                </Switch.Case>
                            </Switch.Case>

                            <Switch.Case condition={question.type === "list"}>
                                <CustomAccordion
                                    label={`${isChild ? "" : `${index + 1}. `}${
                                        question.title
                                    }`}
                                    comment={question.comment}
                                    isChild={isChild}
                                    accordionData={question.value}
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
                                        question.questions?.length
                                    }
                                >
                                    <SaleRiskQuestionsInputContainer
                                        questions={question?.questions?.filter(
                                            (item) =>
                                                item?.value === listItem?.id
                                        )}
                                        isChild={true}
                                        inputsData={inputsData}
                                        isSubmitting={isSubmitting}
                                        allQuestions={allQuestions}
                                        focusedQuestion={focusedQuestion}
                                        inputContainerActions={{
                                            getItsFocused,
                                            handleQuestionFocus,
                                            setInputsData,
                                            handleListYesNoQuestion,
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
                                    label={`${isChild ? "" : `${index + 1}. `}${
                                        question.title
                                    }`}
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
                                        question.questions?.length
                                    }
                                >
                                    <SaleRiskQuestionsInputContainer
                                        questions={question.questions}
                                        isChild={true}
                                        inputsData={inputsData}
                                        isSubmitting={isSubmitting}
                                        allQuestions={allQuestions}
                                        focusedQuestion={focusedQuestion}
                                        inputContainerActions={{
                                            getItsFocused,
                                            handleQuestionFocus,
                                            setInputsData,
                                            handleListYesNoQuestion,
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
    focusedQuestion: PropTypes.object,
    inputContainerActions: PropTypes.object,
}