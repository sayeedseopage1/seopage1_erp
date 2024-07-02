import React from "react";
import CKEditorComponent from "../../../../../../../../ckeditor";
import Button from "../../../../../../../../global/Button";
import Switch from "../../../../../../../../global/Switch";
import { Label } from "../../../../../../../../global/styled-component/Form";
import { TimePicker, Space } from "antd";
import dayjs from "dayjs";
import extractTime from "../../../../../../../../utils/extractTime";
import checkOverlap from "../../../../../../../../utils/checkOverlap";
import checkOverlapRange from "../../../../../../../../utils/checkOverlapRange";
import formatTimeTo12Hour from "../../../../../../../../utils/formatTimeTo12Hour";
import { fromAndToValidation } from "../../../../../../../../utils/fromAndToValidation";
/**
 * this component responsible for rendering late explanation form for user
 */

const LateExplanationOption = ({
    trackedTimeHistory,
    lastClockData,
    checked,
    index,
    onChange,
    onSubmit,
    isLoading,
    parentReason,
    lessTrackDate,
    onBack,
}) => {
    // form data
    const [comment, setComment] = React.useState("");
    const [error, setError] = React.useState(null);
    const [durationStart, setDurationStart] = React.useState("");
    const [durationEnd, setDurationEnd] = React.useState("");
    const [sType, setSType] = React.useState(""); // submission type

    // setup time field
    // React.useEffect(() => {
    //     // start time
    //     window
    //         .$("#timepicker1")
    //         .timepicker("setTime", durationStart)
    //         .on("changeTime.timepicker", function (e) {
    //             setDurationStart(e.target.value);
    //         });

    //     // end time
    //     window
    //         .$("#timepicker2")
    //         .timepicker("setTime", durationEnd)
    //         .on("changeTime.timepicker", function (e) {
    //             setDurationEnd(e.target.value);
    //             // console.log(e.timeStamp)
    //         });
    // }, [checked]);

    // validation checking
    const isValid = () => {
        let errCount = 0;
        let err = new Object();

        if (comment === "") {
            errCount++;
            err.comment = "Please explain the reason why you came late!";
        }

        setError(err);
        return !errCount;
    };

    // editor data change
    const handleEditorChange = (e, editor) => {
        const data = editor.getData();
        setComment(data);
    };

    //overlapping validation
    // let newOverlappingTimes = [];
    // let lastClockOutTime = lastClockData?.clock_out_time
    //     ? extractTime(lastClockData?.clock_out_time)
    //     : "23:00:00";

    // handle submission
    const handleSubmission = (e, submissionType) => {
        e.preventDefault();
        const data = {
            reason_for_less_tracked_hours_a_day_task: parentReason,
            child_reason: "I came late",
            durations: JSON.stringify([
                { id: "de2sew", start: durationStart, end: durationEnd },
            ]),
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

        // if (
        //     checkOverlapRange(lastClockOutTime, [
        //         { id: "de2sew", start: durationStart, end: durationEnd },
        //     ])
        // ) {
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
        // if (fromAndToValidation(durations)) {
        //     Swal.fire({
        //         position: "center",
        //         icon: "error",
        //         title: "Invalid Time Range",
        //         text: "The end time should be greater than the start time.",
        //         showConfirmButton: true,
        //     });
        //     return;
        // }

        // if (
        //     checkOverlap(
        //         newOverlappingTimes,
        //         [{ id: "de2sew", start: durationStart, end: durationEnd }],
        //         trackedTimeHistory
        //     )
        // ) {
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

        if (submissionType === "CONTINUE") {
            setDurationStart("");
            setDurationEnd("");
        }
        setSType(submissionType);
        onSubmit(data, submissionType, onBack, [
            { id: "de2sew", start: durationStart, end: durationEnd },
        ]);
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
                    I came late
                </div>

                <Switch>
                    <Switch.Case condition={checked}>
                        <div className="pl-3 my-3 bg-white">
                            <Label className="font-weight-bold">
                                {" "}
                                Select the delay time here <sup>*</sup>
                            </Label>

                            {/* time selection */}
                            <div className="row">
                                <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                    <label htmlFor="" className="d-block">
                                        From:
                                    </label>
                                    <Space wrap>
                                        <TimePicker
                                            use12Hours
                                            needConfirm={false}
                                            format="h:mm a"
                                            defaultValue={durationStart}
                                            onChange={(time) =>
                                                setDurationStart(
                                                    dayjs(
                                                        time,
                                                        "HH:mm:ss"
                                                    ).format("HH:mm:ss")
                                                )
                                            }
                                            className="w-100 py-2"
                                        />
                                    </Space>
                                </div>

                                <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                    <label htmlFor="" className="d-block">
                                        To
                                    </label>
                                    <Space wrap>
                                        <TimePicker
                                            use12Hours
                                            needConfirm={false}
                                            format="h:mm a"
                                            defaultValue={durationEnd}
                                            onChange={(time) =>
                                                setDurationEnd(
                                                    dayjs(
                                                        time,
                                                        "HH:mm:ss"
                                                    ).format("HH:mm:ss")
                                                )
                                            }
                                            className="w-100 py-2"
                                        />
                                    </Space>
                                </div>
                            </div>

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
                            <div className="mt-3 w-100 d-flex align-items-center">
                                {/* back button */}
                                <Button
                                    variant="tertiary"
                                    onClick={() => {
                                        onBack(null);
                                        setDurationStart("");
                                        setDurationEnd("");
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

export default LateExplanationOption;
