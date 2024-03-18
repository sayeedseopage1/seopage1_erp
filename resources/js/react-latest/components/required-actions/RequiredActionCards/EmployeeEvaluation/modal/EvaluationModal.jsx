//mitul work start

import { RxCrossCircled } from "react-icons/rx";
import ReactModal from "react-modal";

import { EvaluationTableColumns } from "../Table/EvaluationTableColumns";
import { useState } from "react";
import { EvalTableTitle, FooterButtons } from "../Table/ui";
import DataTable from "../Table/EvaluationTable";
import Button from "../../../../../ui/Button";
import { useGetTaskListQuery } from "../../../../../services/api/EvaluationApiSlice";

const EvaluationModal = ({ isEvaluationModal, setIsEvaluationModal }) => {
    const assignToId = "65f7c6d70b0ea43f5888f62a";
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

                    overflow: "auto",
                    padding: "20px",
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

            <FooterButtons>
                <Button
                    onClick={() => setIsEvaluationModal(false)}
                    variant="secondary"
                    size="md"
                >
                    Close
                </Button>
                <Button
                    size="md"
                    className="ml-2"
                    disabled={data?.finalRatingSubmission}
                >
                    Confirm Submission
                </Button>
            </FooterButtons>
        </ReactModal>
    );
};

export default EvaluationModal;

//mitul work end
