//mitul work start

import ReactModal from "react-modal";

import { EvaluationTableColumns } from "../Table/EvaluationTableColumns";
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

const EvaluationAcknowledgeModal = ({
    acknowledgement,
    setAcknowledgement,
}) => {
    const DecisionColor = {
        Accepted: "green",
        Rejected: "red",
        "One more week": "blue",
        default: "blue",
    };
    const decisionColor =
        DecisionColor[singleEvaluation?.managements_decision] ||
        DecisionColor["default"];

    const auth = useAuth();
    const { setEvaluationObject } = useEmployeeEvaluation();
    const evaluationId = 2580;
    const [evaluations, setEvaluations] = useState([]);
    const [singleEvaluation, setSingleEvaluation] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/account/get-all-evaluation");
                setEvaluations(response.data.data.data);
            } catch (error) {
                console.error("Error fetching evaluations:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!evaluations.length) return;

        const singleEv = evaluations.find(
            (evaluation) => evaluation.user_id === evaluationId
        );
        setSingleEvaluation(singleEv || null);
        setEvaluationObject(singleEv || null);
    }, [evaluations]);

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `/account/employee-evaluation-task/${evaluationId}`
                );
                setTasks(response.data.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [evaluationId]);

    const [sorting, setSorting] = useState([]);

    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const onPageChange = (paginate) => {
        setPagination(paginate);
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
                    maxWidth: "80%",
                    height: "fit-content",
                    maxHeight: "90vh",
                    margin: "auto auto",
                    padding: "20px",
                    overflowY: "auto",
                },
            }}
            isOpen={acknowledgement}
            onRequestClose={() => setAcknowledgement(false)}
        >
            <section>
                <EvalTableTitle>
                    <span>New Developer Evaluation :</span>
                    <span>{singleEvaluation?.user_name}</span>
                </EvalTableTitle>

                <EvalTableSubTitle>
                    {`Lead Developer `}
                    <NameLink href="#">
                        {singleEvaluation?.added_by_name}
                    </NameLink>
                    {` has evaluated New Developer `}
                    <NameLink href="#">{singleEvaluation?.user_name}</NameLink>
                    {` on `}
                    <span style={{ color: "green" }}>
                        {singleEvaluation?.team_lead_cmnt_at}
                    </span>
                </EvalTableSubTitle>
                <EvaluationTable
                    data={tasks}
                    columns={[...EvaluationTableColumns]}
                    isLoading={isLoading}
                    onPageChange={onPageChange}
                    sorting={sorting}
                    tableName="Evaluation Task Table"
                    setSorting={setSorting}
                />
            </section>

            {auth.roleId === 8 && (
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
                            <a href="www.teamLead.com" target="_blank">
                                Mohammad Sayeed Ullah
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
                    <span style={{ color: decisionColor }}>
                        {singleEvaluation?.managements_decision}
                    </span>
                    {` New Developer `}
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
                        <a href="www.teamLead.com" target="_blank">
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

                <Button
                    // onClick={handleLeadDevFinalSubmission}
                    size="md"
                    className="ml-2"
                >
                    <div> Ok, Acknowledged it</div>
                </Button>
            </FooterButtons>
        </ReactModal>
    );
};

export default EvaluationAcknowledgeModal;

//mitul work end
