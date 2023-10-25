import dayjs from "dayjs";
import * as React from 'react';
import ReportForm from "../../../single-task/section/task-actions/report/ReportForm";
import Button from "../Button";
import Dropdown from "../Dropdown";
import Loader from "../Loader";
import Modal from "../Modal";
import Person from "../Person";
import ReportButton from "../ReportButton";
import StopWatch from "../Timer";
import { convertTime } from "../../../utils/converTime";
import { CompareDate } from "../../../utils/dateController";
import { SingleTask } from "../../../utils/single-task";
import { useDispatch, useSelector } from "react-redux";
import { storeSubTasks } from "../../../services/features/tasksSlice";

const compareDate = new CompareDate();


export const SubTasksTableColumns = [
    {
      id: 'expend',
      header: <span className='mx-2'><strong>#</strong></span>,
      cell: ({row}) => <span className='mx-2'><strong>{row.index + 1}</strong></span>
    },
    {
      id: 'task',
      header: 'Task',
      accessorFn: (row) => `${row.id}${row.heading}`,
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
      accessorFn: row => `${row?.project_id}${row?.project_name}`,
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
      accessorFn: row =>row?.due_date ? dayjs(row?.due_date).format('DD-MM-YYYY') : '--' ,
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
      accessorFn: row =>`${row?.start_date ? dayjs(row?.start_date).format('DD-MM-YYYY') : '--'}` ,
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
      accessorFn: row =>`${row?.completion_date ? dayjs(row?.completion_date).format('DD-MM-YYYY') : '--'}` ,
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
      accessorFn: row => `${row?.task_approval_date ? dayjs(row?.task_approval_date).format('DD-MM-YYYY') : 'Not Completed Yet!'}`,
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
    // {
    //   id: 'progress',
    //   header: 'Progress',
    //   cell: ({row}) => {
    //     const data = row?.original;
    //     const count = Number(data?.subtasks_count);
    //     const completed = Number(data?.subtasks_completed_count);
    //     let bg = 'bg-transparent';
    //     let percent = 0;

    //     if(count > 0){percent = (completed / count) * 100;}
    //     else{percent = Number(data?.board_column_id)=== 4 ? 100 : 0;}


    //     if(percent === 100){
    //       bg = 'bg-success'
    //     }else if(percent < 100 && percent >= 75){
    //       bg = 'bg-info';
    //     }else if( percent < 75 && percent >= 25){
    //       bg = 'bg-warning'
    //     }else bg='bg-danger'


    //     return(
    //       <div>
    //         <div className="progress" style={{height: '16px'}}>
    //             <div
    //               className={`progress-bar progress-bar-striped progress-bar-animated ${bg}`}
    //               role="progressbar"
    //               style={{width: `${percent}%`}}
    //               aria-valuenow="10"
    //               aria-valuemin="0"
    //               aria-valuemax="100"
    //             >{Math.floor(percent)}%</div>
    //         </div>
    //       </div>
    //     )
    //   }
    // },
    {
      id: 'report',
      header: 'Report',
      cell: ({row}) => {
        const data = row?.original;
        return <ReportButton row={data} />
      }
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({row}) => {
        const data = row?.original;
        return <ActionDropdown row={data} />
      }
    },
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
