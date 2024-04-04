import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Button from "../Button";
import EvaluationModal from "../modal/EvaluationModal";
import Switch from "../../../global/Switch";
import { Tooltip } from "react-tooltip";
import { useDispatch } from "react-redux";
import { setEvaluationWiseTableData } from "../../../services/features/employeeEvaluation.";

const ActionDropdownDataTable = ({ data, table }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("userId");
    const dispatch = useDispatch();
    const auth = useAuth();
    const [isEvaluationModal, setIsEvaluationModal] = React.useState(false);
    const [toolTipTeamLead, setToolTipTeamLead] = React.useState("");
    const [toolTipAdmin, setToolTipAdmin] = React.useState("");
    const [buttonVariant, setButtonVariant] = React.useState("");
    const handleEvaluationClick = () => {
        setIsEvaluationModal((prev) => !prev);
        dispatch(setEvaluationWiseTableData(data));
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
            setToolTipAdmin(`Currently being Reviewed by Sayeed Ullah`);
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

    return (
        <React.Fragment>
            <div className="mt-2 mb-2">
                <Switch>
                    {/* //lead developer button */}
                    <Switch.Case condition={auth.isHasRolePermission(6)}>
                        <Switch>
                            <Switch.Case
                                condition={data?.accept_rejected === null}
                            >
                                <Button
                                    onClick={handleEvaluationClick}
                                    variant={buttonVariant}
                                >
                                    {data?.lead_dev_avg_rating !== null
                                        ? "Submitted"
                                        : "Evaluate"}
                                </Button>
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    data?.accept_rejected === "authorized"
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
                                condition={data?.accept_rejected === null}
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
                                    {data?.lead_dev_avg_rating === null
                                        ? "Evaluating"
                                        : "Review"}
                                </Button>
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    data?.accept_rejected === "authorized"
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
                                condition={data?.accept_rejected === null}
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
                                                data?.lead_dev_avg_rating ===
                                                    null &&
                                                data?.team_lead_cmnt !== null
                                            }
                                        >
                                            Authorize
                                        </Switch.Case>
                                    </Switch>
                                </Button>
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    data?.accept_rejected === "authorized"
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
