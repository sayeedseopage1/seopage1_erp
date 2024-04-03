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
// import {
//     useFinalTaskSubmissionStatusMutation,
//     useGetTaskListQuery,
// } from "../../../services/api/EvaluationApiSlice";

import { EvaluationTableColumns } from "../Table/EvaluationTableColumns";
import Button from "../Button";
import { useFinalTaskSubmissionStatusMutation } from "../../../../react-latest/services/api/EvaluationApiSlice";
import { useGetTaskListQuery } from "../../../services/api/EvaluationApiSlice";

const EvaluationModal = ({
    isEvaluationModal,
    setIsEvaluationModal,
    singleEvaluation,
}) => {
    const auth = useAuth();

    const [updateFinalSubmissionStatus, { isError }] =
        useFinalTaskSubmissionStatusMutation();
    const { data, isLoading, isFetching } = useGetTaskListQuery(
        singleEvaluation?.user_id
    );

    const Tasks = data?.data;
    console.log("tasks", Tasks);

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
            await updateFinalSubmissionStatus(assignToId);
            toast.success("Final submission status updated successfully!");
            setIsEvaluationModal(false);
        } catch (error) {
            toast.error(
                "Failed to update final submission status. Please try again later."
            );
        }
    };

    const handleTeamLeadComment = async (e) => {
        e.preventDefault();
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
                <span>Mitul</span>
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
            {auth.roleId === 8 && (
                <div>
                    <TeamLeadReviewTitle>
                        Team Leader's Review
                    </TeamLeadReviewTitle>
                    <CommentBox>
                        <CKEditorComponent placeholder="Write your comment here" />
                    </CommentBox>
                </div>
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
                                    __html: data?.data[0]?.rating
                                        .reporting_boss_comment,
                                }}
                            />

                            <ReviewFooter>
                                By{" "}
                                <a
                                    href="www.LeadDevId.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {data?.data[0]?.assignByName}
                                </a>{" "}
                                on <span>{data?.data[0]?.updatedAt}</span>
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
                            data?.disableFinalSubmissionButton ||
                            data?.finalSubmissionStatus
                        }
                    >
                        {data?.finalSubmissionStatus === true ? (
                            <div> submitted </div>
                        ) : (
                            <div> Confirm Submission</div>
                        )}
                    </Button>
                )}

                {/* lead dev submit button end */}

                {/* Team Lead submit button start */}

                {auth.roleId === 8 && (
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
