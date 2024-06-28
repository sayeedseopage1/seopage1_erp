import ReactModal from "react-modal";
import styles from "../.././../components/modal/EvaluationRating.module.css";
import { useState } from "react";
import {
    ButtonSection,
    CommentAdminSection,
    CommentTeamLeadSection,
    EvalTableTitle,
    Flex,
    FooterButtons,
    RatingSectionLeadDev,
    RatingSectionTeamLead,
    TitleAndTableSection,
} from "../../../components/Table/ui.jsx";

import { toast } from "react-toastify";

import {
    TeamLeadReviewTitle,
    CommentBox,
    SectionFlex,
    HorizontalLineLeftTL,
    HorizontalLineRightTL,
    ReviewTitleTL,
    ReviewContent,
    ReviewFooter,
    HorizontalLineLeftA,
    ReviewTitleA,
    HorizontalLineRightA,
    CommentContentA,
} from "../../../components/ui/EvaluationModal.jsx";

import { Button } from "react-bootstrap";

import {
    useGetTaskListQuery,
    useStoreTaskRatingFinalSubmissionMutation,
    useStoreAdminRejectedMutation,
    useStoreAdminAuthorizedMutation,
    useStoreAdminExtendedMutation,
    useGetEvaluationHistoryQuery,
} from "../../../../services/api/EvaluationApiSlice.js";

import React from "react";

import { useAuth } from "../../../../hooks/useAuth.jsx";
import CKEditorComponent from "../../../../ckeditor/index.jsx";
import FormatDate from "../../../../utils/FormateDate.js";

import EvaluationTaskTable from "../../../components/Table/EvaluationTaskTable.jsx";
import useEmployeeEvaluation from "../../../../zustand/store.js";
import RatingSection from "../../../components/modal/RatingSection.jsx";
import RatingSectionStatic from "../../../components/modal/RatingSectionStatic.jsx";
import { ratingHoverText } from "../../../../utils/ratingHoverText.js";

import { EvaluationTaskTableColumnsLD } from "../table/EvaluationTaskTableColumnsLD.jsx";
import evaluationDesignation from "../../../../../react-latest/utils/evaluation-designation.js";

const EvaluationTaskListModalLD = ({
    isEvaluationModal,
    setIsEvaluationModal,
    singleEvaluation,
}) => {
    const { data: RoundHistory } = useGetEvaluationHistoryQuery(
        singleEvaluation?.user_id
    );
    const roundNumber = RoundHistory?.data.length;
    const [dateExpired, setDateExpired] = React.useState(false);
    const [latestRound, setLatestRound] = React.useState(null);
    const [confirmButtonDisabled, setConfirmButtonDisabled] =
        React.useState(false);

    const [isPreviousTasks, setIsPreviousTasks] = React.useState(false);

    const auth = useAuth();
    const [cumulativeAverage, setCumulativeAverage] = React.useState(
        singleEvaluation?.team_lead_avg_rating
    );
    const { evaluationObject } = useEmployeeEvaluation();
    const [latestRoundTasks, setLatestRoundTasks] = useState([]);

    const [adminComment, setAdminComment] = useState("");
    const [isAllTaskRated, setIsAllTaskRated] = useState(false);
    const [sorting, setSorting] = useState([]);
    const [formData, setFormData] = useState({
        communication: singleEvaluation?.communication ?? 0,
        professionalism: singleEvaluation?.professionalism ?? 0,
        identiey_issues: singleEvaluation?.identiey_issues ?? 0,
        dedication: singleEvaluation?.dedication ?? 0,
        obedience: singleEvaluation?.obedience ?? 0,
    });

    const [
        taskRatingFinalSubmission,
        { isLoading: isLoadingTeamLeadFinalSubmission },
    ] = useStoreTaskRatingFinalSubmissionMutation();

    const [adminRejection, { isLoading: isAdminRejecting }] =
        useStoreAdminRejectedMutation();
    const [adminAuthorization, { isLoading: isLoadingAdminAuthorization }] =
        useStoreAdminAuthorizedMutation();
    const [adminExtended, { isLoading: isLoadingAdminExtended }] =
        useStoreAdminExtendedMutation();

    const { data, isLoading, isFetching } = useGetTaskListQuery(
        singleEvaluation?.user_id
    );
    const { data: historyData } = useGetEvaluationHistoryQuery(
        singleEvaluation?.user_id
    );
    const designation = evaluationDesignation(singleEvaluation?.roleId);
    React.useEffect(() => {
        setDateExpired(new Date(singleEvaluation?.exp_date) < Date.now());
    }, [singleEvaluation]);

    React.useEffect(() => {
        if (data?.data) {
            const latestRound = Math.max(
                ...data.data.map((task) => task.round)
            );
            setLatestRound(latestRound);
            const tasks = data.data.filter(
                (task) => task.round === latestRound
            );
            setLatestRoundTasks(tasks);
        }
    }, [data]);

    React.useEffect(() => {
        if (latestRoundTasks.length > 0) {
            const tasksToRate = latestRoundTasks.filter(
                (task) => ![1, 2, 3].includes(task?.task_board_column_id)
            );

            const cumulativeSum = tasksToRate.reduce(
                (acc, cur) => acc + Number(cur.avg_rating ?? 0),
                0
            );

            console.log("tasks to rate", tasksToRate);
            const average = cumulativeSum / tasksToRate.length;
            setCumulativeAverage(average);

            const isAllTaskRated =
                tasksToRate.length ===
                tasksToRate.filter((task) => task.team_lead_cmnt !== null)
                    .length;
            setIsAllTaskRated(isAllTaskRated);
        }
    }, [latestRoundTasks]);

    React.useEffect(() => {
        setConfirmButtonDisabled(
            !isAllTaskRated || !dateExpired || isPreviousTasks
        );
    }, [isAllTaskRated, dateExpired, isPreviousTasks]);

    console.log(
        "is al task",
        isAllTaskRated,
        "date expired",
        dateExpired,
        "is previous task",
        isPreviousTasks
    );
    React.useEffect(() => {
        if (historyData?.data && latestRound) {
            if (
                historyData.data.length > 0 &&
                latestRound === historyData.data.length
            ) {
                setIsPreviousTasks(true);
            }
        }
    }, [historyData, latestRound, data]);

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

    const handleTeamLeadFinalSubmission = async () => {
        const requiredFields = [
            { key: "communication", label: "Communication" },
            { key: "professionalism", label: "Professionalism" },
            {
                key: "identiey_issues",
                label: "Ability to identify issues",
            },
            { key: "dedication", label: "Dedication" },
            { key: "obedience", label: "Obedience" },
        ];

        const emptyFields = requiredFields
            .filter((field) => !formData[field.key])
            .map((field) => field.label);

        if (emptyFields.length > 0) {
            const errorMessage = (
                <div>
                    <div style={{ fontWeight: "bold" }}>
                        {" "}
                        Please fill in the following fields:
                    </div>
                    <div>
                        {emptyFields.map((field, index) => (
                            <p key={index}>{field}</p>
                        ))}
                    </div>
                </div>
            );

            toast.error(errorMessage);
            return;
        }

        await taskRatingFinalSubmission({
            ...formData,
            user_id: singleEvaluation?.user_id,
            confirm_submission: "team_lead_submitted",
            _token: document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content"),
        })
            .unwrap()
            .then(() => {
                toast.success("Final Rating submission Successful!");
                setIsEvaluationModal(false);
            })
            .catch((error) => {
                toast.error("Final submission failed. Please try again later.");
            });
    };

    const handleAdminAuthorization = async () => {
        if (adminComment === "") {
            const errorMessage = (
                <div>
                    <div style={{ fontWeight: "bold" }}>
                        {" "}
                        Please fill in the following fields:
                    </div>
                    <div>Top Management's Authorization</div>
                </div>
            );
            toast.error(errorMessage);
            return;
        }
        await adminAuthorization({
            status: "authorize",
            user_id: singleEvaluation.user_id,
            role_id: singleEvaluation.roleId,
            managements_cmnt: adminComment,
            _token: document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content"),
        })
            .unwrap()
            .then(() => {
                toast.success("Employee Authorization Successful!");
                setIsEvaluationModal(false);
            })
            .catch((error) => {
                toast.error(
                    "Employee Authorization failed. Please try again later."
                );
            });
    };

    const handleAdminRejection = async (e) => {
        if (adminComment === "") {
            const errorMessage = (
                <div>
                    <div style={{ fontWeight: "bold" }}>
                        {" "}
                        Please fill in the following fields:
                    </div>
                    <div>Top Management's Authorization</div>
                </div>
            );
            toast.error(errorMessage);
            return;
        }
        await adminRejection({
            status: "reject",
            user_id: singleEvaluation.user_id,
            managements_cmnt: adminComment,
            _token: document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content"),
        })
            .unwrap()
            .then(() => {
                toast.success("Employee Rejection Successful!");
                setIsEvaluationModal(false);
            })
            .catch((error) => {
                toast.error(
                    "Employee Rejection failed. Please try again later."
                );
            });
    };
    const handleAdminExtention = async (e) => {
        if (adminComment === "") {
            const errorMessage = (
                <div>
                    <div style={{ fontWeight: "bold" }}>
                        {" "}
                        Please fill in the following fields:
                    </div>
                    <div>Top Management's Authorization</div>
                </div>
            );
            toast.error(errorMessage);
            return;
        }
        await adminExtended({
            user_id: singleEvaluation.user_id,
            managements_cmnt: adminComment,
            task_id: singleEvaluation.task_id,
            _token: document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content"),
        })
            .unwrap()
            .then(() => {
                toast.success("Employee Extension Successful!");
                setIsEvaluationModal(false);
            })
            .catch((error) => {
                toast.error(
                    "Employee Extention failed. Please try again later."
                );
            });
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
                            {Number(
                                cumulativeAverage === NaN
                                    ? 0
                                    : cumulativeAverage
                            )?.toFixed(2) ?? 0}
                            {console.log("cumulative avg", cumulativeAverage)}
                        </span>
                    </span>
                </EvalTableTitle>
                <EvaluationTaskTable
                    data={latestRoundTasks}
                    columns={[...EvaluationTaskTableColumnsLD]}
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
                {auth.roleId === 8 &&
                    (evaluationObject?.team_lead_submission_status === 0 &&
                    !isPreviousTasks
                        ? formFields.map((field, index) => (
                              <RatingSection key={index} {...field} />
                          ))
                        : evaluationObject?.team_lead_submission_status === 1 &&
                          formFields.map((field, index) => (
                              <RatingSectionStatic key={index} {...field} />
                          )))}

                {auth.roleId === 1 &&
                    singleEvaluation?.team_lead_submission_status === 1 &&
                    formFields.map((field, index) => (
                        <RatingSectionStatic key={index} {...field} />
                    ))}
            </RatingSectionTeamLead>

            <CommentAdminSection>
                {/* admin view section start */}
                {auth.roleId === 1 &&
                    singleEvaluation.managements_decision === null &&
                    // singleEvaluation.team_lead_status === 1 &&
                    singleEvaluation.team_lead_submission_status === 1 && (
                        <div>
                            <section>
                                <SectionFlex>
                                    <HorizontalLineLeftA />
                                    <ReviewTitleA>
                                        Top Management's Authorization
                                    </ReviewTitleA>
                                    <HorizontalLineRightA />
                                </SectionFlex>

                                <CommentContentA>
                                    <CKEditorComponent
                                        placeholder="Write your comment here"
                                        data={adminComment}
                                        onChange={(e, editor) => {
                                            const data = editor.getData();
                                            setAdminComment(data);
                                        }}
                                    />
                                </CommentContentA>
                            </section>
                        </div>
                    )}

                {(auth.roleId === 1 || auth.roleId === 8) &&
                    singleEvaluation.managements_decision !== null && (
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

                    {/* lead dev submit button start */}
                    {auth.roleId === 8 &&
                        singleEvaluation.team_lead_submission_status !== 1 && (
                            <Button
                                onClick={handleTeamLeadFinalSubmission}
                                size="md"
                                className="ml-2"
                                disabled={confirmButtonDisabled}
                            >
                                {isLoadingTeamLeadFinalSubmission
                                    ? "Submitting..."
                                    : "Confirm Submission"}
                            </Button>
                        )}

                    {/* lead dev submit button end */}

                    {/* Admin submit button start */}
                    {auth.roleId === 1 &&
                        singleEvaluation.managements_decision === null &&
                        singleEvaluation.team_lead_submission_status === 1 && (
                            <Flex>
                                <Button
                                    onClick={handleAdminAuthorization}
                                    size="md"
                                    className="ml-2"
                                    disabled={isLoadingAdminAuthorization}
                                >
                                    {isLoadingAdminAuthorization
                                        ? "Authorizing..."
                                        : "Authorize"}
                                </Button>
                                {roundNumber === 0 && (
                                    <Button
                                        variant="info"
                                        onClick={handleAdminExtention}
                                        size="md"
                                        className="ml-2"
                                        disabled={isLoadingAdminExtended}
                                    >
                                        {isLoadingAdminExtended
                                            ? "extending..."
                                            : "Continue this trial for 1 more week!"}
                                    </Button>
                                )}
                                <Button
                                    variant="danger"
                                    onClick={handleAdminRejection}
                                    size="md"
                                    className="ml-2"
                                    disabled={isAdminRejecting}
                                >
                                    {isAdminRejecting
                                        ? "Rejecting..."
                                        : "Reject"}
                                </Button>
                            </Flex>
                        )}

                    {/* admin submit button end */}
                </FooterButtons>
            </ButtonSection>
        </ReactModal>
    );
};

export default EvaluationTaskListModalLD;
