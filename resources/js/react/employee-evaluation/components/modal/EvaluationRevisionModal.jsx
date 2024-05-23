import React from "react";
import ReactModal from "react-modal";
import RevisionModalBody from "./RevisionModalBody";
const EvaluationRevisionModal = ({ data }) => {
    const [isEvaluationRevisionModal, setIsEvaluationRevisionModal] =
        React.useState(false);
    return (
        <>
            <div
                onClick={() => setIsEvaluationRevisionModal(true)}
                className="link_color"
            >
                {data?.total_revision ?? "0"}
            </div>

            <RevisionModalBody
                taskId={data?.task_id}
                isEvaluationRevisionModal={isEvaluationRevisionModal}
                setIsEvaluationRevisionModal={setIsEvaluationRevisionModal}
            />
        </>
    );
};

export default EvaluationRevisionModal;
