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
import ActionDropdown from "./ActionDropdown";
import Avatar from "../../../../../global/Avatar";

export const DealsTableColumns = [
    {
        id: "id",
        header: "#",
        cell: ({ row }) => row.original?.id,
    },
    {
        id: "project_name",
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
        id: "client_username",
        header: "Client",
        accessorKey: "client_username",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="multiline-ellipsis pr-2">
                    {data?.client_username || <EmptySpace> -- </EmptySpace>}
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
                    className="multiline-ellipsis text-hover-underline mr-2"
                >
                    {(data?.lead_id
                        ? data?.lead_project_link
                        : data?.project_link) ?? <EmptySpace> -- </EmptySpace>}
                </a>
            );
        },
    },
    {
        id: "amount",
        header: "Project Budget (USD)",
        accessorKey: "amount",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <ProjectBudget>
                    {`${data?.ammount_currency_symbol} ${Number(
                        data?.amount
                    ).toFixed(0)}`}
                </ProjectBudget>
            );
        },
    },
    {
        id: "actual_amount",
        header: "Project Budget (Original Currency)",
        accessorKey: "actual_amount",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <ProjectBudget>
                    {`${data?.actual_amount_currency_symbol} ${Number(
                        data?.actual_amount
                    ).toFixed(2)}`}
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
            const date = data?.created_at ? (
                dayjs(data?.created_at).format(`DD-MM-YYYY hh:mm:ss A`)
            ) : (
                <EmptySpace> -- </EmptySpace>
            );
            return <CreatedAt>{date}</CreatedAt>;
        },
    },
    {
        id: "added_by_name",
        header: "Added By",
        accessorKey: "added_by_name",
        cell: ({ row }) => {
            const data = row.original;

            if (!data?.lead_id) {
                return (
                    <CreatedBy href={`/account/employees/${data.added_by}`}>
                        <Avatar
                            type="circle"
                            name={data?.added_by_name}
                            src={
                                data?.added_by_image
                                    ? `/user-uploads/avatar/${data?.added_by_image}`
                                    : null
                            }
                        />

                        <span>{data?.added_by_name}</span>
                    </CreatedBy>
                );
            } else if (!data?.added_by_name) {
                return <EmptySpace> -- </EmptySpace>;
            }

            return (
                <CreatedBy href={`/account/employees/${data.lead_added_by}`}>
                    <Avatar
                        type="circle"
                        name={data?.added_by_name}
                        src={
                            data?.lead_added_by_image
                                ? `/user-uploads/avatar/${data?.lead_added_by_image}`
                                : null
                        }
                    />

                    <span>{data?.added_by_name}</span>
                </CreatedBy>
            );
        },
    },
    {
        id: "deal_stages_converted_by_name",
        header: "Closed By",
        accessorKey: "deal_stages_converted_by_name",
        cell: ({ row }) => {
            const data = row.original;

            if (!data?.deal_stages_converted_by_name) {
                return <EmptySpace> -- </EmptySpace>;
            }

            return (
                <CreatedBy
                    href={`/account/employees/${data.deal_stages_converted_by}`}
                >
                    <Avatar
                        type="circle"
                        name={data?.deal_stages_converted_by_name}
                        src={
                            data?.deal_stages_converted_by_image
                                ? `/user-uploads/avatar/${data?.deal_stages_converted_by_image}`
                                : null
                        }
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
                <Status bgColor={data?.won_lost_bg}>{data?.won_lost}</Status>
            );
        },
    },

    {
        id: "action",
        header: "Action",
        cell: (props) => <ActionDropdown {...props} />,
    },
];
