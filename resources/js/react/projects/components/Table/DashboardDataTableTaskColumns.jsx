// Component - UI - Shared
import DashboardProgressStatus from "../ui/DashboardProgressStatus/DashboardProgressStatus";

// Constants
import { ProjectProgressStatus } from "../../constants";
import dayjs from "dayjs";

export const DashboardDataTableTaskColumns = [
    {
        id: "task_name",
        header: "Task name",
        accessorKey: "heading",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <a
                    href={`/account/tasks/${data?.id}`}
                    className="singleline-ellipsis"
                    title={data.heading}
                >
                    {data.heading}
                </a>
            );
        },
    },
    {
        id: "creation_date",
        header: "Creation date",
        accessorKey: "create_on",
    },
    {
        id: "due_date",
        header: "Due date",
        accessorKey: "due_on",
    },
    {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const data = row.original;
            // Get status data
            const getStatusData = () => {
                switch (data?.board_column_id) {
                    case 1:
                        return ProjectProgressStatus[0];
                    case 2:
                        return ProjectProgressStatus[1];
                    case 3:
                        return ProjectProgressStatus[2];
                    case 4:
                        return ProjectProgressStatus[3];
                    case 6:
                        return ProjectProgressStatus[4];
                    case 7:
                        return ProjectProgressStatus[5];
                    case 8:
                        return ProjectProgressStatus[6];
                    case 9:
                        return ProjectProgressStatus[7];
                }
            }
            const statusData = getStatusData()
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
        accessorKey: "logged_start_time",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis">
                    {dayjs(data?.logged_start_time).format(
                        "DD-MM-YYYY h:mm:ss A"
                    ) ?? "Not started yet"}
                </span>
            );
        },
    },
    {
        id: "estimate_hours",
        header: "Estimated hours",
        accessorKey: "estimate_hours",
        cell: ({ row }) => {
            const data = row.original;

            const formatEstimateHours = (data) => {
                if (data?.estimate_hours === null) {
                    return "Not estimated yet";
                }

                if (data?.estimate_hours === 0) {
                    return "0";
                } else if (data?.estimate_hours > 0) {
                    return `${data?.estimate_hours} Hours ${
                        data?.estimate_minutes && data?.estimate_minutes !== 0
                            ? ` ${data?.estimate_minutes} Minutes`
                            : ""
                    }`;
                }
            };
            return (
                <span className="singleline-ellipsis">
                    {formatEstimateHours(data)}
                </span>
            );
        },
    },
    {
        id: "logged_hours",
        header: "Logged hours",
        accessorKey: "hours_logged",
    },
];
