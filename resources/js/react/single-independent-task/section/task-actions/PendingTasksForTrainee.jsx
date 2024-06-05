import React, { useState } from "react";
import _ from "lodash";
import ReactModal from "react-modal";

import styles from "../../../../react/tasks/components/PrimaryPageAuthorization.module.css";
import Card from "../../../global/Card";

import PendingTasksTable from "../../../employee-evaluation/components/Table/PendingTasksTable";
import { useAuth } from "../../../hooks/useAuth";
import { useGetTaskListQuery } from "../../../services/api/EvaluationApiSlice";

import { PendingTasksTableColumns } from "../../../employee-evaluation/components/Table/PendingTasksTableColumn";
const PendingTasksForTrainee = ({
    isPendingModalOpen,
    setIsPendingModalOpen,
}) => {
    const auth = useAuth();

    const { data, isLoading } = useGetTaskListQuery(auth.id);

    //filter tasks by board column id to extract un submitted tasks
    const Tasks = data?.data.filter((task) =>
        _.includes([1, 2, 3, 7], Number(task.task_board_column_id))
    );

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
                        zIndex: 99998,
                    },
                    content: {
                        borderRadius: "10px",
                        maxWidth: "820px",
                        height: "fit-content",
                        maxHeight: "100%",
                        margin: "auto auto",
                        padding: "10px",
                        overflowY: "auto",
                        zIndex: 99999,
                    },
                }}
                isOpen={isPendingModalOpen}
                onRequestClose={() => setIsPendingModalOpen(false)}
                ariaHideApp={false}
            >
                <Card className={styles.card}>
                    <Card.Head
                        onClose={() => setIsPendingModalOpen(false)}
                        className={styles.card_head}
                    >
                        Pending tasks
                    </Card.Head>

                    <Card.Body className={styles.card_body}>
                        <PendingTasksTable
                            data={Tasks}
                            columns={[...PendingTasksTableColumns]}
                            isLoading={isLoading}
                            onPageChange={onPageChange}
                            sorting={sorting}
                            tableName="Pending Tasks Table"
                            setSorting={setSorting}
                        />
                    </Card.Body>
                </Card>
            </ReactModal>
        </div>
    );
};

export default PendingTasksForTrainee;
