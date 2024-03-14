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
        accessorKey: "individualTaskName",
        cell: ({ row }) => {
            const data = row.original;

            return <div>{data?.individualTaskName}</div>;
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
        accessorKey: "linkToTheCompletedWork",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <a href={data.linkToTheCompletedWork}>
                    {data?.linkToTheCompletedWork}
                </a>
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
        accessorKey: "numberOfRevisionsNeeded",
        cell: ({ row }) => {
            const data = row.original;

            return (
                <div style={{ marginLeft: "30%" }}>
                    {data?.numberOfRevisionsNeeded}
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
