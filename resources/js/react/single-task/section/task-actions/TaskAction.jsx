import _ from "lodash";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
    useDeveloperCanCompleteTaskQuery,
    useLazyCheckSubTaskTimerQuery,
} from "../../../services/api/SingleTaskPageApi";
import { User } from "../../../utils/user-details";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { useDailySubmission } from "../../hooks/useDailySubmission";
import {
    approveButtonPermission,
    markAsCompletedButtonPermission,
    needRevisionPermision,
    revisionButtonPermission,
    taskEditPermision,
    timeControlPermision,
} from "../../permissions";
import DailySubmissionControl from "./DailySubmissionControl";
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
    const navigate = useNavigate();
    const { isEnable } = useDailySubmission();
    const [timerStart, setTimerStart] = React.useState(false);

    const [checkSubTaskTimer, { isFetching }] = useLazyCheckSubTaskTimerQuery();

    const {
        data: checkMarkAsCompleteEnableStatus,
        isLoading: isLoadingCompleteCheck,
    } = useDeveloperCanCompleteTaskQuery(task?.id, { skip: !task.id });
    const ENABLE_MARK_AS_COMPLETE_BUTTON =
        task &&
        (task?.isSubtask
            ? checkMarkAsCompleteEnableStatus?.message ===
              "Developer can complete this task"
            : true);

    const onModalEditButtonClick = (e) => {
        e.preventDefault();
        checkSubTaskTimer(task?.id)
            .unwrap()
            .then((res) => {
                if (res?.status === 200) {
                    navigate(`?modal=edit&task=${task?.id}`);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "You cannot edit the task because timer is already running",
                    });
                }
            });
    };

    // usePageLeave(() => console.log('Page left...'));
    let time = task.isSubtask ? task?.parentTaskTimeLog : task?.totalTimeLog;

    const timerControlPermission = timeControlPermision({
        task,
        status,
        loggedUser,
    });
    const markAsCompleteButtonPermission =
        !timerStart &&
        !isLoadingCompleteCheck &&
        ENABLE_MARK_AS_COMPLETE_BUTTON &&
        markAsCompletedButtonPermission({
            task,
            status,
            loggedUser,
        });

    const handleAuthorizedByTopManagementStatus = () => {
        const subAcknowledgement = task?.subAcknowledgement;

        Swal.fire({
            title: "",
            html: `<p>This task doesn't fall into your core job scope, but the project manager wanted the technical team to do it for <strong>"${subAcknowledgement}"</strong>. And the management authorized it considering the circumstances.</p>`,
            icon: "info",
            showCloseButton: true,
        });
    };

    return (
        <div
            className="d-flex flex-wrap border-bottom pb-3 sp1_task_btn_group"
            style={{ gap: "10px" }}
        >
            {/* with permission */}
            {timerControlPermission ? (
                <TimerControl
                    task={task}
                    timerStart={timerStart}
                    setTimerStart={setTimerStart}
                    auth={loggedUser}
                />
            ) : null}

            {markAsCompleteButtonPermission ? (
                <MarkAsComplete task={task} auth={loggedUser} />
            ) : null}

            {/* develope */}
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

            <div className="single_task_divider" />

            {/* right side button container */}
            {task?.approvalStatus ? (
                <div className="">
                    <Button
                        variant="success"
                        onClick={handleAuthorizedByTopManagementStatus}
                    >
                        Authorized By Top Management
                    </Button>
                </div>
            ) : null}

            {/* Subtask creation guideline */}
            {(loggedUser.isHasRolePermission(6) ||
                loggedUser.isHasRolePermission(13)) && (
                <SubtaskCreationControl task={task} />
            )}

            {/*********** Report Control ***********/}

            <ReportControl task={task} />
            <Dropdown>
                <Dropdown.Toggle icon={false}>
                    <div className="single_task_three_dot">
                        {isFetching ? (
                            <div
                                className="spinner-border text-dark"
                                role="status"
                                style={{
                                    width: "16px",
                                    height: "16px",
                                    border: "0.14em solid rgb(77, 77, 77)",
                                    borderRightColor: "transparent",
                                }}
                            />
                        ) : (
                            <i className="fa-solid fa-ellipsis" />
                        )}
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                    className="single_task_action_dd_menu"
                    placement="bottom-end"
                >
                    {/* {taskEditPermision({ task, status, auth: loggedUser }) && ( */}
                    <Dropdown.Item
                        onClick={(e) => {
                            onModalEditButtonClick(e);
                        }}
                        disabled={
                            !taskEditPermision({
                                task,
                                status,
                                auth: loggedUser,
                            })
                        }
                        className="single_task_action_dd_item"
                    >
                        {isFetching ? (
                            <div
                                className="spinner-border text-dark ml-2"
                                role="status"
                                style={{
                                    width: "16px",
                                    height: "16px",
                                    border: "0.14em solid rgb(104, 104, 104)",
                                    borderRightColor: "transparent",
                                }}
                            />
                        ) : (
                            <i className="fa-regular fa-pen-to-square"></i>
                        )}
                        <span className="ml-1 mr-2">Edit</span>
                    </Dropdown.Item>
                    {/* )} */}

                    <Dropdown.Item
                        onClick={() => navigate("?modal=report")}
                        disabled={
                            !_.includes([6, 5, 9, 10], loggedUser?.getRoleId())
                        }
                        className="single_task_action_dd_item __report"
                    >
                        <i className="fa-solid fa-flag"></i>
                        <span className="d-inline ml-1">Report</span>
                    </Dropdown.Item>

                    <ReportControl task={task} />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default TaskAction;
