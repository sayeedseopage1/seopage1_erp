import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import React from "react";
import { DragableColumnHeader } from "./table/DragableColumnHeader";
import demo from "./demo.json";
import Person from "./Person";
import ReportResoveButton from "./ReportResolveButton";
import ReportTableLoder from "./loader/ReportTableLoder";
import EmptyTable from "../../global/EmptyTable";
import _ from "lodash";

// columns model

const ReportTableModal = ({
    reports = [],
    task,
    search,
    tableName = "sp1-table",
    isLoading = true,
}) => {
    const [data, setData] = React.useState([...reports]);
    const [sorting, setSorting] = React.useState([]);
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
  

    //
    const defaultColumns = React.useMemo(() => [
        {
            id: "serial_no",
            header: "Serial No.",
            accessorKey: "id",
            cell: (info) => info.getValue(),
        },
        {
            id: "report_issuer",
            header: "Report Issuer",
            cell: ({ row }) => {
                const data = row?.original;
                return (
                    <span>
                        <Person
                            url={`/account/employees/${data?.added_by}`}
                            name={data?.report_issue_added_by}
                            avatar={data?.report_issue_added_by_avatar}
                        />
                    </span>
                );
            },
        },
        {
            id: "accountable_individual",
            header: "Accountable Individual",
            cell: ({ row }) => {
                const data = row?.original;
                return (
                    <span>
                        <Person
                            url={`/account/employees/${data?.person}`}
                            name={data?.responsible_person_name}
                            avatar={data?.responsible_person_avatar}
                        />
                    </span>
                );
            },
        },
        {
            id: "report_reason",
            header: "Report Reason",
            cell: ({ row }) => {
                const data = row?.original;
                return <span>{data?.reason}</span>;
            },
        },
        {
            id: "report_reason_details",
            header: "Report Reason Details",
            cell: ({ row }) => {
                const data = row?.original;
                return (
                    <div
                        className="sp1_ck_content"
                        dangerouslySetInnerHTML={{ __html: data?.comment }}
                    />
                );
            },
        },
        {
            id: "pre_reported",
            header: "Previously Reported",
            cell: ({ row }) => {
                const data = row?.original;
                return <span>{data?.previousNotedIssue}</span>;
            },
        },
        {
            id: "action",
            header: "Action",
            cell: ({ row }) => {
                const data = row?.original;
                return <ReportResoveButton row={data} />;
            },
        },
    ]);

    // columns
    const [columns] = React.useState([...defaultColumns]);
    const [columnOrder, setColumnOrder] = React.useState(_.map(columns, "id"));
    const resetColumnsOrder = () => setColumnOrder(_.map(columns, "id"));

    const pagination = React.useMemo(
        () => ({ pageIndex, pageSize }),
        [pageIndex, pageSize]
    );

    React.useEffect(() => {
        setData([...reports]);
    }, [reports]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnOrder,
            pagination,
            tableName,
            globalFilter: search,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="sp1_tasks_table_wrapper sp1_tasks_report_table_wrapper">
            <table className="sp1_tasks_table sp1_tasks_report_table">
                <thead className="sp1_tasks_thead">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="sp1_tasks_tr">
                            {headerGroup.headers.map((header) => {
                                return (
                                    <DragableColumnHeader
                                        key={header.id}
                                        header={header}
                                        table={table}
                                        className="sp1_tasks_report_th"
                                    />
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody className="sp1_tasks_tbody">
                    {isLoading && <ReportTableLoder />}
                    {!isLoading &&
                        table.getRowModel().rows.map((row) => {
                            return (
                                <tr className="sp1_tasks_tr" key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td
                                                key={cell.id}
                                                className="px-2 sp1_tasks_td sp1_tasks_report_td"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                </tbody>
            </table>

            {!isLoading && _.size(data) === 0 && <EmptyTable />}
        </div>
    );
};

export default ReportTableModal;
