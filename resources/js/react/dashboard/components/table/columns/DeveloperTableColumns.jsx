import dayjs from "dayjs";
import Switch from "../../../../global/Switch";
import PopoverLink from "../../shared/PopoverLink";

export const DeveloperTableColumns = {};

const DeveloperCompleteTableColumns = [
    {
        id: "id",
        header: "SL",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span
                    className="singleline-ellipsis"
                    title={data.milestone_title}
                >
                    {row.index + 1}
                </span>
            );
        },
    },
    {
        id: "created_at",
        header: "Creation Date",
        accessorKey: "created_at",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis">
                    {dayjs(data?.created_at).format("DD-MM-YYYY h:mm:ss A") ??
                        "Not started yet"}
                </span>
            );
        },
    },
    {
        id: "heading",
        header: "Task Name",
        accessorKey: "heading",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <PopoverLink
                    url={`/account/tasks/${data?.id}`}
                    label={data?.heading}
                />
            );
        },
    },
    {
        id: "clientName",
        header: "Client Name",
        accessorKey: "clientName",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <Switch>
                    <Switch.Case condition={data?.ProjectId !== null}>
                        <PopoverLink
                            url={`/account/clients/${data?.client_id}`}
                            label={data?.clientName}
                        />
                    </Switch.Case>
                    <Switch.Case condition={data?.task_client_name !== null}>
                        <span className="singleline-ellipsis">
                            {data?.task_client_name}
                        </span>
                    </Switch.Case>
                    <Switch.Case
                        condition={
                            data?.cl_name === null &&
                            data?.task_client_name === null
                        }
                    >
                        <span className="singleline-ellipsis">
                            {data?.cl_name}
                        </span>
                    </Switch.Case>
                </Switch>
            );
        },
    },
    {
        id: "submission_date",
        header: "Submission Date",
        accessorKey: "submission_date",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis">
                    <Switch>
                        <Switch.Case
                            condition={[2, 1, 3].includes(
                                data?.board_column_id
                            )}
                        >
                            N/A
                        </Switch.Case>
                        <Switch.Case
                            condition={
                                ![2, 1, 3].includes(data?.board_column_id)
                            }
                        >
                            {dayjs(data?.submission_date).format(
                                "DD-MM-YYYY h:mm:ss A"
                            ) ?? "Not started yet"}
                        </Switch.Case>
                    </Switch>
                </span>
            );
        },
    },
    {
        id: "current_status",
        header: "Current Status",
        accessorKey: "current_status",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span
                    style={{ color: data?.label_color }}
                    className="singleline-ellipsis task-status"
                >
                    {data?.current_status}
                </span>
            );
        },
    },
];

const DeveloperModalTableColumns = [
    {
        id: "id",
        header: "SL",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span
                    className="singleline-ellipsis"
                    title={data.milestone_title}
                >
                    {row.index + 1}
                </span>
            );
        },
    },
    {
        id: "assign_date",
        header: "Assign Date",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis" title={data.assign_date}>
                    {dayjs(data?.assign_date).format("DD-MM-YYYY h:mm:ss A") ??
                        "Not started yet"}
                </span>
            );
        },
    },
    {
        id: "heading",
        header: "Task Name",
        accessorKey: "heading",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <PopoverLink
                    url={`/account/tasks/${data?.id}`}
                    label={data?.heading}
                />
            );
        },
    },
    {
        id: "clientName",
        header: "Client Name",
        accessorKey: "clientName",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <Switch>
                    <Switch.Case
                        condition={
                            data?.data?.cl_id === null &&
                            data?.client_name === null
                        }
                    >
                        <PopoverLink
                            url={`/account/clients/${data?.clientId}`}
                            label={data?.clientName}
                        />
                    </Switch.Case>
                    <Switch.Case condition={data?.client_name !== null}>
                        <span className="singleline-ellipsis">
                            {data?.task_client_name}
                        </span>
                    </Switch.Case>
                    <Switch.Case condition={data?.cl_id !== null}>
                        <span className="singleline-ellipsis">
                            {data?.cl_name}
                        </span>
                    </Switch.Case>
                </Switch>
            );
        },
    },
    {
        id: "submission_date",
        header: "Submission Date",
        accessorKey: "submission_date",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis">
                    <Switch>
                        <Switch.Case
                            condition={[2, 1, 3].includes(
                                data?.board_column_id
                            )}
                        >
                            N/A
                        </Switch.Case>
                        <Switch.Case
                            condition={
                                ![2, 1, 3].includes(data?.board_column_id)
                            }
                        >
                            {dayjs(data?.submission_date).format(
                                "DD-MM-YYYY h:mm:ss A"
                            ) ?? "Not started yet"}
                        </Switch.Case>
                    </Switch>
                </span>
            );
        },
    },
    {
        id: "due_date",
        header: "Deadline",
        accessorKey: "due_date",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis" title={data.due_date}>
                    {dayjs(data?.due_date).format("DD-MM-YYYY h:mm:ss A") ??
                        "Not started yet"}
                </span>
            );
        },
    },
    {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span
                    style={{ color: data?.label_color }}
                    className="singleline-ellipsis task-status"
                >
                    {data?.column_name}
                </span>
            );
        },
    },
    {

    },
    {
        id: "revision_log_min",
        header: "Hours Log",
        accessorKey: "revision_log_min",
        cell: ({ row }) => {
            const data = row.original;
            const hours = Math.floor(data.revision_log_min / 60);
            const minutes = data.revision_log_min % 60;
            return (
                <span
                    className="singleline-ellipsis"
                    title={data.revision_log_min}
                >
                    {revision_log_min ? `${hours} hrs ${minutes} mins` : "N/A"}
                </span>
            );
        },
    },
    {
        id: "revision_count",
        header: "Revision Count",
        accessorKey: "revision_count",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span
                    className="singleline-ellipsis"
                    title={data.revision_count}
                >
                    {data.revision_count}
                </span>
            );
        },
    },
    {
        id: "task_approval_date",
        header: "Approval Date",
        accessorKey: "task_approval_date",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span
                    className="singleline-ellipsis"
                    title={data.task_approval_date}
                >
                    {dayjs(data?.task_approval_date).format(
                        "DD-MM-YYYY h:mm:ss A"
                    ) ?? "Not started yet"}
                </span>
            );
        },
    },
];

DeveloperTableColumns.Complete = DeveloperCompleteTableColumns;

DeveloperTableColumns.Modal = DeveloperModalTableColumns;
