import { CreatedBy } from "../../../ProjectStatus/components/table/ui";

// Components - Custom
import TablePopover from "../TablePopover";
import PersonAvatar from "../PersonAvatar";
import Switch from "../../../global/Switch";

export const DashBoardDeadlineHistoryModalColumns = [
    {
        id: "previous_deadline",
        header: "Previous Deadline",
        accessorKey: "previous_deadline",
    },
    {
        id: "requested_on",
        header: "Requested On",
        accessorKey: "requested_on",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="d-flex justify-content-start align-items-center">
                    <p>{data.requested_on}</p>
                </div>
            );
        },
    },
    {
        id: "reason",
        header: "Reason",
        accessorKey: "reason",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <TablePopover
                    text={data?.reason}
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
            return (
                <div className="d-flex justify-content-start align-items-center pl-4">
                    <div
                        style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            marginRight: "4px",
                            backgroundColor: data.request_status.includes(
                                "Approved"
                            )
                                ? "rgb(103, 156, 13)"
                                : "rgb(245, 195, 8)",
                        }}
                    />
                    <p>{data.request_status}</p>
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
                            <p>{data.approved_on}</p>
                        </Switch.Case>
                        <Switch.Case condition={!data?.approved_on}>
                            <span>Not Available Yet</span>
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
                    <Switch.Case condition={data?.approved_by_id}>
                        <CreatedBy
                            href={`/account/employees/${data?.approved_by_id}`}
                        >
                            <PersonAvatar
                                name={data?.approved_by_name}
                                avatar={data?.approved_by_photo}
                                imageParentClass="rounded-circle"
                                imageClass="rounded-circle"
                            />
                            <span>{data.approved_by_name}</span>
                        </CreatedBy>
                    </Switch.Case>
                    <Switch.Case condition={data?.approved_by_id === null}>
                        <p className="d-flex justify-content-start align-items-center">
                            Not Available Yet
                        </p>
                    </Switch.Case>
                </Switch>
            );
        },
    },
    {
        id: "extended_deadline",
        header: "Extended Deadline",
        accessorKey: "extended_deadline",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="d-flex justify-content-start align-items-center">
                    <Switch>
                        <Switch.Case condition={data?.extended_deadline}>
                            <p>{data.extended_deadline}</p>
                        </Switch.Case>
                        <Switch.Case condition={!data?.extended_deadline}>
                            <span>Not Available Yet</span>
                        </Switch.Case>
                    </Switch>
                </div>
            );
        },
    },
];
