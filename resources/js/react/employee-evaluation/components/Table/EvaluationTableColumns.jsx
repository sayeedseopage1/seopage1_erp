import ActionDropdown from "./ActionDropdown";
export const EvaluationTableColumns = [
    // {
    //     header: "#",
    //     accessorKey: "id",
    //     cell: ({ row }) => {
    //         const data = row.original;

    //         return <ColumnContent>{data?.id}</ColumnContent>;
    //     },
    // },
    {
        id: "task_name",
        header: "Task Name",
        accessorKey: "task_name",
        cell: ({ row }) => {
            const data = row.original;

            return <div>{data?.task_name}</div>;
        },
    },
    {
        id: "assign_date",
        header: "Assign Date",
        accessorKey: "assign_date",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.assign_date}</div>;
        },
    },
    {
        id: "submission_date",
        header: "Submission Date",
        accessorKey: "submission_date",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.submission_date}</div>;
        },
    },
    {
        id: "completed_work",
        header: "Completed Work Link",
        accessorKey: "completed_work",
        cell: ({ row }) => {
            const data = row.original;
            return data?.completed_work?.map((data) => (
                <a href={data.completed_work}>{data?.completed_work}</a>
            ));
        },
    },
    {
        id: "total_hours",
        header: "Total Hours Tracked",
        accessorKey: "total_hours",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div>
                    {`${data?.total_hours || 0} hr ${data?.total_min || 0} min`}
                </div>
            );
        },
    },

    {
        id: "revision_number",
        header: "Revisions Needed",
        accessorKey: "revision_number",
        cell: ({ row }) => {
            const data = row.original;

            return (
                <div style={{ marginLeft: "30%" }}>{data?.revision_number}</div>
            );
        },
    },

    {
        header: "Ratings",
        accessorKey: "action",

        cell: ({ row }) => {
            const data = row.original;

            // return <ActionDropdown data={data} />;
            return <button>Button</button>;
        },
    },
];
