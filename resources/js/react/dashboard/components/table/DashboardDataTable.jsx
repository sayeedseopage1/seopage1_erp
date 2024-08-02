import React from "react";
import PropTypes from "prop-types";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";

// Components - Table Header
import WithoutDraggableColumnHeader from "./WithoutDraggableColumnHeader";
import DraggableColumnHeader from "./DraggableColumnHeader";


// Components - Table Empty
import EmptyTable from "../../../global/EmptyTable";

// style
import "./style/dashboardDataTable.css";

// Components - Logic - Global
import Switch from "../../../global/Switch";

// Components - Table - Pagination
import DashboardDataTableFrontPagination from "./DashboardDataTableFrontPagination";

const DashboardDataTable = ({
    tableData,
    tableColumns,
    isLoading,
    tableActions = {},
    tableName = "dashboardDataTable",
    getLoadingComponent,
    className = "",
    options = {
        isPagination: false,
        isDraggable: false,
        sortingColumn: [],
    },
    tableStyles = {
        width: {
            width: "auto",
            maxWidth: "auto",
            minWidth: "auto",
        },
        height: {
            height: "auto",
            maxHeight: "auto",
            minHeight: "auto",
        },
        justifyStyleColumn: {}
    },
}) => {
    // Table State
    const [sorting, setSorting] = React.useState([]);
    const [expanded, setExpanded] = React.useState({});
    const [data, setData] = React.useState(tableData || []);
    const [skipPageReset, setSkipPageReset] = React.useState(false);
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // Price Quotations Data
    const _dashboardTableData = React.useMemo(() => tableData, [tableData]);
    React.useEffect(() => {
        if (_.size(_dashboardTableData) === _.size(data)) {
            setSkipPageReset(true);
            _dashboardTableData && setData(_dashboardTableData);
        } else {
            _dashboardTableData && setData(_dashboardTableData);
        }
    }, [_dashboardTableData]);

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


    // pagination
    const pagination = React.useMemo(
        () => ({ pageIndex, pageSize }),
        [pageIndex, pageSize]
    );
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            expanded,
            columnOrder,
            pagination,
            tableName,
        },
        autoResetPageIndex: !skipPageReset,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onExpandedChange: setExpanded,
        getSubRows: (row) => row.subtasks,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getSortedRowModel: getSortedRowModel(),
        paginateExpandedRows: false,
        meta: tableActions,
    });

    const TableLoadingComponents = getLoadingComponent || EmptyTable;

    return (
        <Switch>
            <div
                className={`sp1_dashboard_data_table_wrapper ${className}`}
                style={{
                    height: tableStyles?.height?.height,
                    maxHeight: tableStyles?.height?.maxHeight,
                    minHeight: tableStyles?.height?.minHeight,
                }}
            >
                <table className={`sp1_dashboard_data_table`}>
                    {/* table Header */}
                    <thead
                        className={`sp1_dashboard_data_table_thead`}
                        style={{
                            zIndex: 0,
                        }}
                    >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                                className={`sp1_dashboard_data_table_tr`}
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <>
                                            <Switch.Case
                                                condition={options.isDraggable}
                                            >
                                                <DraggableColumnHeader
                                                    header={header}
                                                    table={table}
                                                    key={header.id}
                                                    sortingColumn={
                                                        options.sortingColumn
                                                    }
                                                    justifyStyleColumn={tableStyles?.justifyStyleColumn}
                                                />
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!options.isDraggable}
                                            >
                                                <WithoutDraggableColumnHeader
                                                    header={header}
                                                    table={table}
                                                    key={header.id}
                                                    justifyStyleColumn={tableStyles?.justifyStyleColumn}
                                                />
                                            </Switch.Case>
                                        </>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    {/* table Body */}
                    <tbody className={`sp1_dashboard_data_table_tbody`}>
                        {!isLoading &&
                            table.getRowModel().rows.map((row) => {
                                return (
                                    <tr
                                        className={`sp1_dashboard_data_table_tr
                                         ${
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
                                                    className={`sp1_dashboard_data_table_td px-2`}
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
                        {/* Loading Table */}
                        {isLoading && (
                            <TableLoadingComponents
                                tableCol={tableColumns?.length}
                            />
                        )}
                    </tbody>
                </table>
                {/* Table for empty */}
                {!isLoading && _.size(table.getRowModel().rows) === 0 && (
                    <EmptyTable />
                )}
            </div>
            <Switch.Case condition={options?.isPagination}>
                <DashboardDataTableFrontPagination
                    currentPage={pageIndex + 1 }
                    perPageRow={pageSize}
                    onPageSize={(size) => table?.setPageSize(size)}
                    onPaginate={(page) => table?.setPageIndex(page - 1)}
                    totalEntry={_.size(data)}
                    onNext={(page) => table?.getCanNextPage() && table.nextPage()}
                    disableNext={!table?.getCanNextPage()}
                    onPrevious={(page) => table?.getCanPreviousPage() && table.previousPage()}
                    disablePrevious={!table?.getCanPreviousPage()}
                    totalPages={table?.getPageCount()}
                />
            </Switch.Case>
        </Switch>
    );
};

export default DashboardDataTable;

DashboardDataTable.propTypes = {
    tableData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    tableColumns: PropTypes.array,
    isLoading: PropTypes.bool,
    tableActions: PropTypes.object,
    tableName: PropTypes.string,
    getLoadingComponent: PropTypes.elementType,
    className: PropTypes.string,
    options: PropTypes.shape({
        isPagination: PropTypes.bool,
        isDraggable: PropTypes.bool,
        sortingColumn: PropTypes.array,
    }),
    tableStyles: PropTypes.shape({
        width: PropTypes.shape({
            width: PropTypes.string,
            maxWidth: PropTypes.string,
            minWidth: PropTypes.string,
        }),
        height: PropTypes.shape({
            height: PropTypes.string,
            maxHeight: PropTypes.string,
            minHeight: PropTypes.string,
        }),
    }),
};
