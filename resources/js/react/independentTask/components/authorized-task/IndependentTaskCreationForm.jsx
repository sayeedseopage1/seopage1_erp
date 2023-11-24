import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import validator from "validator";
import CKEditorComponent from "../../../ckeditor";
import UploadFilesInLine from "../../../file-upload/UploadFilesInLine";
import { usePostIndependentTaskMutation } from "../../../services/api/independentTaskApiSlice";
import { CompareDate } from "../../../utils/dateController";
import { User } from "../../../utils/user-details";
import Button from "../Button";
import Modal from "../Modal";
import Input from "../form/Input";
import AssginedToSelection from "./AssignedToSelection";
import DatePickerComponent from "./DatePicker";
import PrioritySelection from "./PrioritySelection";
import TaskCategorySelectionBox from "./TaskCategorySelectionBox";
import './ckeditor.css';

const IndependentTaskCreationForm = ({ isOpen, close, onSuccess }) => {
    const dayjs = new CompareDate();
    //   form data
    const [title, setTitle] = useState("");
    // const [milestone, setMilestone] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [taskCategory, setTaskCategory] = useState("");
    const [assignedTo, setAssignedTo] = useState(null);
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("Regular");

    const [loginUrl, setLoginUrl] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [refPage, setRefPage] = useState("");
    const [siteUrl, setSiteUrl] = useState("");
    const [frontendPass, setFrontendPass] = useState("");

    // const [estimateTimeHour, setEstimateTimeHour] = useState(0);
    // const [estimateTimeMin, setEstimateTimeMin] = useState(0);
    const [files, setFiles] = React.useState([]);

    const [formError, setFormError] = React.useState(null);

    const auth = new User(window?.Laravel?.user);

    const handleResetForm = () => {
        setTitle("");
        setStartDate(null);
        setDueDate(null);
        setTaskCategory("");
        setAssignedTo(null);
        setDescription("");
        setPriority("Regular");
        setLoginUrl("");
        setUsername("");
        setPassword("");
        setRefPage("");
        // setSiteUrl("");
        // setFrontendPass("");
        setFiles([]);
        setFormError(null);
    };

    useEffect(() => {
        handleResetForm();
    }, []);

    const params = useParams();
    const [postIndependentTask, { isLoading, error }] =
        usePostIndependentTaskMutation();

    // const required_error = error?.status === 422 ? error?.data : null;

    // const [getMilestoneDetails, {data:projectInfo ,isFetching: milestoneDataIsFetching}] = useLazyGetMilestoneDetailsQuery();

    // // test variable
    // const projectInfo = {
    //   minutes_left: 0,
    //   milestones: []
    // }, milestoneDataIsFetching = false;

    // handle change
    // React.useEffect(() => {
    //     if(isOpen){
    //         // getMilestoneDetails(params?.projectId).unwrap()
    //         // .then(res => {
    //         //     let project = _.head(res?.milestones);
    //         //     setProject(project?.project_name ?? '')
    //         // })
    //         setProject('Project_Name')
    //     }
    // }, [isOpen]);

    // handle onchange
    const handleChange = (e, setState) => {
        e.preventDefault();
        let value = e.target.value;
        setState(value);
    };

    // check validation
    const isValid = () => {
        let err = new Object();
        let errCount = 0;

        if (title === "") {
            (err.title = "This field is required!"), errCount++;
        }

        if (taskCategory === "") {
            err.taskCategory = "Select a category";
            errCount++;
        }

        // if(milestone === null){
        //     err.milestone = "Select a milestone";
        //     errCount++;
        // }

        if (!startDate) {
            err.startDate = "Start date is required";
            errCount++;
        }

        if (!dueDate) {
            (err.dueDate = "Due date is required"), errCount++;
        }

        if (!assignedTo?.id) {
            err.assignedTo = "Select a user.";
            errCount++;
        }

        if (description === "") {
            err.description = "Write a Description";
            errCount++;
        }


        if (!validator.isURL(loginUrl)) {
            err.loginUrl = "Enter a valid URL";
            errCount++;
        }

        if (!username) {
            err.username = "Enter a username";
            errCount++;
        }

        if (!password) {
            err.password = "Enter a password";
            errCount++;
        }

        if (refPage && !validator.isURL(refPage)) {
            err.refPage = "Enter a valid reference page URL";
            errCount++;
        }

        // if (siteUrl && !validator.isURL(siteUrl)) {
        //     err.refPage = "Enter a valid Site URL";
        //     errCount++;
        // }

        setFormError(err);
        return !errCount;
    };

    // handle sumition
    const handleSubmit = (e) => {
        if (!isValid()) {
            Swal.fire({
                icon: "error",
                title: "Missing required field or inavlid input",
                timer: "2000",
                timerProgressBar: true,
            });
            return;
        }
        e.preventDefault();
        const _startDate = startDate
            ? dayjs.dayjs(startDate).format("DD-MM-YYYY")
            : "";
        const _dueDate = dueDate
            ? dayjs.dayjs(dueDate).format("DD-MM-YYYY")
            : "";

        const fd = new FormData();
        fd.append("heading", `${title} for ${getUrl(loginUrl)}` ?? "");
        fd.append("description", description ?? "");
        fd.append("start_date", _startDate ?? "");
        fd.append("due_date", _dueDate ?? "");
        // fd.append("project_id", params?.projectId ?? '');
        fd.append("category_id", taskCategory?.id ?? "");
        fd.append("priority", _.lowerCase(priority));
        fd.append("board_column_id", 2);

        // newly added field and data
        fd.append("login_url", loginUrl ?? "");
        fd.append("user_name", username ?? "");
        fd.append("password", password ?? "");
        fd.append("reference_site", refPage ?? "");
        // fd.append("site_url", siteUrl ?? "");
        // fd.append("frontend_password", frontendPass ?? "");

        // fd.append("estimate_hours", estimateTimeHour ?? 0);
        // fd.append("estimate_minutes", estimateTimeMin ?? 0);
        // fd.append("deliverable_id", milestone?.deliverable_type ?? '');
        // fd.append("milestone_id", milestone?.id ?? '');
        fd.append("user_id", assignedTo?.id ?? "");
        fd.append("id", `U${window.Laravel.user.id}T${Date.now()}`);
        fd.append("isIndependent", 1);
        // fd.append("_method", "POST");

        Array.from(files).forEach((file) => {
            fd.append("file[]", file);
        });

        fd.append(
            "_token",
            document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content")
        );

        const result = {};

        for (const pair of fd.entries()) {
            result[pair[0]] = pair[1];
        }

        // console.log(result);
        // return;

        if (isValid()) {
            postIndependentTask(fd)
                .unwrap()
                .then((res) => {
                    onSuccess();
                    close();
                    handleResetForm();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Independent task creation request submitted for authorization successfully!",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                })
                .catch((err) => {
                    if (err?.status === 422) {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Please fillup all required fields",
                            showConfirmButton: true,
                        });
                    }
                });
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please fillup all required fields",
                showConfirmButton: true,
            });
        }
    };

    React.useEffect(() => {
        if (isLoading) {
            document.getElementsByTagName("body")[0].style.cursor = "progress";
        } else {
            document.getElementsByTagName("body")[0].style.cursor = "default";
        }
    }, [isLoading]);

    // editor data handle
    const handleEditorChange = (e, editor) => {
        const data = editor.getData();
        setDescription(data);
    };

    const estimateError = (err) => {
        let errText = "";
        let hoursErr = err?.estimate_hours?.[0];
        let minErr = err?.estimate_minutes?.[0];
        if (hoursErr) errText += hoursErr;
        if (minErr) errText += minErr;
        return errText;
    };

    // url shortener
    const getUrl = (url = "") => {
        const urlPettern = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

        if (url) {
            if (urlPettern.test(url)) {
                if (url.includes("https://www.")) {
                    const newUrl = url.split("https://www.")[1];
                    return newUrl.split("/")[0];
                } else if (url.includes("http://www.")) {
                    const newUrl = url.split("http://www.")[1];
                    return newUrl.split("/")[0];
                } else if (url.includes("https://")) {
                    const newUrl = url.split("https://")[1];
                    return newUrl.split("/")[0];
                } else if (url.includes("http://")) {
                    const newUrl = url.split("http://")[1];
                    return newUrl.split("/")[0];
                } else if (url.includes("www.")) {
                    const newUrl = url.split("www.")[1];
                    return newUrl.split("/")[0];
                } else {
                    return url.split("/")[0];
                }
            } else {
                return "not a valid url";
            }
        } else {
            return "";
        }
    };

    return (
        <Modal isOpen={isOpen}>
            <div className="sp1_modal-content-wrapper">
                <div className="sp1_modal-panel sp1_task_create_modal_panel w-100">
                    {/* header */}
                    <div className="sp1_modal-head">
                        <div className="sp1_modal-title">
                            <strong>Create a New Task</strong>
                        </div>
                        <Button
                            onClick={close}
                            aria-label="ModalClose"
                            variant="tertiary"
                            className="sp1_modal-close"
                        >
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div>
                    {/* end header */}

                    {/* body */}
                    <div className="sp1_modal-body sp1_task_create_modal_body">
                        <div className="sp1-subtask-form --form sp1_task_create_modal_body_form row">
                            {/* task credential */}
                            <section
                                className="d-flex col-12"
                                style={{
                                    // borderBottom: "dashed 1px #d1d1d1",
                                    // borderTop: "dashed 1px #d1d1d1",
                                    padding: "0",
                                    // backgroundColor:'#F2F4F7',
                                    flexWrap: "wrap",
                                }}
                            >
                                {/* Login url */}
                                <div className="col-12 col-md-6">
                                    <Input
                                        id="login-url"
                                        label="Login URL"
                                        type="text"
                                        placeholder="Enter the login url"
                                        name="login-url"
                                        required={true}
                                        value={loginUrl}
                                        error={formError?.loginUrl}
                                        onChange={(e) =>
                                            handleChange(e, setLoginUrl)
                                        }
                                    />
                                </div>

                                {/* Reference Page */}
                                <div className="col-12 col-md-6">
                                    <Input
                                        id="ref-page"
                                        label="Reference Page (Optional)"
                                        type="text"
                                        placeholder="Enter the reference page"
                                        name="ref-page"
                                        required={false}
                                        value={refPage}
                                        error={formError?.refPage}
                                        onChange={(e) =>
                                            handleChange(e, setRefPage)
                                        }
                                    />
                                </div>

                                {/* Username */}
                                <div className="col-12 col-md-6">
                                    <Input
                                        id="username"
                                        label="Username"
                                        type="text"
                                        placeholder="Enter the username"
                                        name="username"
                                        required={true}
                                        value={username}
                                        error={formError?.username}
                                        onChange={(e) =>
                                            handleChange(e, setUsername)
                                        }
                                    />
                                </div>

                                {/* Password */}
                                <div className="col-12 col-md-6">
                                    <Input
                                        id="password"
                                        label="Password"
                                        type="password"
                                        placeholder="Enter the password"
                                        name="password"
                                        required={true}
                                        value={password}
                                        error={formError?.password}
                                        onChange={(e) =>
                                            handleChange(e, setPassword)
                                        }
                                    />
                                </div>

                                {/* Site URL */}
                                {/* <div className="col-12 col-md-6">
                                    <Input
                                        id="site-url"
                                        label="Site's URL (Optional)"
                                        type="text"
                                        placeholder="Enter the working/staging site's url"
                                        name="site-url"
                                        required={false}
                                        value={siteUrl}
                                        error={formError?.siteUrl}
                                        onChange={(e) =>
                                            handleChange(e, setSiteUrl)
                                        }
                                    />
                                </div> */}

                                {/* Frontend Password */}
                                {/* <div className="col-12 col-md-6">
                                    <Input
                                        id="frontend-password"
                                        label="Frontend Password (Optional)"
                                        type="password"
                                        placeholder="Enter the frontend password"
                                        name="frontend-password"
                                        required={false}
                                        value={frontendPass}
                                        error={formError?.frontendPass}
                                        onChange={(e) =>
                                            handleChange(e, setFrontendPass)
                                        }
                                    />
                                </div> */}
                            </section>

                            <section
                                className="col-12 px-0 d-md-flex justify-content-center align-items-center"
                                style={{ overflow: "hidden" }}
                            >
                                {/* Task Title */}
                                <div className="col-12 col-md-6 pr-md-2">
                                    <Input
                                        id="title"
                                        label="Title"
                                        type="text"
                                        placeholder="Enter a task title"
                                        name="title"
                                        required={true}
                                        value={title}
                                        error={formError?.title}
                                        onChange={(e) =>
                                            handleChange(e, setTitle)
                                        }
                                    />
                                </div>

                                {/* task title extension */}
                                <div className="col-12 col-md-6 pl-md-0 d-md-flex align-items-center ">
                                    {/* <Input
                                    id="title-extension"
                                    label=""
                                    type="text"
                                    placeholder=""
                                    readOnly
                                    name="title-extension"
                                    // required={true}
                                    value={loginUrl}
                                    // error={formError?.title}
                                    // onChange={(e) => handleChange(e, setTitle)}
                                /> */}
                                    <span className="font-weight-bold text-gray pt-md-4 pr-md-2">
                                        for
                                    </span>
                                    <span
                                        className="form-control height-35 w-100 f-14 mt-md-4 mx-0 d-flex align-items-center"
                                        style={{
                                            backgroundColor: "whitesmoke",
                                            overflowX: "auto",
                                        }}
                                    >
                                        <span>{getUrl(loginUrl)}</span>
                                    </span>
                                </div>
                            </section>

                            {/* Task Categories List */}
                            <div className="col-12 col-md-6">
                                <TaskCategorySelectionBox
                                    selected={taskCategory}
                                    onSelect={setTaskCategory}
                                    taskId={params?.projectId}
                                />
                                {formError?.taskCategory && (
                                    <div style={{ color: "red" }}>
                                        {formError?.taskCategory}
                                    </div>
                                )}
                            </div>

                            {/* assignee to */}
                            <div className="col-12 col-md-6">
                                <AssginedToSelection
                                    selected={assignedTo}
                                    onSelect={setAssignedTo}
                                />

                                {formError?.assignedTo && (
                                    <div style={{ color: "red" }}>
                                        {formError?.assignedTo}
                                    </div>
                                )}
                            </div>

                            {/* Project Milestone Selection Menu */}
                            {/* <div className="col-12 col-md-6">
                                <Listbox value={milestone} onChange={setMilestone}>
                                    <div className="form-group position-relative my-3">
                                        <label
                                            className={`f-14 text-dark-gray mb-1`}
                                            data-label="true"
                                        >
                                            Milestone <sup>*</sup>
                                        </label>
                                        <Listbox.Button className=" sp1-selection-display-button form-control height-35 f-14 sp1-selection-display bg-white w-100">
                                            {milestone?.milestone_title ?? '--'}
                                            <div className='__icon'>
                                                <i className="fa-solid fa-sort"></i>
                                            </div>
                                        </Listbox.Button>
                                        <Listbox.Options  className="sp1-select-options">
                                            {_.map(projectInfo?.milestones, (milestone) => (
                                                <Listbox.Option
                                                    key={milestone.id}
                                                    className={({ active, selected }) => `sp1-select-option ${ (active || selected) ? 'active' : ''}`}
                                                    value={milestone}
                                                >
                                                    {milestone?.milestone_title}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>

                                        {formError?.milestone && (
                                            <div style={{ color: "red" }}>
                                                {formError?.milestone}
                                            </div>
                                        )}
                                    </div>
                                </Listbox>
                            </div> */}

                            {/* <div className="col-12 col-md-6">
                                <div className="form-group my-3">
                                    <label
                                        className={`f-14 text-dark-gray mb-1`}
                                        data-label="true"
                                    >
                                        Parent Task
                                    </label>
                                    <input
                                        className={`form-control height-35 f-14`}
                                        readOnly
                                        defaultValue={parentTask}
                                    />
                                </div>
                            </div> */}

                            {/* start date */}
                            <div className="col-12 col-md-6">
                                <div className="form-group my-3">
                                    <label htmlFor="">
                                        Start Date <sup className="f-14">*</sup>
                                    </label>
                                    <div className="form-control height-35 f-14">
                                        <DatePickerComponent
                                            placeholderText={`Ex: ${dayjs
                                                .dayjs()
                                                .format("DD-MM-YYYY")}`}
                                            minDate={dayjs.dayjs().toDate()}
                                            maxDate={dueDate}
                                            date={startDate}
                                            setDate={setStartDate}
                                        />
                                    </div>
                                    {formError?.startDate && (
                                        <div style={{ color: "red" }}>
                                            {formError?.startDate}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* due date */}
                            <div className="col-12 col-md-6">
                                <div className="form-group my-3">
                                    <label htmlFor="">
                                        Due Date <sup className="f-14">*</sup>
                                    </label>
                                    <div className="form-control height-35 f-14">
                                        <DatePickerComponent
                                            placeholderText={`Ex: ${dayjs
                                                .dayjs()
                                                .format("DD-MM-YYYY")}`}
                                            minDate={
                                                startDate ||
                                                dayjs.dayjs().toDate()
                                            }
                                            date={dueDate}
                                            setDate={setDueDate}
                                        />
                                    </div>
                                    {formError?.dueDate && (
                                        <div style={{ color: "red" }}>
                                            {formError?.dueDate}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Project Deliverable */}
                            {/* <div className="col-12 col-md-6">
                                <div className="form-group my-3">
                                    <label
                                        className={`f-14 text-dark-gray mb-1`}
                                        data-label="true"
                                    >
                                        Project Deliverable
                                    </label>
                                    <input
                                        className={`form-control height-35 f-14`}
                                        readOnly
                                        defaultValue={milestone?.deliverable_type ?? ''}
                                    />
                                </div>
                            </div> */}

                            {/* Priority */}
                            <div className="col-12 col-md-6">
                                <PrioritySelection
                                    selected={priority}
                                    setSelected={setPriority}
                                />
                            </div>

                            {/* Estimate Time */}
                            {/* <div className="col-12 col-md-6">
                                <div className="form-group my-3">
                                    <label
                                        htmlFor=""
                                        className="f-14 text-dark-gray"
                                    >
                                        Set Estimate Time{" "}
                                        <sup className="f-14"> * </sup>
                                    </label>
                                    <div className="d-flex align-items-center">
                                        <input
                                            type="Number"
                                            className="form-control height-35 f-14 mr-2"
                                            value={estimateTimeHour}
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    setEstimateTimeHour
                                                )
                                            }
                                        />{" "}
                                        hrs
                                        <input
                                            type="Number"
                                            min={0}
                                            className="form-control height-35 f-14 mr-2 ml-2"
                                            value={estimateTimeMin}
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    setEstimateTimeMin
                                                )
                                            }
                                        />{" "}
                                        min
                                    </div>


                                    <div style={{ color: "var(--header_color)" }}>
                                        Estimation time can't exceed{" "}
                                        {convertTime(Number(projectInfo?.minutes_left) > 0 ? Number(projectInfo?.minutes_left) : 0)}
                                    </div>

                                    {formError?.estimateError &&
                                        <div style={{ color: "red" }}>
                                            {formError?.estimateError}
                                        </div>
                                    }
                                </div>
                            </div> */}

                            {/* description */}
                            <div className="col-12">
                                <div className="form-group my-3">
                                    <label htmlFor="">
                                        {" "}
                                        Description <sup>*</sup>{" "}
                                    </label>
                                    <div
                                        className="sp1_st_write_comment_editor"
                                        style={{ minHeight: "100px" }}
                                    >
                                        <CKEditorComponent
                                            onChange={handleEditorChange}
                                        />
                                    </div>
                                    {formError?.description && (
                                        <div style={{ color: "red" }}>
                                            {formError?.description}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-12">
                                <UploadFilesInLine
                                    files={files}
                                    setFiles={setFiles}
                                />
                            </div>

                            <div className="col-12 mt-3 pb-3">
                                <div className="d-flex align-items-center justify-content-end">
                                    <Button
                                        variant="secondary"
                                        className="mr-2"
                                        onClick={close}
                                    >
                                        Cancel
                                    </Button>

                                    {!isLoading ? (
                                        <Button onClick={handleSubmit}>
                                            <i className="fa-regular fa-paper-plane"></i>
                                            Create
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
                        </div>
                    </div>
                    {/* end body */}
                </div>
            </div>
        </Modal>
    );
};

export default IndependentTaskCreationForm;
