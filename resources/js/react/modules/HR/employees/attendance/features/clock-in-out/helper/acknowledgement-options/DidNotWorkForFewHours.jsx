import React from "react";
import CKEditorComponent from "../../../../../../../../ckeditor";
import Button from "../../../../../../../../global/Button";
import Switch from "../../../../../../../../global/Switch";
import { Flex } from "../../../../../../../../global/styled-component/Flex";
import DurationTime from "./DurationTimer";

/**
 * * This component responsible for rendering working report details explanation form
 */
const DidNotWorkForFewHours = ({
    checked,
    index,
    onChange,
    onSubmit,
    isLoading,
    parentReason,
    lessTrackDate,
    onBack,
}) => {
    const [comment, setComment] = React.useState("");
    const [durations, setDurations] = React.useState([
        { start: "00:00AM", end: "00:00AM", id: "dwedj" },
    ]);
    const [error, setError] = React.useState(null);

    // generate random id
    const uniqueId = Math.random().toString(6).slice(2);
    const [sType, setSType] = React.useState(''); // submission type
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
                start: "00:00 AM",
                end: "00:00 AM",
            },
        ]);
    };

    // editor data change
    const handleEditorChange = (e, editor) => {
        const data = editor.getData();
        setComment(data);
    };

    // form validation check
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

    // handle form submit
    const handleSubmission = (e, submissionType) => {
        e.preventDefault();
        const data = {
            reason_for_less_tracked_hours_a_day_task: parentReason,
            durations: JSON.stringify(durations),
            child_reason: "I didn't work for a few hours in between",
            comment,
        };

        setSType(submissionType);
        if (isValid()) {
            onSubmit(data, submissionType, onBack);
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please complete all required fields.",
                showConfirmButton: true,
            });
        }
    };

    return (
        <React.Fragment>
            <div className="--option-item">
                {/* acknowledgement option */}
                <Flex alignItem="center" gap="10px">
                    <input
                        type="checkbox"
                        style={{ cursor: "pointer" }}
                        checked={checked}
                        value={index.toString()}
                        onChange={onChange}
                    />
                    I didn't work for a few hours in between.
                </Flex>

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
                                    onClick={e => handleSubmission(e, '')}
                                    isLoading={sType !== 'CONTINUE' && isLoading}
                                    loaderTitle='Processing...'
                                >
                                    Submit
                                </Button>

                                <Button
                                    variant='success'
                                    className='ml-2'
                                    onClick={e => handleSubmission(e, 'CONTINUE')}
                                    isLoading={sType === 'CONTINUE' && isLoading}
                                    loaderTitle='Processing...'
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

export default DidNotWorkForFewHours;
