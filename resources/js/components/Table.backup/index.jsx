import * as React from "react";

import { TableContext, TableStateProvider } from "./TableContext";
import TableHeader from "./TableHeader";
import { DndProvider } from "react-dnd/dist";
import { HTML5Backend } from "react-dnd-html5-backend/dist";

import "./table.css";
import { flexRender } from "@tanstack/react-table";
import ColumnsVisibleFilter from "./ColumnsVisibleFilter";
import Pagination from "./TablePagination";
import CustomScrollbar from "../CustomScrollbar";

const classNames = {
    tableClass: "",
    headerClass: "",
    rowClass: "",
    th: "",
    td: "",
    filterBarClass: "",
    filterToggle: "",
    filterToggleText: "",
    filterToggleIcon: "",
    filterDropdown: "",
    filterDropdownItem: "",
};

const DataTable = ({ data, columns, visibleColumns, classes = classNames }) => {
    const {
        table,
        setTableColumns,
        setTableData,
        setColumnOrder,
        setColumnVisibility,
    } = React.useContext(TableContext);

    // memories the columns and data
    const columnsChange = React.useMemo(() => columns, [columns]);
    const dataChange = React.useMemo(() => data, [data]);

    // set the columns and data
    React.useEffect(() => {
        setTableColumns(columnsChange);
        setTableData(dataChange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columnsChange, dataChange]);

    // set the visible columns
    React.useEffect(() => {
        // check if the visible columns are set in local storage
        const visibleColumnsFromLocalStorage =
            localStorage.getItem("visibleColumns");
        if (visibleColumnsFromLocalStorage) {
            setColumnVisibility(JSON.parse(visibleColumnsFromLocalStorage));
        } else {
            // set the visible columns from the props
            setColumnVisibility(visibleColumns);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // set the column order
    React.useEffect(() => {
        // check if the column order is set in local storage
        const columnOrderFromLocalStorage = localStorage.getItem("columnOrder");
        if (columnOrderFromLocalStorage) {
            setColumnOrder(JSON.parse(columnOrderFromLocalStorage));
        } else {
            // set the column order from the props
            setColumnOrder(columns.map((column) => column.id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!data) return null;
    return (
        <div className="drag-table-container">
            <div className={`drag-table__filter-bar ${classes.filterBarClass}`}>
                <ColumnsVisibleFilter classes={classes} />
            </div>

            <div className="drag-table__wrapper">
                {/* drag table */}
                {!table ? null : (
                    <DndProvider backend={HTML5Backend}>
                        <table className="drag-table">
                            <thead>
                                {table
                                    ?.getHeaderGroups()
                                    ?.map((headerGroup, index) => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map(
                                                (header) => (
                                                    <TableHeader
                                                        key={header.id}
                                                        header={header}
                                                        table={table}
                                                    />
                                                )
                                            )}
                                        </tr>
                                    ))}
                            </thead>
                            <tbody>
                                {table?.getRowModel()?.rows?.map((row) => (
                                    <tr key={row.id} className="drag-table_row">
                                        {row.getVisibleCells()?.map((cell) => (
                                            <td
                                                key={cell.id}
                                                className="drag-table_cell text-truncate"
                                                data-target-index={cell.name}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </DndProvider>
                )}
            </div>

            {/* drag table footer */}
            <div className="drag-table__footer">
                <Pagination />
            </div>
        </div>
    );
};

const Table = ({ data, columns, visibleColumns }) => (
    <TableStateProvider>
        <DataTable
            data={data}
            columns={columns}
            visibleColumns={visibleColumns}
        />
    </TableStateProvider>
);

export default Table;
