import * as React from 'react';
import { CompareDate } from '../../utils/dateController';
const compareDate = new CompareDate();

import {
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';

import _ from 'lodash';
import { useLocalStorage } from 'react-use';
import EmptyTable from '../../global/EmptyTable';
import { User } from '../../utils/user-details';
import TasksTablePagination from './TasksTablePagination';
import TaskTableLoader from './loader/TaskTableLoader';
import { DragableColumnHeader } from './table/DragableColumnHeader';


export default function SubTasksTable({
    isLoading,
    filter,
    tableName,
    tableData,
    search,
    reportPermission,
    hideColumns,
    tableColumns,
    columnVisibility,
    setColumnVisibility
}){
  const [data, setData] = React.useState([])
  const [expanded, setExpanded] = React.useState({});
  const [sorting, setSorting] = React.useState([]);
  const [{pageIndex, pageSize}, setPagination] = React.useState({pageIndex: 0, pageSize: 10});
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [ globalFilter, setGlobalFilter ] = React.useState('');


  const _tasks = React.useMemo(()=> tableData, [tableData]);

  React.useEffect(() => {
    if(_.size(_tasks) === _.size(data)){
      setSkipPageReset(true);
      _tasks && setData(_tasks)
    }else{
      _tasks && setData(_tasks);
    }
  }, [_tasks])

  // clear skipPageReset
  React.useEffect(() => {
    if(skipPageReset){
      setSkipPageReset(false);
    }
  }, [data])



  const defaultColumns = React.useMemo(() => [...tableColumns])
  const [value] = useLocalStorage(tableName);

  // columns
  const [columns, setColumns] = React.useState([...defaultColumns]);

  React.useEffect(() => {
    let auth = new User(window?.Laravel?.user);
    let _cols = [...defaultColumns?.filter(f => !_.includes(hideColumns, f.id))];

    if(!_.includes(reportPermission, auth?.getRoleId())){
      _cols = _cols?.filter(col => col.id !== 'report')
    }
    setColumns([..._cols]);
  }, [])

  const [columnOrder, setColumnOrder] = React.useState(_.map(columns, 'id'));


  // columns orders
  React.useEffect(() => {
    if(value?.columnOrders){
      setColumnOrder(value.columnOrders);
    }
  }, [])


  // reset columns
  const resetColumnsOrder = () => setColumnOrder(_.map(columns, 'id'))
  const pagination = React.useMemo(() => ({pageIndex, pageSize}), [pageIndex, pageSize]);


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
      columnVisibility,
      globalFilter: _.trim(search)
    },
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
  })


  return(
    <React.Fragment>
      <div className='sp1_tasks_table_wrapper'>
        <table className='sp1_tasks_table'>
          <thead className="sp1_tasks_thead">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className='sp1_tasks_tr'>
                {headerGroup.headers.map(header => {
                  return <DragableColumnHeader key={header.id} header={header} table={table} />
                })}
              </tr>
            ))}
          </thead>
          <tbody className='sp1_tasks_tbody'>
            {!isLoading && table.getRowModel().rows.map(row => {
              return (
                <tr
                  className={`sp1_tasks_tr ${row.parentId !== undefined ? 'expended_row' :''} ${row.getIsExpanded() ? 'expended_parent_row': ''}`}
                    key={row.id}
                  >
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id} className='px-2 sp1_tasks_td'>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            {isLoading && <TaskTableLoader />}
          </tbody>
      </table>

      {!isLoading && _.size(table.getRowModel().rows) === 0  && <EmptyTable />}
    </div>


      <TasksTablePagination
        currentPage = {pageIndex + 1}
        perpageRow= {pageSize}
        onPageSize = {(size) => table.setPageSize(size)}
        onPaginate = {(page) => table.setPageIndex(page - 1)}
        totalEntry= {table.getPageCount() * pageSize}
        onNext = {() => table.getCanNextPage() && table.nextPage()}
        disableNext = {!table.getCanNextPage()}
        onPrevious = {() => table.getCanPreviousPage() && table.previousPage()}
        disablePrevious = {!table.getCanPreviousPage()}
        totalPages = {table.getPageCount()}
      />
    </React.Fragment>
  )
}

