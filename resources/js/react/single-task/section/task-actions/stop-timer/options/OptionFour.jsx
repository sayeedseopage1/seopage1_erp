import _ from "lodash";
import React, { Suspense, lazy, useEffect, useState } from "react";
import CKEditorComponent from "../../../../../ckeditor";
import { User } from "../../../../../utils/user-details";
import Button from "../../../../components/Button";
const ProjectSelectionList = lazy(() => import("./ProjectSelectionList"));
const UserSelectionList = lazy(() => import("./UserSelectionList"));

const OptionFour = ({ id, onChecked, checked, onSubmit, isSubmitting }) => {
    // form data
    const [person, setPerson] = useState(null);
    const [project, setProject] = useState(null);
    const [comment, setComment] = useState("");
    const [duratonStart, setDurationStart] = useState("08:00 AM");
    const [durationEnd, setDurationEnd] = useState("05:00 PM");
    // end form data

    const loggedUser = new User(window?.Laravel?.user);

    const [
        activeResponsiblePersonDropdown,
        setActiveResponsiblePersonDropdown,
    ] = useState(false);

    const [activeProjectDropdown, setActiveProjectDropdown] = useState(false);

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

    // handle responsible person
    const handleResponsiblePersonMySelf = () => {
        setPerson({
            id: loggedUser?.id,
            name: loggedUser?.name,
            image_url: loggedUser?.getAvatar(),
        });
        setActiveResponsiblePersonDropdown(false);
    };

    // handle submission
    const handleSubmittion = (e) => {
        e.preventDefault();

        const data = {
            reason_for_less_tracked_hours_a_day_task: "I Can't Log Hours",
            durations: JSON.stringify([{id: 'de2sew', start: duratonStart, end: durationEnd}]),
            comment,
            responsible_person:
                loggedUser?.getId() === Number(person?.id)
                    ? "Due To MySelf"
                    : "Due To Another Person",
            responsible_person_id: person?.id,
            related_to_any_project: project ? "yes" : "no",
            project_id: project ? project.id : project,
        };
        
        onSubmit(data);
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
                    I Can't Log Hours
                </div>

                {checked && (
                    <div className="pl-3 my-3 bg-white">
                        <div className="mt-3">
                            <div className="mb-2 font-weight-bold">
                                Explain the reason here
                            </div>
                            <div className="ck-editor-holder stop-timer-options">
                                <CKEditorComponent
                                    onChange={handleEditorChange}
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <div className="mb-2 font-weight-bold">
                                Select Responsible person
                            </div>
                            <div
                                className="d-flex align-items-center w-100"
                                style={{ gap: "10px" }}
                            >
                                <label htmlFor="due-to-myself">
                                    <input
                                        type="radio"
                                        id="due-to-myself"
                                        value="Due To MySelf"
                                        name="responsive-person"
                                        onChange={handleResponsiblePersonMySelf}
                                    />{" "}
                                    Due To MySelf
                                </label>

                                <label htmlFor="due-to-another-person">
                                    <input
                                        type="radio"
                                        id="due-to-another-person"
                                        value="Due To Another Person"
                                        name="responsive-person"
                                        onChange={(e) => {
                                            setActiveResponsiblePersonDropdown(
                                                e.target.checked
                                            );
                                            setPerson(null);
                                        }}
                                    />{" "}
                                    Due To Another Person
                                </label>
                            </div>
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
                                    <UserSelectionList
                                        person={person}
                                        setPerson={setPerson}
                                    />
                                </Suspense>
                            </>
                        )}

                        {/* Related To Any Project */}
                        <div className="mt-3">
                            <div className="mb-2 font-weight-bold">
                                Was This Related To Any Project?
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

                        {activeProjectDropdown && (
                            <>
                                <label htmlFor="">Select the project</label>
                                <Suspense
                                    fallback={
                                        <div className="w-100 bg-white py-2 pl-2 pr-1 mb-3 border d-flex align-items-center justify-content-between">
                                            Loading...
                                        </div>
                                    }
                                >
                                    <ProjectSelectionList
                                        project={project}
                                        setProject={setProject}
                                    />
                                </Suspense>
                            </>
                        )}
                        {/* Related To Any Project */}

                        <>
                            <label htmlFor="" className="mt-3 font-weight-bold">
                                Select an approximate time here
                            </label>
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
                                        To:
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

export default OptionFour;
