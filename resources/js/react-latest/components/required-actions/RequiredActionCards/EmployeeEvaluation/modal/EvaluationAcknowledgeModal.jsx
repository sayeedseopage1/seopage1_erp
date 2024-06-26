//mitul work start
import evaluationDesignation from "../../../../../utils/evaluation-designation";
import ReactModal from "react-modal";
import React, { useEffect, useState } from "react";
import {
    EvalTableSubTitle,
    EvalTableTitle,
    NameLink,
    ReviewTableSubTitle,
    ReviewTableSubTitleDate,
    FooterButtons,
} from "../Table/ui";

import Button from "../../../../../ui/Button";

import { useAuth } from "../../../../../../react/hooks/useAuth";

import {
    SectionFlex,
    HorizontalLineLeftTL,
    HorizontalLineRightTL,
    ReviewTitleTL,
    ReviewContent,
    ReviewFooter,
} from "../ui/EvaluationModal";
import EvaluationTable from "../Table/EvaluationTable";
import axios from "axios";
import FormatDate from "../../../../../../react/UI/comments/utils/FormatDate";
import useEmployeeEvaluation from "../../../../../../react/zustand/store";

import useCounterStore from "../../../../../Zustand/store";

import { toast } from "react-toastify";
import { useAcknowledgePendingActionsPastMutation } from "../../../../../services/api/pendingActionsApiSlice";
import { EvaluationTaskTableColumns } from "../../../../../../react/employee-evaluation/components/Table/EvaluationTaskTableColumns";
import _ from "lodash";
import { EvaluationTaskTableColumnsPM } from "../../../../../../react/employee-evaluation/project-manager/components/table/EvaluationTaskTableColumnsPM";
const EvaluationAcknowledgeModal = ({
    acknowledgement,
    setAcknowledgement,
    developerId,
}) => {
    const { increaseCount } = useCounterStore();
    const [updatePendingAction, { isLoading: isLoadingTeamLeadAndLeadDev }] =
        useAcknowledgePendingActionsPastMutation();

    const auth = useAuth();
    const { setEvaluationObject } = useEmployeeEvaluation();

    const [singleEvaluation, setSingleEvaluation] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (developerId) {
                    const response = await axios.get(
                        `/account/get-single-evaluation/${developerId}`
                    );
                    // console.log(response);
                    setSingleEvaluation(response?.data.data[0]);
                    setEvaluationObject(response?.data.data[0]);
                }
            } catch (error) {
                console.error("Error fetching evaluations:", error);
            }
        };

        fetchData();
    }, []);

    const designation = evaluationDesignation(singleEvaluation?.roleId);
    const evaluator = _.includes(
        [4, 6, 7, 15, 16, 17],
        Number(singleEvaluation?.roleId)
    )
        ? "Team Lead"
        : "Lead Developer";
    // console.log("singleEvaluation", singleEvaluation);
    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `/account/employee-evaluation-task/${developerId}`
                );
                setTasks(response.data.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [developerId]);

    const [sorting, setSorting] = useState([]);

    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

    const handleAcknowledgedItLeadDev = async () => {
        try {
            const response = await updatePendingAction({
                user_id: singleEvaluation?.user_id,
                acknowledged: "lead_dev",
            }).unwrap();

            if (response?.status == 200) {
                if (singleEvaluation?.managements_decision == "One more week") {
                    setAcknowledgement(false);
                    increaseCount();
                    window.open(response?.url, "_blank");
                } else {
                    toast.success("Acknowledge successful!");
                    setAcknowledgement(false);
                    increaseCount();
                }
            }
        } catch (error) {
            console.error("Error updating pending action:", error);
        }
    };

    const handleAcknowledgedItTeamLead = async () => {
        try {
            const response = await updatePendingAction({
                user_id: singleEvaluation?.user_id,
                acknowledged: "team_lead",
            }).unwrap();

            if (response?.status == 200) {
                if (singleEvaluation?.managements_decision == "One more week") {
                    setAcknowledgement(false);
                    increaseCount();
                    window.open(response?.url, "_blank");
                } else {
                    toast.success("Acknowledge successful!");
                    setAcknowledgement(false);
                    increaseCount();
                }
            }
        } catch (error) {
            console.error("Error updating pending action:", error);
        }
    };

    return (
        <ReactModal
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    margin: "auto auto",
                    zIndex: 100,
                },
                content: {
                    borderRadius: "10px",
                    maxWidth: "100%",
                    height: "fit-content",
                    maxHeight: "100%",
                    margin: "auto auto",
                    padding: "10px",
                    overflowY: "auto",
                },
            }}
            ariaHideApp={false}
            isOpen={acknowledgement}
            onRequestClose={() => setAcknowledgement(false)}
            closeTimeoutMS={500}
        >
            <section>
                <EvalTableTitle>
                    <span>{`${designation} Evaluation :`}</span>
                    <span>{singleEvaluation?.user_name}</span>
                </EvalTableTitle>

                <EvalTableSubTitle>
                    {evaluator}
                    <NameLink href="#">
                        {singleEvaluation?.added_by_name}
                    </NameLink>
                    {` has evaluated ${designation} `}
                    <NameLink href="#">{singleEvaluation?.user_name}</NameLink>
                    {` on `}
                    <span style={{ color: "green" }}>
                        {FormatDate(singleEvaluation?.updated_at)}
                    </span>
                </EvalTableSubTitle>

                {!_.includes(
                    [4, 6, 7, 15, 16, 17],
                    Number(singleEvaluation?.roleId)
                ) ? (
                    <EvaluationTable
                        data={tasks}
                        columns={[...EvaluationTaskTableColumns]}
                        isLoading={isLoading}
                        onPageChange={onPageChange}
                        sorting={sorting}
                        tableName="Evaluation Task Table"
                        setSorting={setSorting}
                    />
                ) : (
                    <EvaluationTable
                        data={tasks}
                        columns={[...EvaluationTaskTableColumnsPM]}
                        isLoading={isLoading}
                        onPageChange={onPageChange}
                        sorting={sorting}
                        tableName="Evaluation Task Table"
                        setSorting={setSorting}
                    />
                )}
            </section>

            {auth.roleId === 8 &&
                !_.includes(
                    [4, 6, 7, 15, 16, 17],
                    Number(singleEvaluation?.roleId)
                ) && (
                    <section>
                        <SectionFlex>
                            <HorizontalLineLeftTL />
                            <ReviewTitleTL>Team Leader's Review</ReviewTitleTL>
                            <HorizontalLineRightTL />
                        </SectionFlex>

                        <ReviewContent>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: singleEvaluation?.team_lead_cmnt,
                                }}
                            />

                            <ReviewFooter>
                                By{" "}
                                <a
                                    href={`/account/employees/${singleEvaluation?.team_lead_id}`}
                                    target="_blank"
                                >
                                    {singleEvaluation?.team_lead_name}
                                </a>{" "}
                                on{" "}
                                <span>
                                    {FormatDate(singleEvaluation?.updated_at)}
                                </span>
                            </ReviewFooter>
                        </ReviewContent>
                    </section>
                )}

            <section>
                <SectionFlex>
                    <HorizontalLineLeftTL />
                    <ReviewTitleTL>Authorization Details</ReviewTitleTL>
                    <HorizontalLineRightTL />
                </SectionFlex>
                <ReviewTableSubTitle>
                    {`Top Management `}
                    <NameLink href="#">
                        {singleEvaluation?.managements_name}
                    </NameLink>
                    {` has `}
                    <span>{singleEvaluation?.managements_decision}</span>{" "}
                    {`${designation}`}{" "}
                    <NameLink href="#">{singleEvaluation?.user_name}</NameLink>
                    {` for real work on `}
                    <ReviewTableSubTitleDate>
                        {singleEvaluation?.managements_auth_at}
                    </ReviewTableSubTitleDate>
                </ReviewTableSubTitle>

                <ReviewContent>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: singleEvaluation?.managements_cmnt,
                        }}
                    />

                    <ReviewFooter>
                        By{" "}
                        <a
                            href={`/account/employees/${singleEvaluation?.managements_id}`}
                            target="_blank"
                        >
                            {singleEvaluation?.managements_name}
                        </a>{" "}
                        on{" "}
                        <span>
                            {FormatDate(singleEvaluation?.managements_auth_at)}
                        </span>
                    </ReviewFooter>
                </ReviewContent>
            </section>

            <FooterButtons>
                <Button
                    onClick={() => setAcknowledgement(false)}
                    variant="secondary"
                    size="md"
                >
                    Close
                </Button>

                {auth.roleId === 8 && (
                    <Button
                        onClick={handleAcknowledgedItTeamLead}
                        isLoading={isLoadingTeamLeadAndLeadDev}
                        size="md"
                        className="ml-2"
                    >
                        <div>
                            {" "}
                            {singleEvaluation?.managements_decision ===
                            "One more week"
                                ? "Acknowledge & create a task"
                                : "Ok,Acknowledged it"}
                        </div>
                    </Button>
                )}
                {auth.roleId === 6 && (
                    <Button
                        onClick={handleAcknowledgedItLeadDev}
                        isLoading={isLoadingTeamLeadAndLeadDev}
                        size="md"
                        className="ml-2"
                    >
                        <div>
                            {" "}
                            {singleEvaluation?.managements_decision ===
                            "One more week"
                                ? "Acknowledge & create sub-tasks"
                                : "Ok,Acknowledged it"}
                        </div>
                    </Button>
                )}
            </FooterButtons>
        </ReactModal>
    );
};

export default EvaluationAcknowledgeModal;

//mitul work end
