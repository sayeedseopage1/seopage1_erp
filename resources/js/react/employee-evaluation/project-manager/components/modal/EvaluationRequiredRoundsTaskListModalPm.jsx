import ReactModal from "react-modal";
import styles from "../.././../components/modal/EvaluationRating.module.css";
import { useState } from "react";
import {
    ButtonSection,
    CommentAdminSection,
    EvalTableTitle,
    FooterButtons,
    RatingSectionTeamLead,
    TitleAndTableSection,
} from "../../../components/Table/ui.jsx";

import {
    SectionFlex,
    HorizontalLineLeftTL,
    HorizontalLineRightTL,
    ReviewTitleTL,
    ReviewContent,
    ReviewFooter,
} from "../../../components/ui/EvaluationModal.jsx";

import { Button } from "react-bootstrap";

import { useGetTaskListQuery } from "../../../../services/api/EvaluationApiSlice.js";
import { useEffect } from "react";

import React from "react";

import { useAuth } from "../../../../hooks/useAuth.jsx";

import FormatDate from "../../../../utils/FormateDate.js";

import EvaluationTaskTable from "../../../components/Table/EvaluationTaskTable.jsx";

import RatingSectionStatic from "../../../components/modal/RatingSectionStatic.jsx";
import { ratingHoverText } from "../../../../utils/ratingHoverText.js";
import { EvaluationTaskTableColumnsPM } from "../table/EvaluationTaskTableColumnsPM.jsx";
import evaluationDesignation from "../../../../../react-latest/utils/evaluation-designation.js";

const EvaluationRequiredRoundsTaskListModalPM = ({
    round,
    isEvaluationModal,
    setIsEvaluationModal,
    singleEvaluation,
}) => {
    const auth = useAuth();
    const [cumulativeAverage, setCumulativeAverage] = React.useState(
        singleEvaluation?.team_lead_avg_rating
    );

    const [sorting, setSorting] = useState([]);
    const [formData, setFormData] = useState({
        communication: singleEvaluation?.communication ?? 0,
        professionalism: singleEvaluation?.professionalism ?? 0,
        identiey_issues: singleEvaluation?.identiey_issues ?? 0,
        dedication: singleEvaluation?.dedication ?? 0,
        obedience: singleEvaluation?.obedience ?? 0,
    });

    const { data, isLoading, isFetching } = useGetTaskListQuery(
        singleEvaluation?.user_id
    );

    const [tasksList, setTaskList] = useState([]);
    const Tasks = data?.data.filter((task) => task.round === round);

    useEffect(() => {
        setTaskList(Tasks);
    }, [singleEvaluation]);

    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const designation = evaluationDesignation(singleEvaluation?.roleId);
    const formFields = [
        {
            label: "Communication",
            value: formData.communication,
            hoverText: ratingHoverText?.communication,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    communication: value,
                }),
        },
        {
            label: "Professionalism",
            value: formData.professionalism,
            hoverText: ratingHoverText?.professionalism,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    professionalism: value,
                }),
        },
        {
            label: "Ability to identify issues",
            value: formData.identiey_issues,
            hoverText: ratingHoverText?.identiey_issues,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    identiey_issues: value,
                }),
        },
        {
            label: "Dedication",
            value: formData.dedication,
            hoverText: ratingHoverText?.dedication,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    dedication: value,
                }),
        },
        {
            label: "Obedience",
            value: formData.obedience,
            hoverText: ratingHoverText?.obedience,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    obedience: value,
                }),
        },
    ];

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
                    maxWidth: "100%",
                    height: "fit-content",
                    maxHeight: "100%",
                    margin: "auto auto",
                    padding: "10px",
                    overflowY: "auto",
                },
            }}
            ariaHideApp={false}
            isOpen={isEvaluationModal}
            onRequestClose={() => setIsEvaluationModal(false)}
            closeTimeoutMS={500}
        >
            <TitleAndTableSection>
                <EvalTableTitle>
                    <span>{`${designation} Evaluation :`}</span>
                    <span> {singleEvaluation.user_name}</span>

                    <span className="average_rating">
                        <span>Cumulative Average:</span>
                        <span>
                            {" "}
                            {Number(cumulativeAverage)?.toFixed(2) ?? 0}
                            {console.log("cumulative avg", cumulativeAverage)}
                        </span>
                    </span>
                </EvalTableTitle>
                <EvaluationTaskTable
                    data={tasksList}
                    columns={[...EvaluationTaskTableColumnsPM]}
                    isLoading={isLoading}
                    onPageChange={onPageChange}
                    sorting={sorting}
                    tableName="Evaluation Task Table"
                    setSorting={setSorting}
                />
            </TitleAndTableSection>

            <RatingSectionTeamLead
                className={styles.rating_container_task_table}
                style={{ marginLeft: "5%", marginRight: "5%" }}
            >
                {(auth.roleId === 1 || auth.roleId === 8) &&
                    formFields.map((field, index) => (
                        <RatingSectionStatic key={index} {...field} />
                    ))}
            </RatingSectionTeamLead>

            <CommentAdminSection>
                {(auth.roleId === 1 || auth.roleId === 8) && (
                    <section>
                        <SectionFlex>
                            <HorizontalLineLeftTL />
                            <ReviewTitleTL>
                                Top Management's Authorization
                            </ReviewTitleTL>
                            <HorizontalLineRightTL />
                        </SectionFlex>

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
                                    {FormatDate(
                                        singleEvaluation?.managements_auth_at
                                    )}
                                </span>
                            </ReviewFooter>
                        </ReviewContent>
                    </section>
                )}
                {/* admin view section end */}
            </CommentAdminSection>

            {/* Buttons start */}

            <ButtonSection>
                <FooterButtons>
                    <Button
                        onClick={() => setIsEvaluationModal(false)}
                        variant="secondary"
                        size="md"
                    >
                        Close
                    </Button>
                </FooterButtons>
            </ButtonSection>
        </ReactModal>
    );
};

export default EvaluationRequiredRoundsTaskListModalPM;
