import { CreatedBy } from "../../../ProjectStatus/components/table/ui";

// Components - Custom
import TablePopover from "../TablePopover";
import PersonAvatar from "../PersonAvatar";
import Switch from "../../../global/Switch";
import dayjs from "dayjs";

export const DashBoardDeadlineHistoryModalColumns = [
    {
        id: "previous_deadline",
        header: "Previous Deadline",
        accessorKey: "old_deadline",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="d-flex justify-content-start align-items-center">
                    <p>{data.old_deadline}</p>
                </div>
            );
        },
    },
    {
        id: "requested_on",
        header: "Requested On",
        accessorKey: "deadline_requested_pm",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="d-flex justify-content-start align-items-center">
                    <p>{data.deadline_requested_pm}</p>
                </div>
            );
        },
    },
    {
        id: "reason",
        header: "Reason",
        accessorKey: "description",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <TablePopover
                    text={data?.description}
                    btnClass="text-left"
                    isDangerHtml={true}
                />
            );
        },
    },
    {
        id: "request_status",
        header: "Request Status",
        accessorKey: "request_status",
        cell: ({ row }) => {
            const data = row.original;

            const getStatus = (status) => {
                switch (status) {
                    case 1:
                        return {
                            text: "Pending",
                            color: "rgb(245, 195, 8)",
                        };
                    case 2:
                        return {
                            text: "Approved",
                            color: "rgb(103, 156, 13)",
                        };
                    case 3:
                        return {
                            text: "Denied",
                            color: "rgb(255, 0, 0)",
                        };
                }
            };

            const status = getStatus(data.status);

            return (
                <div className="d-flex justify-content-start align-items-center pl-4">
                    <div
                        style={{
                            width: "fit-content",

                            borderRadius: "17px",
                            marginRight: "4px",
                            padding: "2px 10px",
                            color: "white",
                            backgroundColor: status?.color,
                        }}
                    >
                        <p>{status.text}</p>
                    </div>
                </div>
            );
        },
    },

    {
        id: "approved_on",
        header: "Approved On",
        accessorKey: "approved_on",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="d-flex justify-content-start align-items-center">
                    <Switch>
                        <Switch.Case condition={data?.approved_on}>
                            <p>
                                {" "}
                                {dayjs(data.approved_on).format(
                                    "DD-MM-YYYY h:mm:ss A"
                                )}
                            </p>
                        </Switch.Case>

                        <Switch.Case
                            condition={!data?.approved_on && data.status === 1}
                        >
                            <span>Not Available Yet</span>
                        </Switch.Case>
                        <Switch.Case
                            condition={!data?.approved_on && data.status !== 1}
                        >
                            <span>--</span>
                        </Switch.Case>
                    </Switch>
                </div>
            );
        },
    },
    {
        id: "approved_by",
        header: "Approved By",
        accessorKey: "approved_by",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <Switch>
                    <Switch.Case condition={data?.approved_by?.id}>
                        <CreatedBy
                            href={`/account/employees/${data?.approved_by?.id}`}
                        >
                            <PersonAvatar
                                name={data?.approved_by?.name}
                                avatar={data?.approved_by?.image_url}
                                imageParentClass="rounded-circle"
                                imageClass="rounded-circle"
                            />
                            <span>{data?.approved_by?.name}</span>
                        </CreatedBy>
                    </Switch.Case>
                    <p className="d-flex justify-content-start align-items-center">
                        <Switch.Case
                            condition={
                                data?.approved_by === null && data.status === 1
                            }
                        >
                            Not Available Yet
                        </Switch.Case>
                        <Switch.Case
                            condition={
                                data?.approved_by === null && data.status !== 1
                            }
                        >
                            --
                        </Switch.Case>
                    </p>
                </Switch>
            );
        },
    },
    {
        id: "admin_comment",
        header: "Admin Comment",
        accessorKey: "admin_comment",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <Switch>
                    <Switch.Case condition={data?.admin_comment}>
                        <TablePopover
                            text={data?.admin_comment}
                            btnClass="text-left"
                            isDangerHtml={true}
                        />
                    </Switch.Case>
                    <p className="d-flex justify-content-start align-items-center">
                        <Switch.Case
                            condition={
                                data?.admin_comment === null &&
                                !data?.approved_by?.id
                            }
                        >
                            Not Available Yet
                        </Switch.Case>

                        <Switch.Case
                            condition={
                                data?.admin_comment === null &&
                                data?.approved_by?.id
                            }
                        >
                            --
                        </Switch.Case>
                    </p>
                </Switch>
            );
        },
    },
    {
        id: "extended_deadline",
        header: "Extended Deadline",
        accessorKey: "deadline_extend_admin",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="d-flex justify-content-start align-items-center">
                    <Switch>
                        <Switch.Case condition={data?.deadline_extend_admin}>
                            <p>{data.deadline_extend_admin}</p>
                        </Switch.Case>
                        <Switch.Case
                            condition={
                                !data?.deadline_extend_admin &&
                                !data?.approved_by?.id
                            }
                        >
                            <span>Not Available Yet</span>
                        </Switch.Case>
                        <Switch.Case
                            condition={
                                !data?.deadline_extend_admin &&
                                data?.approved_by?.id
                            }
                        >
                            <span>--</span>
                        </Switch.Case>
                    </Switch>
                </div>
            );
        },
    },
];
