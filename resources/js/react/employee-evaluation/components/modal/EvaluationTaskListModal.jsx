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
} from "../../../services/api/EvaluationApiSlice";
import { useEffect } from "react";
import FormatDate from "../../../UI/comments/utils/FormatDate";
import { EvaluationTaskTableColumns } from "../Table/EvaluationTaskTableColumns";
import EvaluationTaskTable from "../Table/EvaluationTaskTable";
import useEmployeeEvaluation from "../../../zustand/store";
import RatingSection from "./RatingSection";
import RatingSectionStatic from "./RatingSectionStatic";

const EvaluationTaskListModal = ({
    isEvaluationModal,
    setIsEvaluationModal,
    singleEvaluation,
}) => {
    const auth = useAuth();
    const { evaluationObject } = useEmployeeEvaluation();
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

    // console.log("formdata", formData);
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

    const formFields = [
        {
            label: "Communication",
            value: formData.communication,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    communication: value,
                }),
        },
        {
            label: "Professionalism",
            value: formData.professionalism,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    professionalism: value,
                }),
        },
        {
            label: "Ability to identify issues",
            value: formData.identiey_issues,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    identiey_issues: value,
                }),
        },
        {
            label: "Dedication",
            value: formData.dedication,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    dedication: value,
                }),
        },
        {
            label: "Obedience",
            value: formData.obedience,
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
            <TitleAndTableSection>
                <EvalTableTitle>
                    <span>New Developer Evaluation:</span>
                    <span> {singleEvaluation.user_name}</span>

                    <span className="average_rating">
                        <span>Cumulative Average:</span>
                        <span>
                            {" "}
                            {singleEvaluation?.lead_dev_avg_rating ?? 0}
                        </span>
                    </span>
                </EvalTableTitle>
                <EvaluationTaskTable
                    data={Tasks}
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
                    (evaluationObject?.ld_submission_status === 0
                        ? formFields.map((field, index) => (
                              <RatingSection key={index} {...field} />
                          ))
                        : evaluationObject?.ld_submission_status === 1 &&
                          formFields.map((field, index) => (
                              <RatingSectionStatic key={index} {...field} />
                          )))}

                {(auth.roleId === 8 || auth.roleId === 1) &&
                    formFields.map((field, index) => (
                        <RatingSectionStatic key={index} {...field} />
                    ))}
            </RatingSectionLeadDev>

            <CommentTeamLeadSection>
                {/* //team lead comment start */}
                {auth.roleId === 8 &&
                    singleEvaluation.team_lead_status === 0 && (
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
                                        href={`/account/employees/208`}
                                        target="_blank"
                                        v
                                    >
                                        Mohammad Sayeed Ullah
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
