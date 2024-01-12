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

import ActionDropdown from "./ActionDropdown";
import Avatar from "../../../global/Avatar";
import React from "react";

// const [isModalOpen, setIsModalOpen] = React.useState(false);
// const [selectedProjectName, setSelectedProjectName] = React.useState("");

const TableColumns = [
    {
        id: "clientName",
        header: "Client",
        accessorKey: "clientName",
        cell: ({ row }) => {
            const data = row.original;

            return (
                <div style={{ display: "flex", gap: "5px" }}>
                    <Avatar
                        src={data?.clientImage ?? null}
                        name={data?.clientName}
                        width={28}
                        height={28}
                        type="circle"
                    />

                    <div>{data?.clientName}</div>
                </div>
            );
        },
    },
    {
        id: "project_name",
        header: "Project Name",
        accessorKey: "project_name",

        cell: ({ row }) => {
            const data = row.original;
            return (
                <a
                    // onClick={() => {
                    //     isModalOpen(true);
                    //     setSelectedProjectName(data.project_name);
                    // }}
                    className="multiline-ellipsis text-hover-underline pr-2"
                >
                    {data?.project_name}
                </a>
            );
        },
    },
    {
        id: "project_budget",
        header: "Project Budget",
        accessorKey: "project_budget",
    },
    {
        id: "project_category",
        header: "Project Category",
        accessorKey: "project_category",
    },
    {
        id: "goal_start_date",
        header: "Start Date",
        accessorKey: "goal_start_date",
    },

    {
        id: "action",
        header: "Action",
        cell: (props) => <ActionDropdown {...props} />,
    },
];
