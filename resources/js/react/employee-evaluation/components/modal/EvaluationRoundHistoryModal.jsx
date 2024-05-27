import React, { useState } from "react";

import ReactModal from "react-modal";

import Card from "../../../global/Card";
import styles from "../../../../react/tasks/components/PrimaryPageAuthorization.module.css";
import RoundHistoryTable from "../Table/RoundHistoryTable";
const EvaluationRoundHistoryModal = ({ data }) => {
    const [sorting, setSorting] = useState([]);
    const onPageChange = (paginate) => {
        setPagination(paginate);
    };
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className="link_color ml-2" onClick={() => setIsOpen(true)}>
                {data?.required_round}
            </div>
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
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                ariaHideApp={false}
            >
                <Card className={styles.revision_card}>
                    <Card.Head
                        onClose={() => setIsOpen(false)}
                        className={styles.card_head}
                    >
                        Round history table
                    </Card.Head>

                    <Card.Body className={styles.card_body}>
                        <RoundHistoryTable
                            // data={revisions}
                            // columns={[...columns]}
                            // isLoading={isLoading}
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

export default EvaluationRoundHistoryModal;
