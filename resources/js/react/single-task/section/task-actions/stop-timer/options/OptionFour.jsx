import React, { Suspense, lazy, useEffect, useState } from "react";
import CKEditorComponent from "../../../../../ckeditor";
import { User } from "../../../../../utils/user-details";
import Button from "../../../../components/Button";
const ProjectSelectionList = lazy(() => import("./ProjectSelectionList"));
const UserSelectionList = lazy(() => import("./UserSelectionList"));
const DeveloperTaskSelectionMenu = lazy(() =>
    import("./DevloperTaskSelectionMenu")
);

const OptionFour = ({ id, onChecked, checked, onSubmit, isSubmitting }) => {
    // form data
    const [person, setPerson] = useState(null);
    const [client, setClient] = useState("");
    const [project, setProject] = useState(null);
    
    const [responsible, setResponsible] = useState('');
    const [task, setTask] = useState(null);
    const [isSystemGlitch, setIsSystemGlitch] = useState(undefined);
    const [isOutsideERP, setIsOutsideERP] = useState(undefined);
    const [comment, setComment] = useState("");
    const [durationStart, setDurationStart] = useState("08:00 AM");
    const [durationEnd, setDurationEnd] = useState("05:00 PM");
    // end form data

    const loggedUser = new User(window?.Laravel?.user);

    const [error, setError] = useState(null);

    const [
        activeResponsiblePersonDropdown,
        setActiveResponsiblePersonDropdown,
    ] = useState(false);

    const [activeProjectDropdown, setActiveProjectDropdown] = useState(false);

    useEffect(() => {
        // start time
        window
            .$("#timepicker1")
            .timepicker("setTime", durationStart)
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
        } else {
            onChecked(null);
            setPerson(null);
            setProject(null);
            setIsOutsideERP(undefined);
            setIsSystemGlitch(undefined);
            setComment('');
            setError(null);
        };
    };

    // handle comment
    const handleEditorChange = (e, editor) => {
        const data = editor.getData();
        setComment(data);
    };

    // handle responsible person
    const handleResponsiblePersonMySelf = () => {
        setPerson({
            id: loggedUser?.id,
            name: loggedUser?.name,
            image_url: loggedUser?.getAvatar(),
        });
        setActiveResponsiblePersonDropdown(false);
        setIsSystemGlitch(false);
        setIsOutsideERP(false);
    };

    // validation
    const isValid = () => {
        let errCount = 0;
        let err = new Object();

        if(comment === ''){
            err.comment = "Please explain the reason!";
            errCount++;
        }

        if(isOutsideERP === undefined && isSystemGlitch === undefined && !person){
            err.reason = "Please selected responsible person/system!"
            errCount++;
        }

        if(activeResponsiblePersonDropdown &&  !person && !client){
            err.responsiblePerson = "Please select who is responsible!";
            errCount++;
        }

        // if(!isOutsideERP && !project){
        //     err.project = "You have to pick an option.";
        //     errCount++;
        // }
        if(activeProjectDropdown && !task){
            err.task = "You have to pick an option.";
            errCount++;
        }

        setError(err);
        return !errCount;
    }

    // handle submission
    const handleSubmission = (e) => {
        e.preventDefault();

        const data = {
            reason_for_less_tracked_hours_a_day_task: "I couldn't log hours.",
            durations: JSON.stringify([{id: 'de2sew', start: durationStart, end: durationEnd}]),
            comment,
            responsible_person: isSystemGlitch ? 'Systems technical glitch' :
                    isOutsideERP ? 'Outside ERP Project' :
                    loggedUser?.getId() === Number(person?.id) ? "Due to MySelf" : "Due to Another Person",
            responsible_person_id: person?.id ?? null,
            related_to_any_project: task ? "yes" : "no",
            task_id: task ? task.id : task,
            responsible,
            client: client,
        };

        if(isValid()){
            onSubmit(data);
        }else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please fill up the all required fields!",
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
                   I couldn't log hours.
                </div>

                {checked && (
                    <div className="pl-3 my-3 bg-white">
                        <div className="mt-3">
                            <label className="font-weight-bold">
                                Explain the reason here <sup>*</sup>
                            </label>
                            <div className="ck-editor-holder stop-timer-options">
                                <CKEditorComponent
                                    onChange={handleEditorChange}
                                />
                            </div>
                            {error?.comment && <div className="f-14" style={{color:'red'}}>{error?.comment}</div>}
                        </div>

                        <div className="mt-3">
                            <div className="mb-2 font-weight-bold">
                                Select The Reason <sup style={{color:'red'}}>*</sup>
                            </div>
                            <div
                                className="d-flex flex-wrap align-items-center w-100"
                                style={{ gap: "10px" }}
                            >
                                <label htmlFor="due-to-myself">
                                    <input
                                        type="radio"
                                        id="due-to-myself"
                                        value="Due to myself"
                                        name="responsive-person"
                                        onChange={e => {
                                            handleResponsiblePersonMySelf(e);
                                            setResponsible(e.target.value);
                                        }}
                                    />{" "}
                                    Due to myself
                                </label>

                                <label htmlFor="due-to-another-person">
                                    <input
                                        type="radio"
                                        id="due-to-another-person"
                                        value="Due to another person"
                                        name="responsive-person"
                                        onChange={(e) => {
                                            setActiveResponsiblePersonDropdown(
                                                e.target.checked
                                            );
                                            setPerson(null);
                                            setIsSystemGlitch(false);
                                            setIsOutsideERP(false);
                                            setResponsible(e.target.value)
                                        }}
                                    />{" "}
                                    Due to another person
                                </label>

                                <label htmlFor="system-technical-glich">
                                    <input
                                        type="radio"
                                        id="system-technical-glich"
                                        value="Systems technical glitch"
                                        name="responsive-person"
                                        onChange={(e) => {
                                            setIsSystemGlitch(true);
                                            setIsOutsideERP(false);
                                            setActiveResponsiblePersonDropdown(false);
                                            setPerson(null);
                                            setResponsible(e.target.value)
                                        }}
                                    />{" "}
                                    Systems technical glitch
                                </label>


                                <label htmlFor="outside-erp-project">
                                    <input
                                        type="radio"
                                        id="outside-erp-project"
                                        value="Outside ERP project"
                                        name="responsive-person"
                                        onChange={(e) => {
                                            setIsOutsideERP(true);
                                            setIsSystemGlitch(false);
                                            setActiveResponsiblePersonDropdown(
                                                e.target.checked
                                            );
                                            setPerson(null);
                                            setResponsible(e.target.value)
                                        }}
                                    />{" "}
                                    Outside ERP project
                                </label>
                            </div>

                            {error?.reason && <div className="f-14" style={{color:'red'}}>{error?.reason}</div>}
                        </div>
                        {activeResponsiblePersonDropdown && (
                            <>
                                <label htmlFor="">
                                    Select the person due to whom you couldn't
                                    log hours
                                </label>
                                <Suspense
                                    fallback={
                                        <div className="w-100 bg-white py-2 pl-2 pr-1 mb-3 border d-flex align-items-center justify-content-between">
                                            Loading...
                                        </div>
                                    }
                                >
                                    {
                                        isOutsideERP ?
                                            <input
                                                value={client}
                                                onChange={e => setClient(e.target.value)}
                                                className="w-100 bg-white py-2 pl-2 pr-1 border d-flex align-items-center justify-content-between"
                                            />
                                        :
                                        <UserSelectionList
                                            person={person}
                                            setPerson={setPerson}
                                            filter=""
                                        />
                                    }
                                </Suspense>
                                {error?.responsiblePerson && <div className="f-14" style={{color:'red'}}>{error?.responsiblePerson}</div>}
                            </>
                        )}

                        { !isOutsideERP &&
                            <>
                                {/* Related To Any Project */}
                                    <div className="mt-3">
                                        <div className="mb-2 font-weight-bold">
                                            Was This Related To Any Task? <sup style={{color: 'red'}}>*</sup>
                                        </div>
                                        <div
                                            className="d-flex align-items-center w-100"
                                            style={{ gap: "10px" }}
                                        >
                                            <label htmlFor="yes">
                                                <input
                                                    type="radio"
                                                    id="yes"
                                                    value="Yes"
                                                    name="relative-project"
                                                    onChange={(e) => {
                                                        setActiveProjectDropdown(
                                                            e.target.checked
                                                        );
                                                    }}
                                                />{" "}
                                                Yes
                                            </label>

                                            <label htmlFor="no">
                                                <input
                                                    type="radio"
                                                    id="no"
                                                    value="No"
                                                    name="relative-project"
                                                    onChange={(e) => {
                                                        setActiveProjectDropdown(false);
                                                    }}
                                                />{" "}
                                                No
                                            </label>
                                        </div>


                                     
                                    </div>

                                    { activeProjectDropdown && (
                                        <>
                                            <label htmlFor="">Select the task</label>
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
                                        </>
                                    )}
                                    {/* Related To Any Project */}

                            </>
                        }
                        <>
                            <label htmlFor="" className="mt-3 font-weight-bold">
                                Select an approximate time here
                            </label>
                            <div className="row">
                                <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                    <label htmlFor="" className="d-block"> From: </label>
                                    <input
                                        id="timepicker1"
                                        className="form-control w-100 py-2"
                                        data-minute-step="1"
                                        data-modal-backdrop="false"
                                        type="text"
                                    />
                                </div>
                                <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                    <label htmlFor="" className="d-block">To:  </label>
                                    <input
                                        id="timepicker2"
                                        className="form-control w-100 py-2"
                                        data-minute-step="1"
                                        data-modal-backdrop="false"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </>

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

export default OptionFour;
