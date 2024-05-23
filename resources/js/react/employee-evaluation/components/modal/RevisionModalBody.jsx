import React, { useState } from "react";

import ReactModal from "react-modal";
import RevisionTable from "../Table/RevisionTable";
import { useGetRevisionListQuery } from "../../../services/api/EvaluationApiSlice";
import { EvaluationRevisionTableColumns } from "../Table/EvaluationRevisionTableColumns";
import Card from "../../../global/Card";
import styles from "../../../../react/tasks/components/PrimaryPageAuthorization.module.css";
const RevisionModalBody = ({
    taskId,
    isEvaluationRevisionModal,
    setIsEvaluationRevisionModal,
}) => {
    const { data: revisionData, isLoading } = useGetRevisionListQuery(taskId);

    const Revisions = revisionData?.data;
    const [sorting, setSorting] = useState([]);
    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

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
                        maxWidth: "820px",
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
                <Card className={styles.card}>
                    <Card.Head
                        onClose={() => setIsEvaluationRevisionModal(false)}
                        className={styles.card_head}
                    >
                        Task Revision
                    </Card.Head>

                    <Card.Body className={styles.card_body}>
                        <RevisionTable
                            data={Revisions}
                            columns={[...EvaluationRevisionTableColumns]}
                            isLoading={isLoading}
                            onPageChange={onPageChange}
                            sorting={sorting}
                            tableName="Revision Table"
                            setSorting={setSorting}
                        />
                    </Card.Body>
                </Card>
            </ReactModal>
        </div>
    );
};

export default RevisionModalBody;
