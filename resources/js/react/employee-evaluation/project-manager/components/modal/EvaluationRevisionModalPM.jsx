import React, { useEffect } from "react";

import { EvaluationRevisionTableColumnsWithTasks } from "../../../components/Table/EvaluationRevisionTableColumnsWithTasks";
import RevisionModalBody from "../../../components/modal/RevisionModalBody";
import { useGetAllRevisionListByRoundNumberQuery } from "../../../../services/api/EvaluationApiSlice";

const EvaluationRevisionModalPM = ({ data }) => {
    const [isEvaluationRevisionModal, setIsEvaluationRevisionModal] =
        React.useState(false);

    const [round, setRound] = React.useState(1);

    useEffect(() => {
        const managementDecision = data?.managements_decision;
        const roundNumber = data?.round_requied;
        if (managementDecision === "One more week" && !roundNumber) {
            setRound(1);
        } else if (
            (managementDecision === null ||
                managementDecision === "Accepted" ||
                managementDecision === "Rejected") &&
            roundNumber === 0
        ) {
            setRound(1);
        } else if (
            (managementDecision === null ||
                managementDecision === "Accepted" ||
                managementDecision === "Rejected") &&
            roundNumber === 1
        ) {
            setRound(2);
        }
    }, [data]);

    console.log("round number", round);
    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };
    const { data: revisionData, isLoading } =
        useGetAllRevisionListByRoundNumberQuery(
            queryString({
                user_id: data?.user_id,
                round: round,
            })
        );

    const Revisions = revisionData?.data;
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

export default EvaluationRevisionModalPM;
