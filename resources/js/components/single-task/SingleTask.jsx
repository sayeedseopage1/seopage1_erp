import * as React from 'react'
import Button from './components/Button'
import Accordion from './components/Accordion' 
import Guideline from './components/Guideline'
import RevisionText from './components/RevisionText' 
import CommentSection from './section/comments/CommentsSection'
import SubTaskSection from './section/sub-task/SubTaskSection'
import NoteSection from './section/notes/NoteSection'
import SubmittedWork from './section/submitted-work/SubmittedWork'
import TimeLogSection from './section/time-logs/TimeLogSection'
import HistorySection from './section/history/historySection'
import RevisionSection from './section/revisions/RevisionSection'
import { useParams } from 'react-router-dom'
import { useGetTaskDetailsQuery } from '../services/api/SingleTaskPageApi'
import _ from 'lodash'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { storeTask } from '../services/features/subTaskSlice'

 
 
const SingleTask = () => {
  const { task } = useSelector(s => s.subTask);
  const dispatch = useDispatch();
  const params = useParams(); 
  const {
    data,
    isFetching
  } = useGetTaskDetailsQuery(`/${params?.taskId}/json?mode=basic`);

  useEffect(() => {
    if(data){
        dispatch(storeTask(data));
    }
  }, [data])
 


  const loading = isFetching;
  const loadingClass = isFetching ? 'skeleton-loading' : ''

  const assigned_to = task?.users && task?.users[0];
  const assigned_by = task?.create_by;
  const logged_user = window?.Laravel?.user;

  return (
    <React.Fragment>
        <div className={`f-16 mb-3 ${loadingClass}`}>
            <span> <strong>Subtask: </strong> </span>
            <span>{_.startCase(task?.subtask_title)}</span>
        </div> 


        <div className='row'>
            <div className="col-8">
                <div className="bg-white rounded-lg p-3">
                    {/* button groups */}
                    <div className="d-flex flex-wrap border-bottom pb-3 sp1_task_btn_group">
                        <Button 
                            variant='tertiary'
                            className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
                        >
                           <i className="fa-solid fa-circle-play"></i>
                            Start Timer
                        </Button>


                        <Button 
                            variant='tertiary'
                            className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
                        >
                            <i className="fa-solid fa-stopwatch"></i>
                            <span className="d-inline ml-1">00:05:44</span>
                        </Button>


                        <Button 
                            variant='tertiary'
                            className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
                        >
                            <i className="fa-solid fa-pause"></i>
                            <span className="d-inline ml-1">Stop Timer</span>
                        </Button>
                           

                        <Button 
                            variant='tertiary'
                            className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
                        >
                            <i className="fa-solid fa-check"></i>
                            <span className="d-inline ml-1">Mark As Complete</span>
                        </Button>


                        <Button 
                            variant='tertiary'
                            className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
                        >
                            <i className="fa-solid fa-plus"></i>
                            <span className="d-inline ml-1">Request Time Extension</span>
                        </Button>
                     
                          

                        {/* {{-- approved --}} */}
                        <button type="button" className="d-flex align-items-center btn btn-sm btn-success mr-2 text-white border-0">
                            <span className="d-inline mr-1">Approved</span> 
                        </button> 

                        {/* {{-- awaiting for time extension --}} */}
                        <button type="button" className="d-flex align-items-center btn btn-sm btn-warning mr-2 text-dark border-0" >
                            <span className="d-inline mr-1">Awaiting for Time Extension</span> 
                        </button>

                        {/* {{-- 3 dot --}} */}
                        <button type="button" className="d-flex align-items-center btn btn-sm btn-outline-dark mr-2 border-0 ml-auto">
                            <i className="bi bi-three-dots" ></i>
                        </button>
                    </div> 

                    {/* task information */}
                    <div>
                        
                        <div className="d-flex flex-column py-3">
                            <div className="d-flex align-items-center mb-2">
                                <div className={`mr-2 ${loadingClass}`} style={{width: '150px'}}>Parent Task: </div>
                                <div className="">
                                    <div className={`${loadingClass}`}> 
                                        {_.startCase(task?.heading) || (!loading ? '--' : 'Lorem Ipsum is simply dummy text of the printing and. typesetting industry.')}
                                    </div> 
                                </div>
                            </div>

                            <div className="d-flex align-items-center mb-2">
                                <div className={`mr-2 ${loadingClass}`} style={{width: '150px'}}>Project : </div>
                                <div className={`d-flex align-items-center ${loadingClass}`}>
                                    {!loading && <span style={{
                                        display: 'block',
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: 'red',
                                        marginRight: '6px'
                                    }}></span>}
                                    {_.startCase(task?.project_name) || (!loading ? '--' : 'Lorem Ipsum is simply dummy text of the printing and.')}
                                </div>
                            </div>  

                            <div className="d-flex align-items-center mb-2">
                                <div className={`mr-2 ${loadingClass}`} style={{width: '150px'}}>Milestone : </div>
                                <div className={`d-flex align-items-center ${loadingClass}`}>
                                    {!loading && <span style={{
                                        display: 'block',
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: 'var(--header_color)',
                                        marginRight: '6px'
                                    }}></span>}
                                    {_.startCase(task?.milestone_title) || (!loading ? '--' :"Lorem Ipsum is simply dummy text of the printing.")} 
                                </div>
                            </div>                     

                            <div className="d-flex align-items-center mb-2">
                                <div className={`mr-2 ${loadingClass}`} style={{width: '150px'}}>Assigned To : </div>
                                <div className="d-flex align-items-center">
                                    <div 
                                        className={`${loadingClass} ${loading ? 'rounded-circle': ''}`}
                                        style={{
                                            width: '32px',
                                            height: '32px'
                                        }}
                                    >
                                        {!loading && assigned_to ? <img 
                                            src={assigned_to?.image_url}
                                            alt={assigned_to?.name}
                                            width='32px'
                                            height='32px'
                                            className="rounded-circle"
                                        />: ''}
                                    </div>
                                    <div className="ml-2">
                                        <span className={`d-block f-14 font-weight-bold ${loadingClass}`}>
                                            {assigned_to?.name || (!loading ? '--' : 'Lorem Ipsum is simply dummy')} 
                                            {Number(assigned_to?.id) === Number(logged_user?.id ) && <sup className="rounded-pill bg-dark text-white px-1" style={{fontSize: '10px'}}>It's You</sup>}
                                        </span>

                                        <span 
                                            className={`${loadingClass}`}
                                            style={{fontSize: '12px',color: !loading ? 'rgba(111,114,122,1)': ''}} 
                                        >
                                            {assigned_to?.employee_detail?.designation?.name}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex align-items-center mb-2">
                                <div className={`mr-2 ${loadingClass}`} style={{width: '150px'}}>Assigned by : </div>
                                <div className="d-flex align-items-center">
                                    <div 
                                        className={`${loadingClass} ${loading ? 'rounded-circle': ''}`}
                                        style={{
                                            width: '32px',
                                            height: '32px'
                                        }}
                                    >
                                        {!loading &&                                         
                                        <img 
                                            src={assigned_by?.image_url}
                                            alt={assigned_by?.name}
                                            width='32px'
                                            height='32px'
                                            className="rounded-circle"
                                        />}
                                    </div>
                                    <div className="ml-2">
                                        <span className={`d-block f-14 font-weight-bold ${loadingClass}`}> 
                                            {assigned_by?.name || (!loading ? '--' : 'Lorem Ipsum is simply dummy')} 
                                            {Number(assigned_by?.id) === Number(logged_user?.id ) && 
                                            <sup className="rounded-pill bg-dark text-white px-1" style={{fontSize: '10px'}}>It's You</sup>}
                                        </span>  
                                        <span 
                                            className={`${loadingClass}`}
                                            style={{fontSize: '12px',color: !loading ? 'rgba(111,114,122,1)': ''}} 
                                        >
                                            {assigned_by?.employee_detail?.designation?.name}
                                        </span>
                                    </div>
                                </div>
                            </div>


                            <div className="d-flex align-items-center mb-2">
                                <div className={`mr-2 ${loadingClass}`} style={{width: '150px'}}>Priority : </div>
                                <div className={`d-flex align-items-center ${loadingClass}`}>
                                    {!loading && <span style={{
                                        display: 'block',
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: 'rgba(252, 189, 1, 1)',
                                        marginRight: '6px'
                                    }}></span>}
                                    {_.startCase(task?.priority) || (!loading ? '--' :'Lorem Ipsum i')}
                                </div>
                            </div>  
                            
                            <div className="d-flex align-items-center mb-2">
                                <div className={`mr-2 ${loadingClass}`} style={{width: '150px'}}>Task Category : </div>
                                <div className={`d-flex align-items-center ${loadingClass}`}> 
                                    {!loading ? (task?.task_category?.category_name || '--') : 'Lorem Ipsum is'}
                                </div>
                            </div>   
                        </div>
                    </div>
                    
                   <div>
                        <Accordion expendable={false} title="General Guidelines">
                            <Guideline  text={task?.project_summary} />
                        </Accordion>



                        <Accordion 
                            title="Task Revision from Client"
                            headingClass="d-flex align-items-center justify-content-between"
                            headingStyle={{background: 'rgba(227,62,79,1)',color:'#fff'}}
                        >
                            <RevisionText index="01" date="Jan 06, 2023" time="03:33PM" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with" />

                            <RevisionText index="01" date="Jan 06, 2023" time="03:33PM" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with" />
                        </Accordion>


                        <Accordion 
                            title="Task Revision from Client"
                            headingClass="d-flex align-items-center justify-content-between"
                            headingStyle={{background: 'rgba(227,62,79,1)',color:'#fff'}}
                        >
                            <RevisionText index="01" date="Jan 06, 2023" time="03:33PM" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with" />

                            <RevisionText index="01" date="Jan 06, 2023" time="03:33PM" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with" />
                        </Accordion>

                        <Accordion expendable={false} title="Task Descriptions">
                            <Guideline  text={task?.description} />
                        </Accordion>
                   </div>
                </div>
            </div>


            <div className="col-4">
              <div className="d-flex flex-column">
                {/* period */}
                <div className="sp1_task_right_card mb-3" style={{maxHeight: '450px'}}>
                    <div className="d-flex align-items-center font-weight-bold border-bottom pb-2 mb-2"> 
                        <span
                            style={{
                                display: 'block',
                                width: '10px',
                                height: '10px',
                                borderRadius: '100%',
                                background: task?.board_column?.label_color,
                                marginRight: '6px',
                                boxShadow: '0 0 10px rgba(0,0,0,.1)'
                            }} 
                        ></span>
                        {task?.board_column?.column_name}
                    </div> 

                    <div className="d-flex align-items-center mb-2">
                        <div className="" style={{width: '200px'}}>Start Date : </div>
                        <div className={`d-flex align-items-center font-weight-bold ${loadingClass}`}>
                            {!loading ? task?.start_date ? dayjs(task?.start_date).format("MMM DD, YYYY") : '--' : '0 hour 0 min'}
                        </div>
                    </div> 

                    <div className="d-flex align-items-center mb-2">
                        <div className="" style={{width: '200px'}}>Due Date : </div>
                        <div className={`d-flex align-items-center font-weight-bold ${loadingClass}`}>
                            {!loading ? task?.due_date ? dayjs(task?.due_date).format("MMM DD, YYYY") : '--': '0 hour 0 min'}
                        </div>
                    </div> 

                    <div className="d-flex align-items-center mb-2">
                        <div className="" style={{width: '200px'}}>Time Estimate : </div>
                        <div className={`d-flex align-items-center font-weight-bold ${loadingClass}`}>
                            {!loading ? (task?.estimate_hours || task?.estimate_minutes) ? `${task?.estimate_hours} hrs ${task?.estimate_minutes} mins` : '--' : `0 hour 0 min`}
                        </div>
                    </div> 

                    <div className="d-flex align-items-center mb-2">
                        <div className="" style={{width: '200px'}}>Parent Task Hours Logged: </div>
                        <div className={`d-flex align-items-center font-weight-bold ${loadingClass}`}>
                            {!loading ? (task?.parent_task_time_log ? `${task?.parent_task_time_log}` : '--')  : `0 hrs 0 mins`}
                        </div>
                    </div> 

                    <div className="d-flex align-items-center mb-2">
                        <div className="" style={{width: '200px'}}>Subtask Hours Logged: </div>
                        <div className={`d-flex align-items-center font-weight-bold ${loadingClass}`}>
                            {!loading ? (task?.sub_task_time_log ? `${task?.sub_task_time_log}` : '--')  : `0 hrs 0 mins`}
                        </div>
                    </div> 

                    <div className="d-flex align-items-center mb-2">
                        <div className="" style={{width: '200px'}}>Total Hours Logged : </div>
                        <div className="d-flex align-items-center font-weight-bold">
                        {!loading ? (task?.timeLog ? `${task?.timeLog}` : '--')  : `0 hrs 0 mins`}
                        </div>
                    </div> 
                </div>
                            
                {/* comments */}
                <CommentSection task={task} isLoading={isFetching} />
                <SubTaskSection  />
                <NoteSection />
                {task && task?.id && <SubmittedWork task={task} />}
                <TimeLogSection />
                {task && task?.id && <HistorySection />}
                {task && task?.id && <RevisionSection task={task} />}
              </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default SingleTask