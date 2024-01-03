import _ from "lodash";
import React from "react";
import { useDeveloperCanCompleteTaskQuery, useLazyCheckSubTaskTimerQuery } from "../../../services/api/SingleTaskPageApi";
import { useDailySubmission } from "../../../single-task/hooks/useDailySubmission";
import { User } from "../../../utils/user-details";
import {
    approveButtonPermission,
    markAsCompletedButtonPermission,
    needRevisionPermision,
    revisionButtonPermission,
    timeControlPermision
} from "../../permissions";
import DailySubmissionControl from './DailySubmissionControl';
import MarkAsComplete from "./MarkAsComplete";
import RevisionControl from "./Revision/RevisionControl";
import RevisionViewControl from "./Revision/RevisionViewControl";
import SubtaskCreationControl from "./SubtaskCreationControl";
import TimerControl from "./TimerControl";
import ApproveTask from "./approve-task/ApproveTask";
import ClientApproval from "./client-approval/ClientApproval";
import ReportControl from "./report/Report";

const TaskAction = ({ task, status }) => {
    const loggedUser = new User(window?.Laravel?.user);
    const [timerStart, setTimerStart] = React.useState(false);
    const { isEnable } = useDailySubmission();


    const [checkSubTaskTimer, { isFetching }] = useLazyCheckSubTaskTimerQuery();

    const {  data: checkMarkAsCompleteEnableStatus, isLoading: isLoadingCompleteCheck } = useDeveloperCanCompleteTaskQuery(task?.id, {skip: !task.id});
    const ENABLE_MARKASCOMPLETE_BUTTON = task && (task?.isSubtask ? checkMarkAsCompleteEnableStatus?.message === "Developer can complete this task" : true);

    // console.log({task});


    const onModalEditButtonClick = (e) => {
        e.preventDefault();
        checkSubTaskTimer(task?.id)
            .unwrap()
            .then((res) => {
                if (res?.status === 200) {
                    window.location = `/account/tasks/${task?.id}/edit`;
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "You cannot edit the task because timer is already running",
                    });
                }
            });
    };


    let time = task.isSubtask ? task?.parentTaskTimeLog : task?.totalTimeLog;

    return (
        <div
            className="d-flex flex-wrap border-bottom pb-3 sp1_task_btn_group"
            style={{ gap: "10px" }}
        >
            {/* with permission */}
            {timeControlPermision({ task, status, loggedUser }) ? (
                <TimerControl
                    task={task}
                    timerStart={timerStart}
                    setTimerStart={setTimerStart}
                    auth={loggedUser}
                />
            ) : null}
            {!timerStart && !isLoadingCompleteCheck &&
            ENABLE_MARKASCOMPLETE_BUTTON && markAsCompletedButtonPermission({ task, status, loggedUser }) ? (
                <MarkAsComplete task={task} auth={loggedUser} />
            ) : null}


            {/* develop */}
            {approveButtonPermission({ task, status, loggedUser }) ? (
                <ApproveTask task={task} status={status} auth={loggedUser} />
            ) : null}

            {needRevisionPermision({ task, status, loggedUser }) ? (
                <RevisionControl task={task} auth={loggedUser} />
            ) : null}

            {/*  */}
            {revisionButtonPermission({ task, status, loggedUser }) && (
                <RevisionViewControl
                    task={task}
                    status={status}
                    auth={loggedUser}
                />
            )}
            {/* <TimeExtension task={task} /> */}
            <ClientApproval task={task} status={status} auth={loggedUser} />

             {/* daily submission control */}
             {_.includes([5, 9, 10], loggedUser?.getRoleId()) && isEnable && (
                <DailySubmissionControl />
             )}



            {/* right side button container */}
            <div style={{display:'inline-flex',marginLeft:'auto',gap:'0 10px'}}>

                {/* Subtask creation guideline */}
                {_.includes([6, 4, 1], loggedUser?.getRoleId()) && !task?.isSubtask &&  <SubtaskCreationControl />}


                {/*********** Report Control ***********/}
                {_.includes([6, 5, 9, 10], loggedUser?.getRoleId()) && (
                    <ReportControl task={task} />
                )}


                {/* {taskEditPermision({ task, status, auth: loggedUser }) && (
                    <Link
                        to={`?modal=edit&task=${task?.id}`}
                        onClick={onModalEditButtonClick}
                        className="cnx__btn cnx__btn_sm cnx__btn_primary sp1_task-edit-button"
                        style={{
                            marginLeft: 'none'
                        }}
                    >
                        {isFetching ? (
                            <div
                                className="spinner-border text-dark ml-2"
                                role="status"
                                style={{
                                    width: "16px",
                                    height: "16px",
                                    border: "0.14em solid rgb(255, 255, 255)",
                                    borderRightColor: "transparent",
                                }}
                            />
                        ) : (
                            <i className="fa-regular fa-pen-to-square"></i>
                        )}
                        <span className="ml-1 mr-2">Edit</span>
                    </Link>
                )} */}

                {/* {task &&  task.boardColumn.id === 2 && !(_.includes([5, 6], loggedUser?.getRoleId()))  &&
                    <Link
                        to={`?modal=edit&task=${task?.id}`}
                        className="cnx__btn cnx__btn_sm cnx__btn_primary sp1_task-edit-button"
                        style={{
                            marginLeft: 'none'
                        }}
                    >
                        <i className="fa-regular fa-pen-to-square" />
                        Edit
                    </Link>
                } */}
            </div>

            {/* {{-- 3 dot --}} */}
            {/* <button type="button" className="d-flex align-items-center btn btn-sm btn-outline-dark mr-2 border-0 ml-auto">
                <i className="bi bi-three-dots" ></i>
            </button> */}
        </div>
    );
};

export default TaskAction;
