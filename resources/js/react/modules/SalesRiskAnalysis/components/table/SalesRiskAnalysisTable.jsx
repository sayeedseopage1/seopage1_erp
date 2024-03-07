import React from 'react'
import {
  useReactTable, getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table';
import { useLocalStorage } from 'react-use';

// ui components
import EmptyTable from '../../../../global/EmptyTable';
import SalesRiskAnalysisTableLoader from '../loader/SalesRiskAnalysisTableLoader';

// table header
import WithoutDraggableColumnHeader from './WithoutDraggableColumnHeader';
import SalesRiskAnalysisTablePagination from './SalesRiskAnalysisTablePagination';


const SalesRiskAnalysisTable = ({
  isLoading,
  filter,
  tableName,
  search,
  tableColumns,
  tableData,
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

  
  const _salesRiskAnalysis = React.useMemo(()=> tableData, [tableData]);

  React.useEffect(() => {
      if(_.size(_salesRiskAnalysis) === _.size(data)){
        setSkipPageReset(true);
        _salesRiskAnalysis && setData(_salesRiskAnalysis)
      }else{
          _salesRiskAnalysis && setData(_salesRiskAnalysis);
      }
    }, [_salesRiskAnalysis])

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

  const table = useReactTable({
    data,
    columns,
    state: {
        sorting,
        expanded,
        columnOrder,
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
  })


  return (
    <React.Fragment>
      <div 
        className="sp1_tasks_table_wrapper" 
        style={{
          height: '100%',
          maxHeight: '100%'
        }}
      >
        <table className='sp1_tasks_table'>
          {/* table Header */}
          <thead className="sp1_tasks_thead">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className='sp1_tasks_tr'>
                {headerGroup.headers.map(header => 
                  {
                    return <WithoutDraggableColumnHeader 
                    header={header} 
                    table={table} 
                    key={header.id} />
                })}
              </tr>
            ))}
          </thead>
          {/* table Body */}
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
                            cell.getContext())
                          }
                        </td>
                    )
                  })}
                </tr>
              )
            })}
            {/* Loading Table */}
            {isLoading && <SalesRiskAnalysisTableLoader prevItemLength={data?.length}  />}
          </tbody>
        </table>
        {/* Table for empty */}
        {!isLoading && _.size(table.getRowModel().rows) === 0  && <EmptyTable />}   
      </div>
      {/* pagination */}
      <SalesRiskAnalysisTablePagination
        currentPage = {pageIndex + 1}
        perPageRow= {pageSize}
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
  )
}

export default SalesRiskAnalysisTable