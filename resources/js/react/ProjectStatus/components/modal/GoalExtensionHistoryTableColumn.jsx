import Avatar from "../../../global/Avatar";
import TablePopover from "../TablePopover";
import { CreatedBy } from "../table/ui";
import Popover from "../ui/Popover";
import style from "../ui/popover.module.css";

export const GoalExtensionHistoryTableColumn = [
    {
        id: "id",
        header: "#",
        accessorKey: "id",
        cell: ({ cell }) => {
            return (
                <div
                    style={{
                        width: "20px",
                    }}
                >
                    {cell?.row?.index + 1}
                </div>
            );
        },
    },
    {
        id: "goal_start_date",
        header: "Goal Start Date",
        accessorKey: "goal_start_date",
        cell: ({ row }) => {
            const data = row?.original;
            return <span>{data?.goal_start_date}</span>;
        },
    },
    {
        id: "goal_end_date",
        header: "Prev. Goal Deadline",
        accessorKey: "old_deadline",
        cell: ({ row }) => {
            const data = row?.original;
            return <span>{data?.old_deadline}</span>;
        },
    },
    {
        id: "new_goal_deadline",
        header: "New Goal Deadline",
        accessorKey: "new_deadline",
        cell: ({ row }) => {
            const data = row?.original;
            return <span>{data?.new_deadline ?? "--"}</span>;
        },
    },
    {
        id: "goal_name",
        header: "Goal Name",
        accessorKey: "goal_name",
        cell: ({ row }) => {
            const data = row?.original;
            return <TablePopover text={data?.goal_name} />;
        },
    },
    {
        id: "duration",
        header: "Duration",
        accessorKey: "duration",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <span>
                    {`${data?.new_duration ?? data?.old_duration} Days` ?? "--"}
                </span>
            );
        },
    },
    {
        id: "description",
        header: "Admin Comment",
        accessorKey: "extended_admin_comment",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <TablePopover text={data?.extended_admin_comment} isDangerHtml={true} />
            );
        },
    },
    {
        id: "status",
        header: "Goal Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <div className="d-flex align-items-center">
                    <i
                        class="fa fa-circle mr-1 f-10"
                        style={{
                            color:
                                data?.goal_status === 0
                                    ? "#1492d2 "
                                    : "#218838",
                        }}
                    ></i>
                    {data?.goal_status === 0 ? "Incomplete" : "Completed"}
                </div>
            );
        },
    },
    {
        id: "reason",
        header: "PM Reason",
        accessorKey: "extended_pm_reason",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <TablePopover text={data?.extended_pm_reason} isDangerHtml={true} />
            );
        },
    },
    {
        id: "authorization_status",
        header: "Authorization Status",
        accessorKey: "auth_status",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <div className="d-flex align-items-center justify-content-center">
                    <p
                        style={{
                            backgroundColor:
                                data?.auth_status === 2 ? "#ff3838" : "#018839",
                            color: "#fff",
                            padding: "5px 10px",
                            borderRadius: "20px",
                        }}
                    >
                        {data?.auth_status === 2 ? "Rejected" : "Accepted"}
                    </p>
                </div>
            );
        },
    },
    {
        id: "extension_req_on",
        header: "Extension Requested On",
        accessorKey: "extension_req_on",
    },
    {
        id: "extension_req_for",
        header: "Extension Requested For",
        accessorKey: "extension_req_for",
    },
    {
        id: "extension_req_auth_on",
        header: "Extension Req. Authorized On",
        accessorKey: "extension_req_auth_on",
    },
    {
        id: "extension_req_authorized_by",
        header: "Extension Req. Authorized By",
        accessorKey: "extension_req_authorized_by",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <CreatedBy
                    href={`/account/employees/${data.authorization_by_id}`}
                >
                    <Avatar
                        type="circle"
                        name={data?.authorization_by_name}
                        src={
                            data?.clientImage
                                ? `/user-uploads/avatar/${data?.authorization_by_img}`
                                : null
                        }
                    />
                    <span>{data?.authorization_by_name}</span>
                </CreatedBy>
            );
        },
    },
    {
        id: "extension_req_authorized_for",
        header: "Extension Req. Authorized For",
        accessorKey: "extension_req_auth_for",
    },
];
