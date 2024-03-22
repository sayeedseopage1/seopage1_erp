import ActionDropdown from "./ActionDropdown";
import ActionDropdownDataTable from "./ActionDropDownDataTable";
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

            return <div>{data?.employeeName}</div>;
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
        header: "Total Submitted Tasks",
        accessorKey: "totalTaskSubmitted",
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data?.totalTaskSubmitted}</div>;
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
