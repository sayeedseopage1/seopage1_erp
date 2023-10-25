import React, { useState, lazy, Suspense } from "react";
import Button from "../../../../components/Button";
import DurationTime from "../../../../components/DurationTimer";

const DeveloperTaskSelectionMenu = lazy(() =>
    import("./DevloperTaskSelectionMenu")
);

const OptionFive = ({ id, onChecked, checked, onSubmit, isSubmitting }) => {
    const [task, setTask] = useState(null);
    const [durations, setDurations] = useState([
        { start: "00:00 AM", end: "00:00 AM", id: "de2sew" },
    ]);
    
    const [error, setError] = useState(null);

    const uniqueId = Math.random().toString(6).slice(2);

    // handle input change
    const handleOnChange = (e) => {
        e.target.checked ? onChecked(id) : onChecked(null);
    };

    function onRemove(e, id) {
        e.preventDefault();
        let filtered = durations.filter((d) => d.id !== id);
        setDurations([...filtered]);
    }

    const isValid = () => {
        let errCount = 0;
        let err = new Object();

        if(!task){
            err.task = "Select the task you forgot to track hours!";
            errCount++;
        }

        setError(err);
        return !errCount;
    }
    // handle submittion
    const handleSubmittion = () => {
        const data = {
            reason_for_less_tracked_hours_a_day_task: 'I forgot to track hours.',
            forgot_to_track_task_id: task?.id,
            durations: JSON.stringify(durations),
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
                        I forgot to track hours.
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
                                <Suspense
                                    fallback={
                                        <div className="w-100 bg-white py-2 pl-2 pr-1 mb-3 border d-flex align-items-center justify-content-between">
                                            Loading...
                                        </div>
                                    }
                                >
                                    <DeveloperTaskSelectionMenu
                                        task={task}
                                        setTask={setTask}
                                    />
                                </Suspense>
                            </div>
                            {error?.task && <div className="f-14" style={{color:'red'}}>{error?.task}</div>}
                        </div>

                        <div>
                            <div className="w-100 pb-2">
                                Select an approximate time here
                            </div>
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
                        </div>

                        <div className="mt-3 d-flex align-items-center">
                            <Button
                                variant="tertiary"
                                onClick={() => onChecked(null)}
                                className="ml-auto mr-2"
                            >
                                Back
                            </Button>

                            {!isSubmitting ? (
                                <Button onClick={handleSubmittion} className="">
                                    Submit
                                </Button>
                            ) : (
                                <Button className="cursor-processing">
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
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default OptionFive;
