import React, { useState } from "react";
import CKEditorComponent from "../../../../../ckeditor";
import Button from "../../../../components/Button";

const OptionTwo = ({ id, onChecked, checked, onSubmit, isSubmitting}) => {
    const [transitionHours, setTransitionHours] = useState(0);
    const [transitionMinutes, setTransitionMinutes] = useState(0);
    const [comment, setComment] = useState("");
    const [error, setError] = useState(null);

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


    const isValid = () => {
        let errCount = 0;
        let err = new Object();

        if(comment === ''){
            err.comment = 'Please explaine the reason here..';
            errCount++;
        } 

        if(Number(transitionHours) + Number(transitionMinutes) === 0) { 
            err.transition = "Write approximate time here!"
            errCount++;
        }

        setError(err)
        return !errCount;
    }


    // handle submission
    const handleSubmission = (e) => {
        e.preventDefault();

        const data = {
            reason_for_less_tracked_hours_a_day_task:
                "During transition from one task to another, I had to wait for a while.",
            transition_hours: Number(transitionHours),
            transition_minutes: Number(transitionMinutes),
            comment,
        }; 

       
        if(isValid()) {
            onSubmit(data);
        }else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please fillup the all required fields!",
                showConfirmButton: true,
            });
        }
    };

    return (
        <>
            <div className="--option-item">
                <div
                    className="d-flex align-items-start"
                    style={{ gap: "10px" }}
                >
                    <input
                        type="checkbox"
                        style={{ cursor: "pointer", marginTop: "3px" }}
                        checked={checked}
                        onChange={handleOnChange}
                    />
                    During transition from one task to another, I had to wait for a while.
                </div>

                {checked && (
                    <div className="pl-3 my-3 bg-white">
                        <React.Fragment>
                            <div className="mt-2 mb-2 font-weight-bold">
                                Enter an approximate time here:
                            </div>
                            <div className="row">
                                <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                    <label
                                        htmlFor="transitionHours"
                                        className="d-block"
                                    >
                                        {" "}
                                        Hours{" "}
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
                                <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                    <label
                                        htmlFor="transitionMinutes"
                                        className="d-block"
                                    >
                                        {" "}
                                        Minutes{" "}
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
                            </div>
                            
                            {error?.transition && <div className="f-14" style={{color:'red'}}>{error?.transition}</div>}
                        </React.Fragment>

                        <div className="mt-3">
                            <h6>Write your comments here.</h6>
                            <div className="ck-editor-holder stop-timer-options">
                                <CKEditorComponent
                                    onChange={handleEditorChange}
                                />
                            </div>
                            {error?.comment && <div className="f-14" style={{color:'red'}}>{error?.comment}</div>}
                        </div>

                        {/* submittion and back button */}
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
                                <Button onClick={handleSubmission} className="">
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

export default OptionTwo;
