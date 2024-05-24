import React from "react";
import { useState } from "react";
import styles from "../../../../react/tasks/components/PrimaryPageAuthorization.module.css";
import ReactModal from "react-modal";

import Card from "../../../global/Card";
import { useGetTaskListQuery } from "../../../services/api/EvaluationApiSlice";
import TaskTableSubmitted from "./TaskTableSubmitted";
import Popover from "../../../../react-latest/ui/Popover";
import { convertTime } from "../../../utils/converTime";
const TotalTaskSubmitted = ({ data }) => {
    const {
        data: TaskList,
        isLoading,
        isFetching,
    } = useGetTaskListQuery(data?.user_id);
    const Tasks = TaskList?.data.filter(
        (item) => item.submission_date !== null
    );
    const [isOpen, setIsOpen] = useState(false);
    const [sorting, setSorting] = useState([]);

    const onPageChange = (paginate) => {
        setPagination(paginate);
    };
    return (
        <div onClick={() => setIsOpen(true)} className="link_color">
            {data?.total_task_submit}

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
                        maxHeight: "95vh",
                        maxWidth: "800px",
                        margin: "auto auto",
                        border: "none",
                        padding: "0px",
                        overflowY: "auto",
                    },
                }}
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
            >
                <Card className={styles.taskList_card}>
                    <Card.Head
                        onClose={() => setIsOpen(false)}
                        className={styles.card_head}
                    >
                        Total task submitted
                    </Card.Head>

                    <Card.Body className={styles.card_body}>
                        <TaskTableSubmitted
                            data={Tasks}
                            columns={[...TotalTaskSubmittedColumns]}
                            isLoading={isLoading}
                            onPageChange={onPageChange}
                            sorting={sorting}
                            tableName="Total Task Submitted Table"
                            setSorting={setSorting}
                        />
                    </Card.Body>
                </Card>
            </ReactModal>
        </div>
    );
};

export default TotalTaskSubmitted;

const TotalTaskSubmittedColumns = [
    {
        id: "task_name",
        header: "Task Name",
        accessorKey: "task_name",

        cell: ({ row: { original }, className }) => {
            return original?.task_name ? (
                <div style={{ minWidth: "10rem" }}>
                    <Popover>
                        <Popover.Button>
                            <span className=" singleline-ellipsis link_color">
                                <span className="link_color">
                                    {original?.task_name}
                                </span>
                            </span>
                        </Popover.Button>

                        <Popover.Panel>
                            <div className="revision_popover_panel">
                                <a
                                    href={`/account/tasks/${original?.task_id}`}
                                    className="hover-underline"
                                    target="_blank"
                                >
                                    <span className="link_color ">
                                        {original?.task_name}
                                    </span>
                                </a>
                            </div>
                        </Popover.Panel>
                    </Popover>
                </div>
            ) : (
                <span>Not Available</span>
            );
        },
    },

    {
        id: "status",
        header: "Task Status",
        accessorKey: "task_board_column_name",
        cell: ({ row }) => {
            const data = row?.original;
            // console.log('from independent task table column',data?.column_name);
            return (
                <span
                    className="badge text-white"
                    style={{ background: data?.task_board_column_color }}
                >
                    {data?.task_board_column_name ?? "--"}
                </span>
            );
        },
    },

    {
        id: "total_hours",
        header: "Total Hours Tracked",
        accessorKey: "total_hours",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div style={{ marginLeft: "50px" }}>
                    {convertTime(data?.total_min)}
                </div>
            );
        },
    },
];
