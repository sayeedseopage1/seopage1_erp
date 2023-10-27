import dayjs from "dayjs";
import _ from "lodash";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Toaster from '../global/Toaster';
import { useGetTaskDetailsQuery, useGetTaskStatusQuery, useGetWorkingEnvironmentQuery, useLazyGetTaskDetailsQuery, useLazyGetTaskStatusQuery, useLazyGetWorkingEnvironmentQuery } from "../services/api/SingleTaskPageApi";
import { storeTask } from "../services/features/subTaskSlice";
import { BoardColumn, SingleTask } from "../utils/single-task";
import { User } from "../utils/user-details";
import Accordion from "./components/Accordion";
import Guideline from "./components/Guideline";
import Loading from "./components/Loading";
import PMGuideline from "./components/PMGuideline";
import RevisionText from "./components/RevisionText";
import GenarelLoader from "./components/loader/GenarelLoader";
import CommentSection from "./section/comments/CommentsSection";
import DailySubmissionSection from "./section/daily-submission/DailySubmissionSection";
import HistorySection from "./section/history/HistorySection";
import NoteSection from "./section/notes/NoteSection";
import RevisionSection from "./section/revisions/RevisionSection";
import SubTaskSection from "./section/sub-task/SubTaskSection";
import SubmittedWork from "./section/submitted-work/SubmittedWork";
import TaskAction from "./section/task-actions/TaskAction";
import TimeLogSection from "./section/time-logs/TimeLogSection";
import TaskEditForm from "./section/sub-task/TaskEditForm";
import SubTaskEditModal from "./section/sub-task/SubTaskEditModal";
import { singleTaskPagePermission } from "./permissions";
import ERROR from "../global/ERROR";
import { useErrorHandler } from "../context/ErrorHandleServiceContextProvider";


const SingleIndependentTask = () => {
    const { task:Task } = useSelector((s) => s.subTask);
    const { throwError } = useErrorHandler();
    const dispatch = useDispatch();
    const params = useParams();
    
    // test variable
    // const params = {
    //     taskId : 3047,
    // };

    const { data, isFetching } = useGetTaskDetailsQuery(`/${params?.taskId}/json?mode=basic`);
    // const [ getTaskDetails , { isFetching, isLoading } ] = useLazyGetTaskDetailsQuery();

    const { data: taskStatus } = useGetTaskStatusQuery(params?.taskId);
    // const [ getTaskStatus ,{ isFetching:isTaskStatusFetching, isLoading:isTaskStatusLoading }] = useLazyGetTaskStatusQuery();

    const {data:workingEnvData, isFetching:isWorkingEnvFetching, isLoading:isWorkingEnvLoading} = useGetWorkingEnvironmentQuery();
    // const [getWorkingEnv, { isFetching:isWorkingEnvFetching, isLoading:isWorkingEnvLoading }] = useLazyGetWorkingEnvironmentQuery();

    const task = new SingleTask(Task); // task instance
    const loggedUser = new User(window?.Laravel?.user); // logged users data


    // useEffect(()=>{
    //     console.log({task});
    //     getWorkingEnv(task.subtaskId ? task.parentTaskId : task.id)
    //       .unwrap()
    //       .then(({task_working_environment})=>{
    //         // console.log({task_working_environment});
    //       })
    // },[task.id]);

    useEffect(()=>{
      const task = {};

      getTaskDetails(`/${params?.taskId}/json?mode=basic`)
        .unwrap()
        .then((data)=>{
        //   task.
        })


    },[])


    useEffect(()=>{
        console.log({Task,taskStatus});
      console.log({workingEnvData,isWorkingEnvFetching,isWorkingEnvLoading});
    },[Task,taskStatus,workingEnvData,isWorkingEnvFetching,isWorkingEnvLoading])


    useEffect(() => {
        (() => {
            if (data) {
                let task = {
                    ...data?.task,
                    parent_task_title: data?.parent_task_heading?.heading || null,
                    parent_task_action: data?.parent_task_action,
                    subtask: data?.subtasks,
                    // working_environment: data?.working_environment,
                    working_environment_data: workingEnvData?.task_working_environment,
                    pm_task_guideline: data?.task_guideline,
                    task_revisions: data?.revisions,
                    taskSubTask: data?.Sub_Tasks,
                }
                const _task = new SingleTask(task);
                let hasPermission = singleTaskPagePermission(_task, loggedUser);

                if(!hasPermission){
                    return throwError({
                        title: 'Access Denied',
                        message: "Access to this resource is forbidden. Please contact the administrator for assistance.",
                        code: 403
                    })
                }else{
                    dispatch(storeTask(task));
                }

            }
        })()
    }, [data,isWorkingEnvFetching,isWorkingEnvLoading]);

    const loadingClass = isFetching ? "skeleton-loading" : "";

    if(isFetching){
        return <Loading isLoading={isFetching} />
    }

    const _taskStatus = new BoardColumn(taskStatus);

    if(!task) return null;

    return (
        <div className="position-relative content-wrapper">
            <div className="mb-3">
                <div className={`f-18 ${loadingClass}`}>
                    <span> <strong>Task: </strong> </span>
                    <a href={`/account/tasks/${task?.id}`} >{task?.getSubtaskTitle()}</a>
                    {_.includes([1, 4, 6, 7, 8], loggedUser?.getRoleId()) &&
                        <span className="ml-2">
                            (
                                <a href={`/account/projects/${task.projectId}?tab=tasks`} className="f-14">
                                    See All Tasks
                                </a>
                            )
                        </span>
                    }
                </div>
            </div>

            <div className="row">
              {isFetching ? <GenarelLoader /> :
                    <React.Fragment>
                        <div className="col-12 col-md-7 col-lg-8 mb-3">
                        <div className="bg-white rounded-lg p-3">
                            <TaskAction task={task} status={taskStatus} />

                            {/* task information */}
                            <div>
                                <div className="d-flex flex-column py-3" style={{gap: '10px'}}>
                                    {task?.isSubtask && (
                                        <div className="sp1_st-list-item">
                                            <div className="sp1_st-list-item-head"> Parent Task: </div>
                                            <div className="sp1_st-list-item-value">
                                                <a href={`/account/tasks/${task?.parentTaskId}`} className="text-hover-underline">
                                                    {task?.parentTaskTitle}
                                                </a>
                                            </div>
                                        </div>
                                    )}


                                    {/* project name */}
                                    {/* <div className="sp1_st-list-item">
                                        <div className="sp1_st-list-item-head">Project : </div>
                                        <div className="sp1_st-list-item-value">
                                            <span className="dot-color bg-danger mr-2" />
                                            <a href={`/account/projects/${task?.projectId}`} className="text-hover-underline">
                                                {task?.projectName}
                                            </a>
                                        </div>
                                    </div> */}

                                    {/* client name */}
                                    <div className="sp1_st-list-item">
                                        <div className="sp1_st-list-item-head">Client : </div>
                                        <div className="sp1_st-list-item-value">
                                            <span className="dot-color bg-info mr-2" />
                                            <span>
                                                {Task?.ind_clientId? Task?.ind_client_name : Task?.independent_client_name}
                                            </span>
                                        </div>
                                    </div>


                                    {/* project manager */}
                                    {/* <div className="sp1_st-list-item">
                                        <div className="sp1_st-list-item-head">Project Manager: </div>

                                        <div className="sp1_st-list-item-value">
                                            <div style={{ width: "32px", height: "32px" }}>
                                                <img
                                                    src={`/user-uploads/avatar/${task?.projectManagerAvatar}`}
                                                    alt={task?.projectManagerName}
                                                    width="32px"
                                                    height="32px"
                                                    className="rounded-circle"
                                                />
                                            </div>
                                            <div className="ml-2">
                                                <span
                                                    className={`d-block f-14 font-weight-bold`}
                                                >
                                                    <a
                                                        href={`/account/employees/${task?.projectManagerId}`}
                                                        className="hover-underline"
                                                    >
                                                        {task?.projectManagerName}</a>
                                                    {Number(task?.projectManagerId) ===
                                                        Number(loggedUser?.getId()) && (
                                                        <sup
                                                            className="rounded-pill bg-dark text-white px-1 ml-1"
                                                            style={{ fontSize: "10px", whiteSpace: 'nowrap' }}
                                                        >
                                                            It's You
                                                        </sup>
                                                    )}
                                                </span>

                                                <span style={{ fontSize: "12px" }}>
                                                   {task?.projectManagerDesignation}
                                                </span>
                                            </div>
                                        </div>
                                    </div> */}

                                    {/* milestone */}
                                    {/* <div className="sp1_st-list-item">
                                        <div className="sp1_st-list-item-head">
                                            Milestone :{" "}
                                        </div>
                                        <div className="sp1_st-list-item-value">
                                            <span className="dot-color bg-primary mr-2" />
                                            {task?.milestoneTitle}
                                        </div>
                                    </div> */}

                                    {/* assignee to */}
                                    <div className="sp1_st-list-item">
                                        <div className="sp1_st-list-item-head">
                                            Assigned To :{" "}
                                        </div>
                                        <div className="sp1_st-list-item-value">
                                            <div style={{ width: "32px", height: "32px" }}>
                                                <img
                                                    src={task?.assigneeTo?.getAvatar()}
                                                    alt={task?.assigneeTo?.getName()}
                                                    width="32px"
                                                    height="32px"
                                                    className="rounded-circle"
                                                />
                                            </div>
                                            <div className="ml-2">
                                                <span
                                                    className={`d-block f-14 font-weight-bold`}
                                                >
                                                    <a href={task?.assigneeTo?.getUserLink()} className="hover-underline">{task?.assigneeTo?.getName()}</a>
                                                    {Number(task?.assigneeTo?.getId()) ===
                                                        Number(loggedUser?.getId()) && (
                                                        <sup
                                                            className="rounded-pill bg-dark text-white px-1 ml-1"
                                                            style={{ fontSize: "10px", whiteSpace: 'nowrap' }}
                                                        >
                                                            It's You
                                                        </sup>
                                                    )}
                                                </span>

                                                <span style={{ fontSize: "12px" }}>
                                                    {task?.assigneeTo?.getDesignationName()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* assignee by */}
                                    <div className="sp1_st-list-item">
                                        <div className="sp1_st-list-item-head">
                                            Assigned by:{" "}
                                        </div>
                                        <div className="sp1_st-list-item-value">
                                            <div style={{ width: "32px", height: "32px" }}>
                                                <img
                                                    src={task?.assigneeBy?.getAvatar()}
                                                    alt={task?.assigneeBy?.getName()}
                                                    width="32px"
                                                    height="32px"
                                                    className="rounded-circle"
                                                />
                                            </div>
                                            <div className="ml-2">
                                                <span
                                                    className={`d-block f-14 font-weight-bold`}
                                                >
                                                    <a
                                                        href={task?.assigneeBy?.getUserLink()}
                                                        className="hover-underline"
                                                    >
                                                        {task?.assigneeBy?.getName()}
                                                    </a>
                                                    {Number(task?.assigneeBy?.getId()) ===
                                                        Number(loggedUser?.getId()) && (
                                                        <sup
                                                            className="rounded-pill bg-dark text-white px-1"
                                                            style={{ fontSize: "10px" }}
                                                        >
                                                            It's You
                                                        </sup>
                                                    )}
                                                </span>

                                                <span style={{ fontSize: "12px" }}>
                                                    {task?.assigneeBy?.getDesignationName()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PRIORITY */}
                                    <div className="sp1_st-list-item">
                                        <div className="sp1_st-list-item-head">Priority : </div>
                                        <div className="sp1_st-list-item-value">
                                            <span
                                                className="dot-color mr-2"
                                                style={{ background: "rgba(252, 189, 1, 1)" }}
                                            />
                                            {task?.priority}
                                        </div>
                                    </div>

                                    {/* category */}
                                    {
                                        task?.isSubtask &&
                                        <>
                                         <div className="sp1_st-list-item">
                                            <div className="sp1_st-list-item-head">
                                                Task Category :{" "}
                                            </div>
                                            <div className="sp1_st-list-item-value">
                                                {task?.category?.name  ?? '--'}
                                            </div>
                                        </div>

                                        {/* task type */}
                                    <div className="sp1_st-list-item">
                                        <div className="sp1_st-list-item-head">
                                            Task Type:{" "}
                                        </div>
                                        <div className="sp1_st-list-item-value">
                                            {task?.taskType ?? '--'}
                                        </div>
                                    </div>

                                    <div className="sp1_st-list-item">
                                        <div className="sp1_st-list-item-head">
                                            Page Type:{" "}
                                        </div>
                                        <div className="sp1_st-list-item-value">
                                            {task?.pageType ?? '--'}
                                        </div>
                                    </div>

                                    <div className="sp1_st-list-item">
                                        <div className="sp1_st-list-item-head">
                                            Page Name:{" "}
                                        </div>
                                        <div className="sp1_st-list-item-value">
                                            {task?.pageName ?? '--'}
                                        </div>
                                    </div>

                                    <div className="sp1_st-list-item">
                                        <div className="sp1_st-list-item-head">
                                            Page Url:{" "}
                                        </div>
                                        <div className="sp1_st-list-item-value">
                                            {task?.pageUrl ? <a href={task?.pageUrl}>
                                                ( view )
                                            </a> : <span>--</span>}
                                        </div>
                                    </div>
                                    </>
                                    }

                                </div>
                            </div>

                            <div className="mt-3">

                                {/* project manager guideline */}
                                <Accordion
                                    expendable={false}
                                    title="General Guidelines"
                                >
                                   {/* {task?.hasProjectManagerGuideline && <PMGuideline guideline={task?.PMTaskGuideline} /> } */}

                                    {!_.isEmpty(task?.workEnvData)  && (
                                        <div className="sp1_task_card--sub-card">
                                            <div className="px-4 py-3" style={{background: '#F3F5F9'}}>
                                                <h6 className="mb-2">Working Environment</h6>
                                                <hr/>
                                                <div className="row">
                                                    <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                        <span><strong>Working/Staging Site's URL</strong>: <br/> <a target="__blank" href={task?.workEnvData?.site_url}>View on new tab</a></span>
                                                    </div>

                                                    <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                        <span><strong>Frontend Password</strong>: <br/> {task?.workEnvData?.frontend_password}</span>
                                                    </div>

                                                    <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                        <span><strong>Working/Staging Site's Login URL</strong>: <br/> <a target="__blank" href={task?.workEnvData?.login_url}>View on new tab</a> </span>
                                                    </div>

                                                    <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                        <span><strong>Working/Staging Site's Username/Email</strong>: <br/> {task?.workEnvData?.email}</span>
                                                    </div>
                                                    <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                        <span><strong>Password</strong>: <br/> {task?.workEnvData?.password}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) }

                                    <Guideline text={task?.guidelines} workEnv={task?.workEnvData} />
                                </Accordion>

                                {/* task revision */}
                                {
                                    _.size(task?.revisions) > 0 &&
                                    <Accordion
                                        title={_.last(task?.revisions)?.revisionStatus}
                                        headingClass="d-flex align-items-center justify-content-between"
                                        headingStyle={{
                                            background: "rgba(227,62,79,1)",
                                            color: "#fff",
                                        }}
                                    >
                                        { _.map(task?.revisions, (revision, index) => (
                                             <RevisionText
                                                    key={revision?.id}
                                                    index={index + 1}
                                                    date={dayjs(revision.createdAt).format('MMM DD, YYYY')}
                                                    time={dayjs(revision.createdAt).format('hh:mm a')}
                                                    text={revision?.comment || revision?.devComment || revision?.pmComment}
                                                    revision={revision}
                                                />
                                            ))
                                        }

                                    </Accordion>
                                }

                                {/* task description */}
                                <Accordion
                                    expendable={false}
                                    title="Task Descriptions"
                                >
                                    <Guideline text={task?.description} />
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
              }

                <div className="col-12 col-md-5 col-lg-4">
                    <div className="d-flex flex-column">
                        {/* period */}
                        <div
                            className="sp1_task_right_card mb-3"
                            style={{ maxHeight: "450px" }}
                        >
                            <div className="d-flex align-items-center font-weight-bold border-bottom pl-2 pb-2 mb-2">
                                <span
                                    style={{
                                        display: "block",
                                        width: "10px",
                                        height: "10px",
                                        borderRadius: "100%",
                                        background: taskStatus?.label_color,
                                        marginRight: "6px",
                                        boxShadow: "0 0 10px rgba(0,0,0,.1)",
                                    }}
                                />

                                {_taskStatus.getTaskStatusName(loggedUser?.getRoleId(), task.isSubtask)}
                            </div>

                            <div className="d-flex align-items-center mb-2">
                                <div className="">Start Date: </div>
                                <div
                                    className={`d-flex align-items-center font-weight-bold pl-2 ${loadingClass}`}
                                >
                                    {task?.getStartDate("MMM DD, YYYY")}
                                </div>
                            </div>

                            {/* Due Date */}
                            <div className="d-flex align-items-center mb-2">
                                <div className="">Due Date: </div>
                                <div
                                    className={`d-flex align-items-center font-weight-bold pl-2 ${loadingClass}`}
                                >
                                    {task?.getDueDate("MMM DD, YYYY")}
                                </div>
                            </div>
                            {/* End Due Date */}

                            {/* Time Estimate */}
                            {/* <div className="d-flex align-items-center mb-2">
                                <div className="">Time Estimate: </div>
                                <div
                                    className={`d-flex align-items-center font-weight-bold pl-2 ${loadingClass}`}
                                >
                                    {task?.getEstimateTime()}
                                </div>
                            </div> */}
                            {/* End Time Estimate */}

                            {/* <div className="d-flex align-items-center mb-2">
                                <div className="">
                                    Parent Task Hours Logged:
                                </div>
                                <div
                                    className={`d-flex align-items-center font-weight-bold pl-2 ${loadingClass}`}
                                >
                                    {task?.parentTaskTimeLog || "--"}
                                </div>
                            </div>

                            <div className="d-flex align-items-center mb-2">
                                <div className="">Subtask Hours Logged: </div>
                                <div
                                    className={`d-flex align-items-center font-weight-bold ml-2 pl-2 ${loadingClass}`}
                                >
                                    {task?.subTaskTimeLog || "--"}
                                </div>
                            </div> */}

                            <div className="d-flex align-items-center mb-2">
                                <div className="">Total Hours Logged: </div>
                                <div className="d-flex align-items-center font-weight-bold pl-2">
                                    { (task.isSubtask ? task?.parentTaskTimeLog : task?.totalTimeLog )|| "--"}
                                </div>
                            </div>
                        </div>
                        {/* comments */}
                        {task && task?.id && <SubmittedWork task={task} />}
                        { !task.isSubtask && <SubTaskSection status={taskStatus} />}
                        {task && task?.id  && <DailySubmissionSection task={task} />}
                        {task && task?.id && <CommentSection task={task} isLoading={isFetching} /> }
                        <NoteSection />
                        <TimeLogSection />
                        {task && task?.id && <HistorySection />}
                        {task && task?.id && <RevisionSection task={task} />}
                    </div>
                </div>
            </div>
            <Toaster />
            <ShowEditModals task={task} auth={loggedUser}/>
        </div>
    );
};

export default SingleIndependentTask;


const ShowEditModals = ({auth, task}) => {
    let hasAccess = false;

    let time = task.isSubtask ? task?.parentTaskTimeLog : task?.totalTimeLog;

    if(auth.getRoleId() === 1){
        hasAccess = true;
    }else if(auth.getId() === task.assigneeBy.id &&  task.boardColumn.id === 2){
        hasAccess = true;
    }else hasAccess = false;

    if(hasAccess){
        if(task.isSubtask){
            return <SubTaskEditModal task={task} />
        }else {
            return <TaskEditForm task={task} />
        }
    }

    return null;
}
