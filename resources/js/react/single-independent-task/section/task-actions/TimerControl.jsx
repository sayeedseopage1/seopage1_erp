import React, { useState, useEffect, useMemo, useRef } from "react";
import Button from "../../components/Button";
import StartTimerConfirmationModal from "./StartTimerConfirmationModal";
import {
    useCheckWorkingReportMutation,
    useLazyGetTaskDetailsQuery,
    useLazyGetUserTrackTimeQuery,
    useStartTimerApiMutation,
    useStopTimerApiMutation,
} from "../../../services/api/SingleTaskPageApi";
import { CompareDate } from "../../../utils/dateController";
import _ from "lodash";
import { useDispatch } from "react-redux";
import {
    setLessTrackModal,
    setTaskStatus,
} from "../../../services/features/subTaskSlice";
import LessTrackTimerModal from "./stop-timer/LessTrackTimerModal";
import { User } from "../../../utils/user-details";
import { useNavigate } from "react-router-dom";
import { workingReportError } from "../helper/timer-start-working-report-error-toaster";
import ExpiredTimeModalForNewEmployee from "./ExpiredTimeModalForNewEmployee";
import ExpiredNotifyModalForNewEmployee from "./ExpiredNotifyModalForNewEmployee";
import { useGetSingleEvaluationQuery } from "../../../services/api/EvaluationApiSlice";
import Swal from "sweetalert2";

// component
const TimerControl = ({ task, timerStart, setTimerStart, auth }) => {
    const { data: EvaluationData, isLoading } = useGetSingleEvaluationQuery(
        auth?.id
    );

    const expireDate = EvaluationData?.data[0]?.exp_date;
    // console.log("auth", auth?.id);
    // console.log("evaluation data", EvaluationData);
    // console.log("expire date", expireDate);
    //new employee timer hiding and warning modal showing
    const [timerStatusForWarningModal, setTimerStatusForWarningModal] =
        useState(true);
    const [timeLeft, setTimeLeft] = useState(0);
    const [showExpirationWarningModal, setShowExpirationWarningModal] =
        useState(false);
    const [showExpirationNotifyModal, setShowExpirationNotifyModal] =
        useState(false);
    const [expiredTimerForNewEmployee, setExpiredTimerForNewEmployee] =
        useState(false);
    //expired time check and state change for new employee / Trainee
    const [expireDateForTrainer, setExpireDateForTrainer] =
        useState(expireDate);

    // console.log("expired date", expireDateForTrainer);
    const [timerId, setTimerId] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [isOpenConfirmationModal, setIsOpenConfirmationModal] =
        useState(false);

    const dispatch = useDispatch();
    const dayjs = new CompareDate();
    const loggedUser = new User(window?.Laravel?.user);
    const navigate = useNavigate();

    const timerStatus = task?.ranningTimer?.status;
    const taskRunning = useMemo(() => timerStatus, [timerStatus]);

    useEffect(() => {
        if (taskRunning === "running") {
            let serverTime = task?.ranningTimer?.time;
            let localTime = dayjs.dayjs().unix();
            let timer = localTime - serverTime;
            setTimerStart(true);
            setSeconds(timer);
            setTimerId(task?.ranningTimer?.id);
        }
    }, [taskRunning]);

    // console.log("time left", timeLeft);
    // console.log("expire date", expireDateForTrainer);
    //   timer control
    useEffect(() => {
        let interval = null;
        if (timerStart) {
            //   interval for timer
            interval = setInterval(() => {
                setSeconds((s) => s + 1);
            }, 1000);
        } else clearInterval(interval); // clear interval
        return () => clearInterval(interval); // clear interval
    }, [timerStart]);

    const intervalRef = useRef(null);
    useEffect(() => {
        setExpireDateForTrainer(expireDate);
    }, [timerId, taskRunning, expireDate]);

    useEffect(() => {
        // Function to check the expiration status
        const checkExpiration = () => {
            if (expireDateForTrainer !== null) {
                const expireDate = new Date(expireDateForTrainer);
                const currentTime = new Date();
                const timeDifference =
                    expireDate.getTime() - currentTime.getTime();
                setTimeLeft(Math.max(0, Math.floor(timeDifference / 1000)));

                if (
                    currentTime >= expireDate &&
                    _.includes([14, 15, 16, 17], Number(auth.roleId))
                ) {
                    setExpiredTimerForNewEmployee(true);
                    stopTimer();
                    clearInterval(intervalRef.current); // Stop the interval
                }
            }
        };

        // Check expiration immediately on mount
        checkExpiration();

        intervalRef.current = setInterval(checkExpiration, 1000); //expire checking every 1 seconds

        return () => clearInterval(intervalRef.current);
    }, [expireDateForTrainer, timerId]);

    // time formating
    const timer = () => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const s = Math.floor((seconds % 3600) % 60);

        // format
        let sec = s < 10 ? `0${s}` : s;
        let min = minutes < 10 ? `0${minutes}` : minutes;
        let hr = hours < 10 ? `0${hours}` : hours;
        return `${hr}:${min}:${sec}`;
    };

    // tostar
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
    });

    /******** Start timer control *********/

    // timer start first timer : checking api
    const [
        startTimerFirstCheck,
        { isFetching: startTimerFirstCheckIsFetching },
    ] = useLazyGetTaskDetailsQuery();

    // start timer api slice
    const [startTimerApi, { isLoading: timerStartStatusIsLoading }] =
        useStartTimerApiMutation();

    // stop timer api slice
    const [stopTimerApi, { isLoading: timerStopStatusIsLoading }] =
        useStopTimerApiMutation();

    const [checkWorkReport] = useCheckWorkingReportMutation();

    // timer start control
    const startTimerControl = async () => {
        setIsOpenConfirmationModal(false);

        // check is developer submit their daily working report on previous day

        try {
            // check
            const workReport = await checkWorkReport().unwrap();

            // if submit all required report start timer
            if (
                workReport &&
                workReport.data &&
                (workReport.data.check_in_check_out.check_in_status ||
                    _.includes([14, 15, 16, 17], Number(auth.roleId))) &&
                (workReport.data.daily_task_report.daily_submission_status ||
                    _.includes([14, 15, 16, 17], Number(auth.roleId))) &&
                (workReport.data.hours_log_report.hours_log_report_status ||
                    _.includes([14, 15, 16, 17], Number(auth.roleId)))
            ) {
                await startTimerApi({
                    task_id: task?.id,
                    project_id: task?.projectId,
                    memo: task?.title,
                    user_id: window?.Laravel?.user?.id,
                })
                    .unwrap()
                    .then((res) => {
                        if (res?.status === "success" || res?.status === 200) {
                            setTimerStart(true);
                            setTimerId(res?.id);
                            dispatch(setTaskStatus(res?.task_status));
                            // localStorage.setItem(
                            //     "expireDateForTrainer",
                            //     res?.evaluation
                            // );
                            Toast.fire({
                                icon: "success",
                                title: _.startCase(res?.message),
                            });
                        } else {
                            Toast.fire({
                                icon: "warning",
                                title: _.startCase(res?.message),
                            });
                        }
                    });
            } else {
                workingReportError();
            }
        } catch (error) {
            console.log(error);
        }

        /*
        startTimerApi({
            task_id: task?.id,
            project_id: task?.projectId,
            memo: task?.title,
            user_id: window?.Laravel?.user?.id,
        })
            .unwrap()
            .then((res) => {
                  if (res?.status === "success" || res?.status === 200) {
                    setTimerStart(true);
                    setTimerId(res?.id);
                    dispatch(setTaskStatus(res?.task_status));
                    Toast.fire({
                        icon: 'success',
                        title: _.startCase(res?.message),
                    });
                } else {
                    Toast.fire({
                        icon: 'warning',
                        title: _.startCase(res?.message),
                    });
                }
            })
            .catch((err) => { 
                if(err.status === 400){
                    if(err.data.acknowledgement_submitted === false){
                        Swal.fire({
                            title:  "You have not meet last day's minimum hour count. Please share the reasons!",
                            showDenyButton: true,
                            confirmButtonText: 'Yes',
                            denyButtonText: `Close`,
                            icon: 'warning'
                          }).then((result) => {
                            // Read more about isConfirmed, isDenied below
                            if (result.isConfirmed) {
                                dispatch(setLessTrackModal({
                                    show: true, 
                                    type: 'START_TIMER', 
                                    date: dayjs.dayjs(err?.data?.date).format("MMM DD, YYYY"),
                                }))
                            } 
                          })
                     }
                     
                     else if(err.data.daily_submission_submitted === false){
                        Swal.fire({
                            title:  "You didn't submit last day daily submission",
                            showDenyButton: true,
                            confirmButtonText: 'Yes',
                            denyButtonText: `Close`,
                            icon: 'warning'
                          }).then((result) => {
                            // Read more about isConfirmed, isDenied below 
                            if (result.isConfirmed) {
                                navigate(`?modal=daily-submission&date_type=last-date`)
                            } 
                          })
                     }
    
                } 
            });
        */
    };

    // start timer function
    const startTimer = (e) => {
        e.preventDefault();
        setTimerStatusForWarningModal(true);
        startTimerFirstCheck(
            `/${task?.id}/json?mode=developer_first_task_check&project_id=${task?.projectId}`
        )
            .unwrap()
            .then((res) => {
                if (res.is_first_task) {
                    setIsOpenConfirmationModal(true);
                } else startTimerControl();
            });
    };

    /*********** End of Start Timer control ***************/

    // stop timer
    const stopTimer = () => {
        //navigate(`/account/tasks/${task?.id}?modal=daily-submission&trigger=stop-button`);
        setTimerStatusForWarningModal(false);
        stopTimerApi({ timeId: timerId, task_id: task?.id })
            .unwrap()
            .then((res) => {
                if (res?.status === "success" || res?.status === 200) {
                    Toast.fire({
                        icon: "success",
                        title: _.startCase(res?.message),
                    });
                    setTimerStart(false);
                    setSeconds(0);
                    timerId(null);
                } else if (res?.status === 400) {
                    Swal.fire({
                        icon: "warning",
                        title: _.startCase(res?.message),
                        showConfirmButton: true,
                    });
                    window.location.reload();
                } else {
                    Toast.fire({
                        icon: "warning",
                        title: _.startCase(res?.message),
                    });
                }
            });
    };
    const [getUserTrackTime, { isFetching: trackTimerFetcing }] =
        useLazyGetUserTrackTimeQuery();

    // handle stop timer
    const handleStopTimer = () => {
        // fetch data
        getUserTrackTime(loggedUser?.getId())
            .unwrap()
            .then((res) => {
                if (res) {
                    let currentTime = dayjs.dayjs(res.current_time);
                    let target = currentTime
                        .set("hour", 16)
                        .set("minute", 45)
                        .set("second", 0);
                    const isSaturday = currentTime.day() === 6;

                    if (isSaturday) {
                        target = currentTime
                            .set("hour", 13)
                            .set("minute", 0)
                            .set("second", 0);
                    }

                    let check = dayjs.dayjs(currentTime).isBefore(target);
                    let isDev = _.includes(
                        [5, 9, 10],
                        Number(auth?.getRoleId())
                    );
                    if (!check && isDev) {
                        res.tracked_times < res.target_time
                            ? dispatch(
                                  setLessTrackModal({
                                      show: true,
                                      type: "STOP_TIMER",
                                      date: "Today",
                                  })
                              )
                            : stopTimer();
                    } else {
                        stopTimer();
                    }
                }
            })
            .catch((err) => console.log(err));
    };

    // control loading states...
    useEffect(() => {
        if (startTimerFirstCheckIsFetching || timerStartStatusIsLoading) {
            document.getElementsByTagName("body")[0].style.cursor = "progress";
        } else {
            document.getElementsByTagName("body")[0].style.cursor = "default";
        }
    }, [startTimerFirstCheckIsFetching, timerStartStatusIsLoading]);

    return (
        <React.Fragment>
            {!timerStart ? (
                <React.Fragment>
                    {!timerStartStatusIsLoading &&
                    !startTimerFirstCheckIsFetching ? (
                        <div>
                            {!expiredTimerForNewEmployee ? (
                                <Button
                                    variant="tertiary"
                                    onClick={startTimer}
                                    className="d-flex align-items-center btn-outline-dark text-dark"
                                >
                                    <i className="fa-solid fa-circle-play" />
                                    <span>Start Timer</span>
                                </Button>
                            ) : (
                                <Button
                                    variant="danger"
                                    className="d-flex align-items-center  "
                                >
                                    <i
                                        className="fa-solid fa-circle-play"
                                        style={{ color: "white" }}
                                    />

                                    <span>Time Expired</span>
                                </Button>
                            )}
                        </div>
                    ) : (
                        <Button className="cursor-processing mr-2">
                            <div
                                className="spinner-border text-white"
                                role="status"
                                style={{ width: "18px", height: "18px" }}
                            ></div>
                            Starting...
                        </Button>
                    )}
                    <StartTimerConfirmationModal
                        isOpen={isOpenConfirmationModal}
                        onConfirm={startTimerControl}
                    />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Button
                        variant="tertiary"
                        className="d-flex align-items-center btn-outline-dark text-dark"
                    >
                        <i className="fa-solid fa-stopwatch" />
                        <span className="d-inline ml-1">{timer()}</span>
                    </Button>

                    {/* <StopTimerControl
                        stopTimer={stopTimer}
                        timerStopStatusIsLoading={timerStopStatusIsLoading}
                    /> */}

                    {trackTimerFetcing ? (
                        <Button className="cursor-processing">
                            <div
                                className="spinner-border text-white"
                                role="status"
                                style={{ width: "18px", height: "18px" }}
                            />
                            Processing...
                        </Button>
                    ) : !timerStopStatusIsLoading ? (
                        <Button
                            variant="tertiary"
                            onClick={handleStopTimer}
                            className="d-flex align-items-center btn-outline-dark text-dark"
                        >
                            <i className="fa-solid fa-pause" />
                            <span className="d-inline ml-1">Stop Timer</span>
                        </Button>
                    ) : (
                        <Button className="cursor-processing">
                            <div
                                className="spinner-border text-white"
                                role="status"
                                style={{ width: "18px", height: "18px" }}
                            />
                            Stopping...
                        </Button>
                    )}
                </React.Fragment>
            )}

            {/* LessTrackTimerModal */}
            <LessTrackTimerModal
                stopTimer={stopTimer}
                startTimer={startTimerControl}
            />

            {_.includes([14, 15, 16, 17], Number(auth.roleId)) && (
                <>
                    <ExpiredTimeModalForNewEmployee
                        showExpirationWarningModal={showExpirationWarningModal}
                        setShowExpirationWarningModal={
                            setShowExpirationWarningModal
                        }
                        timeLeft={timeLeft}
                        setTimeLeft={setTimeLeft}
                        taskRunning={taskRunning}
                        task={task}
                        timerStatusForWarningModal={timerStatusForWarningModal}
                    />
                    <ExpiredNotifyModalForNewEmployee
                        expireDateForTrainer={expireDateForTrainer}
                        showExpirationNotifyModal={showExpirationNotifyModal}
                        setShowExpirationNotifyModal={
                            setShowExpirationNotifyModal
                        }
                        timeLeft={timeLeft}
                    />
                </>
            )}

            {console.log(
                "timeleft , expireDate, show expire task modal",
                timeLeft,
                expireDateForTrainer,
                showExpirationNotifyModal
            )}
        </React.Fragment>
    );
};

export default TimerControl;
