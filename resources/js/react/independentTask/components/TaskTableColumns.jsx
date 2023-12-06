import dayjs from "dayjs";
import _ from "lodash";
import * as React from 'react';
// import ReportForm from "../../single-task/section/task-actions/report/ReportForm";
// import { SingleTask } from "../../utils/single-task";
// import Button from './Button';
// import Dropdown from './Dropdown';
import Person from "./Person";
import ReportButton from "./ReportButton";
import StopWatch from "./Timer";
import { ExpandTask } from "./table/ExpandTask";
// import Modal from "./Modal";
// import Loader from "./Loader";
// import { storeTasks } from "../../services/features/tasksSlice";
// import { useDispatch, useSelector } from "react-redux";
// import Popover from '../../global/Popover';
import { CompareDate } from "../../utils/dateController";
import ActionDropdown from "./ActionDropdown";

const compareDate = new CompareDate();

export const TaskTableColumns = [
    // expand
    {
      id:'expend',
      header: '',
      cell: ({row, table}) => {
        const {pageIndex} = table.getState();
        return(
          <ExpandTask
            row={row}
            table={table}
            pageIndex={pageIndex}
          />
        )
      }
    },

    // unique id
    // {
    //   id: 'u_id',
    //   header: 'IndependentTaskId',
    //   accessorFn: row => `${row.u_id}}`,
    //   cell: ({row}) => {
    //     const data = row?.original;
    //     return (
    //       <>
    //           <abbr title={data?.heading} style={{textDecoration: 'none'}}>
    //             <div className='d-flex align-items-center' style={{gap: '10px'}}>
    //                 <a href={`/account/tasks/${data?.id}`} className='hover-underline multine-ellipsis'> {data?.u_id} </a>
    //             </div>
    //           </abbr>
    //       </>
    //     )
    //   }
    // },

    // task
    {
      id: 'task',
      header: 'Task',
      accessorFn: row => `${row.id}${row.heading}`,
      cell: ({row}) => {
        const data = row?.original;
        return (
          <>
          <abbr title={data?.heading} style={{ textDecoration: 'none' }}>
            <div className='d-flex align-items-center' style={{ gap: '10px'}}>
              <a href={`/account/tasks/${data?.id}`} className='hover-underline multine-ellipsis'> {data?.heading} </a>
              {
                <span
                className="badge badge-success"
                style={{
                  display:`${data?.u_id?'inline-block':'none'}`,
                  fontSize:'8px'
                }}>
                  Parent Task
                </span>}
            </div>
          </abbr>
        </>
        )
      }
    },

    // timer status
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

    // client
    {
      id: 'client',
      header: 'Client',
      accessorKey: 'client_name',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            <Person
              url={data?.existing_client_id?`/account/clients/${data?.existing_client_id}`:''}
              avatar={data?.existing_client_avator}
              name={data?.existing_client_name?data?.existing_client_name:data?.new_client}
            />
          </div>
        )
      }
    },

    // creation date
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

    // start date
    {
      id: 'start_date',
      header: 'Started Date',
      accessorFn: row => row?.start_date ? dayjs(row?.start_date).format('DD-MM-YYYY') : '--',
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

    // due date
    {
      id: 'due_date',
      header: 'Due Date',
      accessorFn: row => row?.due_date ? dayjs(row?.due_date).format('DD-MM-YYYY') : '--',
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

    // approved on
    {
      id: 'approved_on',
      header: 'Approved On',
      accessorKey: 'task_approval_date',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <strong>
            {/* {data?.task_approval_date ? (
              <>
                {dayjs(data?.task_approval_date).format('DD-MM-YYYY')}
              </>
            ): <span className='badge text-white word-break' style={{background: '#f5c308'}}>Not Completed Yet!</span>} */}
            --
          </strong>
        )
      }
    },

    // hours logged
    {
      id: 'hours_logged',
      header: 'Hours Logged',
      accessorKey: 'subtasks_hours_logged',
      cell: ({row}) => {
        const data = row?.original;
        return(
          <div>
            {/* {convertTime(data?.subtasks_hours_logged)} */}
            --
          </div>
        )
      }
    },

    // assigned by
    {
      id: 'assigned_by_id',
      header: 'Assigned By',
      accessorKey: 'added_by_name',
      cell: ({row}) => {
        const data = row?.original;

        return(
          <Person
            url={`/account/employees/${data?.assigned_by_id}` }
            avatar={data?.assigned_by_avator}
            name={data?.assigned_by_name}
          />
        )
      }
    },

    // assigned to
    {
      id: 'assigned_to_id',
      header: 'Assigned To',
      accessorKey: 'assigned_to_name',
      cell: ({row}) => {
        const data = row?.original;
        // console.log(data);
        return(
          <Person
            url={`/account/employees/${data?.assigned_to_id}` }
            avatar={data?.assigned_to_avator}
            name={data?.assigned_to_name}
          />
        )
      }
    },

    // status
    {
      id: 'status',
      header: 'Task Status',
      accessorKey: 'column_name',
      cell: ({row}) => {
        const data = row?.original;
        // console.log('from independent task table column',data?.column_name);
        return(
          <span
            className='badge text-white'
            style={{background: data?.board_column_label_color}}
          >
            {data?.board_column_name}
          </span>
        )
      }
    },

    // report
    {
      id: 'report',
      header: 'Report',
      cell: ({row}) => {
        const data = row?.original;
        return <ReportButton row={data} />
      }
    },

    // action
    {
      id: 'action',
      header: 'Action',
      cell: ({row}) => {
        const data = row?.original;
        return <ActionDropdown row={data}/>
      },
    }
  ]
