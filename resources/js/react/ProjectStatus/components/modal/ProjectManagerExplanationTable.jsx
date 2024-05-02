import React from 'react'
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
import { DragableColumnHeader } from '../table/DragableColumnHeader';
import Toaster from '../../../global/Toaster';
import EmptyTable from '../../../global/EmptyTable';
import ProjectManagerExplanationTableLoader from '../loader/ProjectManagerExplanationTableLoader';
import { useLocalStorage } from 'react-use';
import ProjectManagerExplanationTablePagination from './ProjectManagerExplanationTablePagination';
import DeadlineExplainModal from './DeadlineExplainModal';

const ProjectManagerExplanationTable = ({
  tableColumns,
  tableName,
  isLoading,
  projectManagerExplanationData,
  refetch
}) => {
  const [data, setData] = React.useState(projectManagerExplanationData || []);
  const [value, setValue] = useLocalStorage(tableName);
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [sorting, setSorting] = React.useState([]);
  const [expanded, setExpanded] = React.useState({});
  const [projectPmGoalId, setProjectPmGoalId] = React.useState(null);
  const [deadlineExplanationData, setDeadlineExplanationData] = React.useState({});
  const [isOpenDeadlineExplainModal, setIsOpenDeadlineExplainModal] = React.useState(false);



  const _projectManagerExplanationData = React.useMemo(()=> projectManagerExplanationData, [projectManagerExplanationData]);




  React.useEffect(() => {
        if(_.size(_projectManagerExplanationData) === _.size(data)){
          setSkipPageReset(true);
          _projectManagerExplanationData && setData(_projectManagerExplanationData)
        }else{
            _projectManagerExplanationData && setData(_projectManagerExplanationData);
        }
  }, [_projectManagerExplanationData])

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
    meta: {
      deadlineExplainClick: (row) => {
        setProjectPmGoalId(row.id)
        setDeadlineExplanationData(row);
        setIsOpenDeadlineExplainModal(true);
    },
    }

  })

  const handleCloseDeadlineExplainModal = () => {
    setIsOpenDeadlineExplainModal(false);
  }



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
              {isLoading && <ProjectManagerExplanationTableLoader tableCol={tableColumns} prevItemLength={data?.length} />}
            </tbody>
          </table>
          {!isLoading && _.size(table.getRowModel().rows) === 0  && <EmptyTable />}
          <Toaster />
          <DeadlineExplainModal
              projectPmGoalId={projectPmGoalId}
              projectDetails={deadlineExplanationData}
              refetchPmGoal={refetch}
              deadlineExplanationData={deadlineExplanationData}
              isModalTwoOpen={isOpenDeadlineExplainModal}
              closeModalTwo={handleCloseDeadlineExplainModal}
            />
      </div>
      <ProjectManagerExplanationTablePagination
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
  )
}

export default ProjectManagerExplanationTable