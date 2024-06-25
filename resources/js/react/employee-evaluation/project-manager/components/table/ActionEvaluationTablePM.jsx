import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { Tooltip } from "react-tooltip";

import useEmployeeEvaluation from "../../../../zustand/store";
import EvaluationTaskListModal from "../../../components/modal/EvaluationTaskListModal";
import Switch from "../../../../global/Switch";
import Button from "../../../components/Button";
import { useAuth } from "../../../../hooks/useAuth";
import EvaluationTaskListModalPM from "../modal/EvaluationTaskListModalPM";

const ActionEvaluationTablePM = ({ data, table }) => {
    const [isEvaluationModal, setIsEvaluationModal] = useState(false);
    const { setEvaluationObject } = useEmployeeEvaluation();
    const location = useLocation();
    const userIdFromParam = new URLSearchParams(location.search).get("user_id");

    React.useEffect(() => {
        // console.log("userIdFromParam:", userIdFromParam);
        // console.log("data.user_id:", data.user_id);
        if (userIdFromParam == data.user_id) {
            setIsEvaluationModal(true);
        }
    }, [userIdFromParam]);

    // console.log("is evaluation modal", isEvaluationModal);
    const auth = useAuth();
    const [toolTipTeamLead, setToolTipTeamLead] = React.useState("");
    const [toolTipAdmin, setToolTipAdmin] = React.useState("");
    const [buttonVariant, setButtonVariant] = React.useState("primary");
    const handleEvaluationClick = () => {
        setIsEvaluationModal((prev) => !prev);
        setEvaluationObject(data);
    };
    React.useEffect(() => {
        if (data?.team_lead_avg_rating === null) {
            setToolTipTeamLead(
                `Currently being evaluated by ${data?.added_by_name}`
            );
        }
    }, [data]);

    React.useEffect(() => {
        if (data?.team_lead_cmnt === null) {
            setToolTipAdmin(
                `Currently being Reviewed by Mohammad Sayeed Ullah`
            );
        }
        if (data?.team_lead_avg_rating === null) {
            setToolTipAdmin(
                `Currently being evaluated by ${data?.added_by_name}`
            );
        }
    }, [data]);

    React.useEffect(() => {
        if (data?.team_lead_avg_rating !== null) {
            setButtonVariant("success");
        } else if (data?.team_lead_avg_rating === null) {
            setButtonVariant("primary");
        }
    }, [data]);
    React.useEffect(() => {
        if (data?.team_lead_avg_rating !== null) {
            setButtonVariant("success");
        } else if (data?.team_lead_avg_rating === null) {
            setButtonVariant("primary");
        }
    }, [data]);

    return (
        <React.Fragment>
            <div className="mt-2 mb-2">
                <Switch>
                    {/* Team Lead Button */}
                    <Switch.Case condition={auth.isHasRolePermission(8)}>
                        <Switch>
                            <Switch.Case
                                condition={data?.managements_decision === null}
                            >
                                <Button
                                    onClick={() => {
                                        handleEvaluationClick();
                                        setEvaluationObject(data);
                                    }}
                                    variant={buttonVariant}
                                >
                                    {data?.team_lead_avg_rating !== null
                                        ? "Submitted"
                                        : "Evaluate"}
                                </Button>
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    data?.managements_decision === "Accepted"
                                }
                            >
                                <Button
                                    onClick={handleEvaluationClick}
                                    variant="success"
                                >
                                    Accepted
                                </Button>
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    data?.managements_decision === "Rejected"
                                }
                            >
                                <Button
                                    onClick={handleEvaluationClick}
                                    variant="danger"
                                >
                                    Rejected
                                </Button>
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    data?.managements_decision ===
                                    "One more week"
                                }
                            >
                                <Button
                                    onClick={handleEvaluationClick}
                                    variant="tertiary"
                                >
                                    Extended
                                </Button>
                            </Switch.Case>
                        </Switch>
                    </Switch.Case>

                    {/* Admin Button */}
                    <Switch.Case condition={auth.isHasRolePermission(1)}>
                        <Switch>
                            <Switch.Case
                                condition={data?.managements_decision === null}
                            >
                                <Button
                                    dataTip={toolTipAdmin}
                                    toolTipId="my-tooltip"
                                    dataTooltipHidden={
                                        data?.team_lead_avg_rating !== null
                                    }
                                    onClick={handleEvaluationClick}
                                    disabled={
                                        data?.team_lead_avg_rating === null
                                    }
                                >
                                    <Switch>
                                        <Switch.Case
                                            condition={
                                                data?.team_lead_avg_rating ===
                                                null
                                            }
                                        >
                                            Evaluating
                                        </Switch.Case>
                                        <Switch.Case
                                            condition={
                                                data?.team_lead_avg_rating !==
                                                null
                                            }
                                        >
                                            Reviewing
                                        </Switch.Case>
                                        <Switch.Case
                                            condition={
                                                data?.team_lead_submission_status ===
                                                    1 &&
                                                data?.team_lead_status === 1
                                            }
                                        >
                                            Authorize
                                        </Switch.Case>
                                    </Switch>
                                </Button>
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    data?.managements_decision === "Accepted"
                                }
                            >
                                <Button
                                    onClick={handleEvaluationClick}
                                    variant="success"
                                >
                                    Accepted
                                </Button>
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    data?.managements_decision === "Rejected"
                                }
                            >
                                <Button
                                    onClick={handleEvaluationClick}
                                    variant="danger"
                                >
                                    Rejected
                                </Button>
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    data?.managements_decision ===
                                    "One more week"
                                }
                            >
                                <Button
                                    onClick={handleEvaluationClick}
                                    variant="tertiary"
                                >
                                    Extended
                                </Button>
                            </Switch.Case>
                        </Switch>
                    </Switch.Case>
                </Switch>
            </div>

            <EvaluationTaskListModalPM
                singleEvaluation={data}
                setIsEvaluationModal={setIsEvaluationModal}
                isEvaluationModal={isEvaluationModal}
            />

            <Tooltip id="my-tooltip" style={{ zIndex: 99999999999999 }} />
        </React.Fragment>
    );
};

export default ActionEvaluationTablePM;
