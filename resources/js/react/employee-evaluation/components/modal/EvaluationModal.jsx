//mitul work start

import ReactModal from "react-modal";

import { useState } from "react";
import { EvalTableTitle, Flex, FooterButtons } from "../Table/ui";

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
import EvaluationTable from "../Table/EvaluationTable";

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
} from "../../../services/api/EvaluationApiSlice";
import { useEffect } from "react";
import FormatDate from "../../../UI/comments/utils/FormatDate";
import { EvaluationTaskTableColumns } from "../Table/EvaluationTaskTableColumns";

const EvaluationModal = ({
    isEvaluationModal,
    setIsEvaluationModal,
    singleEvaluation,
}) => {
    const auth = useAuth();

    const [teamLeadReview, setTeamLeadReview] = useState("");
    const [adminComment, setAdminComment] = useState("");
    const [isAllTaskRated, setIsAllTaskRated] = useState(false);
    const [sorting, setSorting] = useState([]);

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

    const { data, isLoading, isFetching } = useGetTaskListQuery(
        singleEvaluation?.user_id
    );

    const Tasks = data?.data;
    let tasksToRate = [];
    //to enable or disable button

    useEffect(() => {
        if (data && data?.data) {
            const tasks = data?.data;
            tasksToRate = tasks?.filter((task) => {
                return (
                    Number(task.total_min) > 5 && task.submission_date !== null
                );
            });
            const isAllTaskRated =
                tasksToRate?.length ===
                tasksToRate?.filter((task) => task.lead_dev_cmnt !== null)
                    .length;
            setIsAllTaskRated(isAllTaskRated);
        }
    }, [data]);

    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

    const handleLeadDevFinalSubmission = async () => {
        await taskRatingFinalSubmission({
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
        await adminExtended({
            user_id: singleEvaluation.user_id,
            managements_cmnt: adminComment,
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
            isOpen={isEvaluationModal}
            onRequestClose={() => setIsEvaluationModal(false)}
        >
            <EvalTableTitle>
                <span>New Developer Evaluation:</span>
                <span> {singleEvaluation.user_name}</span>

                <span className="average_rating">
                    <span>Cumulative Average:</span>
                    <span> {singleEvaluation?.lead_dev_avg_rating ?? 0}</span>
                </span>
            </EvalTableTitle>
            <EvaluationTable
                data={Tasks}
                columns={[...EvaluationTaskTableColumns]}
                isLoading={isLoading}
                onPageChange={onPageChange}
                sorting={sorting}
                tableName="Evaluation Task Table"
                setSorting={setSorting}
            />
            {/* //team lead comment start */}
            {auth.roleId === 8 && singleEvaluation.team_lead_status === 0 && (
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
                            <ReviewTitleTL>Team Leader's Review</ReviewTitleTL>
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
                                <a href="www.teamLead.com" target="_blank">
                                    Mohammad Sayeed Ullah
                                </a>{" "}
                                on{" "}
                                <span>
                                    {FormatDate(singleEvaluation.updated_at)}
                                </span>
                            </ReviewFooter>
                        </ReviewContent>
                    </section>
                )}
            {/* //team lead comment end */}

            {/* admin view section start */}
            {auth.roleId === 1 &&
                singleEvaluation.managements_decision === null && (
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

            {(auth.roleId === 1 || auth.roleId === 8 || auth.roleId === 6) &&
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
                                <a href="www.teamLead.com" target="_blank">
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

            {/* Buttons start */}

            <FooterButtons>
                <Button
                    onClick={() => setIsEvaluationModal(false)}
                    variant="secondary"
                    size="md"
                >
                    Close
                </Button>

                {/* lead dev submit button start */}
                {auth.roleId === 6 && (
                    <Button
                        onClick={handleLeadDevFinalSubmission}
                        size="md"
                        className="ml-2"
                        disabled={
                            !isAllTaskRated ||
                            singleEvaluation.ld_submission_status === 1 ||
                            isLoadingLeadDevFinalSubmission
                        }
                    >
                        {isLoadingLeadDevFinalSubmission
                            ? "Submitting..."
                            : singleEvaluation.ld_submission_status === 1
                            ? "Submitted"
                            : "Confirm Submission"}
                    </Button>
                )}

                {/* lead dev submit button end */}

                {/* Team Lead submit button start */}

                {auth.roleId === 8 &&
                    singleEvaluation.team_lead_status === 0 && (
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
                    singleEvaluation.managements_decision === null && (
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
                            <Button
                                variant="danger"
                                onClick={handleAdminRejection}
                                size="md"
                                className="ml-2"
                                disabled={isAdminRejecting}
                            >
                                {isAdminRejecting ? "Rejecting..." : "Reject"}
                            </Button>
                        </Flex>
                    )}

                {/* admin submit button end */}
            </FooterButtons>
        </ReactModal>
    );
};

export default EvaluationModal;

//mitul work end
