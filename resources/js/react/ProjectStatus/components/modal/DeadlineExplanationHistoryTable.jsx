
import { 
  flexRender,
  getCoreRowModel, 
  getExpandedRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel, 
  getSortedRowModel, 
  useReactTable} 
from "@tanstack/react-table";
import _ from "lodash";
import React from "react";
import { useLocalStorage } from "react-use";
import { DragableColumnHeader } from "../table/DragableColumnHeader";
import Toaster from "../../../global/Toaster";
import EmptyTable from "../../../global/EmptyTable";
import DeadlineExplanationHistoryTableLoader from "../loader/DeadlineExplanationHistoryTableLoader";
import DeadlineExplanationHistoryTablePagination from "./DeadlineExplanationHistoryTablePagination";

const DeadlineExplanationHistoryTable = ({
  tableName,
  projectDetails,
  closeModal,
  tableColumns,
  deadlineExplanationHistoryData,
  isLoading
}) => {
  const [data, setData] = React.useState(deadlineExplanationHistoryData || []);
  const [value, setValue] = useLocalStorage(tableName);
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [sorting, setSorting] = React.useState([]);
  const [expanded, setExpanded] = React.useState({});
  const _deadlineExplanationHistoryData = React.useMemo(()=> deadlineExplanationHistoryData, [deadlineExplanationHistoryData]);

  React.useEffect(() => {
        if(_.size(_deadlineExplanationHistoryData) === _.size(data)){
          setSkipPageReset(true);
          _deadlineExplanationHistoryData && setData(_deadlineExplanationHistoryData)
        }else{
            _deadlineExplanationHistoryData && setData(_deadlineExplanationHistoryData);
        }
      }, [_deadlineExplanationHistoryData])

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


    const [columnOrder, setColumnOrder] = React.useState(_.map(columns, 'id'));


    const pagination = React.useMemo(() => ({pageIndex, pageSize}), [pageIndex, pageSize]);


    // columns orders
    React.useEffect(() => {
        if(value?.columnOrders){
        setColumnOrder(value.columnOrders);
        }
    }, [])

    // table instance
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
      getSubRows: row => row.subtasks,
      onColumnOrderChange: setColumnOrder,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getSortedRowModel: getSortedRowModel(),
      paginateExpandedRows: false,
    })
  return (
    <React.Fragment>
      <div className="sp1_tasks_table_wrapper">
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
                                  { flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )
                                  }
                                </td>)
                            })}
                        </tr>)
                      })}
              {isLoading && <DeadlineExplanationHistoryTableLoader tableCol={tableColumns} prevItemLength={data?.length} />}
            </tbody>
          </table>
          {!isLoading && _.size(table.getRowModel().rows) === 0  && <EmptyTable />}
          <Toaster />
      </div>
      <DeadlineExplanationHistoryTablePagination 
        currentPage = {pageIndex + 1}
        perpageRow= {pageSize}
        onPageSize = {(size) => table?.setPageSize(size)}
        onPaginate = {(page) => table?.setPageIndex(page - 1)}
        totalEntry= {_.size(data)}
        onNext = {() => table.getCanNextPage() && table.nextPage()}
        disableNext = {!table?.getCanNextPage()}
        onPrevious = {() => table?.getCanPreviousPage() && table?.previousPage()}
        disablePrevious = {!table?.getCanPreviousPage()}
        totalPages = {table?.getPageCount()}/>
   
    </React.Fragment>
  )
}

export default DeadlineExplanationHistoryTable