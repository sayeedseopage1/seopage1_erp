import React, { useState } from "react";

import { useAuth } from "../../../hooks/useAuth";
import Button from "../Button";
import EvaluationModal from "../modal/EvaluationModal";
import Switch from "../../../global/Switch";
import { Tooltip } from "react-tooltip";
const ActionDropdownDataTable = ({ data, table }) => {
    const auth = useAuth();
    const [isEvaluationModal, setIsEvaluationModal] = React.useState(false);
    const [toolTipTeamLead, setToolTipTeamLead] = React.useState("");
    const [toolTipAdmin, setToolTipAdmin] = React.useState("");
    const [buttonVariant, setButtonVariant] = React.useState("");
    const handleEvaluationClick = () => {
        setIsEvaluationModal((prev) => !prev);
    };
    React.useEffect(() => {
        if (data?.leadDevSubmissionStatus === 0) {
            setToolTipTeamLead(
                `Currently being evaluated by ${data?.leadName}`
            );
        }
    }, [data]);

    React.useEffect(() => {
        if (data?.teamLeadsSubmissionStatus === 0) {
            setToolTipAdmin(
                `Currently being Reviewed by ${data?.teamLeadName}`
            );
        }
        if (data?.leadDevSubmissionStatus === 0) {
            setToolTipAdmin(`Currently being evaluated by ${data?.leadName}`);
        }
    }, [data]);

    React.useEffect(() => {
        if (data?.leadDevSubmissionStatus === 1) {
            setButtonVariant("success");
        } else if (data?.leadDevSubmissionStatus === 0) {
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
                                condition={
                                    data?.authorization_status === "pending"
                                }
                            >
                                <Button
                                    onClick={handleEvaluationClick}
                                    variant={buttonVariant}
                                >
                                    {data?.leadDevSubmissionStatus === 1
                                        ? "Submitted"
                                        : "Evaluate"}
                                </Button>
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    data?.authorization_status === "authorized"
                                }
                            >
                                <Button
                                    onClick={handleEvaluationClick}
                                    variant="success"
                                >
                                    Accepted
                                </Button>
                            </Switch.Case>
                        </Switch>
                    </Switch.Case>

                    {/* Team Lead Button */}
                    <Switch.Case condition={auth.isHasRolePermission(8)}>
                        <Switch>
                            <Switch.Case
                                condition={
                                    data?.authorization_status === "pending"
                                }
                            >
                                <Button
                                    onClick={handleEvaluationClick}
                                    disabled={
                                        data?.leadDevSubmissionStatus === 0
                                    }
                                    dataTip={toolTipTeamLead}
                                    toolTipId="my-tooltip"
                                    dataTooltipHidden={
                                        data?.leadDevSubmissionStatus === 1
                                    }
                                >
                                    {data?.leadDevSubmissionStatus === 0
                                        ? "Evaluating"
                                        : "Review"}
                                </Button>
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    data?.authorization_status === "authorized"
                                }
                            >
                                <Button
                                    onClick={handleEvaluationClick}
                                    variant="success"
                                >
                                    Accepted
                                </Button>
                            </Switch.Case>
                        </Switch>
                    </Switch.Case>

                    {/* Admin Button */}
                    <Switch.Case condition={auth.isHasRolePermission(1)}>
                        <Switch>
                            <Switch.Case
                                condition={
                                    data?.authorization_status === "pending"
                                }
                            >
                                <Button
                                    dataTip={toolTipAdmin}
                                    toolTipId="my-tooltip"
                                    dataTooltipHidden={
                                        data?.leadDevSubmissionStatus === 1 &&
                                        data?.teamLeadsSubmissionStatus === 1
                                    }
                                    onClick={handleEvaluationClick}
                                    disabled={
                                        data?.leadDevSubmissionStatus === 0 ||
                                        data?.teamLeadsSubmissionStatus === 0
                                    }
                                >
                                    <Switch>
                                        <Switch.Case
                                            condition={
                                                data?.leadDevSubmissionStatus ===
                                                0
                                            }
                                        >
                                            Evaluating
                                        </Switch.Case>
                                        <Switch.Case
                                            condition={
                                                data?.leadDevSubmissionStatus ===
                                                    1 &&
                                                data?.teamLeadsSubmissionStatus ===
                                                    0
                                            }
                                        >
                                            Reviewing
                                        </Switch.Case>
                                        <Switch.Case
                                            condition={
                                                data?.leadDevSubmissionStatus ===
                                                    1 &&
                                                data?.teamLeadsSubmissionStatus ===
                                                    1
                                            }
                                        >
                                            Authorize
                                        </Switch.Case>
                                    </Switch>
                                </Button>
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    data?.authorization_status === "authorized"
                                }
                            >
                                <Button
                                    onClick={handleEvaluationClick}
                                    variant="success"
                                >
                                    Accepted
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

export default ActionDropdownDataTable;
