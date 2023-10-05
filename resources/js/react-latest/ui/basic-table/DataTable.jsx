import * as React from 'react';
import EmptyTable from '../marge-table/EmptyTable';
import { useLocalStorage } from 'react-use';
import _ from 'lodash';
import './data-table.css';
import {
    useReactTable, 
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    flexRender
 } from '@tanstack/react-table';
import { DragableColumnHeader } from './DragableColumnHeader';
import TablePagination from './TablePagination';
import { DragLayer } from './DragLayer';

const DataTable = ({
    tableData,
    tableColumns,
    tableName="data-table",
    hideColumns,
    filter,
    search,
    state = {},
    isLoading,
    loader,
    classes,
    tableMaxHeight
}) => {

  const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [{pageIndex, pageSize}, setPagination] = React.useState({pageIndex: 0, pageSize: 10});

  // initiat data
  React.useEffect(() => { 
    setData(tableData);
  }, [tableData])
 
  // use localstore
  const [ value ] = useLocalStorage(tableName);

  //columns
  const defaultColumns = React.useMemo(() => [...tableColumns]);
  const [columns, setColumns] = React.useState([...defaultColumns]);
 
  // prepare columns
  React.useEffect(() => {
    let cols = [...defaultColumns?.filter(f => !_.includes(hideColumns, f.id))]
    setColumns(cols);
  }, [])

 
  // columns orders
  const [columnOrder, setColumnOrder] = React.useState(_.map(columns, 'id'));
 

  // if has table columns record on localstore 
  // organize column orders 
  React.useEffect(() => {
    if(value && value.columnOrder){
        setColumnOrder(value.columnOrder);
    }
  }, []);

  // reset column 
  const resetColumns = () =>  setColumnOrder(_.map(columns, 'id'));

  // pagination
  const pagination = React.useMemo(() => ({pageIndex, pageSize}), [pageIndex, pageSize]);


  // table instance...
  const table = useReactTable({
    data: data,
    columns,
    state: {
        sorting,
        pagination,
        tableName,
        filter,
        columnOrder,
        globalFilter: _.trim(search),
        ...state,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

 
//   render table
  return (
   <div>
        <div 
            className={`table-container ${classes?.container ?? ''}`}
            style={{maxHeight: tableMaxHeight ?? 'calc( 100vh - 330px)'}}
        >
            {/* table */}
            <table className={`sp1-data-table ${classes?.table ?? ''}`}>
                {/* table head */}
                <thead className={`sp1-data-table-thead ${classes?.thead ?? ''}`}>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className={`sp1-data-table-tr ${classes?.tr ?? ''}`}>
                            {headerGroup.headers.map(header => (
                                <DragableColumnHeader 
                                    key={header.id} 
                                    header={header} 
                                    table={table}
                                    className={classes?.th ?? ''}
                                />
                            ))}
                        </tr>
                    ))}
                </thead> 

                {/* table body */}
                <tbody className={`sp1-data-table-body ${classes?.tbody ?? ''}`}>
                    {!isLoading && table.getRowModel().rows.map(row => (
                        <tr key={row.id} className={`sp1-data-table-tr ${classes?.tr ?? ''}`}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className={`sp1-data-table-td ${classes?.td ?? ''} sp1_data_table_td--${cell.column.id}`}>
                                    {
                                        flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )
                                    }
                                </td>
                            ))} 
                        </tr>
                    ))}

                    {isLoading && loader} 
                </tbody>
            </table> 

            {(!isLoading && _.size(tableData)) === 0  ?
             <div>
                <EmptyTable />
            </div> : null}
        </div>
        
        <TablePagination
                currentPage = {pageIndex + 1} 
                perpageRow= {pageSize}
                pageDataStorageName={`${tableName}_per_page_data`}
                onPageSize = {(size) => table.setPageSize(size)}
                onPaginate = {(page) => table.setPageIndex(page - 1)}
                totalEntry= {table.getPageCount() * pageSize}
                onNext = {() => table.getCanNextPage() && table.nextPage()}
                disableNext = {!table.getCanNextPage()}
                onPrevious = {() => table.getCanPreviousPage() && table.previousPage()}
                disablePrevious = {!table.getCanPreviousPage()}
                totalPages = {table.getPageCount()}
            />

        <DragLayer />
   </div>
  )
}

export default DataTable