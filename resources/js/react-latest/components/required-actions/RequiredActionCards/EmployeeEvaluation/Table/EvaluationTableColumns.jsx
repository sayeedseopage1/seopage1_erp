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
        header: "Individual Task Name",
        accessorKey: "taskName",
        cell: ({ row }) => {
            const data = row.original;

            return <div>{data?.taskName}</div>;
        },
    },
    {
        header: "Assign Date",
        accessorKey: "assignDate",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.assignDate}</div>;
        },
    },
    {
        header: "Submission Date",
        accessorKey: "submissionDate",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.submissionDate}</div>;
        },
    },
    {
        header: "Link to the Completed Work",
        accessorKey: "completedWorkLink",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <a href={data.completedWorkLink}>{data?.completedWorkLink}</a>
            );
        },
    },
    {
        header: "Total Hours Tracked",
        accessorKey: "totalHoursTracked",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div style={{ marginLeft: "30%" }}>
                    {data?.totalHoursTracked}
                </div>
            );
        },
    },

    {
        header: "Number of Revision Needed",
        accessorKey: "numberOfRevisions",
        cell: ({ row }) => {
            const data = row.original;

            return (
                <div style={{ marginLeft: "30%" }}>
                    {data?.numberOfRevisions}
                </div>
            );
        },
    },

    {
        header: "Action",
        accessorKey: "action",

        cell: ({ row }) => {
            const data = row.original;

            return <ActionDropdown data={data} />;
        },
    },
];
