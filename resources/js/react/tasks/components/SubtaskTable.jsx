import * as React from 'react'; 
import { useDrop, useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend'
import Loader from './Loader'

import {
  Column,
  Table,
  ExpandedState,
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table';
import IndeterminateCheckbox from './table/IndeterminateCheckbox';

import demoData from './demo.json';
import _, { head, size } from 'lodash';
import TasksTablePagination from './TasksTablePagination';


// reorder column
const reorderColumn = (
  draggedColumnId,
  targetColumnId,
  columnOrder
) => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
  )
  return [...columnOrder]
}
 
// dragable columns
const DragableColumnHeader = ({header, table}) => {
  const {getState, setColumnOrder} = table;
  const { columnOrder } = getState();
  const {column} = header;

  const dropRef = React.useRef(null);

  const [{isOver}, drop] = useDrop({
    accept: 'column',
    drop: (draggedColumn) => {
      if(column.id === "expend") return; 
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      )
      setColumnOrder(newColumnOrder)
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  const [{ isDragging }, drag, preview] = useDrag({
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: 'column',
  })

  

//   
  React.useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  drag(drop(dropRef));

  return (
    <> 
      <th
        ref={dropRef}
        colSpan={header.colSpan}
        style={{ 
          opacity: isDragging ? 0.5 : 1, 
          background: isOver && column.id !== "expend" ? '#f3f3f3' : '', 
        }}
        className={`sp1_tasks_th sp1_tasks_th--${column.id}`}
      >
        <div className="d-flex align-items-start">
          {column.id !== 'expend' &&
              <button 
              {...{
                onClick: header.column.getToggleSortingHandler(),
                className: 'sp1_tasks_column_sort_btn'
              }}>
  
              {header.column.getIsSorted() ? 
                  {
                    asc: <span className="table_asc_dec asc"></span>,
                    desc: <span className="table_asc_dec dec"></span>,
                  }[header.column.getIsSorted()] ?? null
              : <span className="table_asc_dec"></span>
              }

            </button>
          } 
          <div className='w-100'> 
            <div>
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </div> 
          </div>
        </div>
      </th>
    </>
  ) 
}



export default function SubTasksTable(){
  const [data, setData] = React.useState([...demoData])
  const [expanded, setExpanded] = React.useState({}); 
  const [sorting, setSorting] = React.useState([]);
  const [{pageIndex, pageSize}, setPagination] = React.useState({pageIndex: 0, pageSize: 3});
  

  // column
  const defaultColumns = React.useMemo(() => [
    {
      id: 'task',
      header: 'Task',
      accessorKey: 'id',
      cell: ({row}) => {
        const data = row?.original;  
        return (
          <div className='d-flex align-items-center' style={{gap: '10px'}}> 
              Products Page
          </div>
        )
      }
    },
    {
      id: 'timer_status',
      header: 'Timer Active/Inactive',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <div dangerouslySetInnerHTML={{__html: data?.timer_action}} />
          </div>
        )
      }
    }, 
    {
      id: 'milestone',
      header: 'Milestone',
      cell: ({row}) => {
        return(
          <div>
            Milestone
          </div>
        )
      }
    },
    {
      id: 'deliverable',
      header: 'Deliverable',
      cell: ({row}) => {
        return(
          <div>
            Milestone
          </div>
        )
      }
    },
    {
      id: 'project',
      header: 'Project',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <div dangerouslySetInnerHTML={{__html: data?.project_name}} />
          </div>
        )
      }
    }, 
    {
      id: 'client',
      header: 'Client',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <div dangerouslySetInnerHTML={{__html: data?.client_name}} />
          </div>
        )
      }
    }, 
    {
      id: 'start_date',
      header: 'Start Date',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <div dangerouslySetInnerHTML={{__html: data?.due_date}} />
          </div>
        )
      }
    }, 
    {
      id: 'due_date',
      header: 'Due Date',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <div dangerouslySetInnerHTML={{__html: data?.due_date}} />
          </div>
        )
      }
    }, 
    
    {
      id: 'actual_completion_date',
      header: 'Actual Completion Date',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <div dangerouslySetInnerHTML={{__html: data?.due_date}} />
          </div>
        )
      }
    }, 
    {
      id: 'estimated_time',
      header: 'Estimated Time',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <div dangerouslySetInnerHTML={{__html: data?.estimate_time}} />
          </div>
        )
      }
    }, 
    {
      id: 'hours_logged',
      header: 'Hours Logged',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <div dangerouslySetInnerHTML={{__html: data?.timeLogged}} />
          </div>
        )
      }
    }, 
    
    {
      id: 'assigned_by',
      header: 'Assigned By',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <div dangerouslySetInnerHTML={{__html: data?.users}} />
          </div>
        )
      }
    },
    {
      id: 'assigned_to',
      header: 'Assigned To',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <div dangerouslySetInnerHTML={{__html: data?.users}} />
          </div>
        )
      }
    },
    {
      id: 'creation_date',
      header: 'Creation Date',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <div dangerouslySetInnerHTML={{__html: data?.created_at}} />
          </div>
        )
      }
    }, 
    {
      id: 'status',
      header: 'Task Status',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <div dangerouslySetInnerHTML={{__html: data?.board_column}} />
          </div>
        )
      }
    }, 
    {
      id: 'report',
      header: 'Report',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <div className='alert alert-danger'>Report</div>
          </div>
        )
      }
    },
    {
      id: 'progress',
      header: 'Progress',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <div dangerouslySetInnerHTML={{__html: data?.progress}} />
          </div>
        )
      }
    },  
     
    {
      id: 'action',
      header: 'Action',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <div dangerouslySetInnerHTML={{__html: data?.action}} />
          </div>
        )
      }
    },   
  ])


  // columns
  const [columns] = React.useState([...defaultColumns]);
  const [columnOrder, setColumnOrder] = React.useState(_.map(columns, 'id')); 
  
  // reset columns
  const resetColumnsOrder = () => setColumnOrder(_.map(columns, 'id'))
  const pagination = React.useMemo(() => ({pageIndex, pageSize}), [pageIndex, pageSize]);

  // table instance...
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnOrder,
      pagination
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    debugColumns: true,
    debugHeaders: true,
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
            {table.getRowModel().rows.map(row => {
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
          </tbody>
      </table>
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

