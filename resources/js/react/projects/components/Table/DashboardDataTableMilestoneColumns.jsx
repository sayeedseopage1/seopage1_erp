

/**
 * This file contains the columns for the milestone table in the dashboard.
 * 
 */

export const DashboardDataTableMilestoneColumns = [
    {
        id: "milestone_name",
        header: "Milestone name",
        accessorKey: "milestone_name",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span
                    className="singleline-ellipsis"
                    title={data.milestone_name}
                >
                    {data.milestone_name}
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
                    {data.milestone_currency_symbol}{" "}
                    {data.milestone_cost ?? "Not set"} {data.milestone_currency}
                </span>
            );
        },
    },
    {
        id: "creation_date",
        header: "Creation date",
        accessorKey: "creation_date",
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
                                data.status === "Paid" ? "#CAEDE1" : "#F9C8CC",
                            color: data.status === "Paid" ? "#119254" : "#F00",
                        }}
                    >
                        {data.status}
                    </p>
                </div>
            );
        },
    },
];
