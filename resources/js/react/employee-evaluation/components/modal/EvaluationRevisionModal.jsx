import React from "react";

import RevisionModalBody from "./RevisionModalBody";
import { useGetAllRevisionListQuery } from "../../../services/api/EvaluationApiSlice";
import { EvaluationRevisionTableColumnsWithTasks } from "../Table/EvaluationRevisionTableColumnsWithTasks";

const EvaluationRevisionModal = ({ data }) => {
    const [isEvaluationRevisionModal, setIsEvaluationRevisionModal] =
        React.useState(false);
    const { data: revisionData, isLoading } = useGetAllRevisionListQuery(
        data?.task_id
    );

    const Revisions = revisionData?.data;
    return (
        <>
            <div
                onClick={() => setIsEvaluationRevisionModal(true)}
                className="link_color"
            >
                {data?.total_revision ?? "0"}
            </div>

            <RevisionModalBody
                revisions={Revisions}
                columns={EvaluationRevisionTableColumnsWithTasks}
                isLoading={isLoading}
                isEvaluationRevisionModal={isEvaluationRevisionModal}
                setIsEvaluationRevisionModal={setIsEvaluationRevisionModal}
            />
        </>
    );
};

export default EvaluationRevisionModal;
