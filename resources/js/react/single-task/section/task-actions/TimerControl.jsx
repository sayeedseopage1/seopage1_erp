import _ from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    useCheckWorkingReportMutation,
    useLazyGetTaskDetailsQuery,
    useLazyGetUserTrackTimeQuery,
    useStartTimerApiMutation,
    useStopTimerApiMutation,
} from "../../../services/api/SingleTaskPageApi";
import { setTaskStatus } from "../../../services/features/subTaskSlice";
import { CompareDate } from "../../../utils/dateController";
import { User } from "../../../utils/user-details";
import Button from "../../components/Button";
import { workingReportError } from "../helper/timer-start-working-report-error-toaster";
import StartTimerConfirmationModal from "./StartTimerConfirmationModal";
import LessTrackTimerModal from "./stop-timer/LessTrackTimerModal";

// component
const TimerControl = ({ task, timerStart, setTimerStart, auth }) => {
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

    // check timer is already running
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

    // time formatting
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

    // toaster
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

        try {
            // check work report is developer submit task report previous date
            const workReport = await checkWorkReport().unwrap();

            // if submit all required report start timer
            if (
                workReport &&
                workReport.data &&
                workReport.data.check_in_check_out.check_in_status &&
                workReport.data.daily_task_report.daily_submission_status &&
                workReport.data.hours_log_report.hours_log_report_status
            ) {
                // request for start time
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
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                workingReportError();
            }
        } catch (error) {
            console.log(error);
        }

        return;
    };

    const isDesignerTask = _.includes([5, 7], task?.category?.id);

    // start timer function
    const startTimer = (e) => {
        e.preventDefault();

        startTimerFirstCheck(
            `/${task?.id}/json?mode=developer_first_task_check&project_id=${task?.projectId}`
        )
            .unwrap()
            .then((res) => {
                if (res.is_first_task && !isDesignerTask) {
                    setIsOpenConfirmationModal(true);
                } else startTimerControl();
            });
    };

    /*********** End of Start Timer control ***************/

    // stop timer
    const stopTimer = () => {
        //navigate(`/account/tasks/${task?.id}?modal=daily-submission&trigger=stop-button`);
        stopTimerApi({ timeId: timerId })
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
        stopTimer();

        // // fetch data
        // getUserTrackTime(loggedUser?.getId())
        // .unwrap()
        // .then(res => {
        //     if(res){
        //         let currentTime = dayjs.dayjs(res.current_time);
        //         let target = currentTime.set('hour', 16).set('minute', 45).set('second', 0);
        //         const isSaturday = currentTime.day() === 6;

        //         if(isSaturday){
        //             target = currentTime.set('hour', 13).set('minute', 0).set('second', 0);
        //         }

        //         let check = dayjs.dayjs(currentTime).isBefore(target);
        //         let isDev = _.includes([5, 9 , 10], Number(auth?.getRoleId()));
        //         if(!check && isDev){
        //             res.tracked_times < res.target_time ?  dispatch(setLessTrackModal({show: true, type: 'STOP_TIMER', date: 'Today'})) : stopTimer()
        //         }else{
        //             stopTimer();
        //         }
        //     }

        // })
        // .catch(err => console.log(err))
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
                        <Button
                            variant="tertiary"
                            onClick={startTimer}
                            className="d-flex align-items-center btn-outline-dark text-dark"
                        >
                            <i className="fa-solid fa-circle-play" />
                            <span>Start Timer</span>
                        </Button>
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
        </React.Fragment>
    );
};

export default TimerControl;
