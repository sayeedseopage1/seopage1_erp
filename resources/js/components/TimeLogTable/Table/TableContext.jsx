import * as React from "react";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    getSortedRowModel,
    getExpandedRowModel,
} from "@tanstack/react-table";

export const TableContext = React.createContext({
    tableColumns: [],
    setTableColumns: () => { },
    tableData: [],
    setTableData: () => { },
    columnOrder: [],
    setColumnOrder: () => { },
    selectedRows: [],
    setSelectedRows: () => { },
    columnsVisibility: {},
    setColumnVisibility: () => { },
});

export const TableStateProvider = ({ children }) => {
    const [tableColumns, setTableColumns] = React.useState([]);
    const [tableData, setTableData] = React.useState([]);
    const [columnOrder, setColumnOrder] = React.useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({
        id: false,
    });
    const [sorting, setSorting] = React.useState([]);
    const [expanded, setExpanded] = React.useState({});

    // get row id
    const getRowId = React.useCallback((row) => row.id, []);
    // table instance
    const table = useReactTable({
        data: tableData,
        columns: tableColumns,
        state: {
            expanded,
            sorting,
            columnOrder,
            columnVisibility,
            rowSelection: selectedRows,
        },
        getRowId,
        getSubRows: (row) => row.task,
        paginateExpandedRows: true,
        enableExpanding: true,
        onSortingChange: setSorting,
        getExpandedRowModel: getExpandedRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        paginateExpandedRows: true,
        onRowSelectionChange: setSelectedRows,
    });

    return (
        <TableContext.Provider
            value={{
                table,
                tableColumns,
                setTableColumns,
                tableData,
                setTableData,
                columnOrder,
                setColumnOrder,
                selectedRows,
                setSelectedRows,
                columnVisibility,
                setColumnVisibility,
                sorting,
                setSorting,
            }}
        >
            {children}
        </TableContext.Provider>
    );
};
