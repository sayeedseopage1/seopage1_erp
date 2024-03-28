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
        id: "employeeName",
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
        id: "joiningDate",
        header: "Joining Date",
        accessorKey: "joiningDate",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.joiningDate}</div>;
        },
    },
    {
        id: "firstTaskAssignedOn",
        header: "First Task Assigned On",
        accessorKey: "firstTaskAssignedOn",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.firstTaskAssignedOn}</div>;
        },
    },
    {
        id: "startedWorkingOn",
        header: "Started Working On",
        accessorKey: "startedWorkingOn",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.startedWorkingOn}</div>;
        },
    },
    {
        id: "totalTaskSubmitted",
        header: "Total Task Submitted",
        accessorKey: "totalTaskSubmitted",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.totalTaskSubmitted}</div>;
        },
    },
    {
        id: "totalHoursTracked",
        header: "Total Hours Tracked",
        accessorKey: "totalHoursTracked",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.totalHoursTracked}</div>;
        },
    },
    {
        id: "totalNoOfRevision",
        header: "Total Number of Revisions",
        accessorKey: "totalNoOfRevision",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.totalNoOfRevision}</div>;
        },
    },
    {
        id: "averageRatingByLeadDev",
        header: "Lead Developer Average Rating",
        accessorKey: "averageRatingByLeadDev",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.averageRatingByLeadDev}</div>;
        },
    },
    {
        id: "teamLeadsComment",
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
        id: "managementsComment",
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
        id: "acceptedOrRejectedOn",
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
        id: "action",
        header: "Evaluation",
        accessorKey: "action",

        cell: ({ row }) => {
            const data = row.original;

            return <ActionDropdownDataTable data={data} />;
        },
    },
];
