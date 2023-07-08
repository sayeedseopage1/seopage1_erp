import React, { useEffect, useState, useMemo } from "react";
import CKEditorComponent from "../../../../../ckeditor";
import Button from "../../../../components/Button";

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

const OptionOne = ({ id, onChecked, checked }) => {
    const [durations, setDurations] = useState([
        { start: "00:00 AM", end: "00:00 AM" },
    ]);

    const [comment, setComment] = useState("");

    // handle change
    const handleOnChange = (e) => {
        if (e.target.checked) {
            onChecked(id);
        } else {
            onChecked(null);
        }
    };

    // handle editor change
    const handleEditorChange = (e, editor) => {
        const data = editor.getData();
        setComment(data);
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

    // handle submit
    const handleSubmission = (e) => {
        e.preventDefault();
        const data = {
            reason_for_less_tracked_hours_a_day_task:
                "I Did Not Have Enough Work To Do",
            durations: JSON.stringify(durations),
            comment,
        };
        console.log({ data });
    };

    return (
        <>
            <div className="--option-item">
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
                    I Did Not Have Enough Work To Do
                </div>
                {checked && (
                    <div className="pl-3 my-3 bg-white">
                        <h6>Select an approximate time here</h6>
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

                        <div className="mt-3">
                            <h6>Write your comments here.</h6>
                            <div className="ck-editor-holder stop-timer-options">
                                <CKEditorComponent
                                    onChange={handleEditorChange}
                                />
                            </div>
                        </div>

                        <div className="mt-3 d-flex align-items-center">
                            <Button
                                variant="tertiary"
                                onClick={() => onChecked(null)}
                                className="ml-auto mr-2"
                            >
                                Back
                            </Button>

                            <Button onClick={handleSubmission} className="">
                                Submit
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default OptionOne;
