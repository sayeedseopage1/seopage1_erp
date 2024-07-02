import React from "react";
import CKEditorComponent from "../../../../../../../../ckeditor";
import Button from "../../../../../../../../global/Button";
import Switch from "../../../../../../../../global/Switch";
import {
    FormGroup,
    Label,
} from "../../../../../../../../global/styled-component/Form";
import DurationTime from "./DurationTimer";
import extractTime from "../../../../../../../../utils/extractTime";
import formatTimeTo12Hour from "../../../../../../../../utils/formatTimeTo12Hour";
import checkOverlapRange from "../../../../../../../../utils/checkOverlapRange";
import checkOverlap from "../../../../../../../../utils/checkOverlap";
import Swal from "sweetalert2";
const Option6 = ({
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
    const [durations, setDurations] = React.useState([
        { start: "", end: "", id: "de2sew" },
    ]);
    const [error, setError] = React.useState(null);
    const uniqueId = Math.random().toString(6).slice(2);
    const [sType, setSType] = React.useState(""); // submission type
    // editor data change
    const handleEditorChange = (e, editor) => {
        const data = editor.getData();
        setComment(data);
    };

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

    const isValid = () => {
        let errCount = 0;
        let err = new Object();

        if (comment === "") {
            err.comment = "Please explaine the reason here!";
            errCount++;
        }
        setError(err);
        return !errCount;
    };

    //overlapping validation
    // let newOverlappingTimes = [];
    // let lastClockOutTime = lastClockData?.clock_out_time
    //     ? extractTime(lastClockData?.clock_out_time)
    //     : "23:00:00";

    // handle form submit
    const handleSubmission = (e, submissionType) => {
        e.preventDefault();
        const data = {
            reason_for_less_tracked_hours_a_day_task:
                "In the morning, I had to wait for work before I could start.",
            durations: JSON.stringify(durations),
            comment,
        };

        if (!isValid()) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please fill up the all required fields!",
                showConfirmButton: true,
            });
            return;
        }
        // if (checkOverlapRange(lastClockOutTime, durations)) {
        //     Swal.fire({
        //         position: "center",
        //         icon: "error",
        //         title: "You have selected wrong time range!",
        //         text: `You must select time within this time range: 07:45 AM - (${formatTimeTo12Hour(
        //             lastClockOutTime
        //         )}).`,
        //         showConfirmButton: true,
        //     });
        //     return;
        // }

        // if (checkOverlap(newOverlappingTimes, durations, trackedTimeHistory)) {
        //     Swal.fire({
        //         position: "center",
        //         icon: "error",
        //         title: "Your selected time is overlapping with your tracked time!",
        //         text: `Overlapping time: ${newOverlappingTimes
        //             ?.map(
        //                 (t) =>
        //                     `${formatTimeTo12Hour(
        //                         t.trackedStart
        //                     )} - ${formatTimeTo12Hour(t.trackedEnd)}`
        //             )
        //             .join(", ")}`,
        //         showConfirmButton: true,
        //     });
        //     return;
        // }

        setSType(submissionType);
        onSubmit(data, submissionType, onBack, durations);
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
                    In the morning, I had to wait for work before I could start.
                </div>

                {/* if checked */}
                <Switch>
                    <Switch.Case condition={checked}>
                        <div className="pl-3 my-3 bg-white">
                            {/* time duration */}
                            <FormGroup>
                                <Label className="font-weight-bold">
                                    Select an approximate time here.{" "}
                                    <sup>*</sup>
                                </Label>
                                {/* duration selection row */}
                                <div className="row">
                                    <div className="col-5 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                        <Label className="font-weight-bold text-dark">
                                            From:
                                        </Label>
                                    </div>

                                    <div className="col-5 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                        <Label className="font-weight-bold text-dark">
                                            To
                                        </Label>
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
                            </FormGroup>

                            {/* comment field */}
                            <div className="mt-3">
                                <Label className="font-weight-bold">
                                    Write your comments here:{" "}
                                </Label>
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
                                    onClick={() => {
                                        onBack(null);
                                        setDurations([
                                            {
                                                start: "",
                                                end: "",
                                                id: "d32sew",
                                            },
                                        ]);
                                    }}
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
                                    onClick={(e) => {
                                        handleSubmission(e, "CONTINUE");
                                        setDurations([
                                            {
                                                start: "",
                                                end: "",
                                                id: "d32sew",
                                            },
                                        ]);
                                    }}
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

export default Option6;
