import TablePopover from "../TablePopover";


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
            return <TablePopover text={data?.reason} isDangerHtml={true} />;
        },
    },
    {
        id: "request_status",
        header: "Request Status",
        accessorKey: "request_status",
        
    },

    {
        id: "approved_on",
        header: "Approved On",
        accessorKey: "approved_on",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="d-flex justify-content-start align-items-center">
                    <p>{data.approved_on}</p>
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
                <div className="d-flex justify-content-start align-items-center">
                    <p>{data.approved_on}</p>
                </div>
            );
        },
    },
    {
        id: "extended_deadline",
        header: "Extended Deadline",
        accessorKey: "extended_deadline",
    },
];
