import React, { useState } from "react";

import { useAuth } from "../../../hooks/useAuth";
import Button from "../../../global/Button";
import EvaluationModal from "../modal/EvaluationModal";

const ActionDropdownDataTable = ({ data, table }) => {
    const auth = useAuth();
    const [isEvaluationModal, setIsEvaluationModal] = React.useState(false);

    const handleEvaluationClick = () => {
        setIsEvaluationModal((prev) => !prev);
    };
    return (
        <React.Fragment>
            <div className="mt-2 mb-2">
                <Button onClick={handleEvaluationClick}>Evaluate</Button>
            </div>

            <EvaluationModal
                singleEvaluation={data}
                setIsEvaluationModal={setIsEvaluationModal}
                isEvaluationModal={isEvaluationModal}
            />
        </React.Fragment>
    );
};

export default ActionDropdownDataTable;
