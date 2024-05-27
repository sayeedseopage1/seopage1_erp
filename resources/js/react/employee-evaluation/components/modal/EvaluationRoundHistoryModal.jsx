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
            <div
                style={{ marginLeft: "50px" }}
                className="link_color"
                onClick={() => setIsOpen(true)}
            >
                {data?.round_requied}
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

const RoundHistoryTableColumns = [
    {
        id: "role_name",
        header: "Role",
        accessorKey: "role_name",
        cell: ({ row }) => {
            const data = row.original;

            return data?.role_name ? (
                <span>{data?.role_name}</span>
            ) : (
                <span>Trainee</span>
            );
        },
    },
    {
        id: "join_date",
        header: "Joining Date",
        accessorKey: "join_date",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{FormatDate(data?.join_date)}</div>;
        },
    },
    {
        id: "first_task_assign_on",
        header: "First Task Assigned On",
        accessorKey: "first_task_assign_on",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{FormatDate(data?.first_task_assign_on)}</div>;
        },
    },
    {
        id: "started_working_on",
        header: "Started Working On",
        accessorKey: "started_working_on",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{FormatDate(data?.started_working_on)}</div>;
        },
    },
];
