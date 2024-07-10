import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../../components/Button";
import useEmployeeEvaluation from "../../../../zustand/store";
import EvaluationRequiredRoundsTaskListModal from "../../../components/modal/EvaluationRequiredRoundsTaskListModal";
import EvaluationRequiredRoundsTaskListModalPM from "../modal/EvaluationRequiredRoundsTaskListModalPm";

const ActionEvaluationRequiredRoundTablePM = ({ data, round }) => {
    const [isEvaluationModal, setIsEvaluationModal] = useState(false);
    const { setEvaluationObject } = useEmployeeEvaluation();
    const handleEvaluationClick = () => {
        setIsEvaluationModal((prev) => !prev);
        setEvaluationObject(data);
    };

    return (
        <React.Fragment>
            <div className="mt-2 mb-2">
                <Button onClick={handleEvaluationClick} variant="tertiary">
                    Extended
                </Button>
            </div>

            <EvaluationRequiredRoundsTaskListModalPM
                round={round}
                singleEvaluation={data}
                setIsEvaluationModal={setIsEvaluationModal}
                isEvaluationModal={isEvaluationModal}
            />
        </React.Fragment>
    );
};

export default ActionEvaluationRequiredRoundTablePM;
