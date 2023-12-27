import dayjs from "dayjs";
import {
    Action,
    BidValue,
    BiddingDelayTime,
    CreatedAt,
    CreatedBy,
    DealStatus,
    EmptySpace,
    ProjectBudget,
    ProjectID,
    Status,
} from "./ui";
// import { Menu } from "@headlessui/react";
// import ActionDropdown from "./ActionDropdown";
import Avatar from "../../../../../global/Avatar";
 

export const DealsTableColumns = [
    {
        id: "id",
        header: "#",
        cell: ({row}) => row.original?.id,
    },
    {
        id: "deal_name",
        header: "Deal Name",
        accessorKey: "",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <a
                    href={`/account/deals/${data?.id}`}
                    className="multiline-ellipsis text-hover-underline"
                >
                    {data?.project_name}
                </a>
            );
        },
    },
    {
        id: "client",
        header: "Client",
        accessorKey: "client_name",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="multiline-ellipsis text-hover-underline pr-2">
                    {data?.client_name || data?.client_username || <EmptySpace> -- </EmptySpace>}
                </span>
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
                    {data?.project_link ?? <EmptySpace> -- </EmptySpace>}
                </a>
            );
        },
    },
    {
        id: "project_budget",
        header: "Project Budget (USD)",
        accessorKey: "amount",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <ProjectBudget> 
                    {`${data?.ammount_currency_symbol} ${data?.amount}`}
                </ProjectBudget>
            );
        },
    },
    {
        id: "project_budget_original_currency",
        header: "Project Budget (Original Currency)",
        accessorKey: "actual_amount",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <ProjectBudget>
                    {`${data?.actual_amount_currency_symbol} ${data?.actual_amount}`}
                </ProjectBudget>
            );
        },
    },
    {
        id: "created_at",
        header: "Created Date",
        accessorKey: "created_at",
        cell: ({ row }) => {
            const data = row.original;
            const date = data?.created_at
                ? dayjs(data?.created_at).format(`DD-MM-YYYY hh:mm:ss A`)
                : <EmptySpace> -- </EmptySpace>;
            return <CreatedAt>{date}</CreatedAt>;
        },
    }, 
    {
        id: "added_by",
        header: "Added By",
        accessorKey: "lead_added_by",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <CreatedBy
                    href={`/account/employees/${data.lead_added_by}`}
                >
                    <Avatar
                        type="circle"
                        name={data?.lead_added_by_name}
                        src={data?.lead_added_by_image ? `/user-uploads/avatar/${data?.lead_added_by_image}` : null}
                    />

                    <span>{data?.lead_added_by_name}</span>
                </CreatedBy>
            );
        },
    },
    {
        id: "closed_by",
        header: "Closed By",
        accessorKey: "lead_added_by",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <CreatedBy
                    href={`/account/employees/${data.deal_stages_converted_by}`}
                >
                    <Avatar
                        type="circle"
                        name={data?.deal_stages_converted_by_name}
                        src={data?.deal_stages_converted_by_image ? `/user-uploads/avatar/${data?.deal_stages_converted_by_image}` : null}
                    />

                    <span>{data?.deal_stages_converted_by_name}</span>
                </CreatedBy>
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
        id: "action",
        header: "Action",
        cell: (props) => '',
    },
];
