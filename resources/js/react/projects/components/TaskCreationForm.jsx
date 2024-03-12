import { Listbox } from "@headlessui/react";
import _ from "lodash";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CKEditorComponent from "../../ckeditor";
import UploadFilesInLine from "../../file-upload/UploadFilesInLine";
import Button from "../../global/Button";
import { useCheckRestrictedWordsMutation } from "../../services/api/SingleTaskPageApi";
import { useLazyGetMilestoneDetailsQuery } from "../../services/api/projectApiSlice";
import { useStoreProjectTaskMutation } from "../../services/api/tasksApiSlice";
import DatePickerComponent from "../../single-task/section/comments/DatePicker";
import PrioritySelection from "../../single-task/section/sub-task/PrioritySelection";
import TaskCategorySelectionBox from "../../single-task/section/sub-task/TaskCategorySelectionBox";
import Loader from "../../tasks/components/Loader";
import Modal from "../../tasks/components/Modal";
import Input from "../../tasks/components/form/Input";
import { convertTime } from "../../utils/converTime";
import { CompareDate } from "../../utils/dateController";
import AssginedToSelection from "./AssignedToSelection";
import ProjectManagerAcknowledgementModal from "./ProjectManagerAcknowledgementModal";
import TypeOfGraphicsWorkSelection from "./graphics-design-forms/TypeOfGraphicsWorkSelection";
import TypeOfLogo from "./graphics-design-forms/TypeOfLogo";
import FileTypesNeeded from "./graphics-design-forms/FileTypesNeeded";

const fileInputStyle = {
    height: "39px",
}

const TaskCreationForm = ({ handleRefresh, isOpen, close, onSuccess }) => {
    const dispatch = useDispatch();
    const dayjs = new CompareDate();
    //   form data
    const [title, setTitle] = useState("");
    const [milestone, setMilestone] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [project, setProject] = useState("");
    const [taskCategory, setTaskCategory] = useState("");
    // for graphic designer start
    const [typeOfGraphicsCategory, setTypeOfGraphicsCategory] = useState("");
    const [typeOfLogo, setTypeOfLogo] = useState("");
    const [brandName, setBrandName] = useState("");
    const [numOfVersions, setNumOfVersions] = useState(null);
    const [reference, setReference] = useState("");
    const [fileTypesNeeded, setFileTypesNeeded] = React.useState([]);
    const [textForDesign, setTextForDesign] = useState('');
    const [imageForDesigner, setImageForDesigner] = useState(null);
    const [imgOrVidForWork, setImgOrVidForWork] = useState(null);
    const [fontName, setFontName] = useState('');
    const [fontUrl, setFontUrl] = useState('');
    const [brandGuideline, setBrandGuideline] = useState(null);
    // for graphic designer end
    const [assignedTo, setAssignedTo] = useState(null);
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [estimateTimeHour, setEstimateTimeHour] = useState(0);
    const [estimateTimeMin, setEstimateTimeMin] = useState(0);
    const [files, setFiles] = React.useState([]);


    const [formError, setFormError] = React.useState(null);

    // ui
    const [visibleAcknowledgementModal, setVisibleAcknowledgementModal] =
        React.useState(false);

    const params = useParams();
    const [storeProjectTask, { isLoading, error }] =
        useStoreProjectTaskMutation();

    const required_error = error?.status === 422 ? error?.data : null;

    const [
        getMilestoneDetails,
        { data: projectInfo, isFetching: milestoneDataIsFetching },
    ] = useLazyGetMilestoneDetailsQuery();

    const [checkRestrictedWords, { isLoading: checking }] =
        useCheckRestrictedWordsMutation();

    //TODO: clear form for new added fields
    const clearForm = () => {
        setTitle("");
        setMilestone(null);
        setTaskCategory("");
        setProject("");
        setStartDate(null);
        setDueDate(null);
        setAssignedTo(null);
        setPriority("Medium");
        setEstimateTimeHour(0);
        setEstimateTimeMin(0);
        setFiles([]);
        setDescription("");
    };
    // handle change
    React.useEffect(() => {
        if (isOpen) {
            getMilestoneDetails(params?.projectId)
                .unwrap()
                .then((res) => {
                    let project = _.head(res?.milestones);
                    setProject(project?.project_name ?? "");
                });
        } else {
            clearForm();
        }
    }, [isOpen]);

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

        if (!title) {
            err.title = "The title field is required";
            errCount++;
        }

        if (!startDate) {
            err.startDate = "You have to select a start date";
            errCount++;
        }

        if (!taskCategory) {
            err.taskCategory = "You have to select task category";
            errCount++;
        }

        if (milestone === null) {
            err.milestone = "Select a milestone";
            errCount++;
        }

        if (!dueDate) {
            err.dueDate = "You have to select a due date";
            errCount++;
        }

        if (!typeOfGraphicsCategory) {
            err.typeOfGraphicsCategory = "You have to select Type of graphic work";
            errCount++;
        }
        if (!typeOfLogo) {
            err.typeOfLogo = "You have to select Type of logo";
            errCount++;
        }

        if (!reference) {
            err.reference = "The reference field is required";
            errCount++;
        }
        if (!textForDesign) {
            err.textForDesign = "The text for design field is required";
            errCount++;
        }
        if (!brandName) {
            err.brandName = "The brand name field is required";
            errCount++;
        }
        if (!numOfVersions) {
            err.numOfVersions = "Number of versions is required";
            errCount++;
        }
        if (!fileTypesNeeded) {
            err.fileTypesNeeded = "File types is required";
            errCount++;
        }
        if (!imageForDesigner) {
            err.imageForDesigner = "Image is required for designer";
            errCount++;
        }
        if (!imgOrVidForWork) {
            err.imgOrVidForWork = "Images/videos is requiredn for work";
            errCount++;
        }
        if (!fontName) {
            err.fontName = "Font name is required";
            errCount++;
        }

        if (!assignedTo?.id) {
            err.assignedTo = "You have to select an user";
            errCount++;
        }

        if (description === "") {
            err.description = "Write a Description";
            errCount++;
        }

        // if(Number(estimateTimeHour) < 0 || estimateTimeMin < 0){
        //     err.estimateError = "Estimate time not less than 0";
        //     errCount++;
        // }

        // if((Number(estimateTimeHour) + Number(estimateTimeMin))  > Number(projectInfo?.minutes_left)){
        //     err.estimateError = "Estimate time not greater than " + projectInfo?.minutes_left;
        //     errCount++;
        // }

        setFormError(err);
        return !errCount;
    };

    // handle confirmation
    const handleAcknowledgementConfirmation = async (data) => {
        const _startDate = startDate
            ? dayjs.dayjs(startDate).format("DD-MM-YYYY")
            : "";
        const _dueDate = dueDate
            ? dayjs.dayjs(dueDate).format("DD-MM-YYYY")
            : "";

        const fd = new FormData();
        fd.append("heading", title ?? "");
        fd.append("description", description ?? "");
        fd.append("start_date", _startDate ?? "");
        fd.append("due_date", _dueDate ?? "");
        fd.append("project_id", params?.projectId ?? "");
        fd.append("category_id", taskCategory?.id ?? "");
        fd.append("priority", _.lowerCase(priority));
        fd.append("board_column_id", 2);
        fd.append("estimate_hours", estimateTimeHour ?? 0);
        fd.append("estimate_minutes", estimateTimeMin ?? 0);
        fd.append("deliverable_id", milestone?.deliverable_type ?? "");
        fd.append("milestone_id", milestone?.id ?? "");
        fd.append("user_id", assignedTo?.id ?? "");
        fd.append("acknowledgement", data.acknowledgement);
        fd.append("sub_acknowledgement", data.subAcknowledgement);
        fd.append("need_authorization", data.authorization);

        Array.from(files).forEach((file) => {
            fd.append("file[]", file);
        });

        fd.append(
            "_token",
            document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content")
        );

        // handle form submit
        const formSubmit = async () => {
            if (isValid()) {
                await storeProjectTask(fd)
                    .unwrap()
                    .then((res) => {
                        toast.success("Task created successfully");
                        onSuccess();
                        handleRefresh();
                    })
                    .catch((err) => {
                        if (err?.status === 422) {
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                title: "Please fill out the all required fields",
                                showConfirmButton: true,
                            });
                        }
                    });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Please fill out the all required fields",
                    showConfirmButton: true,
                });
            }
        };

        const response = await checkRestrictedWords(params?.projectId).unwrap();

        if (response.status === 400) {
            const error = new Object();
            const checkViolationWord = (text) => {
                const violationWords = [
                    "revision",
                    "fix",
                    "modify",
                    "fixing",
                    "revise",
                    "edit",
                ];
                const violationRegex = new RegExp(
                    `\\b(${violationWords.join("|")})\\b`,
                    "i"
                );
                return violationRegex.test(_.toLower(text));
            };

            const alert = () => {
                Swal.fire({
                    icon: "error",
                    html: `<p>In our new system, you should see a <span class="badge badge-info">Revision Button</span> in every task. If there is any revision for that task, you should use that button instead. Creating a new task for the revisions will mean you are going against the company policy and may result in actions from the management if reported.</p> <p><strong>Are you sure this is a new task and not a revision to any other existing tasks?</strong></p> `,
                    // showCloseButton: true,
                    showConfirmButton: true,
                    showCancelButton: true,
                }).then((res) => {
                    if (res.isConfirmed) {
                        formSubmit();
                    }
                });
            };

            // check title
            if (checkViolationWord(title)) {
                alert();
            } else if (checkViolationWord(description)) {
                alert();
            } else {
                formSubmit();
            }

            setErr((prev) => ({ ...prev, ...error }));
        } else {
            formSubmit();
        }
    };

    // handle submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid()) {
            if (taskCategory && _.includes([5, 7], taskCategory.id)) {
                handleAcknowledgementConfirmation({
                    acknowledgement: "",
                    subAcknowledgement: "",
                    authorization: "",
                });
            } else {
                setVisibleAcknowledgementModal(true);
            }
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
        const text = _.head(err?.errors?.hours);
        return text;
    };

    return (
        <Modal isOpen={isOpen}>
            <React.Fragment>
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
                                {/* Task Title */}
                                <div className="col-12 col-md-6">
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

                                {/* Project Name */}
                                <div className="col-12 col-md-6">
                                    <div className="form-group my-3">
                                        <label
                                            className={`f-14 text-dark-gray mb-1`}
                                            data-label="true"
                                        >
                                            Project <sup>*</sup>
                                        </label>
                                        <input
                                            className={`form-control height-35 f-14`}
                                            readOnly
                                            defaultValue={project}
                                        />
                                    </div>
                                </div>

                                {/* Project Milestone Selection Menu */}
                                <div className="col-12 col-md-6">
                                    <Listbox
                                        value={milestone}
                                        onChange={setMilestone}
                                    >
                                        <div className="form-group position-relative my-3">
                                            <label
                                                className={`f-14 text-dark-gray mb-1`}
                                                data-label="true"
                                            >
                                                Milestone <sup>*</sup>
                                            </label>
                                            <Listbox.Button className=" sp1-selection-display-button form-control height-35 f-14 sp1-selection-display bg-white w-100">
                                                {milestoneDataIsFetching ? (
                                                    <Loader title="Loading..." />
                                                ) : (
                                                    <>
                                                        <span
                                                            className="singleline-ellipsis"
                                                            style={{
                                                                width: "95%",
                                                            }}
                                                        >
                                                            {milestone?.milestone_title ??
                                                                "Select a milestone"}
                                                        </span>
                                                        <div className="__icon">
                                                            <i className="fa-solid fa-sort"></i>
                                                        </div>
                                                    </>
                                                )}
                                            </Listbox.Button>
                                            <Listbox.Options className="sp1-select-options">
                                                {_.map(
                                                    projectInfo?.milestones,
                                                    (milestone) => (
                                                        <Listbox.Option
                                                            key={milestone.id}
                                                            className={({
                                                                active,
                                                                selected,
                                                            }) =>
                                                                `sp1-select-option selected ${active ||
                                                                    selected
                                                                    ? "active"
                                                                    : ""
                                                                }`
                                                            }
                                                            value={milestone}
                                                        >
                                                            {
                                                                milestone?.milestone_title
                                                            }
                                                        </Listbox.Option>
                                                    )
                                                )}
                                            </Listbox.Options>

                                            {formError?.milestone && (
                                                <div style={{ color: "red" }}>
                                                    {formError?.milestone}
                                                </div>
                                            )}
                                        </div>
                                    </Listbox>
                                </div>

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

                                <div className="col-12 col-md-6">
                                    <div className="form-group my-3">
                                        <label htmlFor="">
                                            Start Date{" "}
                                            <sup className="f-14">*</sup>
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

                                <div className="col-12 col-md-6">
                                    <div className="form-group my-3">
                                        <label htmlFor="">
                                            Due Date{" "}
                                            <sup className="f-14">*</sup>
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
                                <div className="col-12 col-md-6">
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
                                            defaultValue={
                                                milestone?.deliverable_type ??
                                                ""
                                            }
                                        />
                                    </div>
                                </div>

                                {/* TODO: it will show conditionally here, when task category is graphics or ui/ux  */}
                                {
                                    taskCategory ? taskCategory?.category_name === "Graphic Design" && <>
                                        {/* Type Of Graphics Work */}
                                        <div className="col-12 col-md-6">
                                            <TypeOfGraphicsWorkSelection
                                                selected={typeOfGraphicsCategory}
                                                onSelect={setTypeOfGraphicsCategory}
                                                taskId={params?.projectId}
                                            />
                                            {formError?.typeOfGraphicsCategory && (
                                                <div style={{ color: "red" }}>
                                                    {formError?.typeOfGraphicsCategory}
                                                </div>
                                            )}
                                        </div>
                                        {/* for logo  */}
                                        {
                                            typeOfGraphicsCategory?.type_name === "Logo" && <>
                                                <div className="col-12 col-md-6">
                                                    <TypeOfLogo
                                                        selected={typeOfLogo}
                                                        onSelect={setTypeOfLogo}
                                                        taskId={params?.projectId}
                                                    />
                                                    {formError?.typeOfLogo && (
                                                        <div style={{ color: "red" }}>
                                                            {formError?.typeOfLogo}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <Input
                                                        id="brandName"
                                                        label="Brand Name"
                                                        type="text"
                                                        placeholder="Enter brand name"
                                                        name="brandName"
                                                        required={true}
                                                        value={brandName}
                                                        error={formError?.brandName}
                                                        onChange={(e) =>
                                                            handleChange(e, setBrandName)
                                                        }
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <Input
                                                        id="numOfVersions"
                                                        label="Number of Versions"
                                                        type="number"
                                                        placeholder="Enter Number of versions"
                                                        name="numOfVersions"
                                                        required={true}
                                                        value={numOfVersions}
                                                        error={formError?.numOfVersions}
                                                        onChange={(e) =>
                                                            handleChange(e, setNumOfVersions)
                                                        }
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <div className={`form-group my-3 w-100`}>
                                                        <label
                                                            htmlFor={'fileTypesNeeded'}
                                                            className={`f-14 text-dark-gray mb-1`}
                                                            data-label="true"
                                                        >
                                                            File Types Needed
                                                            <sup className='f-14 mr-1'>*</sup>
                                                        </label>
                                                        <FileTypesNeeded
                                                            className={`form-control height-35 w-100 f-14`}
                                                            id='fileTypesNeeded'
                                                            fileTypesNeeded={fileTypesNeeded}
                                                            setFileTypesNeeded={setFileTypesNeeded}
                                                            multiple
                                                        />
                                                        {formError?.fileTypesNeeded && (
                                                            <div style={{ color: "red" }}>
                                                                {formError?.fileTypesNeeded}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        {/* for Banner or company profile */}
                                        {
                                            (typeOfGraphicsCategory?.type_name === "Banner" || typeOfGraphicsCategory?.type_name === "Company Profile") && <>
                                                <div className="col-12 col-md-6">
                                                    <Input
                                                        id="textForDesign"
                                                        label="Attach text that will be used for the design"
                                                        type="text"
                                                        placeholder="Enter a text for design"
                                                        name="textForDesign"
                                                        required={true}
                                                        value={textForDesign}
                                                        error={formError?.textForDesign}
                                                        onChange={(e) =>
                                                            handleChange(e, setTextForDesign)
                                                        }
                                                    />
                                                </div>
                                            </>
                                        }

                                        {/* background removal or image retouching */}
                                        {
                                            (typeOfGraphicsCategory?.type_name === "Background Removal" || typeOfGraphicsCategory?.type_name === "Image Retouching") && <>
                                                <div className="col-12 col-md-6">
                                                    <div className={`form-group my-3 w-100`}>
                                                        <label
                                                            htmlFor={'imageForDesigner'}
                                                            className={`f-14 text-dark-gray mb-2`}
                                                            data-label="true"
                                                        >
                                                            Image where the designer will work
                                                            <sup className='f-14 mr-1'>*</sup>
                                                        </label>
                                                        <div className="custom-file" style={fileInputStyle}>
                                                            <input type="file" className="custom-file-input" id="imageForDesigner" required={true} error={formError?.imageForDesigner} onChange={(e) =>
                                                                handleChange(e, setImageForDesigner)
                                                            } />
                                                            <label className="custom-file-label" htmlFor="imageForDesigner">Choose file</label>
                                                        </div>
                                                        {formError?.imageForDesigner && (
                                                            <div style={{ color: "red" }}>
                                                                {formError?.imageForDesigner}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        }

                                        {/* motion graphics */}
                                        {
                                            typeOfGraphicsCategory?.type_name === "Motion Graphics" && <>
                                                <div className="col-12 col-md-6">
                                                    <div className={`form-group my-3 w-100`}>
                                                        <label
                                                            htmlFor={'imgOrVidForWork'}
                                                            className={`f-14 text-dark-gray mb-2`}
                                                            data-label="true"
                                                        >
                                                            Images/videos that will be used for the work
                                                            <sup className='f-14 mr-1'>*</sup>
                                                        </label>
                                                        <div className="custom-file" style={fileInputStyle}>
                                                            <input type="file" className="custom-file-input" id="imgOrVidForWork" required={true} error={formError?.imgOrVidForWork} onChange={(e) =>
                                                                handleChange(e, setImgOrVidForWork)
                                                            } multiple />
                                                            <label className="custom-file-label" htmlFor="imgOrVidForWork">Choose file</label>
                                                        </div>
                                                        {formError?.imgOrVidForWork && (
                                                            <div style={{ color: "red" }}>
                                                                {formError?.imgOrVidForWork}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        }

                                        {/* Reference */}
                                        <div className="col-12 col-md-6">
                                            <Input
                                                id="reference"
                                                label="Reference"
                                                type="text"
                                                placeholder="Enter a task reference"
                                                name="reference"
                                                required={true}
                                                value={reference}
                                                error={formError?.reference}
                                                onChange={(e) =>
                                                    handleChange(e, setReference)
                                                }
                                            />
                                        </div>

                                        {/* Font name */}
                                        <div className="col-12 col-md-6">
                                            <Input
                                                id="fontName"
                                                label="Font Name"
                                                type="text"
                                                placeholder="Enter a font name"
                                                name="fontName"
                                                required={true}
                                                value={fontName}
                                                error={formError?.fontName}
                                                onChange={(e) =>
                                                    handleChange(e, setFontName)
                                                }
                                            />
                                        </div>

                                        {/* font url  */}
                                        <div className="col-12 col-md-6">
                                            <Input
                                                id="fontUrl"
                                                label="Font Url"
                                                type="url"
                                                placeholder="Enter font url"
                                                name="fontUrl"
                                                value={fontUrl}
                                                onChange={(e) =>
                                                    handleChange(e, setFontUrl)
                                                }
                                            />
                                        </div>
                                        {/* Brand guideline */}
                                        <div className="col-12 col-md-6">
                                            <div className={`form-group my-3 w-100`}>
                                                <label
                                                    htmlFor={'brandGuideline'}
                                                    className={`f-14 text-dark-gray mb-2`}
                                                    data-label="true"
                                                >
                                                    Brand guideline
                                                </label>
                                                <div className="custom-file" style={fileInputStyle}>
                                                    <input type="file" className="custom-file-input" id="brandGuideline" error={formError?.brandGuideline} onChange={(e) =>
                                                        handleChange(e, setBrandGuideline)
                                                    } multiple />
                                                    <label className="custom-file-label" htmlFor="brandGuideline">Choose file</label>
                                                </div>
                                            </div>
                                        </div>

                                    </> : null
                                }


                                {/* assignee to */}
                                <div className="col-12 col-md-6">
                                    <AssginedToSelection
                                        selected={assignedTo}
                                        onSelect={setAssignedTo}
                                        taskCategory={taskCategory}
                                    />

                                    {formError?.assignedTo && (
                                        <div style={{ color: "red" }}>
                                            {formError?.assignedTo}
                                        </div>
                                    )}
                                </div>

                                {/* Priority */}
                                <div className="col-12 col-md-6">
                                    <PrioritySelection
                                        selected={priority}
                                        setSelected={setPriority}
                                    />
                                </div>

                                {/* Estimate Time */}
                                <div className="col-12 col-md-6">
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
                                                type="number"
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
                                                type="number"
                                                min={0}
                                                className="form-control height-35 f-14 mr-2 ml-2"
                                                value={estimateTimeMin}
                                                onWheel={(e) =>
                                                    e.currentTarget.blur()
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        setEstimateTimeMin
                                                    )
                                                }
                                            />{" "}
                                            min
                                        </div>

                                        <div style={{ color: "red" }}>
                                            {estimateError(required_error)}
                                        </div>
                                        <div style={{ color: "#F01F0A" }}>
                                            Estimation time can't exceed{" "}
                                            {convertTime(
                                                Number(
                                                    projectInfo?.minutes_left
                                                ) > 0
                                                    ? Number(
                                                        projectInfo?.minutes_left
                                                    )
                                                    : 0
                                            )}
                                        </div>

                                        {formError?.estimateError && (
                                            <div style={{ color: "red" }}>
                                                {formError?.estimateError}
                                            </div>
                                        )}
                                    </div>
                                </div>

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
                                                data={description}
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

                                        <Button
                                            isLoading={isLoading || checking}
                                            onClick={handleSubmit}
                                        >
                                            <i className="fa-regular fa-paper-plane"></i>
                                            Create
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end body */}
                    </div>
                </div>

                <ProjectManagerAcknowledgementModal
                    isOpen={visibleAcknowledgementModal}
                    onClose={() => setVisibleAcknowledgementModal(false)}
                    onConfirm={handleAcknowledgementConfirmation}
                    isLoading={isLoading || checking}
                />
            </React.Fragment>
        </Modal>
    );
};

export default TaskCreationForm;
