import * as React from 'react';
import Loader from './Loader';
import { convertTime } from '../../utils/converTime';
import { CompareDate } from '../../utils/dateController';
const compareDate = new CompareDate();

import {
  useReactTable, getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table';

import _ from 'lodash';
import TasksTablePagination from './TasksTablePagination';
import dayjs from 'dayjs';
import TaskTableLoader from './loader/TaskTableLoader';
import { useLazyGetSubTasksQuery } from '../../services/api/tasksApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addSubtaskToParenttask } from '../../services/features/tasksSlice';
import Dropdown from './Dropdown';
import Button from './Button';
import StopWatch from './Timer';
import EmptyTable from '../../global/EmptyTable';
import ReportButton from './ReportButton';
import Person from './Person';
import { DragableColumnHeader } from './table/DragableColumnHeader';
import { useLocalStorage } from 'react-use';
import { User } from '../../utils/user-details';
import { ExpandTask } from './table/ExpandTask';


export default function TasksTable({
    isLoading,
    filter,
    tableName,
    search,
    reportPermission,
    hideColumns,
    tableColumns,
    columnVisibility,
    setColumnVisibility
}){
  const { tasks } = useSelector(s => s.tasks);
  const [data, setData] = React.useState([])
  const [expanded, setExpanded] = React.useState({});
  const [sorting, setSorting] = React.useState([]);
  const [{pageIndex, pageSize}, setPagination] = React.useState({pageIndex: 0, pageSize: 10});
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [ globalFilter, setGlobalFilter ] = React.useState('');
  const [value, setValue] = useLocalStorage(tableName ??'')


  const _tasks = React.useMemo(()=> tasks, [tasks]);

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

  // default columns
  const defaultColumns = React.useMemo(() => [...tableColumns])

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
      columnVisibility,
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
            {!isLoading &&table.getRowModel().rows.map(row => {
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
        totalEntry= {_.size(data)}
        onNext = {() => table.getCanNextPage() && table.nextPage()}
        disableNext = {!table.getCanNextPage()}
        onPrevious = {() => table.getCanPreviousPage() && table.previousPage()}
        disablePrevious = {!table.getCanPreviousPage()}
        totalPages = {table.getPageCount()}
      />
    </React.Fragment>
  )
}

// expend sub task
// export const ExpandTask = ({row, table, pageIndex}) => {
//         const [loading, setLoading] = React.useState(false);
//         const data = row?.original;
//         const subtasks = data?.subtasks_count
//         const pageIdx = pageIndex;
//         const dispatch = useDispatch();
//         const [getSubTasks, {isFetching}] = useLazyGetSubTasksQuery();
//         const { filter } = table.getState();

//         const handleExpanding = (e) => {
//           setLoading(true);
//           if(_.size(data?.subtasks) > 0){
//             setLoading(false);
//             if (!row.getCanExpand()) return;
//             row.toggleExpanded();
//           }else{
//             getSubTasks({
//               taskId: data?.id,
//               query: new URLSearchParams(filter).toString()
//             })
//             .unwrap()
//             .then( res => {
//               const _data = {...data, subtasks: res?.tasks};
//               dispatch(addSubtaskToParenttask({id: data?.id, task: _data}));

//               setLoading(false);
//               row.toggleExpanded();
//             })
//             .catch(err => console.error(err))
//           }
//         }


//         return(
//           <div style={{paddingLeft: `${row.depth * 2}rem`}}>

//             {
//               row.parentId === undefined  ?
//               <button
//                     {...{
//                       style: {cursor: 'pointer'},
//                       onClick: () => Number(subtasks) > 0 ? handleExpanding() : null,
//                       className: row.getIsExpanded() ? 'row_expending_btn active' : 'row_expending_btn'
//                     }}
//                   >

//                     {
//                       loading ? <Loader title='' /> :
//                       <React.Fragment>
//                         {row.getIsExpanded() ? <i className="fa-solid fa-chevron-down f-12" /> : <i className="fa-solid fa-chevron-right f-12"></i> }
//                           <span className='d-flex align-items-center ml-2' style={{gap: '4px'}}>
//                             <i className='fa-solid fa-eye f-16' />
//                             <span>{subtasks}</span>
//                           </span>
//                       </React.Fragment>
//                     }
//                   </button> :
//                 row.getCanExpand() &&
//                 <button
//                     {...{
//                       style: {cursor: 'pointer'},
//                       onClick: () => Number(subtasks) > 0 ? handleExpanding() : null,
//                       className: row.getIsExpanded() ? 'row_expending_btn active' : 'row_expending_btn'
//                     }}
//                   >
//                     {
//                       !loading && !isFetching  &&
//                       <React.Fragment>
//                           {row.getIsExpanded() ? <i className="fa-solid fa-chevron-down f-12" /> : <i className="fa-solid fa-chevron-right f-12"></i> }
//                           <span className='d-flex align-items-center ml-2' style={{gap: '4px'}}>
//                             <i className='fa-solid fa-eye f-16' />
//                             <span>{subtasks}</span>
//                           </span>
//                       </React.Fragment>
//                     }

//                     {
//                       loading && isFetching && <Loader title='' />
//                     }

//                   </button>
//             }
//           </div>
//         )
// }
