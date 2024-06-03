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
import { DraggableColumnHeader } from "./DraggableColumnHeader";

// Components - Loader
import PriceQuotationsTableLoader from "../Loader/PriceQuotationsTableLoader";

// Components - Empty Table
import EmptyTable from "../../../../../global/EmptyTable";
import DataTablePagination from "./DataTablePagination";

const DataTable = ({ tableData, tableColumns, tableName, isLoading }) => {
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
    const _priceQuotations = React.useMemo(
        () => tableData?.data,
        [tableData?.data]
    );
    React.useEffect(() => {
        if (_.size(_priceQuotations) === _.size(data)) {
            setSkipPageReset(true);
            _priceQuotations && setData(_priceQuotations);
        } else {
            _priceQuotations && setData(_priceQuotations);
        }
    }, [_priceQuotations]);

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
    });

    return (
        <React.Fragment>
            <div
                className="sp1_price_quotation_table_wrapper"
                style={{
                    height: "100%",
                    maxHeight: "100%",
                }}
            >
                <table className="sp1_price_quotation_table">
                    {/* table Header */}
                    <thead
                        className="sp1_price_quotation_thead"
                        style={{
                            zIndex: 0,
                        }}
                    >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="sp1_price_quotation_thead_tr">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <DraggableColumnHeader
                                            header={header}
                                            table={table}
                                            key={header.id}
                                            sortingColumn={["clients"]}
                                            justifyStyleColumn={{
                                                requested_on: "center",
                                                primary_page: "center",
                                                secondary_page: "center",
                                                other_works_needed: "center",
                                                system_suggested_price: "center",
                                                project_budget: "center",
                                            }}
                                        />

                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    {/* table Body */}
                    <tbody className="sp1_price_quotation_tbody">
                        {!isLoading && 
                            table.getRowModel().rows.map((row) => {
                                return (
                                    <tr
                                        className={`sp1_price_quotation_tr ${
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
                                                    className="px-2 sp1_price_quotation_td"
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
                            <PriceQuotationsTableLoader
                                prevItemLength={data?.length}
                            />
                        )}
                    </tbody>
                </table>
                {/* Table for empty */}
                {!isLoading && _.size(table.getRowModel().rows) === 0 && (
                    <EmptyTable />
                )}
                <DataTablePagination
                    tableData={tableData}
                    handlePageSizeChange={handlePageSizeChange}
                />
            </div>
        </React.Fragment>
    );
};

export default DataTable;

DataTable.propTypes = {
    tableData: PropTypes.array,
    tableColumns: PropTypes.array,
    tableName: PropTypes.string,
    isLoading: PropTypes.bool,
};
