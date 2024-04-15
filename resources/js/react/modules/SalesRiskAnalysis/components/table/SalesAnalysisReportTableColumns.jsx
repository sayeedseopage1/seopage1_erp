import { CreatedBy } from "../../../../ProjectStatus/components/table/ui";
import Avatar from "../../../../global/Avatar";
import Tooltip from "../Tooltip";

export const SalesAnalysisReportTableColumns = [
    {
        id: "id",
        header: "#",
        accessorKey: "id",
        cell: ({ row }) => {
            return <p className="multiline-ellipsis">{row.index + 1}</p>;
        },
    },
    {
        id: "client",
        header: "Client",
        accessorKey: "client",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <CreatedBy href={`/account/clients/${data.client_id}`}>
                    <Avatar
                        type="circle"
                        name={data?.client_name}
                        src={
                            data?.client_image
                                ? `/user-uploads/avatar/${data?.clientImage}`
                                : null
                        }
                    />
                    <span>{data?.client_name}</span>
                </CreatedBy>
            );
        },
    },
    {
        id: "project",
        header: "Project",
        accessorKey: "project",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="multiline-ellipsis">
                    <Tooltip text={data?.project_name} key="title-tooltip">
                        {data?.project_name}
                    </Tooltip>
                </p>
            );
        },
    },
    {
        id: "deal",
        header: "Deal",
        accessorKey: "deal",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <>
                    {data?.deal_name ? (
                        <a
                            href={`/account/contracts/${data?.deal_id}`}
                            className="hover-underline multine-ellipsis"
                        >
                            {data?.deal_name ?? "N/A"}{" "}
                        </a>
                    ) : (
                        <p className="multiline-ellipsis">N/A</p>
                    )}
                </>
            );
        },
    },
    {
        id: "lead",
        header: "Lead",
        accessorKey: "lead",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="multiline-ellipsis">{data?.lead_id ?? "N/A"}</p>
            );
        },
    },
    {
        id: "project_budget",
        header: "Project Budget",
        accessorKey: "project_budget",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="multiline-ellipsis">
                    {data?.project_budget ?? "N/A"}
                </p>
            );
        },
    },
    {
        id: "country",
        header: "Country",
        accessorKey: "country",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="multiline-ellipsis">{data?.country ?? "N/A"}</p>
            );
        },
    },
    {
        id: "award_time",
        header: "Award Time",
        accessorKey: "award_time",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="multiline-ellipsis">
                    {data?.award_time ?? "N/A"}
                </p>
            );
        },
    },
    {
        id: "gained_points",
        header: "Gained Points",
        accessorKey: "gained_points",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="multiline-ellipsis">{data?.points ?? "N/A"}</p>
            );
        },
    },
    {
        id: "authorized_by",
        header: "Authorized By",
        accessorKey: "authorized_by",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <>
                    {data?.authorized_by ? (
                        <CreatedBy
                            href={`/account/employees/${data.authorize_by_id}`}
                        >
                            <Avatar
                                type="circle"
                                name={data?.authorized_by}
                                src={
                                    data?.authorized_by_image
                                        ? `/user-uploads/avatar/${data?.authorize_by_photo}`
                                        : null
                                }
                            />
                            <span>{data?.authorize_by_name}</span>
                        </CreatedBy>
                    ) : (
                        <p>N/A</p>
                    )}
                </>
            );
        },
    },
    {
        id: "authorized_on",
        header: "Authorized On",
        accessorKey: "authorized_on",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="multiline-ellipsis">
                    {data?.authorized_on ?? "N/A"}
                </p>
            );
        },
    },
    {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="multiline-ellipsis">{data?.status ?? "N/A"}</p>
            );
        },
    },
    {
        id: "action",
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => {
            return <button className="btn btn-sm btn-primary py-1" >View</button>;
        },
    },
];
