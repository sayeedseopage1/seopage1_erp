import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import Button from "../../../../components/Button";
import { Listbox } from "@headlessui/react";
import { HiOutlineSelector } from "react-icons/hi";
import Loader from "../../../../components/Loader";

const DeveloperTaskSelectionMenu = lazy(() => import('./DevloperTaskSelectionMenu'));

// duration time
const DurationTime = ({
    handleSelectTimeDuration,
    index,
    startTime,
    endTime,
}) => {
    const [start, setStart] = useState(startTime);
    const [end, setEnd] = useState(endTime);

    useEffect(() => {
        window
            .$(`#timepicker1${index}`)
            .timepicker("setTime", startTime)
            .on("changeTime.timepicker", function (e) {
                e.preventDefault();
                setStart(e.target.value);
            });

        window
            .$(`#timepicker5${index}`)
            .timepicker("setTime", endTime)
            .on("changeTime.timepicker", function (e) {
                e.preventDefault();
                setEnd(e.target.value);
            });
    }, []);

    const _start = useMemo(() => start, [start]);
    const _end = useMemo(() => end, [end]);

    useEffect(() => {
        handleSelectTimeDuration(
            {
                start: _start,
                end: _end,
            },
            index
        );
    }, [_start, _end]);

    return (
        <div className="row mt-2">
            <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                <input
                    id={`timepicker1${index}`}
                    className="form-control w-100 py-2"
                    data-minute-step="1"
                    data-modal-backdrop="false"
                    type="text"
                />
            </div>

            <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                <input
                    id={`timepicker5${index}`}
                    className="form-control w-100 py-2"
                    data-minute-step="1"
                    data-modal-backdrop="false"
                    type="text"
                />
            </div>
        </div>
    );
};

const OptionFive = ({ id, onChecked, checked, onSubmit, isSubmitting}) => {
    const [task, setTask] = useState(null);
    const [durations, setDurations] = useState([
        { start: "12:00 AM", end: "12:00 AM" },
    ]);



    // handle input change
    const handleOnChange = (e) => {
        e.target.checked ? onChecked(id) : onChecked(null);
    };

    // time duration
    const handleSelectTimeDuration = (value, i) => {
        const arr = [];
        durations.map((d, index) => {
            if (index === i) {
                arr.push({ ...value });
            } else arr.push(d);
        });
        setDurations(arr);
    };

    

    // handle submittion
    const handleSubmittion = () => {
        const data = {
            forgot_to_track_task_id: task?.id,
            durations: JSON.stringify(durations)
        }

        onSubmit(data)
    }
 

    return (
        <>
            <div className={checked ? "--option-item mt-3" : "--option-item"}>
                <div
                    className="d-flex align-items-center"
                    style={{ gap: "10px" }}
                >
                    <input
                        type="checkbox"
                        style={{ cursor: "pointer" }}
                        checked={checked}
                        onChange={handleOnChange}
                    />
                    <span className={checked ? "font-weight-bold" : ""}>
                        I Forgot To Track Hours
                    </span>
                </div>

                {checked && (
                    <div className="pl-3 my-3 bg-white">
                        {/* task selection */}
                        <div className="mt-3 mb-3">
                            <div className="mb-1 text-dark">
                                Select the task you forgot to track hours
                            </div>
                            <div className="position-relative">
                                <Suspense fallback={
                                     <div className="w-100 bg-white py-2 pl-2 pr-1 mb-3 border d-flex align-items-center justify-content-between">
                                        Loading...
                                    </div>
                                }>
                                    <DeveloperTaskSelectionMenu
                                        task={task} 
                                        setTask={setTask}
                                    />
                                </Suspense>
                            </div>
                        </div>

                        <div>
                            <div className="w-100 pb-2">
                                Select an approximate time here
                            </div>
                            <div className="row">
                                <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                    <label htmlFor="" className="d-block">
                                        From:
                                    </label>
                                </div>

                                <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                    <label htmlFor="" className="d-block">
                                        To
                                    </label>
                                </div>
                            </div>
                            {durations?.map((d, i) => (
                                <DurationTime
                                    key={i}
                                    index={i}
                                    startTime={d.start}
                                    endTime={d.end}
                                    handleSelectTimeDuration={
                                        handleSelectTimeDuration
                                    }
                                />
                            ))}

                            <button
                                className="mt-2 d-flex align-items-center bg-transparent"
                                style={{ gap: "10px" }}
                                onClick={() => {
                                    setDurations((prev) => [
                                        ...prev,
                                        {
                                            start: "00:00 AM",
                                            end: "00:00 AM",
                                        },
                                    ]);
                                }}
                            >
                                <i className="fa-solid fa-circle-plus" />
                                Add New Time
                            </button>
                        </div>

                        <div className="mt-3 d-flex align-items-center">
                            <Button
                                variant="tertiary"
                                onClick={() => onChecked(null)}
                                className="ml-auto mr-2"
                            >
                                Back
                            </Button>

                            {
                                !isSubmitting ? 
                                <Button onClick={handleSubmittion} className="">
                                    Submit
                                </Button>
                                : <Button className="cursor-processing">
                                <div
                                    className="spinner-border text-white"
                                    role="status"
                                    style={{
                                        width: "18px",
                                        height: "18px",
                                    }}
                                ></div>
                                Processing...
                            </Button>
                            }
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default OptionFive;
