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

import { EvaluationTableColumns } from "../Table/EvaluationTableColumns";
import Button from "../Button";

import {
    useGetTaskListQuery,
    useStoreTaskRatingFinalSubmissionMutation,
    useStoreTaskRatingMutation,
    useStoreTeamLeadReviewMutation,
} from "../../../services/api/EvaluationApiSlice";
import { useEffect } from "react";

const EvaluationModal = ({
    isEvaluationModal,
    setIsEvaluationModal,
    singleEvaluation,
}) => {
    const auth = useAuth();
    const [teamLeadReview, setTeamLeadReview] = useState("");

    const [taskRatingFinalSubmission] =
        useStoreTaskRatingFinalSubmissionMutation();
    const [leadDevSubmission] = useStoreTeamLeadReviewMutation();
    const { data, isLoading, isFetching } = useGetTaskListQuery(
        singleEvaluation?.user_id
    );

    const Tasks = data?.data;

    const [allTasksReviewed, setAllTasksReviewed] = useState(false);

    useEffect(() => {
        if (data && data.data) {
            const Tasks = data.data;
            const allTasksReviewed =
                Tasks.length ===
                Tasks.filter((task) => task.lead_dev_cmnt !== null).length;
            setAllTasksReviewed(allTasksReviewed);
        }
    }, [data]);

    const [sorting, setSorting] = useState([]);

    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

    const handleFinalSubmission = async () => {
        try {
            await taskRatingFinalSubmission({
                user_id: singleEvaluation?.user_id,
                confirm_submission: "lead_dev_submitted",
                _token: document
                    .querySelector("meta[name='csrf-token']")
                    .getAttribute("content"),
            });
            toast.success("Final Rating submission Successful!");
            setIsEvaluationModal(false);
        } catch (error) {
            toast.error("Final submission failed. Please try again later.");
        }
    };

    const handleTeamLeadComment = async (e) => {
        try {
            await leadDevSubmission({
                team_lead_cmnt: teamLeadReview,
                user_id: singleEvaluation.user_id,
                _token: document
                    .querySelector("meta[name='csrf-token']")
                    .getAttribute("content"),
            });
            toast.success("Review submission Successful!");
            setIsEvaluationModal(false);
        } catch (error) {
            toast.error("Review submission failed. Please try again later.");
        }
    };
    const handleAdminComment = async (e) => {
        e.preventDefault();
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
            isOpen={isEvaluationModal}
            onRequestClose={() => setIsEvaluationModal(false)}
        >
            <EvalTableTitle>
                <span>New Developer Evaluation :</span>
                <span>{singleEvaluation.user_name}</span>
            </EvalTableTitle>
            <EvaluationTable
                data={Tasks}
                columns={[...EvaluationTableColumns]}
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

            {auth.roleId === 8 && singleEvaluation.team_lead_status === 1 && (
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
                            on <span>{data?.data[0]?.updated_at}</span>
                        </ReviewFooter>
                    </ReviewContent>
                </section>
            )}
            {/* //team lead comment end */}

            {/* admin view section start */}
            {auth.roleId === 1 && (
                <div>
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
                                on <span>{singleEvaluation?.updated_at}</span>
                            </ReviewFooter>
                        </ReviewContent>
                    </section>

                    <section>
                        <SectionFlex>
                            <HorizontalLineLeftA />
                            <ReviewTitleA>
                                Top Management's Authorization
                            </ReviewTitleA>
                            <HorizontalLineRightA />
                        </SectionFlex>

                        <CommentContentA>
                            <CKEditorComponent placeholder="Write your comment here" />
                        </CommentContentA>
                    </section>
                </div>
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
                        onClick={handleFinalSubmission}
                        size="md"
                        className="ml-2"
                        disabled={
                            !allTasksReviewed ||
                            singleEvaluation.ld_submission_status === 1
                        }
                    >
                        {singleEvaluation.ld_submission_status === 1 ? (
                            <div> submitted </div>
                        ) : (
                            <div> Confirm Submission</div>
                        )}
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
                        >
                            Submit Review
                        </Button>
                    )}

                {/* Team Lead Submit button end */}

                {/* Admin submit button start */}
                {auth.roleId === 1 && (
                    <Flex>
                        <Button
                            variant="danger"
                            onClick={handleAdminComment}
                            size="md"
                            className="ml-2"
                        >
                            Reject
                        </Button>
                        <Button
                            onClick={handleAdminComment}
                            size="md"
                            className="ml-2"
                        >
                            Authorize
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
