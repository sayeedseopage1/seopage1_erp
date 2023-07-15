import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import StartTimerConfirmationModal from "./StartTimerConfirmationModal";
import {
    useLazyGetTaskDetailsQuery,
    useLazyGetUserTrackTimeQuery,
    useStartTimerApiMutation,
    useStopTimerApiMutation,
} from "../../../services/api/SingleTaskPageApi";
import { CompareDate } from "../../../utils/dateController";
import _ from "lodash";
import StopTimerControl from "./StopTimerControl";
import { useDispatch } from "react-redux";
import { setLessTrackModal, setTaskStatus } from "../../../services/features/subTaskSlice";
import LessTrackTimerModal from "./stop-timer/LessTrackTimerModal";
import { User } from "../../../utils/user-details";


const TimerControl = ({ task }) => {
    const [timerStart, setTimerStart] = useState(false);
    const [timerId, setTimerId] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [isOpenConfirmationModal, setIsOpenConfirmationModal] =
        useState(false);

    const dispatch = useDispatch(); 
    const dayjs = new CompareDate(); 
    const loggedUser = new User(window?.Laravel?.user);

    const openLessTrackTimerModal = () => dispatch(setLessTrackModal(true)) // open less hours track explaination modal 

    // check timer is already running
    useEffect(() => {
        if (task?.running_timer?.status === "running") {
            let serverTime = task.running_timer.time;
            let localTime = dayjs.dayjs().unix();
            let timer = localTime - serverTime;
            setTimerStart(true);
            setSeconds(timer);
            setTimerId(task?.running_timer?.id);
        }
    }, [task]);

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
    
    

    // timer start control
    const startTimerControl = () => {
        setIsOpenConfirmationModal(false);
        startTimerApi({
            task_id: task?.id,
            project_id: task?.project_id,
            memo: task?.heading,
            user_id: window?.Laravel?.user?.id,
        })
            .unwrap()
            .then((res) => {
                if (res?.status === "success") {
                    setTimerStart(true);
                    setTimerId(res?.id);
                    dispatch(setTaskStatus(res?.task_status));
                    Toast.fire({
                        icon: res?.status,
                        title: _.startCase(res?.message),
                    });
                } else {
                    Toast.fire({
                        icon: res?.status,
                        title: _.startCase(res?.message),
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // start timer function
    const startTimer = (e) => {
        e.preventDefault();
        startTimerFirstCheck(
            `/${task?.id}/json?mode=developer_first_task_check&project_id=${task?.project_id}`
        )
            .unwrap()
            .then((res) => {
                if (res.is_first_task) {
                    setIsOpenConfirmationModal(true);
                } else startTimerControl();
            })
            .catch((err) => console.log(err));
    };

    /*********** End of Start Timer control ***************/

    // stop timer
    const stopTimer = () => {
        stopTimerApi({ timeId: timerId })
            .unwrap()
            .then((res) => {
                if (res?.status === "success") {
                    Toast.fire({
                        icon: res?.status,
                        title: _.startCase(res?.message),
                    });
                    setTimerStart(false);
                    setSeconds(0);
                    timerId(null);
                } else {
                    Toast.fire({
                        icon: res?.status,
                        title: _.startCase(res?.message),
                    });
                }
            });
    }; 
    const [getUserTrackTime, {
        isFetching: trackTimerFetcing
    }] = useLazyGetUserTrackTimeQuery();

    // handle stop timer 
    const handleStopTimer = () => {
        /**
         *  TODO: Fetch Developer track hours for a day
         *  TODO: if track time less then 7 hours and 15 minutes show trackTimerModal to explain reason
         *  TODO: else stop timer 
         */

        // fetch data
        getUserTrackTime(loggedUser?.getId())
        .unwrap()
        .then(res => {
            console.log({res})
            res < 435 ? openLessTrackTimerModal() : stopTimer()
        })
        .catch(err => console.log(err))
    }

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
                            Start Timer
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

                    {
                        trackTimerFetcing ? 
                        (
                            <Button className="cursor-processing">
                                <div
                                    className="spinner-border text-white"
                                    role="status"
                                    style={{ width: "18px", height: "18px" }}
                                />
                                Processing...
                            </Button>
                        ):

                        !timerStopStatusIsLoading ? (
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
                        )
                    } 
                </React.Fragment>
            )}


            {/* LessTrackTimerModal */}
            <LessTrackTimerModal stopTimer={stopTimer} />

        </React.Fragment>
    );
};

export default TimerControl;
