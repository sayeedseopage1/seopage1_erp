import React, { useEffect, useState } from "react";
import CKEditorComponent from "../../../../../ckeditor";
import Button from "../../../../components/Button";

const LeaveExplainationOption = ({ id, onChecked, checked, parentReason }) => {
    const [leavePeriod, setLeavePeriod] = useState("");
    const [comment, setComment] = useState("");
    const [duratonStart, setDurationStart] = useState("08:00 AM");
    const [durationEnd, setDurationEnd] = useState("05:00 PM");

    useEffect(() => {
        // start time
        window
            .$("#timepicker1")
            .timepicker("setTime", duratonStart)
            .on("changeTime.timepicker", function (e) {
                setDurationStart(e.target.value);
            });

        // end time
        window
            .$("#timepicker2")
            .timepicker("setTime", durationEnd)
            .on("changeTime.timepicker", function (e) {
                setDurationEnd(e.target.value);
            });
    }, [checked]);

    const handleOnChange = (e) => {
        if (e.target.checked) {
            onChecked(id);
        } else onChecked(null);
    };

    // handle comment
    const handleEditorChange = (e, editor) => {
        const data = editor.getData();
        setComment(data);
    };

    // handle submission
    const handleSubmittion = (e) => {
        e.preventDefault();
        const data = {
            reason_for_less_tracked_hours_a_day_task: parentReason,
            child_reason: "I Had Half Day Of Leave Today",
            duration_form: duratonStart,
            duration_to: durationEnd,
            comment,
            leave_period: leavePeriod,
        };
        console.log({ data });
    };

    return (
        <>
            {/* I Did Not Have Enough Work To Do! */}
            <div className="--option-item">
                <div
                    className="d-flex align-items-center"
                    style={{ gap: "10px" }}
                >
                    <input
                        type="checkbox"
                        id="IHadHalfDayOfLeaveToday"
                        style={{ cursor: "pointer" }}
                        checked={checked}
                        onChange={handleOnChange}
                    />
                    <label
                        htmlFor="IHadHalfDayOfLeaveToday"
                        className="m-0 p-0"
                    >
                        I Had Half Day Of Leave Today
                    </label>
                </div>
                {checked && (
                    <div className="pl-3 my-3 bg-white">
                        <div className="mb-2 font-weight-bold">
                            Select an approximate time here
                        </div>
                        <div
                            className="d-flex align-items-center"
                            style={{ gap: "10px" }}
                        >
                            <label htmlFor="">
                                <input
                                    type="radio"
                                    name="period"
                                    value="First Half"
                                    style={{ cursor: "pointer" }}
                                    onChange={(e) =>
                                        setLeavePeriod(e.target.value)
                                    }
                                />{" "}
                                First Half
                            </label>

                            <label htmlFor="">
                                <input
                                    type="radio"
                                    name="period"
                                    value="Second Half"
                                    style={{ cursor: "pointer" }}
                                    onChange={(e) =>
                                        setLeavePeriod(e.target.value)
                                    }
                                />{" "}
                                Second Half
                            </label>
                        </div>
                        <div className="row">
                            <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                <label htmlFor="" className="d-block">
                                    From:
                                </label>
                                <input
                                    id="timepicker1"
                                    className="form-control w-100 py-2"
                                    data-minute-step="1"
                                    data-modal-backdrop="false"
                                    type="text"
                                />
                            </div>

                            <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                <label htmlFor="" className="d-block">
                                    To
                                </label>
                                <input
                                    id="timepicker2"
                                    className="form-control w-100 py-2"
                                    data-minute-step="1"
                                    data-modal-backdrop="false"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <div className="mb-2 font-weight-bold">
                                Explain the reason of your leave
                            </div>
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

                            <Button onClick={handleSubmittion} className="">
                                Submit
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default LeaveExplainationOption;
