import dayjs from "dayjs";
import {
    Action,
    BidValue,
    BiddingDelayTime,
    CreatedAt,
    CreatedBy,
    DealStatus,
    ProjectBudget,
    ProjectID,
    Status,
} from "./ui";
import { Menu } from "@headlessui/react";
import ActionDropdown from "./ActionDropdown";
import Avatar from "../../../../../global/Avatar";

export const LeadTableColumns = [
    {
        id: "id",
        header: "#",
        cell: ({row}) => row.original.id,
    },
    {
        id: "project_name",
        header: "Project Name",
        accessorKey: "client_name",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <a
                    href={`/account/leads/${data?.id}`}
                    className="multiline-ellipsis text-hover-underline"
                >
                    {data?.client_name}
                </a>
            );
        },
    },
    {
        id: "project_link",
        header: "Project Link",
        accessorKey: "project_link",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <a
                    href={data?.project_link}
                    className="multiline-ellipsis text-hover-underline pr-2"
                >
                    {data?.project_link}
                </a>
            );
        },
    },
    {
        id: "project_id",
        header: "Project ID",
        accessorKey: "project_id",
        cell: ({ row }) => {
            const data = row.original;
            return <ProjectID>{data?.project_id ?? "--"}</ProjectID>;
        },
    },
    {
        id: "project_budget",
        header: "Project Budget",
        accessorKey: "bid_value2",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <ProjectBudget>
                    {`${data?.currency_symbol}${data?.bid_value} - ${data?.currency_symbol}${data?.bid_value2}`}
                </ProjectBudget>
            );
        },
    },
    {
        id: "bid_value",
        header: "Bid Value",
        accessorKey: "actual_value",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <BidValue>
                    {`${data?.currency_symbol}${data?.actual_value}`}
                </BidValue>
            );
        },
    },
    {
        id: "created_at",
        header: "Created",
        accessorKey: "lead_created_at",
        cell: ({ row }) => {
            const data = row.original;
            const date = data?.lead_created_at
                ? dayjs(data?.lead_created_at).format(`DD-MM-YYYY hh:mm:ss A`)
                : "--";
            return <CreatedAt>{date}</CreatedAt>;
        },
    },
    {
        id: "created_by",
        header: "Created By",
        accessorKey: "agent_name",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <CreatedBy
                    href={`/account/employees/${data.added_by}`}
                >
                    <Avatar
                        type="circle"
                        name={data?.agent_name}
                        src={data?.user?.image_url ?? null}
                    />

                    <span>{data?.agent_name}</span>
                </CreatedBy>
            );
        },
    },
    {
        id: "bidding_delay_time",
        header: "Bidding Delay Time",
        accessorFn: (row) => row?.bidding_minutes * 60 + row?.bidding_seconds,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <BiddingDelayTime>
                    {`${data?.bidding_minutes} min ${data?.bidding_seconds} sec`}
                </BiddingDelayTime>
            );
        },
    },
    {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
            const data = row.original;

            return (
                <Status>
                    {data.deal_status === 0 ? (
                        <span className="badge badge-danger">
                            {" "}
                            Not Converted to Deal{" "}
                        </span>
                    ) : (
                        <span className="badge badge-success">
                            {" "}
                            Converted to Deal{" "}
                        </span>
                    )}
                </Status>
            );
        },
    },
    {
        id: "deal_status",
        header: "Deal Status",
        cell: ({ row }) => {
            const data = row.original;
            const status = [
                {
                    label: "Not Applicable",
                    bgColor: "transparent",
                    color: "#777",
                },
                {
                    label: "Won",
                    bgColor: "#0AAA29",
                    color: "#fff",
                },
                {
                    label: "Lost",
                    bgColor: "#EC3003",
                    color: "#fff",
                },
                {
                    label: "Not Activity Yet",
                    bgColor: "#FAA700",
                    color: "#fff",
                },
            ];

            const s = status[data?.won_lost];

            return (
                <DealStatus backgroundColor={s.bgColor} color={s.color}>
                    {s.label}
                </DealStatus>
            );
        },
    },
    {
        id: "action",
        header: "Action",
        cell: (props) => <ActionDropdown {...props} />,
    },
];
