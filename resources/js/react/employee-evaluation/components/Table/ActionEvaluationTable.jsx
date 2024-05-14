import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Button from "../Button";
import EvaluationModal from "../modal/EvaluationModal";
import Switch from "../../../global/Switch";
import { Tooltip } from "react-tooltip";

import useEmployeeEvaluation from "../../../zustand/store";

const ActionEvaluationTable = ({ data, table }) => {
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
    const [buttonVariant, setButtonVariant] = React.useState("");
    const handleEvaluationClick = () => {
        setIsEvaluationModal((prev) => !prev);
        setEvaluationObject(data);
    };
    React.useEffect(() => {
        if (data?.lead_dev_avg_rating === null) {
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
        if (data?.lead_dev_avg_rating === null) {
            setToolTipAdmin(
                `Currently being evaluated by ${data?.added_by_name}`
            );
        }
    }, [data]);

    React.useEffect(() => {
        if (data?.lead_dev_avg_rating !== null) {
            setButtonVariant("success");
        } else if (data?.lead_dev_avg_rating === null) {
            setButtonVariant("primary");
        }
    }, [data]);
    React.useEffect(() => {
        if (data?.lead_dev_avg_rating !== null) {
            setButtonVariant("success");
        } else if (data?.lead_dev_avg_rating === null) {
            setButtonVariant("primary");
        }
    }, [data]);

    return (
        <React.Fragment>
            <div className="mt-2 mb-2">
                <Switch>
                    {/* //lead developer button */}
                    <Switch.Case condition={auth.isHasRolePermission(6)}>
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
                                    {data?.lead_dev_avg_rating !== null
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

                    {/* Team Lead Button */}
                    <Switch.Case condition={auth.isHasRolePermission(8)}>
                        <Switch>
                            <Switch.Case
                                condition={data?.managements_decision === null}
                            >
                                <Button
                                    onClick={handleEvaluationClick}
                                    disabled={
                                        data?.lead_dev_avg_rating === null
                                    }
                                    dataTip={toolTipTeamLead}
                                    toolTipId="my-tooltip"
                                    dataTooltipHidden={
                                        data?.lead_dev_avg_rating !== null
                                    }
                                >
                                    {data?.ld_submission_status === 0
                                        ? "Evaluating"
                                        : data?.team_lead_status === 0
                                        ? "Review"
                                        : "Reviewed"}
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
                                        data?.lead_dev_avg_rating !== null &&
                                        data?.team_lead_cmnt !== null
                                    }
                                    onClick={handleEvaluationClick}
                                    disabled={
                                        data?.lead_dev_avg_rating === null ||
                                        data?.team_lead_cmnt === null
                                    }
                                >
                                    <Switch>
                                        <Switch.Case
                                            condition={
                                                data?.lead_dev_avg_rating ===
                                                null
                                            }
                                        >
                                            Evaluating
                                        </Switch.Case>
                                        <Switch.Case
                                            condition={
                                                data?.lead_dev_avg_rating !==
                                                    null &&
                                                data?.team_lead_cmnt === null
                                            }
                                        >
                                            Reviewing
                                        </Switch.Case>
                                        <Switch.Case
                                            condition={
                                                data?.ld_submission_status ===
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

            <EvaluationModal
                singleEvaluation={data}
                setIsEvaluationModal={setIsEvaluationModal}
                isEvaluationModal={isEvaluationModal}
            />

            <Tooltip id="my-tooltip" style={{ zIndex: 99999999999999 }} />
        </React.Fragment>
    );
};

export default ActionEvaluationTable;
