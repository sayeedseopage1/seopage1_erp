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
    useGetTypesOfGraphicWorksQuery,
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
import { ColorItem } from "../../components/PMGuideline";
import FileUploader from "../../../file-upload/FileUploader";
import FileUploadWithInput from "../../../projects/components/ui/FileUploadWithInput";
import CustomFileUpload from "../../../projects/components/ui/CustomFileUpload";
import FileExtensionMultiSelect from "../../../projects/components/graphics-design-forms/FileExtensionMultiSelect";

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


    // graphic task details
    const graphicWorkDetails = new Object(taskDetails?.graphic_work_detail);

    let defaultSecondaryColors;
    let defaultFileTypesNeeded;
    let defaultFileExtension;
    // files
    let defaultTextForDesign;
    let defaultImageForDesigner;
    let defaultImgOrVidForWork;
    let defaultBrandGuidelineFiles;
    let defaultRefFiles;
    if (graphicWorkDetails?.secondary_colors || graphicWorkDetails?.file_types_needed || graphicWorkDetails?.file_extensions || graphicWorkDetails?.graphic_task_files) {
        defaultSecondaryColors = JSON.parse(graphicWorkDetails?.secondary_colors)
        defaultFileTypesNeeded = JSON.parse(graphicWorkDetails?.file_types_needed)
        defaultFileExtension = JSON.parse(graphicWorkDetails?.file_extensions)
        defaultTextForDesign = graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 1)
        defaultImageForDesigner = graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 2)
        defaultImgOrVidForWork = graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 3)
        defaultBrandGuidelineFiles = graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 4)
        defaultRefFiles = graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 5)
    }

    // const [defaultBrandGuidelineFiles, setDefaultBrandGuidelineFiles] = useState(graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 4))

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
    const [workableUrl, setWorkableUrl] = useState(graphicWorkDetails?.workable_url);

    const [typeOfGraphicsCategory, setTypeOfGraphicsCategory] = useState("");
    const [typeOfLogo, setTypeOfLogo] = useState("");
    const [brandName, setBrandName] = useState("");
    const [numOfVersions, setNumOfVersions] = useState(null);
    const [referenceList, setReferenceList] = useState([{ reference: "" }]);
    const [referenceFile, setReferenceFile] = useState(defaultRefFiles);
    const [fileTypesNeeded, setFileTypesNeeded] = React.useState(defaultFileTypesNeeded);
    const [textForDesign, setTextForDesign] = useState(defaultTextForDesign);
    const [imageForDesigner, setImageForDesigner] = useState(defaultImageForDesigner);
    const [imgOrVidForWork, setImgOrVidForWork] = useState(defaultImgOrVidForWork);
    const [fontName, setFontName] = useState('');
    const [fontUrl, setFontUrl] = useState('');
    const [brandGuideline, setBrandGuideline] = useState(defaultBrandGuidelineFiles);
    const [illustration, setIllustration] = useState("");
    const [others, setOthers] = useState("");
    const [primaryColor, setPrimaryColor] = React.useState("");
    const [primaryColorDescription, setPrimaryColorDescription] =
        React.useState("");
    const [secondaryColors, setSecondaryColors] = React.useState(defaultSecondaryColors);
    const [fileExtension, setFileExtension] = React.useState(defaultFileExtension);
    //state for graphic designer end

    // state for ui/ux start
    const [cms, setCms] = useState("")
    const [themeName, setThemeName] = useState("")
    const [themeTemplate, setThemeTemplate] = useState("")
    // state for ui/ux end

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
    const { data: graphicOptions } = useGetTypesOfGraphicWorksQuery("")

    // handle change
    useEffect(() => {
        setMilestone(task?.milestoneTitle);
        setProject(task?.projectName);
        setParentTask(task?.title);
    }, [task])

    React.useEffect(() => {
        setBrandName(graphicWorkDetails?.brand_name)
        setNumOfVersions(graphicWorkDetails?.number_of_versions);
        setFontName(graphicWorkDetails?.font_name);
        setFontUrl(graphicWorkDetails?.font_url);
        setPrimaryColor(graphicWorkDetails?.primary_color);
        setPrimaryColorDescription(graphicWorkDetails?.primary_color_description);
        setIllustration(graphicWorkDetails?.design_instruction);
        setOthers(graphicWorkDetails?.design_instruction);
        if (graphicWorkDetails?.reference) {
            setReferenceList(JSON.parse(graphicWorkDetails?.reference));
        }
    }, [graphicWorkDetails]);

    useEffect(() => {
        if (taskDetails) {
            setCms(taskDetails?.cms)
            setThemeName(taskDetails?.theme_name)
            setThemeTemplate(taskDetails?.theme_template_library_link)
        }
    }, [taskDetails])

    React.useEffect(() => {
        getTaskDetails(`/${task?.id}/json?mode=estimation_time`).unwrap();
    }, []);

    // handle onchange
    const handleChange = (e, setState) => {
        e.preventDefault();
        let value = e.target.value;
        setState(value);
    };

    // if graphic task for designer select category default
    React.useEffect(() => {
        isDesignerTask &&
            setTypeOfGraphicsCategory({
                id: graphicWorkDetails?.type_of_graphic_work_id,
                name: graphicOptions?.find((item) => item.id == graphicWorkDetails?.type_of_graphic_work_id)?.name,
            });
    }, [isDesignerTask, graphicWorkDetails?.type_of_graphic_work_id, graphicOptions]);

    React.useEffect(() => {
        isDesignerTask &&
            setTypeOfLogo({
                type_name: graphicWorkDetails?.type_of_logo,
            });
    }, [isDesignerTask, graphicWorkDetails?.type_of_logo]);

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

        if (task?.category?.name !== "Graphic Design") {
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
        }



        setErr(error);
        return !count;
    };

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
        // graphics start
        fd.append("type_of_graphic_work_id", typeOfGraphicsCategory?.id ?? "");
        fd.append("type_of_logo", typeOfLogo?.type_name ?? "");
        fd.append("brand_name", brandName ?? "");
        fd.append("number_of_versions", numOfVersions ?? "");
        fd.append("file_types_needed", JSON.stringify(fileTypesNeeded) ?? "");
        fd.append("design_instruction", (illustration || others) ?? "");
        fd.append("reference", JSON.stringify(referenceList) ?? "");
        fd.append("font_name", fontName ?? "");
        fd.append("font_url", fontUrl ?? "");
        fd.append("primary_color", primaryColor ?? "");
        fd.append("primary_color_description", primaryColorDescription ?? "");
        fd.append("secondary_colors", JSON.stringify(secondaryColors) ?? "");
        fd.append("file_extensions", JSON.stringify(fileExtension ?? ""));
        // graphics end

        // ui/ux start
        fd.append("cms", cms ?? "");
        fd.append("theme_name", themeName ?? "");
        fd.append("theme_template_library_link", themeTemplate ?? "");
        // ui/ux end

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
                            window.location.reload();
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

        if (task?.category?.name === "Graphic Design") {
            submit();
        }



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
                if (pageTypePriority == "Primary Page Design") {
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
                } else {
                    submit();
                }
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
                    `\\\\b(${violationWords.join("|")})\\\\b`,
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
                        if (task?.category?.name !== "Graphic Design") {
                            primaryPageConfirmation();
                        }
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
                if (task?.category?.name !== "Graphic Design") {
                    primaryPageConfirmation();
                }
            }

            setErr((prev) => ({ ...prev, ...error }));
        } else {
            if (task?.category?.name !== "Graphic Design") {
                primaryPageConfirmation();
                console.log("clicked!!!");
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

    // FIXME: taskDetails time and estimation time inconsistent 
    // console.log(estimation)
    // console.log(taskDetails)

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
                                defaultValue={milestone}
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
                    <TaskCategorySelectionBox
                        selected={taskCategory}
                        onSelect={setTaskCategory}
                        isDesignerTask={isDesignerTask}
                    />

                    {err?.taskCategory && (
                        <div style={{ color: "red" }}>{err?.taskCategory}</div>
                    )}
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

                {
                    // lead designer to graphic designer
                    (auth?.isHasRolePermission(13) && task?.category?.name === "Graphic Design") && <>
                        {/* Type Of Graphics Work */}
                        <div className="col-12 col-md-6">
                            <TypeOfGraphicsWorkSelection
                                selected={typeOfGraphicsCategory}
                                onSelect={setTypeOfGraphicsCategory}
                                isDesignerTask={isDesignerTask}
                            />
                            {err?.typeOfGraphicsCategory && (
                                <div style={{ color: "red" }}>
                                    {err?.typeOfGraphicsCategory}
                                </div>
                            )}
                        </div>
                        {/* for logo  */}
                        {
                            typeOfGraphicsCategory?.id === 1 && <>
                                <div className="col-12 col-md-6">
                                    <TypeOfLogo
                                        selected={typeOfLogo}
                                        onSelect={setTypeOfLogo}
                                        isDesignerTask={isDesignerTask}
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
                                        defaultValue={brandName}
                                        error={err?.brandName}
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
                                        error={err?.numOfVersions}
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
                                <div className="col-12 col-md-6">
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
                                <div className="col-12 col-md-6">
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
                                error={err?.fontName}
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
                                        defaultSecondaryColors && (defaultSecondaryColors[0].color || defaultSecondaryColors[0].description) &&
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
                                type="url"
                                name="fileExtension"
                                value={fileExtension?.join(", ")}
                                readOnly={true}
                            />
                        </div>
                    </>
                }

                {
                    // lead designer to ui/ux designer
                    (auth?.isHasRolePermission(13) && task?.category?.name === "UI/UIX Design") && <>
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

                {
                    task?.category?.name !== "Graphic Design" && <>
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

                    </>
                }



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

                        {/* <div style={{ color: "#F73B12" }}>
                            Estimation time can't exceed{" "}
                            {taskDetails?.estimate_hours} hours{" "}
                            {taskDetails?.estimate_minutes} minutes
                        </div> */}
                        <div style={{ color: "#F73B12" }}>
                            Estimation time can't exceed{" "}
                            {estimation?.hours_left} hours{" "}
                            {estimation?.minutes_left} minutes
                        </div>
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