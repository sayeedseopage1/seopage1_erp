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
                    {data?.currency_symbol}{" "}
                    {data.cost ?? "Not set"} {data?.currency_code}
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
                    {dayjs(data?.created_at).format(
                        "DD-MM-YYYY h:mm:ss A" 
                    ) ?? "Not started yet"}
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
                <div className="dashboardMilestoneTableStatus">
                    <p
                        
                        style={{
                            backgroundColor:
                                data.status === "complete" ? "#CAEDE1" : "#F9C8CC",
                            color: data.status === "complete" ? "#119254" : "#F00",
                        }}
                        className="text-capitalize"
                    >

                        {data.status}
                    </p>
                </div>
            );
        },
    },
];
