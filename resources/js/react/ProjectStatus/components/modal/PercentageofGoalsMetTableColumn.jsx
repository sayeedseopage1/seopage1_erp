import TablePopover from "../TablePopover";

export const PercentageofGMTableColumn = [
    {
        id: "id",
        header: "#",
        accessorKey: "id",
        cell: ({ row, table, column, cell }) => {
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
    },
    {
        id: "goal_end_date",
        header: "Goal Dead Line",
        accessorKey: "goal_end_date",
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
        id: "description",
        header: "Description",
        accessorKey: "expired_meet_description",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <span title={data?.expired_meet_description} className="multine-ellipsis">
                    {data?.expired_meet_description ?? "--"}
                </span>
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
];
