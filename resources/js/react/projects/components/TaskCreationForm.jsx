import { Listbox } from "@headlessui/react";
import _ from "lodash";
import React, { useEffect, useState } from "react";
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
import ThemeTypeSelect from "./ui-ux-design-forms/ThemeTypeSelect";
import { checkIsURL } from "../../utils/check-is-url";

// const fileInputStyle = {
//     height: "39px",
//     zIndex: '0'
// }

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
    //state for graphic designer start
    const [typeOfGraphicsCategory, setTypeOfGraphicsCategory] = useState("");
    const [typeOfLogo, setTypeOfLogo] = useState("");
    const [brandName, setBrandName] = useState("");
    const [numOfVersions, setNumOfVersions] = useState(null);
    const [reference, setReference] = useState("");
    const [fileTypesNeeded, setFileTypesNeeded] = React.useState([]);
    const [textForDesign, setTextForDesign] = useState([]);
    const [imageForDesigner, setImageForDesigner] = useState([]);
    const [imgOrVidForWork, setImgOrVidForWork] = useState([]);
    const [fontName, setFontName] = useState('');
    const [fontUrl, setFontUrl] = useState('');
    const [brandGuideline, setBrandGuideline] = useState([]);
    const [illustration, setIllustration] = useState("");
    const [others, setOthers] = useState("");
    // const [colorSchema, setColorSchema] = React.useState("");
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

    // state for ui/ux start
    const [cms, setCms] = useState("")
    const [themeType, setThemeType] = useState("")
    const [themeName, setThemeName] = useState("")
    const [themeTemplate, setThemeTemplate] = useState("")
    // state for ui/ux end
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

    const taskData = {
        themeType: themeType ?? "",
        cms: cms ?? "",
        theme_name: themeName ?? "",
        theme_template_library_link: themeTemplate ?? "",
    }

    // console.log(taskData)

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
        setTypeOfGraphicsCategory("");
        setTypeOfLogo("");
        setBrandName("");
        setNumOfVersions(null);
        setReference("");
        setFileTypesNeeded([]);
        setTextForDesign([]);
        setImageForDesigner([]);
        setImgOrVidForWork([]);
        setFontName('');
        setFontUrl('');
        setBrandGuideline([]);
        setIllustration("");
        setOthers("");
        setPrimaryColor("#1D82F5");
        setPrimaryColorDescription("");
        setSecondaryColors([
            {
                id: "egqsz",
                color: "#1D82F5",
                description: "",
            },
        ]);
        setCms("");
        setThemeType("");
        setThemeName("");
        setThemeTemplate("");
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

        // TODO: active it LuAsterisk, when new field is added 

        if (taskCategory?.category_name === "Graphic Design") {
            if (!typeOfGraphicsCategory) {
                err.typeOfGraphicsCategory = "You have to select Type of graphic work";
                errCount++;
            }
            if (!reference) {
                err.reference = "The reference field is required";
                errCount++;
            }
            if (!fontName) {
                err.fontName = "Font name is required";
                errCount++;
            }
            // if (!checkIsURL(fontUrl)) {
            //     err.fontUrl = "You have to provide a valid font URL";
            //     toast.warn("You have to provide a valid font URL");
            //     errCount++;
            // }
            if (!brandGuideline) {
                err.brandGuideline = "Brand guideline is required";
                errCount++;
            }
        }

        if (typeOfGraphicsCategory?.id === 1) {
            if (!typeOfLogo) {
                err.typeOfLogo = "You have to select Type of logo";
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
        }

        if (typeOfGraphicsCategory?.id === 2 || typeOfGraphicsCategory?.id === 3 || typeOfGraphicsCategory?.id === 4) {
            if (!textForDesign) {
                err.textForDesign = "The text for design field is required";
                errCount++;
            }
        }

        if (typeOfGraphicsCategory?.id === 5 || typeOfGraphicsCategory?.id === 6) {
            if (!imageForDesigner) {
                err.imageForDesigner = "Image is required for designer";
                errCount++;
            }
        }

        if (typeOfGraphicsCategory?.id === 8) {
            if (!imgOrVidForWork) {
                err.imgOrVidForWork = "Images/videos is requiredn for work";
                errCount++;
            }
        }

        if (typeOfGraphicsCategory?.id === 7) {
            if (illustration === "") {
                err.others = "Write Name of the illustration design work";
                errCount++;
            }
        }
        if (typeOfGraphicsCategory?.id === 9) {
            if (others === "") {
                err.others = "Write Name of the graphic design work";
                errCount++;
            }
        }

        if (taskCategory?.category_name === "UI/UIX Design") {
            if (!cms) {
                err.cms = "The CMS name field is required";
                errCount++;
            }
            if (!themeType) {
                err.themeType = "You have to select Theme";
                errCount++;
            }
        }

        if (themeType?.id === 2) {
            if (!themeName) {
                err.themeName = "The theme name field is required";
                errCount++;
            }
            if (!themeTemplate) {
                err.themeTemplate = "You have to provide theme template URL";
                errCount++;
            } else if (!checkIsURL(themeTemplate)) {
                err.themeTemplate = "You have to provide a valid theme template URL";
                toast.warn("You have to provide a valid theme template URL");
                errCount++;
            }
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

        // graphics start 
        fd.append("type_of_graphic_work_id", typeOfGraphicsCategory?.id ?? "");
        fd.append("type_of_logo", typeOfLogo?.type_name ?? "");
        fd.append("brand_name", brandName ?? "");
        fd.append("number_of_versions", numOfVersions ?? "");
        fd.append("file_types_needed", JSON.stringify(fileTypesNeeded) ?? "");
        fd.append("reference", reference ?? "");
        fd.append("font_name", fontName ?? "");
        fd.append("font_url", fontUrl ?? "");
        fd.append("design_instruction", (illustration || others) ?? "");
        fd.append("primary_color", primaryColor ?? "");
        fd.append("primary_color_description", primaryColorDescription ?? "");
        fd.append("secondary_colors", JSON.stringify(secondaryColors) ?? "");

        Array.from(textForDesign).forEach((file) => {
            fd.append("attach_text_files[]", file);
        });
        Array.from(imageForDesigner).forEach((file) => {
            fd.append("workable_image_files[]", file);
        });
        Array.from(imgOrVidForWork).forEach((file) => {
            fd.append("workable_image_or_video_files[]", file);
        });
        Array.from(brandGuideline).forEach((file) => {
            fd.append("brand_guideline_files[]", file);
        });
        // graphics end 

        // ui/ux start 
        fd.append("cms", cms ?? "");
        fd.append("theme_name", themeName ?? "");
        fd.append("theme_template_library_link", themeTemplate ?? "");
        // ui/ux end 

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

    // let count = 0;
    // const err = new Object();

    // if (colorSchema === "") {
    //     err.colorSchema = "You Need to Select An Option";
    //     count++;
    // }
    // if (colorSchema === "yes") {
    //     if (primaryColorDescription === "") {
    //         err.pColorDesc = "You Have to Provide This Field!";
    //         count++;
    //     }

    //     _.map(secondaryColors, (item) => {
    //         if (item.description === "") {
    //             err.sDescription = "You Have to Provide This Field!";
    //             count++;
    //         }
    //     });
    // }


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

                                {/* it will show conditionally here, when task category is graphics  */}
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
                                            typeOfGraphicsCategory?.id === 1 && <>
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
                                        {/* for Banner, Brochure or company profile */}
                                        {
                                            (typeOfGraphicsCategory?.id === 2 || typeOfGraphicsCategory?.id === 3 || typeOfGraphicsCategory?.id === 4) && <>
                                                <div className="col-12 col-md-6">
                                                    <div className={`form-group my-3 w-100`}>
                                                        <label
                                                            htmlFor={'textForDesign'}
                                                            className={`f-14 text-dark-gray mb-2`}
                                                            data-label="true"
                                                        >
                                                            Attach text that will be used for the design
                                                            <sup className='f-14 mr-1'>*</sup>
                                                        </label>
                                                        <UploadFilesInLine
                                                            files={textForDesign}
                                                            setFiles={setTextForDesign}
                                                        />
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
                                                            className={`f-14 text-dark-gray mb-2`}
                                                            data-label="true"
                                                        >
                                                            Image where the designer will work
                                                            <sup className='f-14 mr-1'>*</sup>
                                                        </label>
                                                        <UploadFilesInLine
                                                            files={imageForDesigner}
                                                            setFiles={setImageForDesigner}
                                                        />
                                                        {/* <div className="custom-file" style={fileInputStyle}>
                                                            <input type="file" className="custom-file-input" id="imageForDesigner" required={true} multiple error={formError?.imageForDesigner} onChange={(e) =>
                                                                handleChange(e, setImageForDesigner)
                                                            } />
                                                            <label className="custom-file-label" htmlFor="imageForDesigner">Choose file</label>
                                                        </div>
                                                        {formError?.imageForDesigner && (
                                                            <div style={{ color: "red" }}>
                                                                {formError?.imageForDesigner}
                                                            </div>
                                                        )} */}
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
                                                            className={`f-14 text-dark-gray mb-2`}
                                                            data-label="true"
                                                        >
                                                            Images/videos that will be used for the work
                                                            <sup className='f-14 mr-1'>*</sup>
                                                        </label>
                                                        <UploadFilesInLine
                                                            files={imgOrVidForWork}
                                                            setFiles={setImgOrVidForWork}
                                                        />
                                                        {/* <div className="custom-file z-n1" style={fileInputStyle}>
                                                            <input type="file" className="custom-file-input" id="imgOrVidForWork" required={true} error={formError?.imgOrVidForWork} onChange={(e) =>
                                                                handleChange(e, setImgOrVidForWork)
                                                            } multiple />
                                                            <label className="custom-file-label" htmlFor="imgOrVidForWork">Choose file</label>
                                                        </div>
                                                        {formError?.imgOrVidForWork && (
                                                            <div style={{ color: "red" }}>
                                                                {formError?.imgOrVidForWork}
                                                            </div>
                                                        )} */}
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
                                                        <div
                                                            className="ck-editor-holder"
                                                            style={{ minHeight: "50px" }}
                                                        >
                                                            <CKEditorComponent
                                                                data={illustration}
                                                                onChange={(
                                                                    e,
                                                                    editor
                                                                ) =>
                                                                    setIllustration(
                                                                        editor.getData()
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        {formError?.illustration && (
                                                            <div style={{ color: "red" }}>
                                                                {formError?.illustration}
                                                            </div>
                                                        )}
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
                                                        <div
                                                            className="ck-editor-holder"
                                                            style={{ minHeight: "50px" }}
                                                        >
                                                            <CKEditorComponent
                                                                data={others}
                                                                onChange={(
                                                                    e,
                                                                    editor
                                                                ) =>
                                                                    setOthers(
                                                                        editor.getData()
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        {formError?.others && (
                                                            <div style={{ color: "red" }}>
                                                                {formError?.others}
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
                                                error={formError?.fontUrl}
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
                                                <UploadFilesInLine
                                                    files={brandGuideline}
                                                    setFiles={setBrandGuideline}
                                                />
                                                {/* <div className="custom-file" style={fileInputStyle}>
                                                    <input type="file" className="custom-file-input" id="brandGuideline" multiple error={formError?.brandGuideline} onChange={(e) =>
                                                        handleChange(e, setBrandGuideline)
                                                    } />
                                                    <label className="custom-file-label" htmlFor="brandGuideline">Choose file</label>
                                                </div> */}
                                            </div>
                                        </div>


                                        {/* color schema */}
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label
                                                    htmlFor=""
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
                                                                    Color
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

                                    </> : null
                                }

                                {/* it will show conditionally here, when task category is UI/UIX Design  */}
                                {
                                    taskCategory ? taskCategory?.category_name === "UI/UIX Design" && <>
                                        {/* cms name  */}
                                        <div className="col-12 col-md-6">
                                            <Input
                                                id="cms"
                                                label="CMS"
                                                type="text"
                                                placeholder="Enter a CMS"
                                                name="cms"
                                                required={true}
                                                value={cms}
                                                error={formError?.cms}
                                                onChange={(e) =>
                                                    handleChange(e, setCms)
                                                }
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <ThemeTypeSelect
                                                selected={themeType}
                                                onSelect={setThemeType}
                                            />
                                            {formError?.themeType && (
                                                <div style={{ color: "red" }}>
                                                    {formError?.themeType}
                                                </div>
                                            )}
                                        </div>

                                        {
                                            themeType?.id === 2 && <>
                                                {/* theme name */}
                                                <div className="col-12 col-md-6">
                                                    <Input
                                                        id="themeName"
                                                        label="Theme Name"
                                                        type="text"
                                                        placeholder="Enter a theme name"
                                                        name="themeName"
                                                        required={true}
                                                        value={themeName}
                                                        error={formError?.themeName}
                                                        onChange={(e) =>
                                                            handleChange(e, setThemeName)
                                                        }
                                                    />
                                                </div>
                                                {/* theme template url */}
                                                <div className="col-12 col-md-6">
                                                    <Input
                                                        id="themeTemplate"
                                                        label="Theme Template Library URL"
                                                        type="url"
                                                        placeholder="Enter Theme Template Library URL"
                                                        name="themeTemplate"
                                                        required={true}
                                                        value={themeTemplate}
                                                        error={formError?.themeTemplate}
                                                        onChange={(e) =>
                                                            handleChange(e, setThemeTemplate)
                                                        }
                                                    />
                                                </div>
                                            </>
                                        }

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
