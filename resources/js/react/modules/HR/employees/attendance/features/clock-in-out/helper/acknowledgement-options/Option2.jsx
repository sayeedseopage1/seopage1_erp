import React from "react";
import CKEditorComponent from "../../../../../../../../ckeditor";
import Button from "../../../../../../../../global/Button";
import Switch from "../../../../../../../../global/Switch";

/**
 * * this component show the first acknowledgement option
 */

const Option2 = ({ checked, index, onChange, onSubmit, isLoading, onBack }) => {
    const [transitionHours, setTransitionHours] = React.useState(0);
    const [transitionMinutes, setTransitionMinutes] = React.useState(0);
    const [comment, setComment] = React.useState("");
    const [error, setError] = React.useState(null);

    const [sType, setSType] = React.useState(""); // submission type

    // editor data change
    const handleEditorChange = (e, editor) => {
        const data = editor.getData();
        setComment(data);
    };

    // validation checking function
    const isValid = () => {
        let errCount = 0;
        let err = new Object();

        if (comment === "") {
            err.comment = "Please explain the reason here..";
            errCount++;
        }

        if (Number(transitionHours) + Number(transitionMinutes) === 0) {
            err.transition = "Write approximate time here!";
            errCount++;
        }

        setError(err);
        return !errCount;
    };

    // handle form submit
    const handleSubmission = (e, submissionType) => {
        e.preventDefault();
        const data = {
            reason_for_less_tracked_hours_a_day_task:
                "During transition from one task to another, I had to wait for a while.",
            transition_hours: Number(transitionHours),
            transition_minutes: Number(transitionMinutes),
            comment,
        };

        setSType(submissionType);
        if (isValid()) {
            onSubmit(data, submissionType, onBack);
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please fill up the all required fields!",
                showConfirmButton: true,
            });
        }
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
                    During transition from one task to another, I had to wait
                    for a while.
                </div>

                {/* if checked */}
                <Switch>
                    <Switch.Case condition={checked}>
                        <div className="pl-3 my-3 bg-white">
                            <div className="mt-2 mb-2 font-weight-bold">
                                Enter an approximate time here:
                            </div>
                            <div className="row">
                                {/* hours */}
                                <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                    <label
                                        htmlFor="transitionHours"
                                        className="d-block"
                                    >
                                        Hours
                                    </label>
                                    <input
                                        id="transitionHours"
                                        className="form-control w-100 py-2"
                                        type="number"
                                        value={transitionHours}
                                        onChange={(e) =>
                                            setTransitionHours(e.target.value)
                                        }
                                    />
                                </div>

                                {/* minutes */}
                                <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                    <label
                                        htmlFor="transitionMinutes"
                                        className="d-block"
                                    >
                                        Minutes
                                    </label>
                                    <input
                                        id="transitionMinutes"
                                        className="form-control w-100 py-2"
                                        type="number"
                                        value={transitionMinutes}
                                        onChange={(e) =>
                                            setTransitionMinutes(e.target.value)
                                        }
                                    />
                                </div>

                                <Switch.Case condition={error?.transition}>
                                    <div className="f-14 text-danger">
                                        {" "}
                                        {error?.transition}{" "}
                                    </div>
                                </Switch.Case>
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

export default Option2;
