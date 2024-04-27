import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CKEditorComponent from "../../../ckeditor";
import UploadFilesInLine from "../../../file-upload/UploadFilesInLine";
import Button from '../../../global/Button';
import Card from "../../../global/Card";
import { CompareDate } from "../../../utils/dateController";
import Modal from "../../components/Modal";
import Input from "../../components/form/Input";
import DatePicker from "../comments/DatePicker";
import AssignedToSelection from "./AssignedToSelection";
import PrioritySelection from "./PrioritySelection";
import TaskCategorySelectionBox from "./TaskCategorySelectionBox";
import styles from "./task-edit-form.module.css";

import { toast } from "react-toastify";
import {
    useDeleteUplaodedFileMutation,
    useEditSubtaskMutation,
    useGetTaskDetailsQuery,
    useGetTypesOfGraphicWorksQuery,
} from "../../../services/api/SingleTaskPageApi";
import { useGetMilestoneDetailsQuery } from "../../../services/api/projectApiSlice";
import { ColorItem } from "../../components/PMGuideline";
import FileTypesNeeded from "../../../projects/components/graphics-design-forms/FileTypesNeeded";
import TypeOfLogo from "../../../projects/components/graphics-design-forms/TypeOfLogo";
import TypeOfGraphicsWorkSelection from "../../../projects/components/graphics-design-forms/TypeOfGraphicsWorkSelection";
import FileUploader from "../../../file-upload/FileUploader";
import { useGetSubTasksQuery } from "../../../services/api/tasksApiSlice";
import FileUploadWithInput from "../../../projects/components/ui/FileUploadWithInput";
import CustomFileUpload from "../../../projects/components/ui/CustomFileUpload";
import FileExtensionMultiSelect from "../../../projects/components/graphics-design-forms/FileExtensionMultiSelect";

const dayjs = new CompareDate();

// Edit form Provider
const EditFormProvider = ({ task, singleTask }) => {
    const [searchParams] = useSearchParams(); // get search params
    const isVisible = searchParams.get("modal") === "edit"; // check has modal
    const taskId = searchParams.get("task"); // get task id
    const navigate = useNavigate();
    const location = useLocation();

    const close = () => navigate(location.pathname, { replace: true });

    const [editSubtask, { isLoading, error }] = useEditSubtaskMutation();
    // handle submission
    const handleSubmission = (formData) => {
        editSubtask({ data: formData, id: task?.id }).unwrap().then(res => {
            toast.success("Task Updated successfully!");
            close();
        }).catch((err) => {
            if (err?.status === 422) {
                toast.warn("Please fill out all required fields")
            }
        })
    };



    return (
        <Modal isOpen={isVisible}>
            <Card className={styles.form_card}>
                <Card.Head
                    onClose={close}
                    className={styles.form_card_head}
                >
                    <h6> Edit Task # {taskId}</h6>
                </Card.Head>

                <Card.Body className={styles.form_card_body}>
                    <div className="">
                        {task && (
                            <SubTaskEditModal
                                task={task}
                                singleTask={singleTask}
                                onSubmit={handleSubmission}
                                isLoading={isLoading}
                                onClose={close}
                            />
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Modal>
    );
};

export default EditFormProvider;

const SubTaskEditModal = ({ task, singleTask: taskDetails, onSubmit, isLoading, onClose }) => {
    const editDataIsFetching = !task;

    // graphic task details

    // **************sub task details start**********
    const isSubTask = taskDetails?.dependent_task_id
    const { data: subTasks } = useGetSubTasksQuery({ taskId: taskDetails?.dependent_task_id }, {
        skip: !isSubTask
    })

    const { data: mainTask } = useGetTaskDetailsQuery(
        `/${isSubTask}/json?mode=basic`,
        { refetchOnMountOrArgChange: true, skip: !isSubTask }
    );

    const uiUixDetails = new Object(mainTask?.task)
    // sub task details 
    const graphicWorkDetails = new Object(subTasks?.sub_task_details_graphic_work)
    // **************sub task details end**********

    const { data: graphicOptions } = useGetTypesOfGraphicWorksQuery("")


    // set default value for files and colors for graphic design start
    let defaultSecondaryColors;
    let defaultFileTypesNeeded;
    let defaultFileExtension;
    // files
    let defaultTextForDesign;
    let defaultImageForDesigner;
    let defaultImgOrVidForWork;
    let defaultBrandGuidelineFiles;
    let defaultRefFiles;

    if (graphicWorkDetails?.secondary_colors || graphicWorkDetails?.file_types_needed || graphicWorkDetails?.file_extensions) {
        defaultSecondaryColors = JSON.parse(graphicWorkDetails?.secondary_colors)
        defaultFileTypesNeeded = JSON.parse(graphicWorkDetails?.file_types_needed)
        defaultFileExtension = JSON.parse(graphicWorkDetails?.file_extensions)
    }
    if (graphicWorkDetails?.graphic_task_files) {
        defaultTextForDesign = graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 1)
        defaultImageForDesigner = graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 2)
        defaultImgOrVidForWork = graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 3)
        defaultBrandGuidelineFiles = graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 4)
        defaultRefFiles = graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 5)
    }

    // set default value for files and colors for graphic design end

    //form data
    const [title, setTitle] = useState(task.title);
    const [milestone, setMilestone] = useState({ id: task.milestoneID, milestone_title: task.milestoneTitle });
    const [parentTask, setParentTask] = useState(task.parentTaskTitle);
    const [startDate, setStateDate] = useState(new Date(task.startDate));
    const [dueDate, setDueDate] = useState(new Date(task.dueDate));
    const [project, setProject] = useState(task.projectName);
    const [taskCategory, setTaskCategory] = useState({
        id: task.category.id,
        category_name: task.category.name,
    });
    const [assignedTo, setAssignedTo] = useState({
        id: task.assigneeTo.id,
        name: task.assigneeTo.name,
    });
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [estimateTimeHour, setEstimateTimeHour] = useState(
        task.estimateHours
    );
    const [estimateTimeMin, setEstimateTimeMin] = useState(
        task.estimateMinutes
    );
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [files, setFiles] = React.useState([]);
    const [error, setError] = useState(null);

    //state for graphic designer start
    const [workableUrl, setWorkableUrl] = useState('');

    const [typeOfGraphicsCategory, setTypeOfGraphicsCategory] = useState("");
    const [typeOfLogo, setTypeOfLogo] = useState("");
    const [brandName, setBrandName] = useState("");
    const [numOfVersions, setNumOfVersions] = useState(null);
    const [referenceList, setReferenceList] = useState([{ reference: "" }]);
    const [referenceFile, setReferenceFile] = useState([]);
    const [fileTypesNeeded, setFileTypesNeeded] = React.useState([]);
    const [textForDesign, setTextForDesign] = useState([]);
    const [imageForDesigner, setImageForDesigner] = useState([]);
    const [imgOrVidForWork, setImgOrVidForWork] = useState([]);
    const [fontName, setFontName] = useState('');
    const [fontUrl, setFontUrl] = useState('');
    const [brandGuideline, setBrandGuideline] = useState([]);
    const [illustration, setIllustration] = useState("");
    const [others, setOthers] = useState("");
    const [primaryColor, setPrimaryColor] = React.useState("");
    const [primaryColorDescription, setPrimaryColorDescription] =
        React.useState("");
    const [secondaryColors, setSecondaryColors] = React.useState([]);
    const [fileExtension, setFileExtension] = React.useState([]);
    //state for graphic designer end

    // state for ui/ux start
    const [cms, setCms] = useState("")
    const [themeName, setThemeName] = useState("")
    const [themeTemplate, setThemeTemplate] = useState("")
    // state for ui/ux end


    // set state data default value from graphic designer start
    useEffect(() => {
        setBrandName(graphicWorkDetails?.brand_name)
        setNumOfVersions(graphicWorkDetails?.number_of_versions);
        if (graphicWorkDetails?.reference) {
            setReferenceList(JSON.parse(graphicWorkDetails?.reference));
        }
        setFontName(graphicWorkDetails?.font_name);
        setFontUrl(graphicWorkDetails?.font_url);
        setPrimaryColor(graphicWorkDetails?.primary_color);
        setPrimaryColorDescription(graphicWorkDetails?.primary_color_description);
        setIllustration(graphicWorkDetails?.design_instruction);
        setOthers(graphicWorkDetails?.design_instruction);
        setFileTypesNeeded(defaultFileTypesNeeded)
        setBrandGuideline(defaultBrandGuidelineFiles)
        setTextForDesign(defaultTextForDesign)
        setImageForDesigner(defaultImageForDesigner)
        setImgOrVidForWork(defaultImgOrVidForWork)
        setReferenceFile(defaultRefFiles)
        setSecondaryColors(defaultSecondaryColors)
        setWorkableUrl(graphicWorkDetails?.workable_url)
        setFileExtension(defaultFileExtension)
    }, [taskDetails, graphicWorkDetails]);

    useEffect(() => {
        setCms(uiUixDetails?.cms)
        setThemeName(uiUixDetails?.theme_name)
        setThemeTemplate(uiUixDetails?.theme_template_library_link)
    }, [uiUixDetails])


    useEffect(() => {
        if (graphicWorkDetails?.type_of_graphic_work_id) {
            setTypeOfGraphicsCategory({
                id: graphicWorkDetails?.type_of_graphic_work_id,
                name: graphicOptions?.find((item) => item.id == graphicWorkDetails?.type_of_graphic_work_id)?.name,
            });
        }
        if (graphicWorkDetails?.type_of_logo) {
            setTypeOfLogo({
                type_name: graphicWorkDetails?.type_of_logo,
            });
        }
    }, [graphicOptions, graphicWorkDetails]);

    // set state data default value from graphic designer end

    const { data: estimation, isFetching } = useGetTaskDetailsQuery(
        `/${task.id}/json?mode=estimation_time`
    );

    const required_error = error?.status === 422 ? error?.data : null;
    // attach files
    React.useEffect(() => {
        const attachments = [];

        _.forEach(task?.attachments, file => (
            file.task_file_name && attachments.push({
                id: file.task_file_id,
                name: file.task_file_name,
                icon: _.includes(['png', 'jpeg', 'jpg', 'svg', 'gif', 'webp'], file.task_file_icon) ? 'images' : 'others',
                file_url: file.task_file_url,
            })
        ))

        setAttachedFiles(attachments)
    }, [])
    // handle onchange
    const handleChange = (e, setState) => {
        e.preventDefault();
        let value = e.target.value;
        setState(value);
    };

    // check validation
    const isValid = () => {
        let count = 0;
        const err = new Object();

        const errorMessages = {
            requiredField: 'This field is required.',
            startDate: 'Please select a start date.',
            dueDate: 'Please select a due date.',
            taskCategory: 'Please select a task category.',
            assignedTo: 'Please select a user.',
            overloadedUser: (name, gender) =>
                `You cannot assign this task to ${name} because ${gender === 'male' ? 'he ' : 'she '
                } has more than 4 submittable tasks.`,
            description: 'This field is required.',
        };

        const showError = (field) => {
            err[field] = errorMessages[field];
            count++;
        }


        if (!title) showError('title');
        if (!startDate) showError('startDate');
        if (!dueDate) showError('dueDate');
        if (!taskCategory) showError('taskCategory');
        if (!assignedTo) showError('assignedTo');

        if (assignedTo && assignedTo?.isOverloaded) {
            err.assignedTo = overloadedUser(assignedTo.name, genderPronoun);
            count++;
        }

        if (!description) showError('description');

        setError(error);
        return count === 0;

    }

    const handleSubmit = () => {
        //form data
        const _startDate = dayjs.dayjs(startDate).format("DD-MM-YYYY");
        const _dueDate = dayjs.dayjs(dueDate).format("DD-MM-YYYY");

        const fd = new FormData();
        fd.append("milestone_id", task?.milestoneID);
        fd.append("task_id", task?.parentTaskId);
        fd.append("title", title);
        fd.append("start_date", _startDate);
        fd.append("due_date", _dueDate);
        fd.append("project_id", task?.projectId);
        fd.append("task_category_id", taskCategory?.id);
        fd.append("user_id", assignedTo?.id);
        fd.append("description", description);
        fd.append("board_column_id", task?.boardColumn.id);
        fd.append("priority", _.lowerCase(priority));
        fd.append("estimate_hours", estimateTimeHour);
        fd.append("estimate_minutes", estimateTimeMin);
        fd.append("deliverable_id", milestone?.deliverable_type ?? '');
        fd.append("image_url", null);
        fd.append("addedFiles", null);
        fd.append('subTaskID', task?.subtaskId);
        fd.append("_method", "PUT");
        fd.append(
            "_token",
            document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content")
        );
        Array.from(files).forEach((file) => {
            fd.append("file[]", file);
        });

        if (isValid()) {
            onSubmit(fd);
        } else {
            toast.warn('Please fill out all required fields!');
        }

    };


    const { data: projects, isFetching: isFetchingMilestone } = useGetMilestoneDetailsQuery(task?.projectId)



    // handle uploaded file delete request
    const [deleteUplaodedFile] = useDeleteUplaodedFileMutation();
    const handleFileDelete = (e, file) => {
        // delete
        deleteUplaodedFile(file?.id).unwrap();

        // delete form ui
        let previousFile = [...attachedFiles];
        let index = previousFile?.indexOf(file);
        previousFile.splice(index, 1);
        setAttachedFiles(previousFile);
    };

    // handle loading state
    React.useEffect(() => {
        if (isLoading || editDataIsFetching) {
            document.getElementsByTagName("body")[0].style.cursor = "progress";
        } else {
            document.getElementsByTagName("body")[0].style.cursor = "default";
        }
    }, [isLoading, editDataIsFetching]);

    //   editor
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

    return (
        <React.Fragment>
            <div className="sp1-subtask-form --modal-panel-body position-relative">
                {editDataIsFetching && (
                    <div
                        className="w-100"
                        style={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 1,
                        }}
                    />
                )}
                <div className="sp1-subtask-form --form row">
                    <div className="col-12 col-md-6">
                        <Input
                            id="title"
                            label="Title"
                            type="text"
                            placeholder="Enter a task title"
                            name="title"
                            required={true}
                            value={title}
                            error={required_error?.title?.[0]}
                            onChange={(e) => handleChange(e, setTitle)}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group my-3">
                            <label
                                className={`f-14 text-dark-gray mb-1`}
                                data-label="true"
                            >
                                Project
                            </label>
                            <input
                                className={`form-control height-35 f-14`}
                                readOnly
                                defaultValue={project}
                            />
                        </div>
                    </div>


                    {/* Project Milestone Selection Menu */}
                    {
                        task?.category?.name !== "Graphic Design" && <div className="col-12 col-md-6">
                            <div className="form-group my-3">
                                <label
                                    className={`f-14 text-dark-gray mb-1`}
                                    data-label="true"
                                >
                                    Milestone
                                </label>
                                <input
                                    className={`form-control height-35 f-14`}
                                    readOnly
                                    defaultValue={milestone?.milestone_title}
                                />
                            </div>
                        </div>
                    }



                    <div className="col-12 col-md-6">
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
                                defaultValue={task?.parentTaskTitle}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <TaskCategorySelectionBox
                            selected={taskCategory}
                            onSelect={setTaskCategory}
                            isDesignerTask={true}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group my-3">
                            <label htmlFor="">
                                Start Date <sup className="f-14">*</sup>
                            </label>
                            <div className="form-control height-35 f-14">
                                <DatePicker
                                    placeholderText={`Ex: ${dayjs
                                        .dayjs()
                                        .format("DD-MM-YYYY")}`}
                                    minDate={dayjs
                                        .dayjs(task?.start_date)
                                        .toDate()}
                                    maxDate={
                                        dueDate ||
                                        dayjs.dayjs(task?.due_date).toDate()
                                    }
                                    date={startDate}
                                    setDate={setStateDate}
                                />
                            </div>
                            {required_error?.start_date?.[0] && (
                                <div style={{ color: "red" }}>
                                    {required_error?.start_date?.[0]}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group my-3">
                            <label htmlFor="">
                                Due Date <sup className="f-14">*</sup>
                            </label>
                            <div className="form-control height-35 f-14">
                                <DatePicker
                                    placeholderText={`Ex: ${dayjs
                                        .dayjs()
                                        .format("DD-MM-YYYY")}`}
                                    minDate={
                                        startDate ||
                                        dayjs.dayjs(task?.start_date).toDate()
                                    }
                                    maxDate={dayjs
                                        .dayjs(task?.due_date)
                                        .toDate()}
                                    date={dueDate}
                                    setDate={setDueDate}
                                />
                            </div>
                            {required_error?.due_date?.[0] && (
                                <div style={{ color: "red" }}>
                                    {required_error?.due_date?.[0]}
                                </div>
                            )}
                        </div>
                    </div>

                    {
                        // lead designer to graphic designer
                        (task?.category?.name === "Graphic Design") && <>
                            {/* Type Of Graphics Work */}
                            <div className="col-12 col-md-6">
                                <TypeOfGraphicsWorkSelection
                                    selected={typeOfGraphicsCategory}
                                    onSelect={setTypeOfGraphicsCategory}
                                    isDesignerTask={true}
                                />
                            </div>
                            {/* for logo  */}
                            {
                                typeOfGraphicsCategory?.id === 1 && <>
                                    <div className="col-12 col-md-6">
                                        <TypeOfLogo
                                            selected={typeOfLogo}
                                            onSelect={setTypeOfLogo}
                                            isDesignerTask={true}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Input
                                            id="brandName"
                                            label="Brand Name"
                                            type="text"
                                            placeholder="Enter brand name"
                                            name="brandName"
                                            defaultValue={brandName}
                                            readOnly={true}
                                        />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <Input
                                            id="fileTypesNeeded"
                                            label="File Types Needed"
                                            type="text"
                                            name="fileTypesNeeded"
                                            value={fileTypesNeeded?.join(", ")}
                                            readOnly={true}
                                        />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <Input
                                            id="numOfVersions"
                                            label="Number of Versions"
                                            type="number"
                                            placeholder="Enter Number of versions"
                                            name="numOfVersions"
                                            defaultValue={numOfVersions}
                                            readOnly={true}
                                        />
                                    </div>
                                </>
                            }

                            {/* for Banner, brochure or company profile */}
                            {
                                (typeOfGraphicsCategory?.id === 2 || typeOfGraphicsCategory?.id === 3 || typeOfGraphicsCategory?.id === 4) && <>
                                    <div className="col-12 col-md-6">
                                        <div className={`form-group my-3 w-100`}>
                                            <label
                                                htmlFor={'imageForDesigner'}
                                                className={`f-14 text-dark-gray mb-1`}
                                                data-label="true"
                                            >
                                                Attach text that will be used for the design
                                                <sup className='f-14 mr-1'>*</sup>
                                            </label>
                                            <div>
                                                <FileUploadWithInput
                                                    inputType="url"
                                                    inputUrl={workableUrl}
                                                    previous={textForDesign}
                                                    readOnly={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                            {/* background removal or image retouching */}
                            {
                                (typeOfGraphicsCategory?.id === 5 || typeOfGraphicsCategory?.id === 6) && <>
                                    <div className="col-12 col-md-6">
                                        <div className={`form-group my-3 w-100`}>
                                            <label
                                                htmlFor={'imageForDesigner'}
                                                className={`f-14 text-dark-gray mb-1`}
                                                data-label="true"
                                            >
                                                Image where the designer will work
                                                <sup className='f-14 mr-1'>*</sup>
                                            </label>
                                            <div>
                                                <FileUploadWithInput
                                                    inputType="url"
                                                    inputUrl={workableUrl}
                                                    previous={imageForDesigner}
                                                    readOnly={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }

                            {/* motion graphics */}
                            {
                                typeOfGraphicsCategory?.id === 8 && <>
                                    <div className="col-12 col-md-6">
                                        <div className={`form-group my-3 w-100`}>
                                            <label
                                                htmlFor={'imgOrVidForWork'}
                                                className={`f-14 text-dark-gray mb-1`}
                                                data-label="true"
                                            >
                                                Images/videos that will be used for the work
                                                <sup className='f-14 mr-1'>*</sup>
                                            </label>
                                            <div>
                                                <FileUploadWithInput
                                                    inputType="url"
                                                    inputUrl={workableUrl}
                                                    previous={imgOrVidForWork}
                                                    readOnly={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }

                            {/* Illustration */}
                            {

                                typeOfGraphicsCategory?.id === 7 && <>
                                    <div className="col-12">
                                        <div className="form-group my-3">
                                            <label htmlFor="">
                                                {" "}
                                                Name of the illustration work!<sup>*</sup>{" "}
                                            </label>
                                            <div className={`sp1_ck_content sp1_guideline_text px-2 py-2 rounded`} style={{ backgroundColor: "#E9ECEF" }} dangerouslySetInnerHTML={{ __html: illustration }}>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                            {/* Others */}
                            {
                                typeOfGraphicsCategory?.id === 9 && <>
                                    <div className="col-12">
                                        <div className="form-group my-3">
                                            <label htmlFor="">
                                                {" "}
                                                Name of the graphic design work!<sup>*</sup>{" "}
                                            </label>
                                            <div className={`sp1_ck_content sp1_guideline_text px-2 py-2 rounded`} style={{ backgroundColor: "#E9ECEF" }} dangerouslySetInnerHTML={{ __html: others }}>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }

                            {/* Reference */}
                            <div className="col-12 col-md-6">
                                <div className={`form-group my-3 w-100`}>
                                    <label
                                        htmlFor='reference'
                                        className={`f-14 text-dark-gray mb-1`}
                                        data-label="true"
                                    >
                                        Reference
                                        <sup className='f-14 mr-1'>*</sup>
                                    </label>
                                    <div style={{ maxHeight: '200px', overflow: 'auto' }}>
                                        {
                                            referenceList?.map((singleReference, index) => <input
                                                key={index}
                                                type="url"
                                                name="reference"
                                                className={`form-control height-35 f-14 ${index !== 0 && 'mt-2'}`}
                                                placeholder={'Enter Task Reference'}
                                                value={singleReference.reference}
                                                readOnly={true}

                                            />)
                                        }
                                        <div>
                                            <CustomFileUpload
                                                previous={referenceFile}
                                                readOnly={true}
                                            />
                                        </div>
                                    </div>

                                </div>
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
                                    readOnly={true}
                                />
                            </div>

                            {/* font url  */}
                            {
                                fontUrl && <div className="col-12 col-md-6">
                                    <Input
                                        id="fontUrl"
                                        label="Font Url"
                                        type="url"
                                        placeholder="Enter font url"
                                        name="fontUrl"
                                        value={fontUrl}
                                        readOnly={true}
                                    />
                                </div>
                            }


                            {/* Brand guideline */}
                            {
                                !_.isEmpty(brandGuideline) && <div className="col-12">
                                    <div className={`form-group my-3 w-100`}>
                                        <label
                                            htmlFor={'brandGuideline'}
                                            className={`f-14 text-dark-gray mb-2`}
                                            data-label="true"
                                        >
                                            Brand guideline
                                        </label>
                                        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                                            <FileUploader>
                                                {_.map(
                                                    brandGuideline,
                                                    (attachment) => {
                                                        const file_icon = attachment?.filename.split(".").pop();

                                                        return attachment?.filename ? (
                                                            <FileUploader.Preview
                                                                key={attachment?.id}
                                                                fileName={attachment?.filename}
                                                                downloadAble={true}
                                                                deleteAble={false}
                                                                downloadUrl={attachment?.file_url}
                                                                previewUrl={attachment?.file_url}
                                                                fileType={
                                                                    _.includes(
                                                                        ["png", "jpeg", "jpg", "svg", "webp", "gif"],
                                                                        file_icon
                                                                    )
                                                                        ? "images"
                                                                        : "others"
                                                                }
                                                                classname="comment_file"
                                                                ext={file_icon}
                                                            />
                                                        ) : null;
                                                    }
                                                )}
                                            </FileUploader>
                                        </div>
                                    </div>
                                </div>
                            }


                            {/* color schema */}
                            <div className="col-12">
                                <div className='mb-2 f-16' style={{ color: '#878E97' }}><strong>Color Scheme: </strong></div>
                                <div className='mb-3 rounded'>
                                    <div className='row' style={{ marginLeft: "0px" }}>
                                        <div className='col-12 col-md-6 px-0'>
                                            <label
                                                htmlFor='primaryColor'
                                                className={`font-weight-bold mr-2 mb-2`}
                                                data-label="true"
                                            >
                                                Primary Color
                                                <sup className='f-14 mr-1'>*</sup>
                                            </label>
                                            <ColorItem color={primaryColor} desc={primaryColorDescription} />
                                        </div>
                                        {
                                            defaultSecondaryColors && (defaultSecondaryColors[0]?.color || defaultSecondaryColors[0]?.description) &&
                                            <div className='col-12 col-md-6 px-0'>
                                                <p className='font-weight-bold mr-2 mb-2'>
                                                    {
                                                        defaultSecondaryColors?.length > 1
                                                            ? "Secondary Colors: "
                                                            : "Secondary Color: "
                                                    }
                                                </p>
                                                {
                                                    defaultSecondaryColors?.map((color, i) => (
                                                        <ColorItem key={i + color} color={color?.color}
                                                            desc={color?.description} />
                                                    ))
                                                }
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>

                            {/* end color schema */}

                            <div className="col-12 col-md-6">
                                <Input
                                    id="fileExtension"
                                    label="Required File Extension"
                                    type="text"
                                    name="fileExtension"
                                    value={fileExtension?.join(", ")}
                                    readOnly={true}
                                />
                            </div>
                        </>
                    }

                    {
                        // lead designer to ui/ux designer
                        (task?.category?.name === "UI/UIX Design") && <>
                            {/* cms name  */}
                            <div className="col-12 col-md-6">
                                <Input
                                    id="cms"
                                    label="CMS"
                                    type="text"
                                    name="cms"
                                    value={cms}
                                    readOnly={true}
                                />
                            </div>
                            {/* theme name */}
                            {
                                themeName && <div className="col-12 col-md-6">
                                    <Input
                                        id="themeName"
                                        label="Theme Name"
                                        type="text"
                                        name="themeName"
                                        value={themeName}
                                        readOnly={true}
                                    />
                                </div>
                            }
                            {/* theme template url */}
                            {
                                themeTemplate && <div className="col-12 col-md-6">
                                    <Input
                                        id="themeTemplate"
                                        label="Theme Template Library URL"
                                        type="url"
                                        name="themeTemplate"
                                        value={themeTemplate}
                                        readOnly={true}
                                    />
                                </div>
                            }
                        </>
                    }


                    <div className="col-12 col-md-6">
                        <AssignedToSelection
                            selected={assignedTo}
                            onSelect={setAssignedTo}
                            taskCategory={taskCategory}
                        />
                    </div>
                    {/*
                    <div className="col-12 col-md-6">
                        <TaskObserverSelection />
                    </div> */}

                    {/* <div className="col-12 col-md-6">
                        <StatusSelection />
                    </div> */}

                    <div className="col-12 col-md-6">
                        <PrioritySelection
                            selected={priority}
                            setSelected={setPriority}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group my-3">
                            <label htmlFor="" className="f-14 text-dark-gray">
                                Set Estimate Time{" "}
                                <sup className="f-14"> * </sup>
                            </label>
                            <div className="d-flex align-items-center">
                                <input
                                    type="number"
                                    onWheel={(e) => e.currentTarget.blur()}
                                    className="form-control height-35 f-14 mr-2"
                                    value={estimateTimeHour}
                                    onChange={(e) =>
                                        handleChange(e, setEstimateTimeHour)
                                    }
                                />{" "}
                                hrs
                                <input
                                    type="number"
                                    onWheel={(e) => e.currentTarget.blur()}
                                    className="form-control height-35 f-14 mr-2 ml-2"
                                    value={estimateTimeMin}
                                    onChange={(e) =>
                                        handleChange(e, setEstimateTimeMin)
                                    }
                                />{" "}
                                min
                            </div>

                            <div style={{ color: "red" }}>
                                {estimateError(required_error)}
                            </div>
                            <div style={{ color: "red" }}>
                                Estimation time can't exceed{" "}
                                {estimation?.hours_left} hours{" "}
                                {estimation?.minutes_left} minutes
                            </div>
                            {/* <div style={{ color: "#F73B12" }}>
                                Estimation time can't exceed{" "}
                                {taskDetails?.estimate_hours} hours{" "}
                                {taskDetails?.estimate_minutes} minutes
                            </div> */}
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="form-group my-3">
                            <label
                                htmlFor=""
                                className={`f-14 text-dark-gray mb-2`}
                            >
                                Description
                                <sup className='f-14 mr-1'>*</sup>
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
                        </div>
                    </div>

                    <div className="col-12">
                        <UploadFilesInLine
                            onPreviousFileDelete={handleFileDelete}
                            previous={attachedFiles}
                            files={files}
                            setFiles={setFiles}
                        />
                    </div>

                    <div className="col-12 mt-3 mb-5">
                        <div className="d-flex align-items-center justify-content-end">
                            <Button
                                variant="secondary"
                                className="mr-2"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>


                            <Button
                                onClick={handleSubmit}
                                isLoading={isLoading}
                            >
                                <i className="fa-regular fa-paper-plane"></i>
                                Update
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
