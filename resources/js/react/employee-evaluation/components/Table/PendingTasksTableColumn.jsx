import Popover from "../../../../react-latest/ui/Popover";
import Button from "../../../global/Button";
import { convertTime } from "../../../utils/converTime";
import EvaluationTaskRevisionModal from "../modal/EvaluationTaskRevisionModal";
import ActionEvaluationTaskTable from "./ActionEvaluationTaskTable";

export const PendingTasksTableColumns = [
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

    {
        header: "Action",
        accessorKey: "assign_date",

        cell: ({ row }) => {
            const data = row.original;

            return (
                <Button variant="primary" className="text-white">
                    <a
                        href={`/account/tasks/${data?.task_id}`}
                        className="hover-underline text-white"
                        target="_blank"
                    >
                        Submit
                    </a>
                </Button>
            );
        },
    },
];
