import dayjs from "dayjs";
import { Popover } from "antd";
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
    },
    {
        id: "total_leads",
        header: "Total Leads",
        accessorKey: "lead_count",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis task-status text-center">
                    {data?.lead_count}
                </span>
            );
        },
    },
    {
        id: "average_bidding_amount",
        header: "Avg. Bidding Amount",
        accessorKey: "avg_lead_value",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis task-status text-center">
                    {data?.avg_lead_value}
                </span>
            );
        },
    },
    {
        id: "percentage",
        header: "Percentage",
        accessorKey: "percentage_lead_value",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis task-status text-center">
                    {data?.percentage_lead_value} %
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
    },
    {
        id: "won_deals_count",
        header: "Won Deals Count",
        accessorKey: "won_deals_count",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis task-status text-center">
                    {data?.won_deals_count} %
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
                <span className="singleline-ellipsis task-status text-center">
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
                <span className="singleline-ellipsis task-status text-center">
                    {data?.avg_won_deals_value}
                </span>
            );
        },
    },
    {
        id: "percentage_won_deals_value",
        header: "Percentage",
        accessorKey: "percentage_won_deals_value",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="singleline-ellipsis task-status text-center">
                    {data?.percentage_won_deals_value} %
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
                <Popover content={data?.project_name}>
                    <span className="singleline-ellipsis">
                        {data?.project_name ?? "N/A"}
                    </span>
                </Popover>
            );
        },
    },
    {
        id: "project_budget",
        header: "Project Budget",
        accessorKey: "project_budget",
        cell: ({ row }) => {
            const data = row.original;
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
                <span>
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
            return <span className="">{`${data?.bidding_time}`}</span>;
        },
    },
    {
        id: "created_by",
        header: "Created By",
        accessorKey: "created_by",
        cell: ({ row }) => {
            const data = row?.original;
            const createdBy = data?.created_by;
            return (
                <Switch>
                    <Switch.Case condition={data.isAdmin}>
                        <PopoverLink
                            url={`/account/employees/${createdBy?.id}`}
                            label={createdBy?.name}
                        />
                    </Switch.Case>
                    <Switch.Case condition={!data.isAdmin}>
                        <Popover content={createdBy?.name}>
                            <span>{createdBy?.name}</span>
                        </Popover>
                    </Switch.Case>
                </Switch>
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
                    {data?.deal_status === 0 ? "Not Applicable" : "Won"}
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
