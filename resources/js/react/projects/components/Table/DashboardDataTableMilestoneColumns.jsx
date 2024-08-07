import dayjs from "dayjs";

/**
 * This file contains the columns for the milestone table in the dashboard.
 *
 */

export const DashboardDataTableMilestoneColumns = [
    {
        id: "milestone_name",
        header: "Milestone name",
        accessorKey: "milestone_title",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span
                    className="singleline-ellipsis"
                    title={data.milestone_title}
                >
                    {data.milestone_title}
                </span>
            );
        },
    },
    {
        id: "milestone_cost",
        header: "Milestone cost",
        accessorKey: "milestone_cost",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis">
                    {data?.currency_symbol} {data.cost ?? "Not set"}{" "}
                    {data?.currency_code}
                </span>
            );
        },
    },
    {
        id: "creation_date",
        header: "Creation date",
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
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const data = row.original;

            const statusConfig = {
                unpaid: {
                    title: "Unpaid",
                    color: "#757474",
                    backgroundColor: "#FFE8A1",
                },
                paid: {
                    title: "Paid",
                    color: "#119254",
                    backgroundColor: "#CAEDE1",
                },
                canceled: {
                    title: "Canceled",
                    color: "#F00",
                    backgroundColor: "#F9C8CC",
                },
            };
            const getStatusData = () => {
                if (!data?.paid_status) {
                    if (data?.status === "incomplete") {
                        return statusConfig.unpaid;
                    }
                    if (data?.status === "complete") {
                        return statusConfig.unpaid;
                    }
                    if (
                        data?.status === "canceled" ||
                        data?.cancelation_status === "approved"
                    ) {
                        return statusConfig.canceled;
                    }
                } else {
                    if (data?.paid_status === "paid") {
                        return statusConfig.paid;
                    }
                    if (data?.paid_status === "unpaid") {
                        return statusConfig.unpaid;
                    } 
                }
            };

            const status = getStatusData();

            return (
                <div className="dashboardMilestoneTableStatus">
                    <p
                        style={{
                            backgroundColor: status?.backgroundColor,
                            color: status?.color,
                        }}
                        className="text-capitalize"
                    >
                        {status?.title}
                    </p>
                </div>
            );
        },
    },
];
