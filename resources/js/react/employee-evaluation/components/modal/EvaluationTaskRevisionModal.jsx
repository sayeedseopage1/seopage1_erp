import React from "react";

import RevisionModalBody from "./RevisionModalBody";
import { useGetRevisionListQuery } from "../../../services/api/EvaluationApiSlice";
import { EvaluationRevisionTableColumns } from "../Table/EvaluationRevisionTableColumns";

const EvaluationTaskRevisionModal = ({ data }) => {
    const [isEvaluationRevisionModal, setIsEvaluationRevisionModal] =
        React.useState(false);
    const { data: revisionData, isLoading } = useGetRevisionListQuery(
        data?.task_id
    );

    const Revisions = revisionData?.data;
    return (
        <>
            <div
                onClick={() => setIsEvaluationRevisionModal(true)}
                className="link_color"
            >
                {data?.revision_number ?? "0"}
            </div>

            <RevisionModalBody
                columns={EvaluationRevisionTableColumns}
                revisions={Revisions}
                isLoading={isLoading}
                isEvaluationRevisionModal={isEvaluationRevisionModal}
                setIsEvaluationRevisionModal={setIsEvaluationRevisionModal}
            />
        </>
    );
};

export default EvaluationTaskRevisionModal;
