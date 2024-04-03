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
        id: "user_name",
        header: "Employee Name",
        accessorKey: "user_name",
        cell: ({ row }) => {
            const data = row.original;

            return data?.user_name ? (
                <Person
                    url={`/account/employees/${data?.user_id}`}
                    name={data?.user_name}
                    avatar={null}
                />
            ) : (
                <span style={{ fontWeight: "bold", color: "gray" }}>N/A</span>
            );
        },
    },
    {
        id: "join_date",
        header: "Joining Date",
        accessorKey: "join_date",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.join_date}</div>;
        },
    },
    {
        id: "first_task_assign_on",
        header: "First Task Assigned On",
        accessorKey: "first_task_assign_on",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.first_task_assign_on}</div>;
        },
    },
    {
        id: "started_working_on",
        header: "Started Working On",
        accessorKey: "started_working_on",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.started_working_on}</div>;
        },
    },
    {
        id: "total_task_assigned",
        header: "Total Task Assigned",
        accessorKey: "total_task_assigned",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.total_task_assigned}</div>;
        },
    },
    {
        id: "total_task_submit",
        header: "Total Task Submitted",
        accessorKey: "total_task_submit",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.total_task_submit}</div>;
        },
    },
    {
        id: "total_hours",
        header: "Total Hours Tracked",
        accessorKey: "total_hours",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div>{`${data?.total_hours} hr ${data?.total_minutes}min`}</div>
            );
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
        id: "lead_dev_avg_rating",
        header: "Lead Developer Average Rating",
        accessorKey: "lead_dev_avg_rating",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.lead_dev_avg_rating}</div>;
        },
    },
    {
        id: "team_lead_cmnt",
        header: "Team Lead Comment",
        accessorKey: "team_lead_cmnt",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div>
                    {data?.team_lead_cmnt === "" ? "--" : data?.team_lead_cmnt}
                </div>
            );
        },
    },
    {
        id: "managements_cmnt",
        header: "Managements Comment",
        accessorKey: "managements_cmnt",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div>
                    {data?.managements_cmnt === ""
                        ? "--"
                        : data?.managements_cmnt}
                </div>
            );
        },
    },
    {
        id: "accept_rejected",
        header: "Accepted/Rejected Date",
        accessorKey: "accept_rejected",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div>
                    {data?.accept_rejected === ""
                        ? "--"
                        : data?.accept_rejected}
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
