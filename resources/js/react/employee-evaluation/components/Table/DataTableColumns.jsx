import ActionDropdown from "./ActionDropdown";
import ActionDropdownDataTable from "./ActionDropDownDataTable";
import Person from "./Person";

export const DataTableColumns = [
    // {
    //     header: "#",
    //     accessorKey: "id",
    //     cell: ({ row }) => {
    //         const data = row.original;

    //         return <ColumnContent>{data?.id}</ColumnContent>;
    //     },
    // },
    {
        header: "Employee Name",
        accessorKey: "employeeName",
        cell: ({ row }) => {
            const data = row.original;

            return data?.employeeName ? (
                <Person
                    url={`/account/employees/${data?.employeeId}`}
                    name={data?.employeeName}
                    avatar={null}
                />
            ) : (
                <span style={{ fontWeight: "bold", color: "gray" }}>N/A</span>
            );
        },
    },
    {
        header: "Joining Date",
        accessorKey: "joiningDate",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.joiningDate}</div>;
        },
    },
    {
        header: "First Task Assigned On",
        accessorKey: "firstTaskAssignedOn",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.firstTaskAssignedOn}</div>;
        },
    },
    {
        header: "Started Working On",
        accessorKey: "startedWorkingOn",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.startedWorkingOn}</div>;
        },
    },
    {
        header: "Total Task Submitted",
        accessorKey: "totalTaskSubmitted",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.totalTaskSubmitted}</div>;
        },
    },
    {
        header: "Total Hours Tracked",
        accessorKey: "totalHoursTracked",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.totalHoursTracked}</div>;
        },
    },
    {
        header: "Total Number of Revisions",
        accessorKey: "totalNoOfRevision",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.totalNoOfRevision}</div>;
        },
    },
    {
        header: "Lead Developer Average Rating",
        accessorKey: "averageRatingByLeadDev",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.averageRatingByLeadDev}</div>;
        },
    },
    {
        header: "Team Lead Comment",
        accessorKey: "teamLeadsComment",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div>
                    {data?.teamLeadsComment === ""
                        ? "--"
                        : data?.teamLeadsComment}
                </div>
            );
        },
    },
    {
        header: "Managements Comment",
        accessorKey: "managementsComment",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div>
                    {data?.managementsComment === ""
                        ? "--"
                        : data?.managementsComment}
                </div>
            );
        },
    },
    {
        header: "Accepted/Rejected Date",
        accessorKey: "acceptedOrRejectedOn",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div>
                    {data?.acceptedOrRejectedOn === ""
                        ? "--"
                        : data?.acceptedOrRejectedOn}
                </div>
            );
        },
    },

    {
        header: "Evaluation",
        accessorKey: "action",

        cell: ({ row }) => {
            const data = row.original;

            return <ActionDropdownDataTable data={data} />;
        },
    },
];
