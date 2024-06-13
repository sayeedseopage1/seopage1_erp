import React, { useEffect, useState } from "react";
import CKEditorComponent from "../../../../../../../../ckeditor";
import Button from "../../../../../../../../global/Button";
import Switch from "../../../../../../../../global/Switch";
import DurationTime from "./DurationTimer";
import extractTime from "../../../../../../../../utils/extractTime";
import formatTimeTo12Hour from "../../../../../../../../utils/formatTimeTo12Hour";
import checkOverlapRange from "../../../../../../../../utils/checkOverlapRange";
import checkOverlap from "../../../../../../../../utils/checkOverlap";

/**
 * * this component show the first acknowledgement option
 */

const Option1 = ({
    checked,
    index,
    onChange,
    onSubmit,
    isLoading,
    onBack,
    trackedTimeHistory,
    lastClockData,
}) => {
    const [comment, setComment] = React.useState("");
    const [error, setError] = React.useState(null);
    const [durations, setDurations] = React.useState([
        {
            start: "",
            end: "",
            id: "d32sew",
        },
    ]);
    const [sType, setSType] = React.useState(""); // submission type

    console.log("durations", durations);
    // unique id
    const uniqueId = Math.random().toString(6).slice(2);

    // remove duration
    const onRemove = (e, id) => {
        e.preventDefault();
        let filtered = durations.filter((d) => d.id !== id);
        setDurations([...filtered]);
    };

    // add duration
    const addDurationForm = () => {
        setDurations((prev) => [
            ...prev,
            {
                id: uniqueId,
                start: "",
                end: "",
            },
        ]);
    };

    // editor data change
    const handleEditorChange = (e, editor) => {
        const data = editor.getData();
        setComment(data);
    };

    //overlapping validation
    let newOverlappingTimes = [];
    let lastClockOutTime = lastClockData?.clock_out_time
        ? extractTime(lastClockData?.clock_out_time)
        : "23:00:00";
    console.log("last clock out time", lastClockOutTime);
    const handleSubmission = (e, submissionType) => {
        e.preventDefault();

        const data = {
            reason_for_less_tracked_hours_a_day_task:
                "I did not have enough work to do.",
            durations: JSON.stringify(durations),
            comment,
        };

        if (comment === "") {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please fill up all required fields!",
                showConfirmButton: true,
            });

            return setError({ comment: "Please explain the reason here!" });
        }

        if (checkOverlap(newOverlappingTimes, durations, trackedTimeHistory)) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Your selected time is overlapping with your tracked time!",
                text: `Overlapping time: ${newOverlappingTimes
                    ?.map(
                        (t) =>
                            `${formatTimeTo12Hour(
                                t.trackedStart
                            )} - ${formatTimeTo12Hour(t.trackedEnd)}`
                    )
                    .join(", ")}`,
                showConfirmButton: true,
            });
            return;
        }

        if (checkOverlapRange(lastClockOutTime, durations)) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "You have selected wrong time range!",
                text: `You must select time within this time range: 07:45 AM - (${formatTimeTo12Hour(
                    lastClockOutTime
                )}).`,
                showConfirmButton: true,
            });
            return;
        }

        setSType(submissionType);
        onSubmit(data, submissionType, onBack);
        console.log("submitted");
    };

    return (
        <React.Fragment>
            <div className="--option-item">
                {/* acknowledgement option */}
                <div
                    className="d-flex align-items-center"
                    style={{ gap: "10px" }}
                >
                    <input
                        type="checkbox"
                        style={{ cursor: "pointer" }}
                        checked={checked}
                        value={index.toString()}
                        onChange={onChange}
                    />
                    I did not have enough work to do.
                </div>

                {/* if checked */}
                <Switch>
                    <Switch.Case condition={checked}>
                        <div className="pl-3 my-3 bg-white">
                            {/* duration selection row */}
                            <div className="row">
                                <div className="col-5 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                    <label htmlFor="" className="d-block">
                                        From:
                                    </label>
                                </div>

                                <div className="col-5 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                    <label htmlFor="" className="d-block">
                                        To
                                    </label>
                                </div>
                            </div>

                            {/* duration */}
                            {_.map(durations, (duration) => (
                                <DurationTime
                                    key={duration.id}
                                    id={duration.id}
                                    onRemove={onRemove}
                                    startTime={duration.start}
                                    endTime={duration.end}
                                    durations={durations}
                                    setDurations={setDurations}
                                />
                            ))}

                            {/* add timer field */}
                            <button
                                className="mt-2 d-flex align-items-center bg-transparent"
                                style={{ gap: "10px" }}
                                onClick={addDurationForm}
                            >
                                <i className="fa-solid fa-circle-plus" />
                                Add New Time
                            </button>

                            {/* comment field */}
                            <div className="mt-3">
                                <h6>Write your comments here: </h6>
                                <div className="ck-editor-holder stop-timer-options">
                                    <CKEditorComponent
                                        data={comment}
                                        onChange={handleEditorChange}
                                    />
                                </div>
                                <Switch.Case condition={error?.comment}>
                                    <div className="f-14 text-danger">
                                        {error?.comment}
                                    </div>
                                </Switch.Case>
                            </div>

                            {/* footer section */}
                            <div className="mt-3 d-flex align-items-center">
                                {/* back button */}
                                <Button
                                    variant="tertiary"
                                    onClick={() => onBack(null)}
                                    className="ml-auto mr-2"
                                >
                                    Back
                                </Button>

                                <Button
                                    onClick={(e) => handleSubmission(e, "")}
                                    isLoading={
                                        sType !== "CONTINUE" && isLoading
                                    }
                                    loaderTitle="Processing..."
                                >
                                    Submit
                                </Button>

                                <Button
                                    variant="success"
                                    className="ml-2"
                                    onClick={(e) =>
                                        handleSubmission(e, "CONTINUE")
                                    }
                                    isLoading={
                                        sType === "CONTINUE" && isLoading
                                    }
                                    loaderTitle="Processing..."
                                >
                                    Submit and add more
                                </Button>
                            </div>
                        </div>
                    </Switch.Case>
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default Option1;
