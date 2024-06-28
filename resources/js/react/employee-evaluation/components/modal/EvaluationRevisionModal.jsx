import React, { useEffect } from "react";
import RevisionModalBody from "./RevisionModalBody";
import {
    useGetAllRevisionListByRoundNumberQuery,
    useGetAllRevisionListQuery,
} from "../../../services/api/EvaluationApiSlice";
import { EvaluationRevisionTableColumnsWithTasks } from "../Table/EvaluationRevisionTableColumnsWithTasks";
const EvaluationRevisionModal = ({ data }) => {
    const [isEvaluationRevisionModal, setIsEvaluationRevisionModal] =
        React.useState(false);
    // make query string

    const [round, setRound] = React.useState(1);
    const [userId, setUserId] = React.useState(data?.user_id);

    useEffect(() => {
        const managementDecision = data?.managements_decision;
        const roundNumber = data?.round_requied;
        //roundNumber 0 means first round , 1 means second round

        if (managementDecision === "One more week" && !roundNumber) {
            //this is for previous round table data
            setRound(1);
        } else if (
            (managementDecision === null ||
                managementDecision === "Accepted" ||
                managementDecision === "Rejected") &&
            roundNumber === 0
        ) {
            //this is for first round  main table data
            setRound(1);
        } else if (
            (managementDecision === null ||
                managementDecision === "Accepted" ||
                managementDecision === "Rejected") &&
            roundNumber === 1
        ) {
            //this is for 2nd round main table data

            setRound(2);
        }
        setUserId(data?.user_id);
    }, [data]);

    const { data: revisionData, isLoading } =
        useGetAllRevisionListByRoundNumberQuery({
            user_id: userId,
            round: round,
        });

    const Revisions = revisionData?.revisions;

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

export default EvaluationRevisionModal;
