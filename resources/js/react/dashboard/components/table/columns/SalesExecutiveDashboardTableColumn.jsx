import { Popover } from "antd";
import dayjs from "dayjs";
import Switch from "../../../../global/Switch";
import PopoverLink from "../../shared/PopoverLink";

export const SalesExecutiveDashboardTableColumn = {};

const SalesExecutiveDashboardBiddingBreakdown = [
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
        id: "country",
        header: "Country",
        accessorKey: "country",
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
        id: "total_leads",
        header: "Total Leads",
        accessorKey: "total_leads",
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
        id: "average_bidding_amount",
        header: "Avg. Bidding Amount",
        accessorKey: "average_bidding_amount",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis task-status">
                    {data?.average_bidding_amount}
                </span>
            );
        },
    },
    {
        id: "percentage",
        header: "Percentage",
        accessorKey: "percentage",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis task-status">
                    {data?.percentage}
                </span>
            );
        },
    },
];
const SalesExecutiveDashboardWonDeals = [
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
        id: "country",
        header: "Country",
        accessorKey: "country",
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
        id: "won_deals_count",
        header: "Won Deals Count",
        accessorKey: "won_deals_count",
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
        id: "won_deals_value",
        header: "Won Deals Value",
        accessorKey: "won_deals_value",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis task-status">
                    {data?.won_deals_value}
                </span>
            );
        },
    },
    {
        id: "avg_won_deals_value",
        header: "Avg.Won Deals Value",
        accessorKey: "avg_won_deals_value",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis task-status">
                    {data?.avg_won_deals_value}
                </span>
            );
        },
    },
    {
        id: "percentage",
        header: "Percentage",
        accessorKey: "percentage",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis task-status">
                    {data?.percentage}
                </span>
            );
        },
    },
];

const SalesExecutiveDashboardModalTableColumns = [
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
        id: "project_name",
        header: "Project Name",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis">
                    {data?.project_name ?? "N/A"}
                </span>
            );
        },
    },
    {
        id: "project_budget",
        header: "Project Budget",
        accessorKey: "project_budget",
        cell: ({ row }) => {
            const data = row.original;
            // TODO: Add currency symbol
            return (
                <span className="singleline-ellipsis">
                    {data?.project_budget ?? "N/A"}
                </span>
            );
        },
    },
    {
        id: "created",
        header: "Created",
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
        id: "bidding_minutes",
        header: "Bidding Time",
        accessorKey: "bidding_minutes",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis">
                    {`${data?.bidding_minutes} min ${data?.bidding_seconds} sec`}
                </span>
            );
        },
    },
    {
        id: "created_by",
        header: "Created By",
        accessorKey: "created_by",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <PopoverLink
                    url={`/account/employees/${data?.id}`}
                    label={data?.heading}
                />
            );
        },
    },
    {
        id: "deal_status",
        header: "Deal Status",
        accessorKey: "deal_status",
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
    
];

SalesExecutiveDashboardTableColumn.CountryWiseBiddingBreakdown =
    SalesExecutiveDashboardBiddingBreakdown;
SalesExecutiveDashboardTableColumn.CountryWiseWonDeals =
    SalesExecutiveDashboardWonDeals;
SalesExecutiveDashboardTableColumn.Modal =
    SalesExecutiveDashboardModalTableColumns;
