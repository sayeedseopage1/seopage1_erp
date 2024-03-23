import React from "react";
import { useParams } from "react-router-dom";

// Ui components
import {
    SalesRiskAnalysisQuestionContainer,
    SalesRiskAnalysisQuestionWrapper,
} from "../components/ui/Styles/ui";
import CustomInputs from "../components/ui/CustomInputs/CustomInputs";
import CustomButtons from "../components/ui/CustomButtons/CustomButtons";
import CustomAccordion from "../components/ui/CustomAccordion/CustomAccordion";
import CustomCheckbox from "../components/ui/CustomCheckbox/CustomCheckbox";
import QuestionConfirmModal from "../components/modal/QuestionConfirmModal";

const SalesRiskQuestions = () => {
    // modal open close state
    const [questionModalOpen, setQuestionModalOpen] = React.useState(false);
    const params = useParams();
    console.log(params);
    return (
        <SalesRiskAnalysisQuestionWrapper>
            <SalesRiskAnalysisQuestionContainer>
                <CustomInputs
                    type={"text"}
                    placeholder={"Please Enter Text Here"}
                    label="Create New Page"
                />
                <CustomInputs
                    type={"longText"}
                    placeholder={"Please Enter Text Here"}
                    label="What does he/she expect exactly?"
                />
                <CustomInputs
                    type={"numeric"}
                    placeholder={"Please Enter Number"}
                    label="Create New Page"
                />
                <CustomButtons label="Did the client fund full milestone?" />
                <CustomAccordion>
                    <div>Close</div>
                    <div>Close</div>
                </CustomAccordion>
                <CustomCheckbox />
                <QuestionConfirmModal
                    open={questionModalOpen}
                    closeModal={() => {
                        setQuestionModalOpen(false);
                    }}

                />
                <button
                    onClick={() => {
                        setQuestionModalOpen(true);
                    }}
                >
                    Submit
                </button>
            </SalesRiskAnalysisQuestionContainer>
        </SalesRiskAnalysisQuestionWrapper>
    );
};

export default SalesRiskQuestions;
