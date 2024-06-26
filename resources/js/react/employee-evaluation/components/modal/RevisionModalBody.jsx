import React, { useState } from "react";

import ReactModal from "react-modal";
import RevisionTable from "../Table/RevisionTable";
import { EvaluationRevisionTableColumns } from "../Table/EvaluationRevisionTableColumns";
import Card from "../../../global/Card";
import styles from "../../../../react/tasks/components/PrimaryPageAuthorization.module.css";
const RevisionModalBody = ({
    columns,
    revisions,
    isLoading,
    isEvaluationRevisionModal,
    setIsEvaluationRevisionModal,
}) => {
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
                        maxWidth: "800px",
                        height: "fit-content",
                        maxHeight: "100%",
                        margin: "auto auto",
                        padding: "0px",
                        overflowY: "auto",
                    },
                }}
                isOpen={isEvaluationRevisionModal}
                onRequestClose={() => setIsEvaluationRevisionModal(false)}
                ariaHideApp={false}
                closeTimeoutMS={500}
            >
                <Card className={styles.revision_card}>
                    <Card.Head
                        onClose={() => setIsEvaluationRevisionModal(false)}
                        className={styles.card_head}
                    >
                        Task Revision
                    </Card.Head>

                    <Card.Body className={styles.card_body}>
                        <RevisionTable
                            data={revisions}
                            columns={[...columns]}
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
