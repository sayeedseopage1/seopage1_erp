import React from "react";
import CKEditorComponent from "../../../../../../../../ckeditor";
import Button from "../../../../../../../../global/Button";
import Switch from "../../../../../../../../global/Switch";
import { Flex } from "../../../../../../../../global/styled-component/Flex";
import {
    FormGroup,
    Input,
    Label,
    RadioGroup,
    RadioGroups,
} from "../../../../../../../../global/styled-component/Form";
import { useAuth } from "../../../../../../../../hooks/useAuth";
import ProjectList from "./ProjectList";
import UserList from "./UserList";
import TaskList from "./TaskList";
import { message } from "laravel-mix/src/Log";

const Option4 = ({ checked, index, onChange, onSubmit, isLoading, onBack }) => {
    const [data, setData] = React.useState({
        comment: "",
        responsible_person: "",
        responsible_person_id: null,
        durations: "",
        reason_for_less_tracked_hours_a_day_task: "I couldn't log hours.",
        related_to_any_project: "",
        task_id: "",
        responsible: "",
        client: "",
    });

    // console.log("data in option 4", data);
    const [durationStart, setDurationStart] = React.useState("08:00 AM");
    const [durationEnd, setDurationEnd] = React.useState("05:00 PM");
    const [person, setPerson] = React.useState({});
    const [task, setTask] = React.useState({});
    const [error, setError] = React.useState(null);
    const [isEnableEmployeeSelectionList, setIsEnableEmployeeSelectionList] =
        React.useState(false);
    const [isOutsideOfErp, setIsOutsideOfErp] = React.useState(false);
    const [sType, setSType] = React.useState(""); // submission type
    const auth = useAuth();

    // editor data change
    const handleEditorChange = (e, editor) => {
        const editorData = editor.getData();
        setData({ ...data, comment: editorData });
    };

    // handle form on change event
    const handleOnChange = (e) => {
        if (e.target.name === "responsible_person") {
            setData({
                ...data,
                [e.target.name]: e.target.value,
                responsible_person_id:
                    e.target.value === "Due to myself" ? auth.getId() : null,
            });
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    };

    // setup time field
    React.useEffect(() => {
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
                // console.log(e.timeStamp)
            });
    }, [checked]);

    // responsible person ID
    const responsiblePersonId = (id) => {
        setData({ ...data, responsible_person_id: id });
    };

    // validate form data
    const isValid = () => {
        let errCount = 0;
        let err = new Object();

        // if comment not written
        if (data.comment === "") {
            err.comment = "Please explain the reason!";
            errCount++;
        }

        // responsible person
        if (data.responsible_person === "") {
            err.reason = "Please selected responsible person/system!";
            errCount++;
        }

        // if responsible person other
        if (isEnableEmployeeSelectionList && !data.responsible_person_id) {
            err.responsiblePerson = "Please select who is responsible!";
            errCount++;
        }

        // if outside erp
        if (isOutsideOfErp && !data.client) {
            err.responsiblePerson = "Please select who is responsible!";
            errCount++;
        }

        // if not outside of project check is provided related project
        if (!isOutsideOfErp && !data.related_to_any_project) {
            err.relativeProject = "You have to pick an option.";
            errCount++;
        }

        if (
            data.related_to_any_project.toLowerCase() === "yes" &&
            !data.task_id
        ) {
            err.task = "You have to pick an option.";
            errCount++;
        }

        setError(err);
        return errCount === 0;
    };

    // handle submission
    // handle submission

    const fd = {
        ...data,
        durations: JSON.stringify([
            { id: "de2sew", start: durationStart, end: durationEnd },
        ]),
    };

    // console.log("data in option 4", fd);

    const handleSubmission = (e, submissionType) => {
        e.preventDefault();

        try {
            // const fd = {
            //     ...data,
            //     durations: JSON.stringify([
            //         { id: "de2sew", start: durationStart, end: durationEnd },
            //     ]),
            // };

            // console.log("data in option 4", fd);

            setSType(submissionType);

            if (isValid()) {
                onSubmit(fd, submissionType, onBack);
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Please complete all required fields.",
                    showConfirmButton: true,
                });
            }
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Internal Server Error.",
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
                    I couldn't log hours.
                </Flex>

                {/* if checked  */}
                <Switch>
                    <Switch.Case condition={checked}>
                        {/* comment field */}
                        <div className="mt-3 pl-3">
                            <Label color="#777" className="font-weight-bold">
                                Write your comments here<sup>*</sup>
                            </Label>
                            <div className="ck-editor-holder stop-timer-options">
                                <CKEditorComponent
                                    data={data.comment}
                                    onChange={handleEditorChange}
                                />
                            </div>
                            <Switch.Case condition={error?.comment}>
                                <div className="f-14" style={{ color: "red" }}>
                                    {error?.comment}
                                </div>
                            </Switch.Case>

                            {/* responsible person */}
                            <div className="mt-3">
                                <Label
                                    color="#777"
                                    className="font-weight-bold"
                                >
                                    Select The Reason <sup>*</sup>
                                </Label>

                                <RadioGroups>
                                    <RadioGroup>
                                        <input
                                            id="due_to_myself"
                                            type="radio"
                                            name="responsible_person"
                                            value="Due to myself"
                                            onChange={(e) => {
                                                handleOnChange(e);
                                                setIsEnableEmployeeSelectionList(
                                                    false
                                                );
                                                setIsOutsideOfErp(false);
                                            }}
                                        />
                                        <label htmlFor="due_to_myself">
                                            Due to myself
                                        </label>
                                    </RadioGroup>

                                    <RadioGroup>
                                        <input
                                            id="due_to_another_person"
                                            type="radio"
                                            name="responsible_person"
                                            value="Due to another person"
                                            onChange={(e) => {
                                                handleOnChange(e);
                                                setIsEnableEmployeeSelectionList(
                                                    true
                                                );
                                                setIsOutsideOfErp(false);
                                            }}
                                        />
                                        <label htmlFor="due_to_another_person">
                                            Due to another person
                                        </label>
                                    </RadioGroup>

                                    <RadioGroup>
                                        <input
                                            id="system_technical_glitch"
                                            type="radio"
                                            name="responsible_person"
                                            value="Systems technical glitch"
                                            onChange={(e) => {
                                                handleOnChange(e);
                                                setIsEnableEmployeeSelectionList(
                                                    false
                                                );
                                                setIsOutsideOfErp(false);
                                            }}
                                        />
                                        <label htmlFor="system_technical_glitch">
                                            Systems technical glitch
                                        </label>
                                    </RadioGroup>

                                    <RadioGroup>
                                        <input
                                            id="outside_erp_project"
                                            type="radio"
                                            name="responsible_person"
                                            value="Outside ERP project"
                                            onChange={(e) => {
                                                handleOnChange(e);
                                                setIsEnableEmployeeSelectionList(
                                                    false
                                                );
                                                setIsOutsideOfErp(true);
                                            }}
                                        />
                                        <label htmlFor="outside_erp_project">
                                            Outside ERP project
                                        </label>
                                    </RadioGroup>
                                </RadioGroups>

                                <Switch.Case condition={error?.reason}>
                                    <div style={{ color: "red" }}>
                                        {error?.reason}
                                    </div>
                                </Switch.Case>
                            </div>

                            {/* person selection */}
                            <Switch.Case
                                condition={isEnableEmployeeSelectionList}
                            >
                                <div className="mt-3">
                                    <Label className="font-weight-bold">
                                        Select the person due to whom you
                                        couldn't log hours <sup>*</sup>
                                    </Label>
                                    <UserList
                                        value={person}
                                        onChange={(d) => {
                                            setPerson(d);
                                            responsiblePersonId(d.id);
                                        }}
                                    />
                                </div>

                                <Switch.Case
                                    condition={error?.responsiblePerson}
                                >
                                    <div style={{ color: "red" }}>
                                        {error?.responsiblePerson}
                                    </div>
                                </Switch.Case>
                            </Switch.Case>

                            {/* outside erp project */}
                            <Switch.Case condition={isOutsideOfErp}>
                                <FormGroup className="mt-3">
                                    <Label>
                                        Write the client name <sup>*</sup>
                                    </Label>
                                    <Input
                                        type="text"
                                        placeholder="Write the client name"
                                        value={data.client}
                                        name="client"
                                        required={true}
                                        onChange={handleOnChange}
                                    />
                                </FormGroup>

                                <Switch.Case
                                    condition={error?.responsiblePerson}
                                >
                                    <div style={{ color: "red" }}>
                                        {error?.responsiblePerson}
                                    </div>
                                </Switch.Case>
                            </Switch.Case>

                            {/* outside erp project */}
                            <Switch.Case condition={!isOutsideOfErp}>
                                <FormGroup className="mt-3">
                                    <Label>
                                        Was This Related To Any Task?{" "}
                                        <sup>*</sup>
                                    </Label>
                                    <RadioGroups>
                                        <RadioGroup>
                                            <input
                                                type="radio"
                                                id="relatedProject"
                                                value="Yes"
                                                name="related_to_any_project"
                                                required={
                                                    isOutsideOfErp === false
                                                        ? true
                                                        : false
                                                }
                                                onChange={handleOnChange}
                                            />
                                            <label htmlFor="relatedProject">
                                                Yes
                                            </label>
                                        </RadioGroup>

                                        <RadioGroup>
                                            <input
                                                type="radio"
                                                value="No"
                                                name="related_to_any_project"
                                                id="notRelatedProject"
                                                onChange={handleOnChange}
                                                required={
                                                    isOutsideOfErp === false
                                                        ? true
                                                        : false
                                                }
                                            />
                                            <label htmlFor="notRelatedProject">
                                                No
                                            </label>
                                        </RadioGroup>
                                    </RadioGroups>

                                    <Switch.Case
                                        condition={error?.relativeProject}
                                    >
                                        <div style={{ color: "red" }}>
                                            {error?.relativeProject}
                                        </div>
                                    </Switch.Case>
                                </FormGroup>

                                <Switch.Case
                                    condition={
                                        data.related_to_any_project.toLowerCase() ===
                                        "yes"
                                    }
                                >
                                    <FormGroup className="mt-3">
                                        <Label>
                                            Select the Task <sup>*</sup>
                                        </Label>
                                        <TaskList
                                            task={task}
                                            onSelect={(d) => {
                                                setTask(d);
                                                setData({
                                                    ...data,
                                                    task_id: d.id,
                                                });
                                            }}
                                        />
                                    </FormGroup>
                                    <Switch.Case condition={error?.task}>
                                        <div style={{ color: "red" }}>
                                            {error?.task}
                                        </div>
                                    </Switch.Case>
                                </Switch.Case>
                            </Switch.Case>

                            {/* approximate time */}
                            {/* time selection */}
                            <FormGroup className="mt-3">
                                <Label className="font-weight-bold">
                                    Select an approximate time here <sup>*</sup>
                                </Label>
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
                                            To
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
                            </FormGroup>

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

export default Option4;
