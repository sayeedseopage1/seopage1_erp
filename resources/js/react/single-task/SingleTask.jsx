import * as React from "react";
import Button from "./components/Button";
import Accordion from "./components/Accordion";
import Guideline from "./components/Guideline";
import RevisionText from "./components/RevisionText";
import CommentSection from "./section/comments/CommentsSection";
import SubTaskSection from "./section/sub-task/SubTaskSection";
import NoteSection from "./section/notes/NoteSection";
import SubmittedWork from "./section/submitted-work/SubmittedWork";
import TimeLogSection from "./section/time-logs/TimeLogSection";
import HistorySection from "./section/history/historySection";
import RevisionSection from "./section/revisions/RevisionSection";
import { useParams } from "react-router-dom";
import { useGetTaskDetailsQuery, useGetTaskStatusQuery } from "../services/api/SingleTaskPageApi";
import _ from "lodash";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { storeTask } from "../services/features/subTaskSlice";
import TaskAction from "./section/task-actions/TaskAction";
import Loading from "./components/Loading";
import { SingleTask } from "../utils/single-task";
import { User } from "../utils/user-details";
import GenarelLoader from "./components/loader/GenarelLoader";

const SingleTaskPage = () => {
    const { task:Task } = useSelector((s) => s.subTask);
    const dispatch = useDispatch();
    const params = useParams();
    const { data, isFetching } = useGetTaskDetailsQuery(`/${params?.taskId}/json?mode=basic`, { refetchOnMountOrArgChange: true});
    const { data: taskStatus } = useGetTaskStatusQuery(params?.taskId);
 
    useEffect(() => {
        if (data) {
            let task = {
                ...data?.task, 
                parent_task_title: data?.parent_task_heading?.heading || null,
                parent_task_action: data?.parent_task_action,
                subtask: data?.subtasks
            } 
            dispatch(storeTask(task));
        }
    }, [data]);

    const loadingClass = isFetching ? "skeleton-loading" : "";
    const loggedUser = new User(window?.Laravel?.user);
    const task = new SingleTask(Task);
  
    return (
        <div className="postion-relative">
            <Loading isLoading={isFetching} />
            <div className={`f-16 mb-3 ${loadingClass}`}>
                <span> <strong>Task: </strong> </span>
                <a href={`/account/tasks/${task?.id}`}>{task?.getSubtaskTitle()}</a>
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
                                            <div className="sp1_st-list-item-value"> {task?.parentTaskTitle} </div>
                                        </div>
                                    )}
                                    

                                    <div className="sp1_st-list-item">
                                        <div className="sp1_st-list-item-head">Project : </div>
                                        <div className="sp1_st-list-item-value">
                                            <span className="dot-color bg-danger mr-2" />
                                            {task?.projectName}
                                        </div>
                                    </div>

                                    <div className="sp1_st-list-item">
                                        <div className="sp1_st-list-item-head">
                                            Milestone :{" "}
                                        </div>
                                        <div className="sp1_st-list-item-value">
                                            <span className="dot-color bg-primary mr-2" />
                                            {task?.milestoneTitle}
                                        </div>
                                    </div>

                                    {/* asignee to */}
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
                                                    <a href={task?.assigneeTo?.getUserLink()} className="text-dark hover-underline">{task?.assigneeTo?.getName()}</a> 
                                                    {Number(task?.assigneeTo?.getId()) ===
                                                        Number(loggedUser?.getId()) && (
                                                        <sup
                                                            className="rounded-pill bg-dark text-white px-1"
                                                            style={{ fontSize: "10px" }}
                                                        >
                                                            {" "}
                                                            It's You{" "}
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
                                                        className="text-dark hover-underline"
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
                                    <div className="sp1_st-list-item">
                                            <div className="sp1_st-list-item-head">
                                                Task Category :{" "}
                                            </div>
                                            <div className="sp1_st-list-item-value">
                                                {task?.category?.name}
                                            </div>
                                        </div>
                                    </div>
                            </div>

                            <div className="mt-3">
                                <Accordion
                                    expendable={false}
                                    title="General Guidelines"
                                >
                                    <Guideline text={task?.guidelines} />
                                </Accordion>

                                <Accordion
                                    title="Task Revision from Client"
                                    headingClass="d-flex align-items-center justify-content-between"
                                    headingStyle={{
                                        background: "rgba(227,62,79,1)",
                                        color: "#fff",
                                    }}
                                >
                                    <RevisionText
                                        index="01"
                                        date="Jan 06, 2023"
                                        time="03:33PM"
                                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with"
                                    />

                                    <RevisionText
                                        index="01"
                                        date="Jan 06, 2023"
                                        time="03:33PM"
                                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with"
                                    />
                                </Accordion>

                                <Accordion
                                    title="Task Revision from Client"
                                    headingClass="d-flex align-items-center justify-content-between"
                                    headingStyle={{
                                        background: "rgba(227,62,79,1)",
                                        color: "#fff",
                                    }}
                                >
                                    <RevisionText
                                        index="01"
                                        date="Jan 06, 2023"
                                        time="03:33PM"
                                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with  a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with"
                                    />

                                    <RevisionText
                                        index="01"
                                        date="Jan 06, 2023"
                                        time="03:33PM"
                                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with"
                                    />
                                </Accordion>

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
                                {taskStatus?.column_name}
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
                            <div className="d-flex align-items-center mb-2">
                                <div className="">Time Estimate: </div>
                                <div
                                    className={`d-flex align-items-center font-weight-bold pl-2 ${loadingClass}`}
                                >
                                    {task?.getEstimateTime()}
                                </div>
                            </div>
                            {/* End Time Estimate */}

                            <div className="d-flex align-items-center mb-2">
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
                            </div>

                            <div className="d-flex align-items-center mb-2">
                                <div className="">Total Hours Logged: </div>
                                <div className="d-flex align-items-center font-weight-bold pl-2">
                                    {task?.totalTimeLog || "--"}
                                </div>
                            </div>
                        </div>

                        {/* comments */}
                        <CommentSection task={task} isLoading={isFetching} />
                        <SubTaskSection />
                        <NoteSection />
                        {task && task?.id && <SubmittedWork task={task} />}
                        <TimeLogSection />
                        {task && task?.id && <HistorySection />}
                        {task && task?.id && <RevisionSection task={task} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleTaskPage;
