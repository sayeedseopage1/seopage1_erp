import * as React from "react";
import styles from "./paginate.module.css";

import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import ReactPaginate from "react-paginate";

// ui component
import {
    TableContainer,
    Table,
    TableRow,
    TableBody,
    TableItem,
    Flex,
    TableFooter,
    Select,
} from "./ui";
import DataTableHeader from "./TableHeader";
import _ from "lodash";
import { Placeholder } from "../../../../../global/Placeholder";
import EmptyTable from "../../../../../global/EmptyTable";
import { useSearchParams } from "react-router-dom";
import { useLocalStorage } from "react-use";

const DataTable = ({
    data,
    columns = [],
    isLoading,
    onPageChange,
    sorting,
    tableName = "dataTable",
    setSorting,
}) => {
    const [tableData, setTableData] = React.useState([]);
    const [tableColumns, setTableColumns] = React.useState(columns);
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [value, setValue] = useLocalStorage(tableName);

    // on pagination
    const handlePageChange = ({ selected }) => {
        const paginate = {
            pageIndex: selected,
            pageSize,
        };

        setPagination({ ...paginate, pageIndex: 0 });
        onPageChange(paginate);
    };

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

    // columns order
    const [columnOrder, setColumnOrder] = React.useState(_.map(columns, "id"));

    // if has table columns record on local store
    // organize column orders
    React.useEffect(() => {
        if (value && value.columnOrder) {
            setColumnOrder(value.columnOrder);
        }
    }, []);

    // formate data

    // use effect
    React.useEffect(() => {
        data ? setTableData(_.orderBy(data?.data, "desc")) : setTableData([]);
    }, [data]);

    // pagination
    const pagination = React.useMemo(
        () => ({ pageIndex, pageSize }),
        [pageIndex, pageSize]
    );

    // table instance
    const table = useReactTable({
        data: tableData,
        columns: tableColumns,
        state: {
            sorting,
            pagination,
            tableName,
            columnOrder,
        },
        // onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <React.Fragment>
            <React.Fragment>
                <TableContainer>
                    <Table>
                        <DataTableHeader table={table} columns={tableColumns} />
                        <TableBody>
                            {!isLoading &&
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableItem key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableItem>
                                        ))}
                                    </TableRow>
                                ))}

                            {/* On loading  */}
                            {isLoading &&
                                _.times(pageSize, (item) => (
                                    <TableRow key={item}>
                                        {_.times(tableColumns.length, (col) => (
                                            <TableItem
                                                key={col}
                                                className="py-3"
                                            >
                                                <Placeholder />
                                            </TableItem>
                                        ))}
                                    </TableRow>
                                ))}

                            {!isLoading && _.size(tableData) === 0 && (
                                <TableRow>
                                    <TableItem colSpan={_.size(tableColumns)}>
                                        <EmptyTable />
                                    </TableItem>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TableFooter>
                    <Flex>
                        Show
                        <Select
                            value={pageSize}
                            onChange={handlePageSizeChange}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </Select>
                        Entries
                    </Flex>

                    <Flex>
                        <span>
                            Showing {data?.from} to {data?.to} of {data?.total}{" "}
                            entries
                        </span>

                        <ReactPaginate
                            breakLabel="..."
                            onPageChange={handlePageChange}
                            previousLabel="Previous"
                            nextLabel="Next"
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            pageCount={data?.last_page ?? 1}
                            renderOnZeroPageCount={null}
                            containerClassName={styles.containerClassName}
                            pageLinkClassName={styles.pageLinkClassName}
                            activeLinkClassName={styles.activeLinkClassName}
                            previousLinkClassName={styles.pageLinkClassName}
                            nextLinkClassName={styles.pageLinkClassName}
                        />
                    </Flex>
                </TableFooter>
            </React.Fragment>
        </React.Fragment>
    );
};

export default DataTable;
