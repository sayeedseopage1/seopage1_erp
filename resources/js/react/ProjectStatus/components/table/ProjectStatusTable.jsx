import * as React from "react";

import {
    useReactTable, getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    flexRender
  } from '@tanstack/react-table';

// ui component
import _ from "lodash";

import { useSearchParams } from "react-router-dom";
import { useLocalStorage } from "react-use";
import EmptyTable from "../../../global/EmptyTable";
import { Placeholder } from "../../../global/Placeholder";
import { DragableColumnHeader } from "./DragableColumnHeader";
import ProjectStatusTablePagination from "../ProjectStatusTablePagination";
import { User } from "../../../utils/user-details";
import ProjectStatusTableLoader from "../loader/ProjectStatusTableLoader";

const ProjectStatusTable = ({
    isLoading,
    filter,
    tableName,
    search,
    reportPermission,
    hideColumns,
    tableColumns,
    tableData,
    handlePmGoalModal,
    handlePercentOfGoalMet
}) => {
    const [sorting, setSorting] = React.useState([]);
    const [expanded, setExpanded] = React.useState({});
    const [value, setValue] = useLocalStorage(tableName);
    const [data, setData] = React.useState(tableData || []);
    const [ globalFilter, setGlobalFilter ] = React.useState('');
    const [skipPageReset, setSkipPageReset] = React.useState(false);
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // remember the state of our table
    const _projectStatus = React.useMemo(()=> tableData, [tableData]);

    // set data
    React.useEffect(() => {
        if(_.size(_projectStatus) === _.size(data)){
          setSkipPageReset(true);
          _projectStatus && setData(_projectStatus)
        }else{
            _projectStatus && setData(_projectStatus);
        }
      }, [_projectStatus])

    // clear skipPageReset
    React.useEffect(() => {
        if(skipPageReset){
        setSkipPageReset(false);
        }
    }, [data])

    // default columns
    const defaultColumns = React.useMemo(() => [...tableColumns])

    // columns
    const [columns, setColumns] = React.useState([...defaultColumns]);

    // set columns
    React.useEffect(() => {
        let auth = new User(window?.Laravel?.user);
        let _cols = [...defaultColumns?.filter(f => !_.includes(hideColumns, f.id))];

        if(!_.includes(reportPermission, auth?.getRoleId())){
        _cols = _cols?.filter(col => col.id !== 'report')
        }
        setColumns([..._cols]);
    }, [])

    const [columnOrder, setColumnOrder] = React.useState(_.map(columns, 'id'));

    // reset columns
    const resetColumnsOrder = () => setColumnOrder(_.map(columns, 'id'))
    const pagination = React.useMemo(() => ({pageIndex, pageSize}), [pageIndex, pageSize]);

    // columns orders
    React.useEffect(() => {
        if(value?.columnOrders){
        setColumnOrder(value.columnOrders);
        }
    }, [])

    // table instance...
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            expanded,
            columnOrder,
            pagination,
            tableName,
            filter,
            globalFilter: _.trim(search)
        },
        onGlobalFilterChange: setGlobalFilter,
        autoResetPageIndex: !skipPageReset,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onExpandedChange: setExpanded,
        getSubRows: row => row.subtasks,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getSortedRowModel: getSortedRowModel(),
        paginateExpandedRows: false,
        meta: {
                /**
                 * Additional metadata associated with the column.
                 * This metadata can be accessed anywhere the column is available.
                 * @typedef {Object} ColumnMeta
                 * @property {Function} onClickHandler - Function triggered when a specific action, such as a click event,  occurs on the associated column.
                 * Accepts rowData as an argument representing the clicked row.
                 * Example usage: onClickHandler(rowData)
                 * This function can be accessed through table.options.meta.onClickHandler().
                 */
            onClickHandler: (rowData) => {
                handlePmGoalModal(rowData);
            },
            onPercentOfGoalMet: (rowData) => {
                handlePercentOfGoalMet(rowData);
            },
        }
    })

  

    
    return (
        <React.Fragment>
            <div className="sp1_tasks_table_wrapper">
                {/* Project Status Table */}
                <table className='sp1_tasks_table'>
                    {/* Project Status table Header */}
                    <thead className="sp1_tasks_thead">
                            {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className='sp1_tasks_tr'>
                                {headerGroup.headers.map(header => {
                                return <DragableColumnHeader key={header.id} header={header}  table={table} />
                                })}
                            </tr>
                            ))}
                    </thead>
                    {/* Project Status table Body */}
                    <tbody className='sp1_tasks_tbody'>
                            {!isLoading &&table.getRowModel().rows.map(row => {
                            return (
                                <tr
                                className={`sp1_tasks_tr ${row.parentId !== undefined ? 'expended_row' :''} ${row.getIsExpanded() ? 'expended_parent_row': ''}`}
                                    key={row.id}
                                >
                                {row.getVisibleCells().map(cell => {
                                    return (
                                    <td key={cell.id} className='px-2 sp1_tasks_td'>
                                         
                                        { flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                            )
                                        }
                                    </td>
                                    )
                                })}
                                </tr>
                            )
                            })}
                            {isLoading && <ProjectStatusTableLoader prevItemLength={tableData?.length} />}
                    </tbody>
                </table>
                {/* Empty table View */}
                {!isLoading && _.size(table.getRowModel().rows) === 0  && <EmptyTable />}   
            </div>
            {/* Project Status Table Pagination */}
            <ProjectStatusTablePagination
                currentPage = {pageIndex + 1}
                perpageRow= {pageSize}
                onPageSize = {(size) => table?.setPageSize(size)}
                onPaginate = {(page) => table?.setPageIndex(page - 1)}
                totalEntry= {_.size(data)}
                onNext = {() => table.getCanNextPage() && table.nextPage()}
                disableNext = {!table?.getCanNextPage()}
                onPrevious = {() => table?.getCanPreviousPage() && table?.previousPage()}
                disablePrevious = {!table?.getCanPreviousPage()}
                totalPages = {table?.getPageCount()}
            />
        </React.Fragment>
    );
};

export default ProjectStatusTable;
