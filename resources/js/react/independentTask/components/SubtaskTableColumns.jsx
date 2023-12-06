import dayjs from "dayjs";
import _ from "lodash";
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { storeSubTasks } from "../../services/features/tasksSlice";
import { CompareDate } from "../../utils/dateController";
import { SingleTask } from "../../utils/single-task";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Loader from "./Loader";
import Modal from "./Modal";
import Person from "./Person";
import ReportButton from "./ReportButton";
import StopWatch from "./Timer";
const ReportForm = React.lazy(() => import("../../single-task/section/task-actions/report/ReportForm"));

const compareDate = new CompareDate();


export const SubTasksTableColumns = [

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
      {
        id: 'parent_task',
        header: 'Parent Task',
        accessorFn: row => `${row.task_id}${row.task_heading}`,
        cell: ({row}) => {
          const data = row?.original;
          return (
            <>
            <abbr title={data?.task_heading} style={{ textDecoration: 'none' }}>
              <div className='d-flex align-items-center' style={{ gap: '10px'}}>
                <a href={`/account/tasks/${data?.task_id}`} className='hover-underline multine-ellipsis'> {data?.task_heading} </a>
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



  // Action Dropdown
  const ActionDropdown = ({row}) => {
    const [reportModalOpen, setReportModalOpen] = React.useState(false);
    const singleTask = new SingleTask(row);
    const close = () => setReportModalOpen(false);
    const { subtasks } = useSelector(s => s.tasks);
    const dispatch = useDispatch();
    // handle report
    const handleReport = () => {
      // find the index of current task
      const _index = _.findIndex(subtasks, {id: row?.id});
      // create new instance of this row with updated report count;
      const instance = [...subtasks];
      instance[_index] = {...row, subtasks_reports_count: Number(row.subtasks_reports_count) + 1}
      dispatch(storeSubTasks({subtasks: [...instance]}))
    }

    return (
      <React.Fragment>
        <Dropdown>
            <Dropdown.Toggle icon={false}>
              <Button variant='tertiary'>
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </Button>
            </Dropdown.Toggle>
            <Dropdown.Menu placement="bottom-end" className="py-2 sp1_tasks_tbl_action_dd_menu">
              <Dropdown.Item onClick={() => setReportModalOpen(true)} className="sp1_tasks_tbl_del">
                <i className="fa-solid fa-bug mr-2"></i> Report
              </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        {/* report form modal */}
        <Modal isOpen={reportModalOpen} className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
                <div className="sp1_single_task--modal-panel task-report-form--modal-panel">
                    <div className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between">
                        <div className="font-weight-bold f-14">
                            Task#{row?.id} : Report
                        </div>
                        <Button onClick={close} className="">
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div>
                    <React.Suspense fallback={<div className="py-3 d-flex align-items-center justify-content-center"><Loader /></div>}>
                        <ReportForm task={singleTask} close={close} onSuccess={handleReport} />
                    </React.Suspense>
                </div>
            </div>
        </Modal>
      </React.Fragment>
    )
  }
