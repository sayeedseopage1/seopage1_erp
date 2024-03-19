//mitul work start

import { RxCrossCircled } from "react-icons/rx";
import ReactModal from "react-modal";

import { EvaluationTableColumns } from "../Table/EvaluationTableColumns";
import { useState } from "react";
import { EvalTableTitle, FooterButtons } from "../Table/ui";
import DataTable from "../Table/EvaluationTable";
import Button from "../../../../../ui/Button";
import {
    useFinalTaskSubmissionStatusMutation,
    useGetTaskListQuery,
} from "../../../../../services/api/EvaluationApiSlice";
import { toast } from "react-toastify";
import { useAuth } from "../../../../../../react/hooks/useAuth";
import CKEditorComponent from "../../../../../ui/ckeditor";

const EvaluationModal = ({ isEvaluationModal, setIsEvaluationModal }) => {
    const auth = useAuth();

    const assignToId = "65f7c6d70b0ea43f5888f62a";
    const [updateFinalSubmissionStatus, { isError }] =
        useFinalTaskSubmissionStatusMutation();
    const { data, isLoading } = useGetTaskListQuery(assignToId);

    const Tasks = data?.data;

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
        console.log("team lead submitted");
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
                    maxWidth: "90%",
                    maxHeight: "fit-content",
                    height: "fit-content",
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
            <DataTable
                data={Tasks}
                columns={[...EvaluationTableColumns]}
                isLoading={false}
                onPageChange={onPageChange}
                sorting={sorting}
                tableName="Evaluation Table"
                setSorting={setSorting}
            />
            {/* //team lead comment start */}
            {auth.roleId === 8 && (
                <div>
                    <div
                        style={{
                            marginTop: "30px",
                            fontWeight: "bold",
                        }}
                    >
                        Team Leader's Review
                    </div>
                    <div
                        style={{
                            border: "2px solid rgba(0, 0, 0, 0.2)",
                            marginBottom: "20px",
                            marginTop: "10px",
                        }}
                    >
                        <CKEditorComponent placeholder="Write your comment here" />
                    </div>
                </div>
            )}
            {/* //team lead comment end */}
            <FooterButtons>
                <Button
                    onClick={() => setIsEvaluationModal(false)}
                    variant="secondary"
                    size="md"
                >
                    Close
                </Button>

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

                {auth.roleId === 8 && (
                    <Button
                        onClick={handleTeamLeadComment}
                        size="md"
                        className="ml-2"
                    >
                        Submit Review
                    </Button>
                )}
            </FooterButtons>
        </ReactModal>
    );
};

export default EvaluationModal;

//mitul work end
