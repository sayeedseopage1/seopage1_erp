import React, { useState } from "react";
import CKEditorComponent from "../../../ckeditor";
import UploadFilesInLine from "../../../file-upload/UploadFilesInLine";
import Button from "../../components/Button";
import Input from "../../components/form/Input";
import DatePicker from "../comments/DatePicker";
import AssginedToSelection from "./AssignedToSelection";
import PrioritySelection from "./PrioritySelection";
import TaskCategorySelectionBox from "./TaskCategorySelectionBox";

import _ from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import {
    useCheckRestrictedWordsMutation,
    useCreateSubtaskMutation,
    useLazyGetTaskDetailsQuery,
} from "../../../services/api/SingleTaskPageApi";

import { Listbox } from "@headlessui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    setWorkingEnvironmentStatus,
    storeSubTasks,
} from "../../../services/features/subTaskSlice";
import { checkIsURL } from "../../../utils/check-is-url";
import { CompareDate } from "../../../utils/dateController";
import { SingleTask } from "../../../utils/single-task";
import { User } from "../../../utils/user-details";
import { calenderOpen } from "./helper/calender_open";
import TypeOfGraphicsWorkSelection from "../../../projects/components/graphics-design-forms/TypeOfGraphicsWorkSelection";
import TypeOfLogo from "../../../projects/components/graphics-design-forms/TypeOfLogo";
import FileTypesNeeded from "../../../projects/components/graphics-design-forms/FileTypesNeeded";

const fileInputStyle = {
    height: "39px",
    zIndex: '0'
}

const SubTaskForm = ({ close, isDesignerTask }) => {
    const {
        task: taskDetails,
        subTask,
        isWorkingEnvironmentSubmit,
    } = useSelector((s) => s.subTask);
    const dispatch = useDispatch();
    const dayjs = new CompareDate();
    const [showEnvForm, setShowEnvForm] = useState(false);
    //   form data
    const [title, setTitle] = useState("");
    const [milestone, setMilestone] = useState("");
    const [parentTask, setParentTask] = useState("");
    const [startDate, setStateDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [project, setProject] = useState("");
    const [taskCategory, setTaskCategory] = useState("");
    const [assignedTo, setAssignedTo] = useState(null);
    const [taskObserver, setTaskObserver] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("To Do");
    const [priority, setPriority] = useState("Medium");
    const [estimateTimeHour, setEstimateTimeHour] = useState(0);
    const [estimateTimeMin, setEstimateTimeMin] = useState(0);
    const [files, setFiles] = React.useState([]);

    //state for graphic designer start
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
    const [colorSchema, setColorSchema] = React.useState("");
    const [primaryColor, setPrimaryColor] = React.useState("#1D82F5");
    const [primaryColorDescription, setPrimaryColorDescription] =
        React.useState("");
    const [secondaryColors, setSecondaryColors] = React.useState([
        {
            id: "egqsz",
            color: "#1D82F5",
            description: "",
        },
    ]);
    //state for graphic designer end
    const [pageType, setPageType] = React.useState("");
    const [pageTypeOthers, setPageTypeOthers] = React.useState("");
    const [pageName, setPageName] = React.useState("");
    const [pageURL, setPageURL] = React.useState("");
    const [numberOfPage, setNumberOfPage] = React.useState(0);
    const [existingDesignLink, setExistingDesignLink] = React.useState("");
    const [pageTypePriority, setPageTypePriority] = React.useState("");
    const [pageTypeName, setPageTypeName] = React.useState("");

    const [err, setErr] = useState(null);

    const task = new SingleTask(taskDetails);
    const auth = new User(window?.Laravel?.user);

    const params = useParams();
    const [createSubtask, { isLoading, error }] = useCreateSubtaskMutation();
    // const {  } = useGetTaskDetailsQuery(`/${task?.id}/json?mode=estimation_time`);
    const [getTaskDetails, { data: estimation, isFetching }] =
        useLazyGetTaskDetailsQuery();

    const [showForm, setShowForm] = React.useState(false);

    const required_error = error?.status === 422 ? error?.data : null;
    const [containViolation, setContainViolation] = React.useState(false);

    const navigate = useNavigate();

    const [checkRestrictedWords, { isLoading: checking }] =
        useCheckRestrictedWordsMutation();

    // handle change
    React.useEffect(() => {
        setMilestone(task?.milestoneTitle);
        setProject(task?.projectName);
        setParentTask(task?.title);
    }, [task]);

    React.useEffect(() => {
        getTaskDetails(`/${task?.id}/json?mode=estimation_time`).unwrap();
    }, []);

    // handle onchange
    const handleChange = (e, setState) => {
        e.preventDefault();
        let value = e.target.value;
        setState(value);
    };

    // if task for designer select category default
    React.useEffect(() => {
        isDesignerTask &&
            setTaskCategory({
                id: task?.category?.id,
                category_name: task?.category?.name,
                added_by: task?.category?.addedBy,
            });
    }, [isDesignerTask]);

    const isValid = () => {
        let count = 0;
        const error = new Object();

        if (!title) {
            error.title = "The title field is required";
            count++;
        }

        if (!startDate) {
            error.startDate = "You have to select a start date";
            count++;
        }

        if (!dueDate) {
            error.dueDate = "You have to select a due date";
            count++;
        }

        if (!taskCategory) {
            error.taskCategory = "You have to select task category";
            count++;
        }

        if (!assignedTo) {
            error.assignedTo = "You have to select an user";
            count++;
        }

        if (assignedTo && assignedTo?.isOverloaded) {
            toast.warn(
                `You cannot assign this task to ${assignedTo?.name}  because ${assignedTo?.gender === "male" ? "He " : "She "
                } has more than 04 Submittable tasks.`
            );
            count++;
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

        if (!pageType) {
            error.taskType = "You have to Select task type";
            count++;
        } else {
            if (_.toLower(pageType) === _.toLower("New Page Design")) {
                if (!pageTypePriority) {
                    error.pageTypePriority = "You have to Select page type";
                    count++;
                }

                if (!pageName) {
                    error.pageName = "You have to Select page name";
                    count++;
                }

                // if (!pageURL) {
                //     error.pageUrl = "You have to provide page URL";
                //     count++;
                // } else if (!checkIsURL(pageURL)) {
                //     error.pageUrl = "You have to provide a valid page URL";
                //     toast.warn("You have to provide a valid page URL");
                //     count++;
                // }
            }

            if (_.toLower(pageType) === _.toLower("Others")) {
                if (!pageTypeOthers) {
                    error.pageTypeOthers = "You have to select an option";
                    count++;
                }

                if (!pageName) {
                    error.pageName = "You have to Select page name";
                    count++;
                }

                if (!pageURL) {
                    error.pageUrl = "You have to provide page URL";
                    count++;
                } else if (!checkIsURL(pageURL)) {
                    error.pageUrl = "You have to provide a valid page URL";
                    toast.warn("You have to provide a valid page URL");
                    count++;
                }
            }

            if (_.toLower(pageType) === _.toLower("Cloning Existing Design")) {
                if (!pageTypeName) {
                    error.pageTypeName = "You have to select an option";
                    count++;
                }

                if (!numberOfPage) {
                    error.numberOfPage = "The minimum required number is 1";
                    count++;
                }

                if (!existingDesignLink) {
                    error.existingDesignLink =
                        "You have to provide Exiting Design Link";
                    count++;
                } else if (!checkIsURL(existingDesignLink)) {
                    error.existingDesignLink =
                        "You have to provide a valid Exiting Design Link";
                    toast.warn(
                        "You have to provide a valid Exiting Design Link"
                    );
                    count++;
                }
            }

            if (!description) {
                error.description = "The description field is required";
                count++;
            }
        }

        setErr(error);
        return !count;
    };

    // TODO: hide fields conditionally by this condition 
    console.log("task", task?.category?.name)

    // handle submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const _startDate = dayjs.dayjs(startDate).format("DD-MM-YYYY");
        const _dueDate = dayjs.dayjs(dueDate).format("DD-MM-YYYY");

        const fd = new FormData();
        fd.append("milestone_id", task?.milestoneID);
        fd.append("task_id", task?.id);
        fd.append("title", title);
        fd.append("start_date", _startDate);
        fd.append("due_date", _dueDate);
        fd.append("project_id", task?.projectId);
        fd.append("task_category_id", taskCategory?.id);
        fd.append("user_id", assignedTo?.id);
        fd.append("description", description);
        fd.append("board_column_id", task?.boardColumn?.id);
        fd.append("priority", _.lowerCase(priority));
        fd.append("estimate_hours", estimateTimeHour);
        fd.append("estimate_minutes", estimateTimeMin);
        fd.append("image_url", null);
        fd.append("subTaskID", null);
        fd.append("addedFiles", null);
        fd.append("task_type", pageType ?? null);
        fd.append("page_type", pageTypePriority);
        fd.append("page_name", pageName);
        fd.append("page_url", pageURL);
        fd.append("task_type_other", pageTypeOthers);
        fd.append("page_type_name", pageTypeName);
        fd.append("number_of_pages", numberOfPage);
        fd.append("existing_design_link", existingDesignLink);
        fd.append(
            "_token",
            document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content")
        );
        Array.from(files).forEach((file) => {
            fd.append("file[]", file);
        });

        const submit = async () => {
            if (isValid()) {
                await createSubtask(fd)
                    .unwrap()
                    .then((res) => {
                        if (res?.status === "success") {
                            let _subtask = [
                                ...subTask,
                                {
                                    id: res?.sub_task?.id,
                                    title: res?.sub_task?.title,
                                },
                            ];

                            dispatch(storeSubTasks(_subtask));
                            close();

                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: res.message,
                                showConfirmButton: false,
                                timer: 2500,
                            });
                        }
                    })
                    .catch((err) => {
                        if (err?.status === 422) {
                            toast.warn(
                                `Estimate hours cannot exceed from project allocation hours !`
                            );
                        }
                    });
            }
        };

        const primaryPageConfirmation = () => {
            if (
                !isDesignerTask &&
                pageTypePriority === "Primary Page Development"
            ) {
                Swal.fire({
                    icon: "info",
                    html: `<p>All the pages that are money pages (that can generate money/leads) and all the pages that require significant work to develop should go under main page development. Some examples of these pages are homepage (most important page of a website and generate most of the leads), service page (most important page after homepage), Property listing page (most important page for a real estate website) etc.</p> <p>A website usually has not more than 3 primary pages. In a few weeks, we will setup a point system for the developers where developers will get more points for the primary pages when compared to the secondary pages. And when you are declaring a page as a primary page, it will require authorization from the management to ensure its accuracy. Do you still want to declare this as a primary page? </p>`,
                    showCloseButton: true,
                    showCancelButton: true,
                }).then((res) => {
                    if (res.isConfirmed) {
                        submit();
                    }
                });
            } else {
                Swal.fire({
                    icon: "info",
                    html: `<p>Primary Page Design: All the pages on the website that are money pages (can generate money or revenue), require significant effort to be designed and clients usually remain very picky about them and don’t want to compromise anything in those pages are what we are calling primary pages. You can consider a page as a “Primary Page Design” based on the following criteria:</p> <p>* The homepage should consistently be counted as the primary page. In the absence of specific requirements regarding the homepage, the initial page that the designer is tasked with designing will be considered the "Primary Page Design". This applies to other significant money pages such as the product page, services page, collection page, etc.</p> <p> Rough numbers of the primary pages on a website: Not more than 3 (Except for very rare cases)</p> <p> When you will select primary page, it will be sent to management for authorization. </p>`,
                    showCloseButton: true,
                    showCancelButton: true,
                }).then((res) => {
                    if (res.isConfirmed) {
                        submit();
                    }
                });
            }
        };

        // check violation words
        const response = await checkRestrictedWords(task?.projectId).unwrap();

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
                        primaryPageConfirmation();
                    }
                });
            };

            // check title
            if (checkViolationWord(title)) {
                setContainViolation(true);
                error.violationWord = `Some violation word found. You do not use <span class="badge badge-danger">revision</span> <span class="badge badge-danger">Fix</span> <span class="badge badge-danger">Modify</span> <span class="badge badge-danger">Fixing</span> <span class="badge badge-danger">Revise</span> <span class="badge badge-danger">Edit</span>`;

                alert();
            } else if (checkViolationWord(description)) {
                // check description
                setContainViolation(true);
                error.violationWord = `Some violation word found. You do not use <span class="badge badge-danger">revision</span> <span class="badge badge-danger">Fix</span> <span class="badge badge-danger">Modify</span> <span class="badge badge-danger">Fixing</span> <span class="badge badge-danger">Revise</span> <span class="badge badge-danger">Edit</span>`;
                alert();
            } else {
                primaryPageConfirmation();
            }

            setErr((prev) => ({ ...prev, ...error }));
        } else {
            primaryPageConfirmation();
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

    useEffect(() => {
        const showEnv =
            task?.workingEnvironment === 0
                ? _.size(task?.subtask) === 0
                    ? true
                    : false
                : false;
        if (auth.getRoleId() === 6) {
            if (isWorkingEnvironmentSubmit === undefined) {
                dispatch(setWorkingEnvironmentStatus(showEnv));
            }
        }
    }, []);

    // page type change clear related entries
    useEffect(() => {
        setPageTypeOthers("");
        setPageName("");
        setPageURL("");
        setNumberOfPage(0);
        setExistingDesignLink("");
        setPageTypePriority("");
        setPageTypeName("");
    }, [pageType]);

    // add secondary color
    const addSecondaryColor = (e) => {
        e.stopPropagation();
        setSecondaryColors((prev) => [
            ...prev,
            {
                id: (Math.random() + 1).toString(36).substring(7),
                color: "#1D82F5",
                description: "",
            },
        ]);
    };

    // handle secondary color change
    const handleSecondaryColorChange = (e, id) => {
        let newColors = _.map(secondaryColors, (item) =>
            item.id === id
                ? { id, color: e.target.value, description: "" }
                : item
        );
        setSecondaryColors([...newColors]);
    };

    // handle secondary color description change
    const handleSecondaryColorDescriptionChange = (e, editor, id) => {
        let text = editor.getData();
        let newColors = _.map(secondaryColors, (item) =>
            item.id === id ? { ...item, description: text } : item
        );
        setSecondaryColors([...newColors]);
    };

    // remove secondary color
    const removeSecondaryColor = (e, id) => {
        let newColors = _.filter(secondaryColors, (item) => item.id !== id);
        setSecondaryColors([...newColors]);
    };

    // color schema
    const onChange = (e, setState) => {
        setState(e.target.value);
    };

    let count = 0;
    const cErr = new Object();

    if (colorSchema === "") {
        cErr.colorSchema = "You Need to Select An Option";
        count++;
    }
    if (colorSchema === "yes") {
        if (primaryColorDescription === "") {
            cErr.pColorDesc = "You Have to Provide This Field!";
            count++;
        }

        _.map(secondaryColors, (item) => {
            if (item.description === "") {
                cErr.sDescription = "You Have to Provide This Field!";
                count++;
            }
        });
    }

    return (
        <form onSubmit={handleSubmit}>
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
                        error={err?.title || required_error?.title?.[0]}
                        onChange={(e) => handleChange(e, setTitle)}
                    />
                </div>

                <div className="col-12 col-md-6">
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
                            defaultValue={milestone}
                        />
                    </div>
                </div>

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
                            defaultValue={parentTask}
                        />
                    </div>
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
                                minDate={
                                    dayjs
                                        .dayjs(task?.startDate)
                                        .isBefore(dayjs.dayjs())
                                        ? dayjs.dayjs().toDate()
                                        : dayjs.dayjs(task?.startDate).toDate()
                                }
                                maxDate={
                                    dueDate ||
                                    dayjs.dayjs(task?.dueDate).toDate()
                                }
                                date={startDate}
                                setDate={setStateDate}
                                onCalendarOpen={() => {
                                    const max =
                                        dueDate ||
                                        dayjs.dayjs(task?.dueDate).toDate();

                                    calenderOpen(max);
                                }}
                            />
                        </div>
                        {required_error?.start_date?.[0] && (
                            <div style={{ color: "red" }}>
                                {required_error?.start_date?.[0]}
                            </div>
                        )}

                        {err?.startDate && (
                            <div style={{ color: "red" }}>{err?.startDate}</div>
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
                                    dayjs
                                        .dayjs(startDate)
                                        .isAfter(dayjs.dayjs(), "day")
                                        ? startDate
                                        : dayjs.dayjs().toDate()
                                }
                                maxDate={dayjs.dayjs(task?.dueDate).toDate()}
                                date={dueDate}
                                setDate={setDueDate}
                                onCalendarOpen={() => {
                                    const max = dayjs
                                        .dayjs(task?.dueDate)
                                        .toDate();
                                    calenderOpen(max);
                                }}
                            />
                        </div>
                        {required_error?.due_date?.[0] && (
                            <div style={{ color: "red" }}>
                                {required_error?.due_date?.[0]}
                            </div>
                        )}

                        {err?.dueDate && (
                            <div style={{ color: "red" }}>{err?.dueDate}</div>
                        )}
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <TaskCategorySelectionBox
                        selected={taskCategory}
                        onSelect={setTaskCategory}
                        isDesignerTask={isDesignerTask}
                    />

                    {err?.taskCategory && (
                        <div style={{ color: "red" }}>{err?.taskCategory}</div>
                    )}
                </div>

                {
                    // lead designer to graphic designer 
                    (auth?.isHasRolePermission(13) && task?.category?.name === "Graphic Design") && <>
                        {/* Type Of Graphics Work */}
                        <div className="col-12 col-md-6">
                            <TypeOfGraphicsWorkSelection
                                selected={typeOfGraphicsCategory}
                                onSelect={setTypeOfGraphicsCategory}
                            // isDesignerTask={isDesignerTask}
                            />
                            {err?.typeOfGraphicsCategory && (
                                <div style={{ color: "red" }}>
                                    {err?.typeOfGraphicsCategory}
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
                                    // isDesignerTask={isDesignerTask}
                                    />
                                    {err?.typeOfLogo && (
                                        <div style={{ color: "red" }}>
                                            {err?.typeOfLogo}
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
                                        error={err?.brandName}
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
                                        error={err?.numOfVersions}
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
                                        {err?.fileTypesNeeded && (
                                            <div style={{ color: "red" }}>
                                                {err?.fileTypesNeeded}
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
                                        error={err?.textForDesign}
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
                                            <input type="file" className="custom-file-input" id="imageForDesigner" required={true} error={err?.imageForDesigner} onChange={(e) =>
                                                handleChange(e, setImageForDesigner)
                                            } />
                                            <label className="custom-file-label" htmlFor="imageForDesigner">Choose file</label>
                                        </div>
                                        {err?.imageForDesigner && (
                                            <div style={{ color: "red" }}>
                                                {err?.imageForDesigner}
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
                                        <div className="custom-file z-n1" style={fileInputStyle}>
                                            <input type="file" className="custom-file-input" id="imgOrVidForWork" required={true} error={err?.imgOrVidForWork} onChange={(e) =>
                                                handleChange(e, setImgOrVidForWork)
                                            } multiple />
                                            <label className="custom-file-label" htmlFor="imgOrVidForWork">Choose file</label>
                                        </div>
                                        {err?.imgOrVidForWork && (
                                            <div style={{ color: "red" }}>
                                                {err?.imgOrVidForWork}
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
                                error={err?.reference}
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
                                error={err?.fontName}
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
                                    <input type="file" className="custom-file-input" id="brandGuideline" error={err?.brandGuideline} onChange={(e) =>
                                        handleChange(e, setBrandGuideline)
                                    } multiple />
                                    <label className="custom-file-label" htmlFor="brandGuideline">Choose file</label>
                                </div>
                            </div>
                        </div>

                        {/* color schema */}
                        <div className="col-12">
                            <div className="form-group">
                                <label
                                    htmlFor={'brandGuideline'}
                                    className={`f-14 text-dark-gray mb-2`}
                                    data-label="true"
                                >
                                    Color Schema
                                </label>
                                <React.Fragment>
                                    {/* primary color */}
                                    <div
                                        className="mt-3 mx-3 p-3"
                                        style={{
                                            background: "#F9F9F9",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        <div className="form-group">
                                            <label
                                                htmlFor=""
                                                className="mb-2"
                                                style={{
                                                    fontWeight: 600,
                                                    color: "#777",
                                                }}
                                            >
                                                1. Primary Color{" "}
                                                <sup>*</sup>{" "}
                                            </label>

                                            <div className="form-group px-2">
                                                <label htmlFor="">
                                                    Choose Color:
                                                </label>
                                                <div className="input-group mb-3 col-12 col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Recipient's username"
                                                        aria-label="Recipient's username"
                                                        aria-describedby="basic-addon2"
                                                        value={
                                                            primaryColor
                                                        }
                                                        onChange={(e) =>
                                                            onChange(
                                                                e,
                                                                setPrimaryColor
                                                            )
                                                        }
                                                    />
                                                    <div className="input-group-append">
                                                        <span
                                                            className="input-group-text px-1 border-0"
                                                            id="basic-addon2"
                                                        >
                                                            <input
                                                                type="color"
                                                                value={
                                                                    primaryColor
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) =>
                                                                    onChange(
                                                                        e,
                                                                        setPrimaryColor
                                                                    )
                                                                }
                                                                style={{
                                                                    width: "32px",
                                                                    border: "none",
                                                                }}
                                                            />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group pl-2">
                                                <label htmlFor="">
                                                    Where Should
                                                    Designer Use this
                                                    Color <sup>*</sup>
                                                </label>
                                                <div className="ck-editor-holder">
                                                    <CKEditorComponent
                                                        onChange={(
                                                            e,
                                                            editor
                                                        ) =>
                                                            setPrimaryColorDescription(
                                                                editor.getData()
                                                            )
                                                        }
                                                    />
                                                </div>

                                                {error?.pColorDesc && (
                                                    <div
                                                        className=""
                                                        style={{
                                                            color: "red",
                                                        }}
                                                    >
                                                        {" "}
                                                        {
                                                            error?.pColorDesc
                                                        }{" "}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* secondary color */}
                                    <div
                                        className="mt-3 mx-3 p-3"
                                        style={{
                                            background: "#F9F9F9",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        <div className="form-group">
                                            <label
                                                htmlFor=""
                                                className="mb-2"
                                                style={{
                                                    fontWeight: 600,
                                                    color: "#777",
                                                }}
                                            >
                                                2. Secondary Color{" "}
                                                <sup>*</sup>{" "}
                                            </label>

                                            {_.map(
                                                secondaryColors,
                                                (item, index) => (
                                                    <div
                                                        className="p-3"
                                                        key={item.id}
                                                    >
                                                        <div className="form-group">
                                                            <label htmlFor="">
                                                                <b>
                                                                    {index +
                                                                        1}
                                                                    .
                                                                </b>{" "}
                                                                Choose
                                                                Color:
                                                            </label>
                                                            <div className="d-flex align-items-center">
                                                                <div className="input-group mb-3 pl-3 col-10 col-md-6">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Recipient's username"
                                                                        aria-label="Recipient's username"
                                                                        aria-describedby="basic-addon2"
                                                                        value={
                                                                            item.color
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleSecondaryColorChange(
                                                                                e,
                                                                                item.id
                                                                            )
                                                                        }
                                                                    />

                                                                    <div className="input-group-append">
                                                                        <span
                                                                            className="input-group-text px-1 border-0"
                                                                            id="basic-addon2"
                                                                        >
                                                                            <input
                                                                                type="color"
                                                                                value={
                                                                                    item.color
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleSecondaryColorChange(
                                                                                        e,
                                                                                        item.id
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    width: "32px",
                                                                                    border: "none",
                                                                                }}
                                                                            />
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {_.size(
                                                                    secondaryColors
                                                                ) >
                                                                    1 && (
                                                                        <button
                                                                            aria-label="remove"
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                removeSecondaryColor(
                                                                                    e,
                                                                                    item.id
                                                                                )
                                                                            }
                                                                            className="py-2 px-3 ml-auto rounded color_remove_btn"
                                                                        >
                                                                            <i className="fa-solid fa-trash-can" />
                                                                        </button>
                                                                    )}
                                                            </div>
                                                        </div>

                                                        <div className="form-group pl-3">
                                                            <label htmlFor="">
                                                                Where
                                                                Should
                                                                Designer
                                                                Use this
                                                                Color{" "}
                                                                <sup>
                                                                    *
                                                                </sup>
                                                            </label>
                                                            <div className="ck-editor-holder">
                                                                <CKEditorComponent
                                                                    onChange={(
                                                                        e,
                                                                        editor
                                                                    ) =>
                                                                        handleSecondaryColorDescriptionChange(
                                                                            e,
                                                                            editor,
                                                                            item.id
                                                                        )
                                                                    }
                                                                />
                                                            </div>

                                                            {error?.sDescription && (
                                                                <div
                                                                    className=""
                                                                    style={{
                                                                        color: "red",
                                                                    }}
                                                                >
                                                                    {" "}
                                                                    {
                                                                        error?.sDescription
                                                                    }{" "}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )}

                                            <div className="d-flex align-items-center px-3">
                                                <button
                                                    type="button"
                                                    onClick={
                                                        addSecondaryColor
                                                    }
                                                    className="bg-transparent text-primary hover-underline ml-auto"
                                                >
                                                    + Another Color
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>

                            </div>
                        </div>
                        {/* end color schema */}
                    </>
                }



                <div className="col-12 col-md-6">
                    <AssginedToSelection
                        selected={assignedTo}
                        onSelect={setAssignedTo}
                        taskCategory={taskCategory}
                    />

                    {err?.assignedTo && (
                        <div style={{ color: "red" }}>{err?.assignedTo}</div>
                    )}

                    {assignedTo?.isOverloaded && (
                        <div style={{ color: "red" }}>
                            {`You cannot assign this task to ${assignedTo?.name
                                }  because ${assignedTo?.gender === "male" ? "He " : "She "
                                } has more than 4 Submittable tasks.`}
                        </div>
                    )}
                </div>
                {/*
        <div className="col-6">
            <TaskObserverSelection />
        </div> */}

                {/* <div className="col-12 col-md-6">
                    <StatusSelection />
                </div> */}

                {/* Page Type  */}

                {/* {console.log("roleId", auth?.isHasRolePermission(13))} */}

                {auth?.isHasRolePermission(13) ? (
                    <div className="col-12 col-md-6">
                        <Listbox value={pageType} onChange={setPageType}>
                            <div className="form-group position-relative my-3">
                                <label htmlFor="">
                                    {" "}
                                    Task Type <sup>*</sup>{" "}
                                </label>
                                <Listbox.Button className="sp1-selection-display-button form-control height-35 f-14 sp1-selection-display bg-white w-100">
                                    <span className="singleline-ellipsis pr-3">
                                        {pageType || "Select task type"}
                                    </span>

                                    <div className="__icon">
                                        <i className="fa-solid fa-sort"></i>
                                    </div>
                                </Listbox.Button>
                                <Listbox.Options className="sp1-select-options">
                                    {[
                                        "New Page Design",
                                        "Cloning Existing Design",
                                        // "Others",
                                    ]?.map((s, i) => (
                                        <Listbox.Option
                                            key={i}
                                            className={({ active }) =>
                                                `sp1-select-option ${active ? "active" : ""
                                                }`
                                            }
                                            value={s}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    {s}

                                                    {selected ? (
                                                        <i className="fa-solid fa-check ml-2" />
                                                    ) : (
                                                        ""
                                                    )}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </div>
                        </Listbox>

                        {required_error?.pageType?.[0] && (
                            <div style={{ color: "red" }}>
                                {required_error?.pageType?.[0]}
                            </div>
                        )}

                        {err?.taskType && (
                            <div style={{ color: "red" }}>{err?.taskType}</div>
                        )}
                    </div>
                ) : (
                    <div className="col-12 col-md-6">
                        <Listbox value={pageType} onChange={setPageType}>
                            <div className="form-group position-relative my-3">
                                <label htmlFor="">
                                    {" "}
                                    Task Type <sup>*</sup>{" "}
                                </label>
                                <Listbox.Button className="sp1-selection-display-button form-control height-35 f-14 sp1-selection-display bg-white w-100">
                                    <span className="singleline-ellipsis pr-3">
                                        {pageType || "Select task type"}
                                    </span>

                                    <div className="__icon">
                                        <i className="fa-solid fa-sort"></i>
                                    </div>
                                </Listbox.Button>
                                <Listbox.Options className="sp1-select-options">
                                    {[
                                        "New Page Design",
                                        "Cloning Existing Design",
                                        "Others",
                                    ]?.map((s, i) => (
                                        <Listbox.Option
                                            key={i}
                                            className={({ active }) =>
                                                `sp1-select-option ${active ? "active" : ""
                                                }`
                                            }
                                            value={s}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    {s}

                                                    {selected ? (
                                                        <i className="fa-solid fa-check ml-2" />
                                                    ) : (
                                                        ""
                                                    )}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </div>
                        </Listbox>

                        {required_error?.pageType?.[0] && (
                            <div style={{ color: "red" }}>
                                {required_error?.pageType?.[0]}
                            </div>
                        )}

                        {err?.taskType && (
                            <div style={{ color: "red" }}>{err?.taskType}</div>
                        )}
                    </div>
                )}

                {pageType === "New Page Design" ? (
                    <div className="col-12 col-md-6">
                        <Listbox
                            value={pageTypePriority}
                            onChange={setPageTypePriority}
                        >
                            <div className="form-group position-relative my-3">
                                <label htmlFor="">
                                    Page Type <sup>*</sup>{" "}
                                </label>
                                <Listbox.Button className=" sp1-selection-display-button form-control height-35 f-14 sp1-selection-display bg-white w-100">
                                    <span className="singleline-ellipsis pr-3">
                                        {pageTypePriority || "Select page type"}
                                    </span>

                                    <div className="__icon">
                                        <i className="fa-solid fa-sort"></i>
                                    </div>
                                </Listbox.Button>
                                <Listbox.Options className="sp1-select-options">
                                    {(isDesignerTask
                                        ? [
                                            "Primary Page Design",
                                            "Secondary Page Design",
                                        ]
                                        : [
                                            "Primary Page Development",
                                            "Secondary Page Development",
                                        ]
                                    )?.map((s, i) => (
                                        <Listbox.Option
                                            key={i}
                                            className={({ active }) =>
                                                `sp1-select-option ${active ? "active" : ""
                                                }`
                                            }
                                            value={s}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    {s}

                                                    {selected ? (
                                                        <i className="fa-solid fa-check ml-2" />
                                                    ) : (
                                                        ""
                                                    )}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </div>
                        </Listbox>

                        {err?.pageTypePriority && (
                            <div style={{ color: "red" }}>
                                {err?.pageTypePriority}
                            </div>
                        )}
                    </div>
                ) : null}

                {/* Others */}
                {pageType === "Others" ? (
                    <div className="col-12 col-md-6">
                        <Listbox
                            value={pageTypeOthers}
                            onChange={setPageTypeOthers}
                        >
                            <div className="form-group position-relative my-3">
                                <label htmlFor="">
                                    {" "}
                                    Others <sup>*</sup>{" "}
                                </label>
                                <Listbox.Button className=" sp1-selection-display-button form-control height-35 f-14 sp1-selection-display bg-white w-100">
                                    <span className="singleline-ellipsis pr-3">
                                        {pageTypeOthers ?? "--"}
                                    </span>

                                    <div className="__icon">
                                        <i className="fa-solid fa-sort"></i>
                                    </div>
                                </Listbox.Button>
                                <Listbox.Options className="sp1-select-options">
                                    {[
                                        "Page Design Change",
                                        "Speed Optimization",
                                        "Fixing Issues/Bugs",
                                        "Responsiveness Issue Fixing/Making Something Responsive",
                                    ]?.map((s, i) => (
                                        <Listbox.Option
                                            key={i}
                                            className={({ active }) =>
                                                `sp1-select-option ${active ? "active" : ""
                                                }`
                                            }
                                            value={s}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    {s}

                                                    {selected ? (
                                                        <i className="fa-solid fa-check ml-2" />
                                                    ) : (
                                                        ""
                                                    )}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </div>
                        </Listbox>

                        {err?.pageTypeOthers && (
                            <div style={{ color: "red" }}>
                                {err?.pageTypeOthers}
                            </div>
                        )}
                    </div>
                ) : null}

                {pageType ? (
                    <React.Fragment>
                        {pageType === "Cloning Existing Design" ? (
                            <>
                                <div className="col-12 col-md-6">
                                    <Listbox
                                        value={pageTypeName}
                                        onChange={setPageTypeName}
                                    >
                                        <div className="form-group position-relative my-3">
                                            <label htmlFor="">
                                                Page Type Name <sup>*</sup>
                                            </label>
                                            <Listbox.Button className=" sp1-selection-display-button form-control height-35 f-14 sp1-selection-display bg-white w-100">
                                                <span className="singleline-ellipsis pr-3">
                                                    {pageTypeName || "Select page type name"}
                                                </span>

                                                <div className="__icon">
                                                    <i className="fa-solid fa-sort"></i>
                                                </div>
                                            </Listbox.Button>
                                            <Listbox.Options className="sp1-select-options">
                                                {(isDesignerTask
                                                    ? [
                                                        "Primary Page Design",
                                                        "Secondary Page Design",
                                                    ]
                                                    : [
                                                        "Primary Page Development",
                                                        "Secondary Page Development",
                                                    ]
                                                )?.map((s, i) => (
                                                    <Listbox.Option
                                                        key={i}
                                                        className={({
                                                            active,
                                                        }) =>
                                                            `sp1-select-option ${active
                                                                ? "active"
                                                                : ""
                                                            }`
                                                        }
                                                        value={s}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                {s}

                                                                {selected ? (
                                                                    <i className="fa-solid fa-check ml-2" />
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </div>
                                    </Listbox>
                                    {err?.pageTypeName ||
                                        required_error?.page_type?.[0]}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col-12 col-md-6">
                                    <Input
                                        id="page_name"
                                        label="Page Name"
                                        type="text"
                                        placeholder="Enter page name"
                                        name="page name"
                                        required={true}
                                        value={pageName}
                                        error={err?.pageName}
                                        onChange={(e) =>
                                            handleChange(e, setPageName)
                                        }
                                    />
                                </div>

                                {
                                    task?.category?.name !== "UI/UIX Design" && <div className="col-12 col-md-6">
                                        <Input
                                            id="page_url"
                                            label="Page URL"
                                            type="text"
                                            placeholder="Enter page url"
                                            name="page url"
                                            required={true}
                                            value={pageURL}
                                            error={
                                                err?.pageUrl ||
                                                required_error?.page_url?.[0]
                                            }
                                            onChange={(e) =>
                                                handleChange(e, setPageURL)
                                            }
                                        />
                                    </div>
                                }


                            </>
                        )}

                        {pageType === "Cloning Existing Design" ? (
                            <>
                                <div className="col-12 col-md-6">
                                    <Input
                                        id="number_of_pages"
                                        label="Number of Pages"
                                        type="number"
                                        placeholder="--"
                                        name="number_of_pages"
                                        required={true}
                                        value={numberOfPage}
                                        error={err?.numberOfPage}
                                        onChange={(e) =>
                                            handleChange(e, setNumberOfPage)
                                        }
                                    />
                                </div>

                                <div className="col-12 col-md-6">
                                    <Input
                                        id="exiting_project_url"
                                        label="Existing Design Link"
                                        type="Link"
                                        placeholder="--"
                                        name="exiting_project_url"
                                        required={true}
                                        value={existingDesignLink}
                                        error={err?.existingDesignLink}
                                        onChange={(e) =>
                                            handleChange(
                                                e,
                                                setExistingDesignLink
                                            )
                                        }
                                    />
                                </div>
                            </>
                        ) : null}
                    </React.Fragment>
                ) : null}
                {/*  */}

                <div className="col-12 col-md-6">
                    <PrioritySelection
                        selected={priority}
                        setSelected={setPriority}
                    />
                </div>

                <div className="col-12 col-md-6">
                    <div className="form-group my-3">
                        <label htmlFor="" className="f-14 text-dark-gray">
                            Set Estimate Time <sup className="f-14"> * </sup>
                        </label>
                        <div className="d-flex align-items-center">
                            <input
                                type="number"
                                className="form-control height-35 f-14 mr-2"
                                value={estimateTimeHour}
                                onWheel={(e) => e.currentTarget.blur()}
                                onChange={(e) =>
                                    handleChange(e, setEstimateTimeHour)
                                }
                            />{" "}
                            hrs
                            <input
                                type="number"
                                className="form-control height-35 f-14 mr-2 ml-2"
                                value={estimateTimeMin}
                                onWheel={(e) => e.currentTarget.blur()}
                                onChange={(e) =>
                                    handleChange(e, setEstimateTimeMin)
                                }
                            />{" "}
                            min
                        </div>

                        <div style={{ color: "red" }}>
                            {estimateError(required_error)}
                        </div>

                        <div style={{ color: "#F73B12" }}>
                            Estimation time can't exceed{" "}
                            {estimation?.hours_left} hours{" "}
                            {estimation?.minutes_left} minutes
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="form-group my-3">
                        <label htmlFor=""> Description </label>
                        <div
                            className="sp1_st_write_comment_editor"
                            style={{ minHeight: "100px" }}
                        >
                            <CKEditorComponent onChange={handleEditorChange} />
                        </div>

                        {required_error?.description?.[0] && (
                            <span className="text-danger">
                                <small>
                                    {" "}
                                    {required_error?.description?.[0]}{" "}
                                </small>
                            </span>
                        )}
                        {err?.description && (
                            <span className="text-danger">
                                <small> {err?.description} </small>
                            </span>
                        )}
                    </div>
                </div>

                <div className="col-12">
                    <UploadFilesInLine files={files} setFiles={setFiles} />
                </div>

                {/* {err?.violationWord ? <div className="alert alert-danger mt-2 w-100 text-center" dangerouslySetInnerHTML={{__html: err?.violationWord}} />: null} */}

                <div className="col-12 mt-3 pb-3">
                    <div className="d-flex align-items-center justify-content-end">
                        <Button
                            variant="secondary"
                            className="mr-2"
                            onClick={close}
                        >
                            Cancel
                        </Button>

                        {!isLoading && !checking ? (
                            <Button type="submit">
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
        </form>
    );
};

export default SubTaskForm;
