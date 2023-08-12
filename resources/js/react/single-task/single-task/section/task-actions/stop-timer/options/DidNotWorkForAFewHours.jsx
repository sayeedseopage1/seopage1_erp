import React, { useEffect, useState, useMemo } from "react";
import CKEditorComponent from "../../../../../ckeditor";
import Button from "../../../../components/Button";
import DurationTime from "../../../../components/DurationTimer";

const DidNotWorkForAFewHours = ({ id, onChecked, checked, parentReason, onSubmit, isSubmitting }) => {
    const [durations, setDurations] = useState([
        { start: "00:00 AM", end: "00:00 AM", id: 'de2sew' },
    ]);

    const [comment, setComment] = useState("");
    const uniqueId = Math.random().toString(6).slice(2)
    const [error, setError] = useState(null);

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

    function onRemove(e, id) {
        e.preventDefault();
        let filtered = durations.filter((d) => d.id !== id);
        setDurations([...filtered])      
    }

    const isValid = () => {
        let errCount = 0;
        let err = new Object();
 
        if(comment === ''){
            errCount++;
            err.comment = 'Please explain the reason why you came late!';
        }

        setError(err);
        return !errCount;
    }

    // handle submit
    const handleSubmittion = (e) => {
        e.preventDefault();
        const data = {
            reason_for_less_tracked_hours_a_day_task: parentReason,
            durations: JSON.stringify(durations),
            child_reason: "I didn't work for a few hours in between",
            comment,
        };

        if(isValid()){
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
                    className="d-flex align-items-center"
                    style={{ gap: "10px" }}
                >
                    <input
                        type="checkbox"
                        style={{ cursor: "pointer" }}
                        checked={checked}
                        onChange={handleOnChange}
                    />
                    I didn't work for a few hours in between
                </div>
                {checked && (
                    <div className="pl-3 my-3 bg-white">
                        <label className="font-weight-bold">Select an approximate time here. <sup>*</sup></label>
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
                        {durations?.map((d) => (
                            <DurationTime
                                key={d.id}
                                id={d.id}
                                onRemove={onRemove}
                                startTime={d.start}
                                endTime={d.end}
                                durations={durations}
                                setDurations={setDurations} 
                            />
                        ))}

                        <button
                            className="mt-2 d-flex align-items-center bg-transparent"
                            style={{ gap: "10px" }}
                            onClick={() => {
                                setDurations((prev) => [
                                    ...prev,
                                    {
                                        id: uniqueId,
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
                            <label className="font-weight-bold">Write your comments here.<sup>*</sup></label>
                            <div className="ck-editor-holder stop-timer-options">
                                <CKEditorComponent
                                    onChange={handleEditorChange}
                                />
                            </div>
                            {error?.comment && <div className="f-14" style={{color:'red'}}>{error?.comment}</div>}
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

export default DidNotWorkForAFewHours;
