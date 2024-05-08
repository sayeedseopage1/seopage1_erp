export const DashboardDataTableTaskColumns = [
    {
        id: "task_name",
        header: "Task name",
        accessorKey: "task_name",
        cell: ({ row }) => {
            const data = row.original
            return (
                <a href={`/account/tasks/${data.task_id}`} className="singleline-ellipsis">{data.task_name}</a>
            );
        },
    },
    {
        id: "creation_date",
        header: "Creation date",
        accessorKey: "creation_date",
    },
    {
        id: "due_date",
        header: "Due date",
        accessorKey: "due_date",
    },
    {
        id: "status",
        header: "Status",
        accessorKey: "status",
    },
    {
        id: "tracking_start_time",
        header: "Tracking start time",
        accessorKey: "tracking_start_time",
    },
    {
        id: "estimated_hours",
        header: "Estimated hours",
        accessorKey: "estimated_hours",
    },
    {
        id: "logged_hours",
        header: "Logged hours",
        accessorKey: "logged_hours",
    },
];
