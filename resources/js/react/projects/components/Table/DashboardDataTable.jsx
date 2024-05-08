import React from "react";
import PropTypes from "prop-types";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";

// Table Component
import WithoutDraggableColumnHeader from "./WithoutDraggableColumnHeader";
import EmptyTable from "../../../global/EmptyTable";

const DashboardDataTable = ({
    tableName,
    tableData,
    tableColumns,
    isLoading,
}) => {
    const [sorting, setSorting] = React.useState([]);
    const [expanded, setExpanded] = React.useState({});
    const [skipPageReset, setSkipPageReset] = React.useState(false);
    const [data, setData] = React.useState(tableData || []);

    // sales risk analysis rules data
    const _tableData = React.useMemo(() => tableData, [tableData]);
    React.useEffect(() => {
        if (_.size(_tableData) === _.size(data)) {
            setSkipPageReset(true);
            _tableData && setData(_tableData);
        } else {
            _tableData && setData(_tableData);
        }
    }, [_tableData]);

    // clear skipPageReset
    React.useEffect(() => {
        if (skipPageReset) {
            setSkipPageReset(false);
        }
    }, [data]);


    // default columns
    const defaultColumns = React.useMemo(() => [...tableColumns]);

    // columns
    const columns = [...defaultColumns];

    const [columnOrder, setColumnOrder] = React.useState(_.map(columns, "id"));

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            expanded,
            columnOrder,
            tableName,
        },
        autoResetPageIndex: !skipPageReset,
        onExpandedChange: setExpanded,
        getSubRows: (row) => row.subtasks,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <>
            <div
                className="sp1_tasks_table_wrapper"
                style={{
                    height: "100%",
                    maxHeight: "30vh",
                }}
            >
                <table className="sp1_tasks_table">
                    {/* table Header */}
                    <thead
                        className="sp1_tasks_thead"
                        style={{
                            zIndex: 0,
                        }}
                    >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="sp1_tasks_tr">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <WithoutDraggableColumnHeader
                                            header={header}
                                            table={table}
                                            key={header.id}
                                        />
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    {/* table Body */}
                    <tbody
                        className="sp1_tasks_tbody"
                        style={{
                            height: "100%",
                            maxHeight: "100%",
                        }}
                    >
                        {" "}
                        {!isLoading &&
                            table.getRowModel().rows.map((row) => {
                                return (
                                    <tr
                                        className={`sp1_tasks_tr ${
                                            row.parentId !== undefined
                                                ? "expended_row"
                                                : ""
                                        } ${
                                            row.getIsExpanded()
                                                ? "expended_parent_row"
                                                : ""
                                        }`}
                                        key={row.id}
                                    >
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td
                                                    key={cell.id}
                                                    className="px-2 sp1_tasks_td"
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
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
                {!isLoading && _.size(table.getRowModel().rows) === 0 && (
                    <EmptyTable />
                )}
            </div>
        </>
    );
};

export default DashboardDataTable;

DashboardDataTable.propTypes = {
    tableName: PropTypes.string,
    tableData: PropTypes.array,
    tableColumns: PropTypes.array,
    isLoading: PropTypes.bool,
};
