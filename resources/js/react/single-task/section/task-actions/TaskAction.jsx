import React from "react";
import TimerControl from "./TimerControl";
import MarkAsComplete from "./MarkAsComplete";
import {
    timeControlPermision,
    markAsCompletedButtonPermission,
    taskEditPermision,
    approveButtonPermission,
    needRevisionPermision,
    revisionButtonPermission,
} from "../../permissions";
import RevisionControl from "./Revision/RevisionControl";
import RevisionViewControl from "./Revision/RevisionViewControl";
import ApproveTask from "./approve-task/ApproveTask";
import ClientApproval from "./client-approval/ClientApproval";
import ReportControl from "./report/Report";
import { User } from "../../../utils/user-details";
import _ from "lodash";
import { useDeveloperCanCompleteTaskQuery, useLazyCheckSubTaskTimerQuery } from "../../../services/api/SingleTaskPageApi";
import DailySubmissionControl from './DailySubmissionControl';
import SubtaskCreationControl from "./SubtaskCreationControl";

const TaskAction = ({ task, status }) => {
    const loggedUser = new User(window?.Laravel?.user);
    const [timerStart, setTimerStart] = React.useState(false);

    const [checkSubTaskTimer, { isFetching }] = useLazyCheckSubTaskTimerQuery();
      
    const {  data: checkMarkAsCompleteEnableStatus, isLoading: isLoadingCompleteCheck } = useDeveloperCanCompleteTaskQuery(task?.id, {skip: !task.id}); 
    const ENABLE_MARKASCOMPLETE_BUTTON = task && (task?.isSubtask ? checkMarkAsCompleteEnableStatus?.message === "Developer can complete this task" : true);



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

    return (
        <div
            className="d-flex flex-wrap border-bottom pb-3 sp1_task_btn_group"
            style={{ gap: "10px" }}
        >
            {/* with permision */}
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
             {_.includes([5, 8, 10], loggedUser?.getRoleId()) && (
                <DailySubmissionControl />
             )}



            {/* right side button container */}
            <div style={{display:'inline-flex',marginLeft:'auto',gap:'0 10px'}}>

                {/* Subtask creation guideline */}
                <SubtaskCreationControl />


                {/*********** Report Control ***********/}
                {_.includes([6, 5, 8, 10], loggedUser?.getRoleId()) && (
                    <ReportControl task={task} />
                )}


                {taskEditPermision({ task, status, auth: loggedUser }) && (
                    <a
                        href="#"
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
                    </a>
                )}
            </div>

            {/* {{-- 3 dot --}} */}
            {/* <button type="button" className="d-flex align-items-center btn btn-sm btn-outline-dark mr-2 border-0 ml-auto">
                <i className="bi bi-three-dots" ></i>
            </button> */}
        </div>
    );
};

export default TaskAction;
