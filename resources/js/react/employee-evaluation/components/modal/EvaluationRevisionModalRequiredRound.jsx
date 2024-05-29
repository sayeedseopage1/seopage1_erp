import React from "react";

import RevisionModalBody from "./RevisionModalBody";
import { useGetAllRevisionListQuery } from "../../../services/api/EvaluationApiSlice";
import { EvaluationRevisionTableColumnsWithTasks } from "../Table/EvaluationRevisionTableColumnsWithTasks";

const EvaluationRevisionModalRequiredRound = ({ data }) => {
    const [isEvaluationRevisionModal, setIsEvaluationRevisionModal] =
        React.useState(false);
    const { data: revisionData, isLoading } = useGetAllRevisionListQuery(
        data?.parent_task_id
    );

    const Revisions = revisionData?.data;
    // console.log("revisions", Revisions);
    return (
        <>
            <div
                onClick={() => setIsEvaluationRevisionModal(true)}
                className="link_color"
            >
                {Revisions?.length ?? "0"}
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

export default EvaluationRevisionModalRequiredRound;
