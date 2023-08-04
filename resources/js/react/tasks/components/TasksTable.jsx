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


export default function TasksTable({isLoading, filter, tableName,search, reportPermission}){
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
    

  // column
  const defaultColumns = React.useMemo(() => [
    {
      id:'expend',
      header: '',
      cell: ({row, table}) => { 
        return(
          <ExpandTask 
            row={row} 
            table={table}
            pageIndex={pageIndex}
          />
        )
      }
    },
    {
      id: 'task',
      header: 'Task',
      accessorFn: row => `${row.id}${row.heading}`,
      cell: ({row}) => {
        const data = row?.original;  
        return (
          <abbr title={data?.heading} style={{textDecoration: 'none'}}>
            <div className='d-flex align-items-center' style={{gap: '10px'}}>
                <a href={`/account/tasks/${data?.id}`} className='hover-underline multine-ellipsis'> {data?.heading} </a>
            </div>
          </abbr>
        )
      }
    },
    {
      id: 'timer_status',
      header: 'Timer Status',
      accessorKey: 'subtasks_timer_active',
      cell: ({row}) => {
        const data = row?.original;
        const count = data?.subtasks_timer_active;
        const subtaskCount = _.size(data?.subtasks_count)
        const isActive = count > 0;
        let serverTime = 0;
        let localTime = 0;
        let timer = 0;

         if(data?.start_time && _.isNull(data?.end_time)){
            serverTime =compareDate.dayjs(data?.start_time).unix();
            localTime = compareDate.dayjs().unix();
            timer = localTime - serverTime;
         }

         const clockIsRunning = data?.start_time && _.isNull(data?.end_time)
         
        const color = (isActive || clockIsRunning) ? '#54B688' : '#DCDEE1'
        return(
          <div style={{color}} className='d-flex align-items-center'>
            <i className="fa-solid fa-stopwatch f-18"/>
            {row.parentId === undefined && subtaskCount === 0 && !clockIsRunning && <span className='ml-2'><strong>{count}</strong></span>}
            {clockIsRunning && 
              <span className='ml-1 badge badge-primary text-white' style={{fontSize: '11px'}}>
                {<StopWatch time={timer} run={clockIsRunning} />}
              </span>
            }
          </div>
        )
      }
    }, 
    {
      id: 'milestone',
      header: 'Milestone',
      accessorKey: 'milestone_title',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <abbr title={data?.milestone_title} style={{textDecoration: 'none'}}>
            <span className='multine-ellipsis word-break'>
              {data?.milestone_title}
            </span>
          </abbr>
        )
      }
    },
    {
      id: 'deliverable',
      header: 'Deliverable',
      accessorKey: 'deliverable_title',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <abbr title={data?.deliverable_title} style={{textDecoration: 'none'}}>
            <span className='multine-ellipsis word-break'>
              {data?.deliverable_title ?? '--'}
            </span>
          </abbr>
          
        )
      }
    },
    {
      id: 'project',
      header: 'Project',
      accessorFn: row => `${row.project_id}${row.project_name}`,
      cell: ({row}) => {
        const data = row?.original;
        return(
          <abbr title={data?.project_name} style={{textDecoration: 'none'}}>
            <a href={`/account/projects/${data?.project_id}`} className='multine-ellipsis'>
              {data?.project_name}
            </a>
          </abbr>
        )
      }
    }, 
    {
      id: 'client',
      header: 'Client',
      accessorKey: 'client_name',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <Person
              url={`/account/clients/${data?.client_id}`}
              avatar={data?.client_avatar}
              name={data?.client_name}
            /> 
          </div>
        )
      }
    }, 
    {
      id: 'project_manager',
      header: 'Project Manager',
      accessorKey: 'pm_id_name',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <Person
            url={`/account/employees/${data?.project_manager_id}`}
            name={data?.pm_id_name}
            avatar={data?.pm_id_avatar}
          /> 
        )
      }
    },
    
    {
      id: 'creation_date',
      header: 'Creation Date',
      accessorKey: 'creation_date',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <span>
            { data?.creation_date}
          </span>
        )
      }
    }, 
    {
      id: 'due_date',
      header: 'Due Date',
      accessorKey: "due_date",
      cell: ({row}) => {
        const data = row?.original;
        let date = data?.due_date;
        const currentDate = compareDate.dayjs();
        let color = ''

        if(compareDate.isSame(currentDate, date)){
          date = 'Today';
          color= 'red';
        }else if(compareDate.isAfter(currentDate, date)){
          color= 'red'
        }

        if(Number(data?.board_column_id) === 4) color = '#0F9D58'
        
        
        date = date === 'Today' ? date : dayjs(date).format('DD-MM-YYYY');
        return(
          <span style={{color: color}}>
           <strong>{date ?? '--'}</strong> 
          </span>
        )
      }
    }, 
    {
      id: 'start_date',
      header: 'Started Date',
      accessorKey: 'start_date',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <strong>
            {data?.start_date ? (
              <>
                {dayjs(data?.start_date).format('DD-MM-YYYY')} <br/> 
              </>
            ): '--'}
          </strong>
        )
      }
    }, 
    {
      id: 'completion_date',
      header: 'Completion Date',
      accessorKey: 'completion_date',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <strong>
            {Number(data?.board_column_id) === 4 ? 
              data?.completion_date && (
                <>
                  {dayjs(data?.completion_date).format('DD-MM-YYYY')} <br/> 
                </>
              ): '--'
            } 
          </strong>
        )
      }
    }, 
    
    {
      id: 'approved_on',
      header: 'Approved On',
      accessorKey: 'task_approval_date',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <strong> 
            {data?.task_approval_date ? (
              <>
                {dayjs(data?.task_approval_date).format('DD-MM-YYYY')}
              </>
            ): <span className='badge text-white word-break' style={{background: '#f5c308'}}>Not Completed Yet!</span>}
          </strong>
        )
      }
    }, 
    {
      id: 'estimated_time',
      header: 'Estimated Time',
      accessorKey: 'estimate_hours',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            {data?.estimate_hours ?? 0} hrs <br/>
            {data?.estimate_minutes ?? 0} mins
          </div>
        )
      }
    }, 
    {
      id: 'hours_logged',
      header: 'Hours Logged',
      accessorKey: 'subtasks_hours_logged',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            {convertTime(data?.subtasks_hours_logged)}
          </div>
        )
      }
    }, 
    
    {
      id: 'assigned_by',
      header: 'Assigned By', 
      accessorKey: 'added_by_name',
      cell: ({row}) => {
        const data = row?.original;
        
        return(
          <Person
            url={`/account/employees/${data?.added_by}` }
            avatar={data?.added_by_avatar}
            name={data?.added_by_name}
          /> 
        )
      }
    },
    {
      id: 'assigned_to',
      header: 'Assigned To',
      accessorKey: 'assigned_to_name',
      cell: ({row}) => {
        const data = row?.original;
        return( 
          <Person
            url={`/account/employees/${data?.assigned_to_id}` }
            avatar={data?.assigned_to_avatar}
            name={data?.assigned_to_name}
          /> 
        )
      }
    },
    {
      id: 'status',
      header: 'Task Status',
      accessorKey: 'column_name',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <span
            className='badge text-white' 
            style={{background: data?.label_color}}
          >
            {data?.column_name}
          </span>
        )
      }
    }, 
    {
      id: 'progress',
      header: 'Progress',
      accessorKey: 'subtasks_count',
      cell: ({row}) => {
        const data = row?.original;
        const count = Number(data?.subtasks_count);
        const completed = Number(data?.subtasks_completed_count);
        let bg = 'bg-transparent';
        let percent = 0;

        if(count > 0){percent = (completed / count) * 100;}
        else{percent = Number(data?.board_column_id) === 4 ? 100 : 0;}


        if(percent === 100){
          bg = 'bg-success'
        }else if(percent < 100 && percent >= 75){
          bg = 'bg-info';
        }else if( percent < 75 && percent >= 25){
          bg = 'bg-warning'
        }else bg='bg-danger'


        return(
          <div>
            <div className="progress" style={{height: '16px'}}>
                <div 
                  className={`progress-bar progress-bar-striped progress-bar-animated ${bg}`} 
                  role="progressbar" 
                  style={{width: `${percent}%`}} 
                  aria-valuenow="10" 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                >{Math.floor(percent)}%</div>
            </div>
          </div>
        )
      }
    }, 
    {
      id: 'report',
      header: 'Report',
      cell: ({row}) => {
        const data = row?.original;
        return <ReportButton row={data} />
      }
    },
     
    // {
    //   id: 'action',
    //   header: 'Action',
    //   cell: ({row}) => {
    //     const data = row?.original;
    //     return(
    //       <div>
    //         <Dropdown>
    //           <Dropdown.Toggle icon={false}>
    //             <Button variant='tertiary'>
    //               <i className="fa-solid fa-ellipsis-vertical"></i>
    //             </Button>
    //           </Dropdown.Toggle>
    //           <Dropdown.Menu className="p-1">
    //             <Dropdown.Item className="sp1_tasks_tbl_action">
    //               <i className="fa-regular fa-pen-to-square mr-2"></i>
    //               Edit
    //             </Dropdown.Item>
    //             <Dropdown.Item className="sp1_tasks_tbl_del">
    //               <i className="fa-solid fa-trash-can mr-2"></i>
    //               Delete
    //             </Dropdown.Item>
    //           </Dropdown.Menu>
    //         </Dropdown>
    //       </div>
    //     )
    //   }
    // },   
  ])


  // columns
  const [columns, setColumns] = React.useState([...defaultColumns]);

  React.useEffect(() => {
    let auth = new User(window?.Laravel?.user);
    let _cols = [...defaultColumns];

    if(!_.includes(reportPermission, auth?.getRoleId())){
      let cols = _cols?.filter(col => col.id !== 'report')
      setColumns([...cols]);
    }
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
      globalFilter:search
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

// expend sub task
export const ExpandTask = ({row, table, pageIndex}) => {
        const [loading, setLoading] = React.useState(false);
        const data = row?.original;
        const subtasks = data?.subtasks_count 
        const pageIdx = pageIndex;
        const dispatch = useDispatch();
        const [getSubTasks, {isFetching}] = useLazyGetSubTasksQuery();
        const { filter } = table.getState();

        const handleExpanding = (e) => {
          setLoading(true); 
          if(_.size(data?.subtasks) > 0){
            setLoading(false);
            if (!row.getCanExpand()) return;
            row.toggleExpanded();
          }else{
            getSubTasks({
              taskId: data?.id,
              query: new URLSearchParams(filter).toString()
            })
            .unwrap()
            .then( res => {
              const _data = {...data, subtasks: res?.tasks};  
              dispatch(addSubtaskToParenttask({id: data?.id, task: _data}));

              setLoading(false);
              row.toggleExpanded();
            })
            .catch(err => console.error(err)) 
          }
        }
         

        return(
          <div style={{paddingLeft: `${row.depth * 2}rem`}}>
             
            {
              row.parentId === undefined  ? 
              <button 
                    {...{
                      style: {cursor: 'pointer'},
                      onClick: () => Number(subtasks) > 0 ? handleExpanding() : null,
                      className: row.getIsExpanded() ? 'row_expending_btn active' : 'row_expending_btn'
                    }}
                  >
                    
                    {
                      loading ? <Loader title='' /> :
                      <React.Fragment>
                        {row.getIsExpanded() ? <i className="fa-solid fa-chevron-down f-12" /> : <i className="fa-solid fa-chevron-right f-12"></i> }
                          <span className='d-flex align-items-center ml-2' style={{gap: '4px'}}>
                            <i className='fa-solid fa-eye f-16' />
                            <span>{subtasks}</span>
                          </span>
                      </React.Fragment>
                    }
                  </button> :
                row.getCanExpand() && 
                <button
                    {...{
                      style: {cursor: 'pointer'},
                      onClick: () => Number(subtasks) > 0 ? handleExpanding() : null,
                      className: row.getIsExpanded() ? 'row_expending_btn active' : 'row_expending_btn'
                    }}
                  >
                    {
                      !loading && !isFetching  && 
                      <React.Fragment>
                          {row.getIsExpanded() ? <i className="fa-solid fa-chevron-down f-12" /> : <i className="fa-solid fa-chevron-right f-12"></i> }
                          <span className='d-flex align-items-center ml-2' style={{gap: '4px'}}>
                            <i className='fa-solid fa-eye f-16' />
                            <span>{subtasks}</span>
                          </span>
                      </React.Fragment>
                    }

                    {
                      loading && isFetching && <Loader title='' />
                    }
                    
                  </button>
            } 
          </div>
        )
}