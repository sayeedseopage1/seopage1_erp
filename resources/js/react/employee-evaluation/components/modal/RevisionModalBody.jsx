import React, { useState } from "react";

import ReactModal from "react-modal";
import RevisionTable from "../Table/RevisionTable";
import { useGetRevisionListQuery } from "../../../services/api/EvaluationApiSlice";
import { EvaluationRevisionTableColumns } from "../Table/EvaluationRevisionTableColumns";

const RevisionModalBody = ({
    data,
    isEvaluationRevisionModal,
    setIsEvaluationRevisionModal,
}) => {
    const { data: revisionData, isLoading } = useGetRevisionListQuery(
        data?.task_id
    );

    const Revisions = revisionData?.data;
    const [sorting, setSorting] = useState([]);
    const onPageChange = (paginate) => {
        setPagination(paginate);
    };
    console.log("revisionData", Revisions);
    return (
        <div>
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
                isOpen={isEvaluationRevisionModal}
                onRequestClose={() => setIsEvaluationRevisionModal(false)}
                ariaHideApp={false}
            >
                <RevisionTable
                    data={Revisions}
                    columns={[...EvaluationRevisionTableColumns]}
                    isLoading={isLoading}
                    onPageChange={onPageChange}
                    sorting={sorting}
                    tableName="Revision Table"
                    setSorting={setSorting}
                />
            </ReactModal>
        </div>
    );
};

export default RevisionModalBody;
