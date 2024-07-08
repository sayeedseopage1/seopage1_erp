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

// Components - Table Header
import WithoutDraggableColumnHeader from "./WithoutDraggableColumnHeader";
import DraggableColumnHeader from "./DraggableColumnHeader";

// Components - Table Pagination
import DashboardDataTablePagination from "./DashboardDataTablePagination";

// Components - Table Empty
import EmptyTable from "../../../global/EmptyTable";

// style
import style from "./style/dashboardDataTable.module.css";

// Components - Logic - Global
import Switch from "../../../global/Switch";


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
}) => {
    // Table State
    const [sorting, setSorting] = React.useState([]);
    const [expanded, setExpanded] = React.useState({});
    const [data, setData] = React.useState(tableData?.data || []);
    const [skipPageReset, setSkipPageReset] = React.useState(false);
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // Price Quotations Data
    const _dashboardTableData = React.useMemo(
        () => tableData?.data,
        [tableData?.data]
    );
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

    // handle page size change
    const handlePageSizeChange = (e) => {
        e.preventDefault();
        const paginate = {
            pageIndex,
            pageSize: e.target.value,
        };
        setPagination({ ...paginate, pageIndex: 0 });
        onPageChange(paginate);
    };

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
        onSortingChange: setSorting,
        onExpandedChange: setExpanded,
        getSubRows: (row) => row.subtasks,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getSortedRowModel: getSortedRowModel(),
        meta: tableActions,
    });

    const TableLoadingComponents = getLoadingComponent || EmptyTable;

    return (
        <div
            className={`${style.sp1_dashboard_data_table_wrapper} ${className}`}
            style={{
                height: "100%",
                maxHeight: "100%",
            }}
        >
            <Switch>
                <table className={`${style.sp1_dashboard_data_table}`}>
                    {/* table Header */}
                    <thead
                        className={`${style.sp1_dashboard_data_table_thead}`}
                        style={{
                            zIndex: 0,
                        }}
                    >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                                className={`${style.sp1_dashboard_data_table_tr}`}
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
                                                />
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!options.isDraggable}
                                            >
                                                <WithoutDraggableColumnHeader
                                                    header={header}
                                                    table={table}
                                                    key={header.id}
                                                />
                                            </Switch.Case>
                                        </>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    {/* table Body */}
                    <tbody
                        className={`${style.sp1_dashboard_data_table_tbody}`}
                    >
                        {!isLoading &&
                            table.getRowModel().rows.map((row) => {
                                return (
                                    <tr
                                        className={`${
                                            style.sp1_dashboard_data_table_tr
                                        } ${
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
                                                    className={`${style.sp1_dashboard_data_table_td} px-2`}
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
                        {isLoading && <TableLoadingComponents />}
                    </tbody>
                </table>
                {/* Table for empty */}
                {!isLoading && _.size(table.getRowModel().rows) === 0 && (
                    <EmptyTable />
                )}

                <Switch.Case condition={options?.isPagination}>
                    <DashboardDataTablePagination
                        tableData={tableData}
                        handlePageSizeChange={handlePageSizeChange}
                    />
                </Switch.Case>
            </Switch>
        </div>
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
};
