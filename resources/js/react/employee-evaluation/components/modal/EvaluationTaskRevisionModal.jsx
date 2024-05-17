import React from "react";
import ReactModal from "react-modal";
import RevisionModalBody from "./RevisionModalBody";
const EvaluationTaskRevisionModal = ({ data }) => {
    const [isEvaluationRevisionModal, setIsEvaluationRevisionModal] =
        React.useState(false);
    return (
        <>
            <div
                onClick={() => setIsEvaluationRevisionModal(true)}
                className="link_color"
            >
                {data?.revision_number ?? "0"}
            </div>

            <RevisionModalBody
                data={data}
                isEvaluationRevisionModal={isEvaluationRevisionModal}
                setIsEvaluationRevisionModal={setIsEvaluationRevisionModal}
            />
        </>
    );
};

export default EvaluationTaskRevisionModal;
