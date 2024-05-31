import React, { useState } from "react";

import ReactModal from "react-modal";

import Card from "../../../global/Card";
import styles from "../../../../react/tasks/components/PrimaryPageAuthorization.module.css";
import RoundHistoryTable from "../Table/RoundHistoryTable";
import { EvaluationRoundHistoryTableColumns } from "../Table/EvaluationRoundHistoryColumns";
import { useGetEvaluationHistoryQuery } from "../../../services/api/EvaluationApiSlice";

const EvaluationRoundHistoryModal = ({ data }) => {
    const { data: RoundHistory, isLoading } = useGetEvaluationHistoryQuery(
        data?.user_id
    );
    const roundData = RoundHistory?.data;
    const [sorting, setSorting] = useState([]);
    const onPageChange = (paginate) => {
        setPagination(paginate);
    };
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button
                style={{
                    marginLeft: "30px",
                    width: "100px",
                    height: "40px",
                    backgroundColor: "transparent",
                }}
                className={`${data?.round_requied === 0 ? "" : "link_color"}`}
                onClick={() => setIsOpen(true)}
                disabled={data?.round_requied === 0}
            >
                {data?.round_requied}
            </button>
            <ReactModal
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        margin: "auto auto",
                        zIndex: 100,
                    },
                    content: {
                        borderRadius: "10px",

                        height: "fit-content",
                        maxHeight: "100%",
                        margin: "auto auto",
                        padding: "0px",
                        overflowY: "auto",
                        maxWidth: "75vw",
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
                            data={roundData}
                            columns={[...EvaluationRoundHistoryTableColumns]}
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

export default EvaluationRoundHistoryModal;
