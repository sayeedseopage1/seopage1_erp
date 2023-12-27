// import dayjs from "dayjs";
// import {
//     Action,
//     BidValue,
//     BiddingDelayTime,
//     CreatedAt,
//     CreatedBy,
//     DealStatus,
//     ProjectBudget,
//     ProjectID,
//     Status,
// } from "./ui";
// import { Menu } from "@headlessui/react";
// import ActionDropdown from "./ActionDropdown";
// import Avatar from "../../../../../global/Avatar";

import { EmptySpace } from "./ui";

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
        accessorKey: "bid_value2",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <ProjectBudget>
                    {/* {`${data?.currency_symbol}${data?.bid_value} - ${data?.currency_symbol}${data?.bid_value2}`} */}
                </ProjectBudget>
            );
        },
    },
    {
        id: "project_budget_original_currency",
        header: "Project Budget (Original Currency)",
        accessorKey: "bid_value2",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <ProjectBudget>
                    {/* {`${data?.currency_symbol}${data?.bid_value} - ${data?.currency_symbol}${data?.bid_value2}`} */}
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
        accessorKey: "add",
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
    // {
    //     id: "bidding_delay_time",
    //     header: "Bidding Delay Time",
    //     accessorFn: (row) => row?.bidding_minutes * 60 + row?.bidding_seconds,
    //     cell: ({ row }) => {
    //         const data = row.original;
    //         return (
    //             <BiddingDelayTime>
    //                 {`${data?.bidding_minutes} min ${data?.bidding_seconds} sec`}
    //             </BiddingDelayTime>
    //         );
    //     },
    // },
    // {
    //     id: "status",
    //     header: "Status",
    //     cell: ({ row }) => {
    //         const data = row.original;

    //         return (
    //             <Status>
    //                 {data.deal_status === 0 ? (
    //                     <span className="badge badge-danger">
    //                         {" "}
    //                         Not Converted to Deal{" "}
    //                     </span>
    //                 ) : (
    //                     <span className="badge badge-success">
    //                         {" "}
    //                         Converted to Deal{" "}
    //                     </span>
    //                 )}
    //             </Status>
    //         );
    //     },
    // },
    // {
    //     id: "deal_status",
    //     header: "Deal Status",
    //     cell: ({ row }) => {
    //         const data = row.original;
    //         const status = [
    //             {
    //                 label: "Not Applicable",
    //                 bgColor: "transparent",
    //                 color: "#777",
    //             },
    //             {
    //                 label: "Won",
    //                 bgColor: "#0AAA29",
    //                 color: "#fff",
    //             },
    //             {
    //                 label: "Lost",
    //                 bgColor: "#EC3003",
    //                 color: "#fff",
    //             },
    //             {
    //                 label: "Not Activity Yet",
    //                 bgColor: "#FAA700",
    //                 color: "#fff",
    //             },
    //         ];

    //         const s = status[data?.won_lost];

    //         return (
    //             <DealStatus backgroundColor={s.bgColor} color={s.color}>
    //                 {s.label}
    //             </DealStatus>
    //         );
    //     },
    // },
    // {
    //     id: "action",
    //     header: "Action",
    //     cell: (props) => <ActionDropdown {...props} />,
    // },
];
