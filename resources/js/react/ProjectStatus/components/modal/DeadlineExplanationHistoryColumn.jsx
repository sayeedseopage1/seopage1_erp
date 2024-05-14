import Avatar from "../../../global/Avatar";
import TablePopover from "../TablePopover";
import { CreatedBy } from "../table/ui";
import Popover from "../ui/Popover";
import style from "../ui/popover.module.css";

export const DeadlineEHColumn = [
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
        id: "start_date",
        header: "Goal Start Date",
        accessorKey: "goal_start_date",
    },
    {
        id: "deadline",
        header: "Goal Dead Line",
        accessorKey: "goal_end_date",
    },
    {
        id: "duration",
        header: "Duration",
        accessorKey: "duration",
        cell: ({ row }) => {
            const data = row?.original;
            return <span>{`${data?.duration} Days` ?? "--"}</span>;
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
        id: "description",
        header: "Expired Meet Des..",
        accessorKey: "expired_meet_description",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <TablePopover
                    text={data?.expired_meet_description}
                    isDangerHtml={true}
                />
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
                        className="fa fa-circle mr-1 f-10"
                        style={{
                            color:
                                data?.goal_status === 0 ? "#FF0000" : "#00b5ff",
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
        accessorKey: "reason",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <TablePopover
                    text={data?.expired_pm_reason}
                    isDangerHtml={true}
                />
            );
        },
    },
    {
        id: "client_communication",
        header: "Client Communication",
        accessorKey: "client_communication",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <TablePopover
                    text={data?.client_communication}
                    isDangerHtml={true}
                />
            );
        },
    },
    {
        id: "client_communication_rating",
        header: "Client Communication Rating",
        accessorKey: "client_communication_rating",
        cell: ({ row }) => {
            const data = row?.original;
            return <TablePopover text={data?.client_communication_rating} />;
        },
    },
    {
        id: "negligence_pm",
        header: "Negligence From Project Manager",
        accessorKey: "negligence_pm",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <TablePopover text={data?.negligence_pm} isDangerHtml={true} />
            );
        },
    },
    {
        id: "negligence_pm_rating",
        header: "Negligence From Project Manager Rating",
        accessorKey: "negligence_pm_rating",
        cell: ({ row }) => {
            const data = row?.original;
            return <TablePopover text={data?.negligence_pm_rating} />;
        },
    },
    {
        id: "any_other_suggestion_admin",
        header: "Any other suggestions from authorizer",
        accessorKey: "any_other_suggestion_admin",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <TablePopover
                    text={data?.any_other_suggestion_admin}
                    isDangerHtml={true}
                />
            );
        },
    },
    {
        id: "authorization_status",
        header: "Authorization Status",
        accessorKey: "authorization_status",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <div
                    style={{
                        width: "fit-content",
                        padding: "0px 10px",
                        borderRadius: "20px",
                        color: "white",
                        backgroundColor:
                            data?.authorization_status === 0
                                ? "#FFB800"
                                : "#3F9C35",
                    }}
                >
                    {data?.authorization_status === 0
                        ? "Pending"
                        : "Authorized"}
                </div>
            );
        },
    },
    {
        id: "authorization_on",
        header: "Authorized On",
        accessorKey: "authorization_on",
    },
    {
        id: "authorization_by",
        header: "Authorized By",
        accessorKey: "authorization_by",
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
                            data?.authorization_by_img
                                ? `/user-uploads/avatar/${data?.authorization_by_img}`
                                : null
                        }
                    />
                    <span>{data?.authorization_by_name}</span>
                </CreatedBy>
            );
        },
    },
];
