import React from "react";
import CustomInputs from "./ui/CustomInputs/CustomInputs";
import CustomAccordion from "./ui/CustomAccordion/CustomAccordion";
import CustomCheckbox from "./ui/CustomCheckbox/CustomCheckbox";
import CustomButtons from "./ui/CustomButtons/CustomButtons";
import Switch from "./Switch";

const SaleRiskQuestionsInputContainer = ({ questions }) => {
    return (
        <React.Fragment>
            {questions.map((question, index) => {
                return (
                    <Switch key={question.id}>
                        <Switch.Case condition={question.type === "text"}>
                            <CustomInputs
                                type={"text"}
                                placeholder={"Please Enter Text Here"}
                                label={`${index + 1}. ${question.question}`}
                            />
                        </Switch.Case>
                        <Switch.Case condition={question.type === "yesNo"}>
                            <CustomButtons
                                label={`${index + 1}. ${question.question}`}
                            />
                        </Switch.Case>
                        <Switch.Case condition={question.type === "numeric"}>
                            <CustomInputs
                                type={"numeric"}
                                placeholder={"Please Enter Number"}
                                label={`${index + 1}. ${question.question}`}
                            />
                        </Switch.Case>
                        <Switch.Case condition={question.type === "list"}>
                            <CustomAccordion
                                label={`${index + 1}. ${question.question}`}
                                accordionData={question.value}
                            />
                        </Switch.Case>
                        <Switch.Case condition={question.type === "longText"}>
                            <CustomInputs
                                type={"longText"}
                                placeholder={"Please Enter Text Here"}
                                label={`${index + 1}. ${question.question}`}
                            />
                        </Switch.Case>
                    </Switch>
                );
            })}
        </React.Fragment>
    );
};

export default SaleRiskQuestionsInputContainer;
