import { ceil } from "lodash";
import DashboardProgressStatus from "../ui/DashboardProgressStatus/DashboardProgressStatus";
import { ProjectProgressStatus } from "../../constants";

export const DashboardDataTableTaskColumns = [
    {
        id: "task_name",
        header: "Task name",
        accessorKey: "task_name",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <a
                    href={`/account/tasks/${data.task_id}`}
                    className="singleline-ellipsis"
                    title={data.task_name}
                >
                    {data.task_name}
                </a>
            );
        },
    },
    {
        id: "creation_date",
        header: "Creation date",
        accessorKey: "creation_date",
    },
    {
        id: "due_date",
        header: "Due date",
        accessorKey: "due_date",
    },
    {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const data = row.original;
            const statusData = ProjectProgressStatus?.find(
                (status) => status?.name === data?.status
            );
            return (
                <DashboardProgressStatus
                    title={statusData?.name}
                    statusType={statusData?.tag}
                    className="dashboardTaskTableStatus"
                />
            );
        },
    },
    {
        id: "tracking_start_time",
        header: "Tracking start time",
        accessorKey: "tracking_start_time",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis">
                    {data.tracking_start_time ?? "Not started yet"}
                </span>
            );
        },
    },
    {
        id: "estimated_hours",
        header: "Estimated hours",
        accessorKey: "estimated_hours",
    },
    {
        id: "logged_hours",
        header: "Logged hours",
        accessorKey: "logged_hours",
    },
];
