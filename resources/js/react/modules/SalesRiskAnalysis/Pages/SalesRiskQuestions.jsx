import React from "react";
import { useParams } from "react-router-dom";

// Ui components
import {
    SalesRiskAnalysisQuestionContainer,
    SalesRiskAnalysisQuestionTitleContainer,
    SalesRiskAnalysisQuestionWrapper,
} from "../components/ui/Styles/ui";
import CustomCheckbox from "../components/ui/CustomCheckbox/CustomCheckbox";
import QuestionConfirmModal from "../components/modal/QuestionConfirmModal";
import { Flex } from "../../../global/styled-component/Flex";
import SaleRiskQuestionsInputContainer from "../components/SaleRiskQuestionsInputContainer";

// Dummy data
import { DummyQuestions } from "../constant";

const SalesRiskQuestions = () => {
    // modal open close state
    const [questionModalOpen, setQuestionModalOpen] = React.useState(false);
    const params = useParams();
    console.log(params);
    return (
        <SalesRiskAnalysisQuestionWrapper>
            <SalesRiskAnalysisQuestionContainer>
                <SalesRiskAnalysisQuestionTitleContainer>
                    <h5>Sale Risk Analysis</h5>
                </SalesRiskAnalysisQuestionTitleContainer>
                <div>
                    <SaleRiskQuestionsInputContainer 
                        questions={DummyQuestions}
                    />
                </div>
                <QuestionConfirmModal
                    open={questionModalOpen}
                    closeModal={() => {
                        setQuestionModalOpen(false);
                    }}
                />
                <CustomCheckbox/>
                <Flex justifyContent="center" className="my-3">
                    <button
                        onClick={() => {
                            setQuestionModalOpen(true);
                        }}
                        className="btn btn-primary"
                        style={{
                            width: "250px",
                        }}
                    >
                        Submit
                    </button>
                </Flex>
            </SalesRiskAnalysisQuestionContainer>
        </SalesRiskAnalysisQuestionWrapper>
    );
};

export default SalesRiskQuestions;
