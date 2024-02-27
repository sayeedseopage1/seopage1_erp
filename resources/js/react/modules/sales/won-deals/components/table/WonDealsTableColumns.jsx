import dayjs from "dayjs";
import { CreatedAt, CreatedBy, EmptySpace } from "./ui";
import Avatar from "../../../../../global/Avatar";
import ActionDropdown from "./ActionDropdown";

export const WonDealsTableColumns = [
    {
        id: "short_code",
        header: "Short Code",
        cell: ({ row }) =>
            (
                <div
                    dangerouslySetInnerHTML={{
                        __html: row.original?.short_code_html,
                    }}
                />
            ) ?? <EmptySpace> -- </EmptySpace>,
    },
    {
        id: "project_name",
        header: "Project Name",
        accessorKey: "project_name",
        cell: ({ row }) => {
            const data = row.original;

            const isHourly = data?.project_type?.toLowerCase() === "hourly";

            if (!data?.project_name) {
                <EmptySpace> -- </EmptySpace>;
            }

            return (
                <>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: data?.project_name_html,
                        }}
                    />
                    {isHourly && (
                        <span className="badge badge-success">Hourly</span>
                    )}
                </>
            );
        },
    },

    {
        id: "cms",
        header: "CMS Name",
        accessorKey: "cms_name",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="multiline-ellipsis pr-2">
                    {data?.cms_name || <EmptySpace> -- </EmptySpace>}
                </span>
            );
        },
    },
    {
        id: "amount",
        header: "Amount",
        accessorKey: "amounts",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div dangerouslySetInnerHTML={{ __html: data?.value }}></div>
            );
        },
    },
    {
        id: "client_name",
        header: "Client",
        accessorKey: "client_name",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <CreatedBy href={`/account/clients/${data.client_id}`}>
                    <Avatar
                        type="circle"
                        name={data?.client_name}
                        src={
                            data?.client_avatar
                                ? `/user-uploads/avatar/${data?.client_avatar}`
                                : null
                        }
                    />

                    <span>{data?.client_name}</span>
                </CreatedBy>
            );
        },
    },
    {
        id: "project_manager",
        header: "Project Manager",
        accessorKey: "project_manager",
        cell: ({ row }) => {
            const data = row.original;
            if (!data?.pm_id) {
                return <EmptySpace> -- </EmptySpace>;
            }

            return (
                <CreatedBy href={`/account/employees/${data.pm_id}`}>
                    <Avatar
                        type="circle"
                        name={data?.pm_name}
                        src={
                            data?.pm_avatar
                                ? `/user-uploads/avatar/${data?.pm_avatar}`
                                : null
                        }
                    />

                    <span>{data?.pm_name}</span>
                </CreatedBy>
            );
        },
    },
    {
        id: "closing_date",
        header: "Closing Date",
        accessorKey: "closing_date",
        cell: ({ row }) => {
            const data = row.original;
            console.log("data in won deal table", data);
            const date = data?.closing_date ? (
                dayjs(data?.closing_date).format(`DD-MM-YYYY hh:mm:ss A`)
            ) : (
                <EmptySpace> -- </EmptySpace>
            );
            return <CreatedAt>{date}</CreatedAt>;
        },
    },
    {
        id: "client_contact_form",
        header: "Client Contact Form",
        accessorKey: "",
        cell: ({ row }) => {
            const data = row.original;
            const status =
                data?.submission_status === "Submitted"
                    ? "Submitted"
                    : "Awaiting for client Response";
            const bgColor =
                status === "Submitted"
                    ? "badge badge-success"
                    : "badge badge-warning";

            return <span className={bgColor}>{status}</span>;
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
        header: "Closed By",
        accessorKey: "added_by_name",
        cell: ({ row }) => {
            const data = row.original;

            if (!data?.added_by_name) {
                return <EmptySpace> -- </EmptySpace>;
            }

            return (
                <CreatedBy href={`/account/employees/${data.added_by}`}>
                    <Avatar
                        type="circle"
                        name={data?.added_by_name}
                        src={
                            data?.added_by_avatar
                                ? `/user-uploads/avatar/${data?.added_by_avatar}`
                                : null
                        }
                    />

                    <span>{data?.added_by_name}</span>
                </CreatedBy>
            );
        },
    },
    {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
            const data = row.original;
            const status = data?.status?.toLowerCase();

            if (status === "accepted") {
                return <span className="badge badge-success"> Accepted </span>;
            } else if (status === "denied") {
                return <span className="badge badge-danger"> Denied </span>;
            } else {
                return <span className="badge badge-warning"> Pending </span>;
            }
        },
    },

    {
        id: "action",
        header: "Action",
        cell: (props) => <ActionDropdown {...props} />,
    },
];
