import Avatar from "../../../global/Avatar";
import { getColor } from "../../../utils/getColor";
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
            const handleDuration = () => {
                if (data?.duration) {
                    const duration = parseFloat(data?.duration);
                    const getDays = parseInt(duration);
                    const getHours = Math.floor((duration - getDays) * 24);
                    return `${getDays} Days${
                        getHours === 0 ? "" : ` ${getHours} Hours`
                    }`;
                } else {
                    return "--";
                }
            };
            return <span>{handleDuration()}</span>;
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

            function convertToPercentage(number) {
                if (number < 1 || number > 10) {
                    return "Number must be between 1 and 10";
                }
                let percentage = (number / 10) * 100;
                return percentage;
            }
            return (
                <div
                    style={{
                        backgroundColor: "lightgray",
                        borderRadius: "8px",
                    }}
                >
                    <div
                        className="progress-bar f-12"
                        role="progressbar"
                        style={{
                            width: `${
                                convertToPercentage(
                                    data?.client_communication_rating
                                ) ?? 0
                            }%`,
                            backgroundColor: getColor(
                                convertToPercentage(
                                    data?.client_communication_rating
                                ) ?? 0
                            ),
                            height: "15px",
                            borderRadius: "8px",
                        }}
                        aria-valuenow={data?.client_communication_rating ?? 0}
                        aria-valuemin="0"
                        aria-valuemax="10"
                    >
                        {data?.client_communication_rating
                            ? `${data?.client_communication_rating}/10`
                            : 0}
                    </div>
                </div>
            );
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
            function convertToPercentage(number) {
                if (number < 1 || number > 10) {
                    return "Number must be between 1 and 10";
                }
                let percentage = (number / 10) * 100;
                return percentage;
            }
            return (
                <div
                    style={{
                        backgroundColor: "lightgray",
                        borderRadius: "8px",
                    }}
                >
                    <div
                        className="progress-bar f-12"
                        role="progressbar"
                        style={{
                            width: `${
                                convertToPercentage(
                                    data?.negligence_pm_rating
                                ) ?? 0
                            }%`,
                            backgroundColor: getColor(
                                convertToPercentage(
                                    data?.negligence_pm_rating
                                ) ?? 0
                            ),
                            height: "15px",
                            borderRadius: "8px",
                        }}
                        aria-valuenow={data?.negligence_pm_rating ?? 0}
                        aria-valuemin="0"
                        aria-valuemax="10"
                    >
                        {data?.negligence_pm_rating
                            ? `${data?.negligence_pm_rating}/10`
                            : 0}
                    </div>
                </div>
            );
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
