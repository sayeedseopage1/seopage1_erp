import ReactModal from "react-modal";
import styles from "./EvaluationRating.module.css";
import { useState } from "react";
import {
    ButtonSection,
    CommentAdminSection,
    CommentTeamLeadSection,
    EvalTableTitle,
    Flex,
    FooterButtons,
    RatingSectionLeadDev,
    TitleAndTableSection,
} from "../Table/ui";

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
} from "../ui/EvaluationModal";

import { useAuth } from "../../../hooks/useAuth";
import CKEditorComponent from "../../../ckeditor";

import { Button } from "react-bootstrap";

import {
    useGetTaskListQuery,
    useStoreTaskRatingFinalSubmissionMutation,
    useStoreTeamLeadReviewMutation,
    useStoreAdminRejectedMutation,
    useStoreAdminAuthorizedMutation,
    useStoreAdminExtendedMutation,
    useGetEvaluationHistoryQuery,
} from "../../../services/api/EvaluationApiSlice";
import { useEffect } from "react";
import FormatDate from "../../../UI/comments/utils/FormatDate";
import { EvaluationTaskTableColumns } from "../Table/EvaluationTaskTableColumns";
import EvaluationTaskTable from "../Table/EvaluationTaskTable";
import useEmployeeEvaluation from "../../../zustand/store";
import RatingSection from "./RatingSection";
import RatingSectionStatic from "./RatingSectionStatic";
import React from "react";
import { ratingHoverText } from "../../../utils/ratingHoverText";

const EvaluationTaskListModal = ({
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
        singleEvaluation?.lead_dev_avg_rating
    );
    const { evaluationObject } = useEmployeeEvaluation();
    const [latestRoundTasks, setLatestRoundTasks] = useState([]);
    const [teamLeadReview, setTeamLeadReview] = useState("");
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
        { isLoading: isLoadingLeadDevFinalSubmission },
    ] = useStoreTaskRatingFinalSubmissionMutation();
    const [teamLeadSubmission, { isLoading: isLoadingTeamLeadReview }] =
        useStoreTeamLeadReviewMutation();
    const [adminRejection, { isLoading: isAdminRejecting }] =
        useStoreAdminRejectedMutation();
    const [adminAuthorization, { isLoading: isLoadingAdminAuthorization }] =
        useStoreAdminAuthorizedMutation();
    const [adminExtended, { isLoading: isLoadingAdminExtended }] =
        useStoreAdminExtendedMutation();

    const {
        data: TaskList,
        isLoading,
        isFetching,
    } = useGetTaskListQuery(singleEvaluation?.user_id);
    const { data: historyData } = useGetEvaluationHistoryQuery(
        singleEvaluation?.user_id
    );

    React.useEffect(() => {
        setDateExpired(new Date(singleEvaluation?.exp_date) < Date.now());
    }, [singleEvaluation]);

    React.useEffect(() => {
        if (singleEvaluation) {
            if (singleEvaluation?.round_requied === 0) {
                setLatestRound(1);
            } else {
                setLatestRound(2);
            }
        }
    }, [singleEvaluation]);

    React.useEffect(() => {
        if (latestRound && TaskList) {
            const tasks = TaskList?.data.filter(
                (task) => task.round === latestRound
            );

            setLatestRoundTasks(tasks);
        }
    }, [latestRound, TaskList]);

    React.useEffect(() => {
        if (latestRoundTasks.length > 0) {
            const tasksToRate = latestRoundTasks.filter(
                (task) => ![1, 2, 3].includes(task?.task_board_column_id)
            );

            if (tasksToRate?.length > 0) {
                const cumulativeSum = tasksToRate.reduce(
                    (acc, cur) => acc + Number(cur.avg_rating ?? 0),
                    0
                );

                const average = cumulativeSum / tasksToRate.length;
                setCumulativeAverage(average);

                // console.log("tasks to rate", tasksToRate);
                // console.log("cumu sum", cumulativeSum);
                // console.log("avg", average);

                const isAllTaskRated =
                    tasksToRate.length ===
                    tasksToRate.filter((task) => task.team_lead_cmnt !== null)
                        .length;
                setIsAllTaskRated(isAllTaskRated);
            } else {
                // Handle case when tasksToRate is empty
                setCumulativeAverage(0);
                setIsAllTaskRated(false);
            }
        }
    }, [latestRoundTasks]);

    React.useEffect(() => {
        setConfirmButtonDisabled(
            !isAllTaskRated || !dateExpired || isPreviousTasks
        );
    }, [isAllTaskRated, dateExpired, isPreviousTasks]);

    React.useEffect(() => {
        if (historyData?.data && latestRound) {
            if (
                historyData?.data.length > 0 &&
                latestRound === historyData.data.length
            ) {
                setIsPreviousTasks(true);
            }
        }
    }, [historyData, latestRound, TaskList]);

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

    const handleLeadDevFinalSubmission = async () => {
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
            confirm_submission: "lead_dev_submitted",
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

    const handleTeamLeadComment = async (e) => {
        if (teamLeadReview === "") {
            const errorMessage = (
                <div>
                    <div style={{ fontWeight: "bold" }}>
                        {" "}
                        Please fill in the following fields:
                    </div>
                    <div>Team Leader's Review</div>
                </div>
            );
            toast.error(errorMessage);
            return;
        }

        await teamLeadSubmission({
            team_lead_cmnt: teamLeadReview,
            user_id: singleEvaluation.user_id,
            _token: document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content"),
        })
            .unwrap()
            .then(() => {
                toast.success("Review submission Successful!");
                setIsEvaluationModal(false);
            })
            .catch((error) => {
                toast.error(
                    "Review submission failed. Please try again later."
                );
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
                    <span>New Developer Evaluation:</span>
                    <span> {singleEvaluation.user_name}</span>

                    <span className="average_rating">
                        <span>Cumulative Average:</span>
                        <span>
                            {" "}
                            {isNaN(cumulativeAverage)
                                ? 0
                                : Number(cumulativeAverage).toFixed(2)}
                        </span>
                    </span>
                </EvalTableTitle>
                <EvaluationTaskTable
                    data={latestRoundTasks}
                    columns={[...EvaluationTaskTableColumns]}
                    isLoading={isLoading}
                    onPageChange={onPageChange}
                    sorting={sorting}
                    tableName="Evaluation Task Table"
                    setSorting={setSorting}
                />
            </TitleAndTableSection>

            <RatingSectionLeadDev
                className={styles.rating_container_task_table}
                style={{ marginLeft: "5%", marginRight: "5%" }}
            >
                {auth.roleId === 6 &&
                    (evaluationObject?.ld_submission_status === 0 &&
                    !isPreviousTasks
                        ? formFields.map((field, index) => (
                              <RatingSection key={index} {...field} />
                          ))
                        : evaluationObject?.ld_submission_status === 1 &&
                          formFields.map((field, index) => (
                              <RatingSectionStatic key={index} {...field} />
                          )))}

                {((auth.roleId === 8 &&
                    singleEvaluation?.ld_submission_status === 1) ||
                    (auth.roleId === 1 &&
                        singleEvaluation?.ld_submission_status === 1)) &&
                    formFields.map((field, index) => (
                        <RatingSectionStatic key={index} {...field} />
                    ))}
            </RatingSectionLeadDev>

            <CommentTeamLeadSection>
                {/* //team lead comment start */}
                {auth.roleId === 8 &&
                    singleEvaluation.team_lead_status === 0 &&
                    singleEvaluation.ld_submission_status === 1 && (
                        <div>
                            <TeamLeadReviewTitle>
                                Team Leader's Review
                            </TeamLeadReviewTitle>
                            <CommentBox>
                                <CKEditorComponent
                                    placeholder="Write your comment here"
                                    data={teamLeadReview}
                                    onChange={(e, editor) => {
                                        const data = editor.getData();
                                        setTeamLeadReview(data);
                                    }}
                                />
                            </CommentBox>
                        </div>
                    )}

                {(auth.roleId === 8 || auth.roleId === 1) &&
                    singleEvaluation.team_lead_status === 1 && (
                        <section>
                            <SectionFlex>
                                <HorizontalLineLeftTL />
                                <ReviewTitleTL>
                                    Team Leader's Review
                                </ReviewTitleTL>
                                <HorizontalLineRightTL />
                            </SectionFlex>

                            <ReviewContent>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: singleEvaluation.team_lead_cmnt,
                                    }}
                                />

                                <ReviewFooter>
                                    By{" "}
                                    <a
                                        href={`/account/employees/${singleEvaluation?.team_lead_id}`}
                                        target="_blank"
                                    >
                                        {singleEvaluation.team_lead_name}
                                    </a>{" "}
                                    on{" "}
                                    <span>
                                        {FormatDate(
                                            singleEvaluation.updated_at
                                        )}
                                    </span>
                                </ReviewFooter>
                            </ReviewContent>
                        </section>
                    )}
                {/* //team lead comment end */}
            </CommentTeamLeadSection>

            <CommentAdminSection>
                {/* admin view section start */}
                {auth.roleId === 1 &&
                    singleEvaluation.managements_decision === null &&
                    singleEvaluation.team_lead_status === 1 &&
                    singleEvaluation.ld_submission_status === 1 && (
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

                {(auth.roleId === 1 ||
                    auth.roleId === 8 ||
                    auth.roleId === 6) &&
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
                    {auth.roleId === 6 &&
                        singleEvaluation.ld_submission_status !== 1 && (
                            <Button
                                onClick={handleLeadDevFinalSubmission}
                                size="md"
                                className="ml-2"
                                disabled={confirmButtonDisabled}
                            >
                                {isLoadingLeadDevFinalSubmission
                                    ? "Submitting..."
                                    : "Confirm Submission"}
                            </Button>
                        )}

                    {/* lead dev submit button end */}

                    {/* Team Lead submit button start */}

                    {auth.roleId === 8 &&
                        singleEvaluation.team_lead_status === 0 &&
                        singleEvaluation.ld_submission_status === 1 && (
                            <Button
                                onClick={handleTeamLeadComment}
                                size="md"
                                className="ml-2"
                                disabled={isLoadingTeamLeadReview}
                            >
                                {isLoadingTeamLeadReview
                                    ? "Submitting..."
                                    : "Submit Review"}
                            </Button>
                        )}

                    {/* Team Lead Submit button end */}

                    {/* Admin submit button start */}
                    {auth.roleId === 1 &&
                        singleEvaluation.managements_decision === null &&
                        singleEvaluation.team_lead_status === 1 &&
                        singleEvaluation.ld_submission_status === 1 && (
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

export default EvaluationTaskListModal;
