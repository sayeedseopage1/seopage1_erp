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

import { Listbox } from "@headlessui/react";
import { toast } from "react-toastify";
import {
    useDeleteGraphicsTaskFileMutation,
    useDeleteUplaodedFileMutation,
    useGetTaskDetailsQuery,
    useGetTypesOfGraphicWorksQuery
} from "../../../services/api/SingleTaskPageApi";
import { useGetMilestoneDetailsQuery } from "../../../services/api/projectApiSlice";
import { useUpdateTaskMutation } from "../../../services/api/tasksApiSlice";
import { convertTime } from "../../../utils/converTime";
import { calenderOpen } from "./helper/calender_open";
import TypeOfGraphicsWorkSelection from "../../../projects/components/graphics-design-forms/TypeOfGraphicsWorkSelection";
import TypeOfLogo from "../../../projects/components/graphics-design-forms/TypeOfLogo";
import FileTypesNeeded from "../../../projects/components/graphics-design-forms/FileTypesNeeded";
import ThemeTypeSelect from "../../../projects/components/ui-ux-design-forms/ThemeTypeSelect";
import { checkIsURL } from "../../../utils/check-is-url";
import CmsDropdown from "../../../projects/components/ui-ux-design-forms/CmsDropdown";
import { validateUrl } from "../../../projects/utils/validateUrl";
import { RiDeleteBinLine } from "react-icons/ri";

const dayjs = new CompareDate();

// Edit form Provider
const EditFormProvider = ({ task, singleTask }) => {
    const [searchParams] = useSearchParams(); // get search params
    const isVisible = searchParams.get("modal") === "edit"; // check has modal
    const taskId = searchParams.get("task"); // get task id
    const navigate = useNavigate();
    const location = useLocation();

    const close = () => navigate(location.pathname, { replace: true });


    const [updateTask, { isLoading, error }] = useUpdateTaskMutation();
    // handle submission
    const handleSubmission = (formData) => {
        updateTask(formData).unwrap().then(res => {
            if (res?.status === 200) {
                toast.success("Task Updated successfully!");
                close();
                window.location.reload();
            }
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
                            <TaskEditForm
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

const TaskEditForm = ({ task, singleTask: row, onSubmit, isLoading, onClose }) => {
    const editDataIsFetching = !task;
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

    // graphic task details
    const graphicWorkDetails = new Object(row?.graphic_work_detail);

    let defaultSecondaryColors;
    let defaultFileTypesNeeded;

    // files
    const [defaultBrandGuidelineFiles, setDefaultBrandGuidelineFiles] = useState(graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 4))

    const [defaultImgOrVidForWork, setDefaultImgOrVidForWork] = useState(graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 3))

    if (graphicWorkDetails?.secondary_colors || graphicWorkDetails?.file_types_needed) {
        defaultSecondaryColors = JSON.parse(graphicWorkDetails?.secondary_colors)
        defaultFileTypesNeeded = JSON.parse(graphicWorkDetails?.file_types_needed)
        // defaultTextForDesign = graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 1)
        // defaultImageForDesigner = graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 2)
        // defaultImgOrVidForWork = graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 3)
        // setDefaultBrandGuidelineFiles(graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 4))
    }

    //state for graphic designer start
    const [typeOfGraphicsCategory, setTypeOfGraphicsCategory] = useState("");
    const [typeOfLogo, setTypeOfLogo] = useState("");
    const [brandName, setBrandName] = useState("");
    const [numOfVersions, setNumOfVersions] = useState(null);
    // const [reference, setReference] = useState("");
    const [referenceList, setReferenceList] = useState([{ reference: "" }]);
    const [fileTypesNeeded, setFileTypesNeeded] = React.useState(defaultFileTypesNeeded);
    const [fileType, setFileType] = useState('');
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
    const [secondaryColors, setSecondaryColors] = React.useState(defaultSecondaryColors);
    const { data: graphicOptions } = useGetTypesOfGraphicWorksQuery("")
    //state for graphic designer end

    // state for ui/ux start
    const [cms, setCms] = useState("")
    const [themeType, setThemeType] = useState("")
    const [themeName, setThemeName] = useState("")
    const [themeTemplate, setThemeTemplate] = useState("")
    // state for ui/ux end

    // let defaultTextForDesignBanner;
    const [defaultTextForDesignBanner, setDefaultTextForDesignBanner] = useState(graphicWorkDetails?.type_of_graphic_work_id === 2 && graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 1))

    // let defaultTextForDesignBrochure;
    const [defaultTextForDesignBrochure, setDefaultTextForDesignBrochure] = useState(graphicWorkDetails?.type_of_graphic_work_id === 3 && graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 1))

    // let defaultTextForDesignCompanyProfile;
    const [defaultTextForDesignCompanyProfile, setFefaultTextForDesignCompanyProfile] = useState(graphicWorkDetails?.type_of_graphic_work_id === 4 && graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 1))

    // let defaultImageForDesignerRetouching;
    const [defaultImageForDesignerRetouching, setDefaultImageForDesignerRetouching] = useState(graphicWorkDetails?.type_of_graphic_work_id === 5 && graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 2))

    // let defaultImageForDesignerBgRemoval;
    const [defaultImageForDesignerBgRemoval, setDefaultImageForDesignerBgRemoval] = useState(graphicWorkDetails?.type_of_graphic_work_id === 6 && graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 2))

    useEffect(() => {
        if (themeName || themeTemplate) {
            setThemeType({
                "id": 2,
                "type_name": "Need to use a specific theme"
            })
        } else {
            setThemeType({
                "id": 1,
                "type_name": "No specific theme"
            })
        }
    }, [themeName, themeTemplate])

    // initial default data
    // Effect for setting CMS, theme name, and template
    useEffect(() => {
        if (row) {
            setCms({
                type_name: row?.cms
            });
            setThemeName(row?.theme_name);
            setThemeTemplate(row?.theme_template_library_link);
        }
    }, [row]);

    // Effect for setting graphics-related state
    useEffect(() => {
        if (row && graphicOptions) {
            const graphicWorkDetail = row.graphic_work_detail;
            const selectedOption = graphicOptions.find(item => item.id === graphicWorkDetail?.type_of_graphic_work_id);

            setTypeOfGraphicsCategory({
                id: graphicWorkDetail?.type_of_graphic_work_id,
                name: selectedOption?.name,
            });
            setTypeOfLogo({
                type_name: graphicWorkDetail?.type_of_logo,
            });
        }
    }, [row, graphicOptions]);

    // Effect for setting graphic work details
    useEffect(() => {
        if (graphicWorkDetails) {
            setBrandName(graphicWorkDetails?.brand_name);
            setNumOfVersions(graphicWorkDetails?.number_of_versions);
            setReferenceList(JSON.parse(graphicWorkDetails?.reference));
            setFontName(graphicWorkDetails?.font_name);
            setFontUrl(graphicWorkDetails?.font_url);
            setPrimaryColor(graphicWorkDetails?.primary_color);
            setPrimaryColorDescription(graphicWorkDetails?.primary_color_description);
            setIllustration(graphicWorkDetails?.design_instruction);
            setOthers(graphicWorkDetails?.design_instruction);
        }
    }, [graphicWorkDetails]);

    const { data: estimation, isFetching } = useGetTaskDetailsQuery(
        `/${task?.id}/json?mode=estimation_time`, { skip: !task?.id }
    );


    const required_error = error?.status === 422 ? error?.data : null;

    // handle onchange
    const handleChange = (e, setState) => {
        e.preventDefault();
        let value = e.target.value;
        setState(value);
    };

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

        // graphics design fields validation
        if (taskCategory?.category_name === "Graphic Design") {
            if (!typeOfGraphicsCategory) {
                err.typeOfGraphicsCategory = "You have to select Type of graphic work";
                count++;
            }
            if (!referenceList[0].reference) {
                err.reference = "The reference field is required";
                errCount++;
            }

            if (!fontName) {
                err.fontName = "Font name is required";
                count++;
            }
            // if (!checkIsURL(fontUrl)) {
            //     err.fontUrl = "You have to provide a valid font URL";
            //     toast.warn("You have to provide a valid font URL");
            //     count++;
            // }
            if (!brandGuideline) {
                err.brandGuideline = "Brand guideline is required";
                count++;
            }
        }

        if (typeOfGraphicsCategory?.id === 1) {
            if (!typeOfLogo) {
                err.typeOfLogo = "You have to select Type of logo";
                count++;
            }
            if (!brandName) {
                err.brandName = "The brand name field is required";
                count++;
            }
            if (!numOfVersions) {
                err.numOfVersions = "Number of versions is required";
                count++;
            }
            if (!fileTypesNeeded) {
                err.fileTypesNeeded = "File types is required";
                count++;
            }
        }

        if (typeOfGraphicsCategory?.id === 2 || typeOfGraphicsCategory?.id === 3 || typeOfGraphicsCategory?.id === 4) {
            if (!textForDesign) {
                err.textForDesign = "The text for design field is required";
                count++;
            }
        }

        if (typeOfGraphicsCategory?.id === 5 || typeOfGraphicsCategory?.id === 6) {
            if (!imageForDesigner) {
                err.imageForDesigner = "Image is required for designer";
                count++;
            }
        }

        if (typeOfGraphicsCategory?.id === 8) {
            if (!imgOrVidForWork) {
                err.imgOrVidForWork = "Images/videos is requiredn for work";
                count++;
            }
        }

        if (typeOfGraphicsCategory?.id === 7) {
            if (illustration === "") {
                err.others = "Write Name of the illustration design work";
                count++;
            }
        }
        if (typeOfGraphicsCategory?.id === 9) {
            if (others === "") {
                err.others = "Write Name of the graphic design work";
                count++;
            }
        }

        // ui/ux design fields validation
        if (taskCategory?.category_name === "UI/UIX Design") {
            if (!cms) {
                err.cms = "The CMS name field is required";
                count++;
            }
            if (!themeType) {
                err.themeType = "You have to select Theme";
                count++;
            }

            if (themeType?.id === 2) {
                if (themeName === null) {
                    err.themeName = "The theme name field is required";
                    count++;
                }
                if (themeTemplate === null) {
                    err.themeTemplate = "You have to provide theme template URL";
                    count++;
                } else if (!checkIsURL(themeTemplate)) {
                    err.themeTemplate = "You have to provide a valid theme template URL";
                    toast.warn("You have to provide a valid theme template URL");
                    count++;
                }
            }
        }

        setError(error);
        return count === 0;

    }



    const handleSubmit = () => {
        //form data
        const _startDate = dayjs.dayjs(startDate).format("DD-MM-YYYY");
        const _dueDate = dayjs.dayjs(dueDate).format("DD-MM-YYYY");

        const fd = new FormData();
        fd.append("milestone_id", task?.milestoneID);
        fd.append("task_id", task?.id);
        fd.append("heading", title);
        fd.append("start_date", _startDate);
        fd.append("due_date", _dueDate);
        fd.append("project_id", task?.projectId);
        fd.append("category_id", taskCategory?.id);
        fd.append("user_id", assignedTo?.id);
        fd.append("description", description);
        fd.append("board_column_id", task?.boardColumn.id);
        fd.append("priority", _.lowerCase(priority));
        fd.append("estimate_hours", estimateTimeHour);
        fd.append("estimate_minutes", estimateTimeMin);
        fd.append("deliverable_id", milestone?.deliverable_type ?? '');
        fd.append("image_url", null);
        fd.append("addedFiles", null);


        // graphics start 
        fd.append("type_of_graphic_work_id", typeOfGraphicsCategory?.id ?? "");
        if (typeOfGraphicsCategory?.id == 1) {
            fd.append("type_of_logo", typeOfLogo?.type_name ?? "");
            fd.append("brand_name", brandName ?? "");
            fd.append("number_of_versions", numOfVersions ?? "");
            fd.append("file_types_needed", JSON.stringify([...(fileTypesNeeded?.filter(type => type !== 'Others'))]) ?? "");
        }
        if (typeOfGraphicsCategory?.id === 2 || typeOfGraphicsCategory?.id === 3 || typeOfGraphicsCategory?.id === 4) {
            Array.from(textForDesign).forEach((file) => {
                fd.append("attach_text_files[]", file);
            });
        }
        if (typeOfGraphicsCategory?.id === 5 || typeOfGraphicsCategory?.id === 6) {
            Array.from(imageForDesigner).forEach((file) => {
                fd.append("workable_image_files[]", file);
            });
        }
        if (typeOfGraphicsCategory?.id === 7) {
            fd.append("design_instruction", illustration ?? "");
        }
        if (typeOfGraphicsCategory?.id === 9) {
            fd.append("design_instruction", others ?? "");
        }
        if ((typeOfGraphicsCategory?.id === 8)) {
            Array.from(imgOrVidForWork).forEach((file) => {
                fd.append("workable_image_or_video_files[]", file);
            });
        }

        // fd.append("reference", reference ?? "");
        fd.append("reference", JSON.stringify(referenceList) ?? "");
        fd.append("font_name", fontName ?? "");
        fd.append("font_url", fontUrl ?? "");
        fd.append("primary_color", primaryColor ?? "");
        fd.append("primary_color_description", primaryColorDescription ?? "");
        fd.append("secondary_colors", JSON.stringify(secondaryColors) ?? "");
        Array.from(brandGuideline).forEach((file) => {
            fd.append("brand_guideline_files[]", file);
        });
        // graphics end 

        // ui/ux start 
        fd.append("cms", cms?.type_name ?? "");
        if (themeType?.id == 2) {
            fd.append("theme_name", themeName ?? "");
            fd.append("theme_template_library_link", themeTemplate ?? "");
        }
        // ui/ux end 



        fd.append("_method", "POST");
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

    // TODO: delete files for graphics design section here
    const [deleteGraphicsTaskFile] = useDeleteGraphicsTaskFileMutation()

    const handleDeleteBrandFile = (e, file, prev) => {
        deleteGraphicsTaskFile(file?.id).unwrap();
        // delete form ui
        prev = prev?.filter(item => item?.id !== file?.id);
        setDefaultBrandGuidelineFiles(prev)
    }
    const handleDeletedefaultImgOrVidForWorkFile = (e, file, prev) => {
        deleteGraphicsTaskFile(file?.id).unwrap();
        // delete form ui
        prev = prev?.filter(item => item?.id !== file?.id);
        setDefaultImgOrVidForWork(prev)
    }
    const handleDeleteTextForDesignBanner = (e, file, prev) => {
        deleteGraphicsTaskFile(file?.id).unwrap();
        // delete form ui
        prev = prev?.filter(item => item?.id !== file?.id);
        setDefaultTextForDesignBanner(prev)
    }

    const handleDeleteTextForDesignBrochure = (e, file, prev) => {
        deleteGraphicsTaskFile(file?.id).unwrap();
        // delete form ui
        prev = prev?.filter(item => item?.id !== file?.id);
        setDefaultTextForDesignBrochure(prev)
    }

    const handleDeleteTextForDesignCompanyProfile = (e, file, prev) => {
        deleteGraphicsTaskFile(file?.id).unwrap();
        // delete form ui
        prev = prev?.filter(item => item?.id !== file?.id);
        setFefaultTextForDesignCompanyProfile(prev)
    }

    const handleDeleteImgForDesigner = (e, file, prev) => {
        deleteGraphicsTaskFile(file?.id).unwrap();
        // delete form ui
        prev = prev?.filter(item => item?.id !== file?.id);
        setDefaultImageForDesignerRetouching(prev)
    }

    const handleDeleteImgBgForDesigner = (e, file, prev) => {
        deleteGraphicsTaskFile(file?.id).unwrap();
        // delete form ui
        prev = prev?.filter(item => item?.id !== file?.id);
        setDefaultImageForDesignerBgRemoval(prev)
    }

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
        if (editor) {
            let text = editor.getData();
            let newColors = _.map(secondaryColors, (item) =>
                item.id === id ? { ...item, description: text } : item
            );
            setSecondaryColors(newColors);
        } else {
            console.error("Editor is undefined");
        }
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

    // add other file type 
    const handleAddOtherFileType = () => {
        fileTypesNeeded.push(fileType);
        setFileType('')
    }

    // reference 
    const handleReferenceChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...referenceList];
        list[index][name] = value;
        setReferenceList(list);
    };

    const handleReferenceRemove = (index) => {
        const list = [...referenceList];
        list.splice(index, 1);
        setReferenceList(list);
    };

    const handleReferenceAdd = () => {
        setReferenceList([...referenceList, { reference: "" }]);
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
                    <div className="col-6">
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

                    <div className="col-6">
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
                    <div className="col-12 col-md-6">
                        <Listbox value={milestone} onChange={setMilestone}>
                            <div className="form-group position-relative my-3">
                                <label
                                    className={`f-14 text-dark-gray mb-1`}
                                    data-label="true"
                                >
                                    Milestone
                                </label>
                                <Listbox.Button className=" sp1-selection-display-button form-control height-35 f-14 sp1-selection-display bg-white w-100">
                                    <span className="singleline-ellipsis" >{milestone?.milestone_title ?? '--'}</span>
                                    <div className='__icon'>
                                        <i className="fa-solid fa-sort"></i>
                                    </div>
                                </Listbox.Button>
                                <Listbox.Options className="sp1-select-options">
                                    {isFetchingMilestone && <span className="w-full d-block py-2 px-3">Loading...</span>}

                                    {_.map(projects?.milestones, (milestone) => (
                                        <Listbox.Option
                                            key={milestone.id}
                                            className={({ active }) => `sp1-select-option ${styles.list_border}${active ? 'active' : ''}`}
                                            value={milestone}
                                        >
                                            {milestone?.milestone_title}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>

                                {error?.milestone && (
                                    <div style={{ color: "red" }}>
                                        {error?.milestone}
                                    </div>
                                )}
                            </div>
                        </Listbox>
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
                            <div className="sp1-selection-display-button form-control height-35 f-14 sp1-selection-display bg-white w-100">
                                <span className="singleline-ellipsis">{isFetchingMilestone ? 'Loading...' : _.find(projects?.milestones, d => d.id === milestone.id)?.deliverable_type}</span>
                            </div>
                        </div>
                    </div>

                    {/*task.isSubtask && (
                        <div className="col-6">
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
                    )} */}



                    <div className="col-6">

                        <div className="form-group my-3">
                            <label htmlFor="">
                                Start Date <sup className="f-14">*</sup>
                            </label>
                            <div className="form-control height-35 f-14">
                                <DatePicker
                                    placeholderText={`Ex: ${dayjs
                                        .dayjs()
                                        .format("DD-MM-YYYY")}`}
                                    minDate={dayjs.dayjs(task?.startDate).isBefore(dayjs.dayjs()) ?
                                        dayjs.dayjs().toDate() :
                                        dayjs.dayjs(task?.startDate).toDate()}
                                    maxDate={
                                        dueDate ||
                                        dayjs.dayjs(task?.due_date).toDate()
                                    }
                                    date={startDate}
                                    setDate={setStateDate}
                                    onCalendarOpen={() => {
                                        const min = dayjs.dayjs(task?.startDate).isBefore(dayjs.dayjs()) ?
                                            dayjs.dayjs().toDate() :
                                            dayjs.dayjs(task?.startDate).toDate();

                                        const max = dueDate ||
                                            dayjs.dayjs(task?.dueDate).toDate();

                                        calenderOpen(min, max);

                                    }}
                                />
                            </div>
                            {required_error?.start_date?.[0] && (
                                <div style={{ color: "red" }}>
                                    {required_error?.start_date?.[0]}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-6">
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
                                        dayjs.dayjs(startDate).isAfter(dayjs.dayjs(), 'day') ?
                                            startDate : dayjs.dayjs().toDate()
                                    }
                                    maxDate={dayjs
                                        .dayjs(task?.due_date)
                                        .toDate()}
                                    date={dueDate}
                                    setDate={setDueDate}
                                    onCalendarOpen={() => {
                                        const min = dayjs.dayjs(startDate).isAfter(dayjs.dayjs(), 'day') ?
                                            startDate : dayjs.dayjs().toDate();
                                        const max = dayjs.dayjs(task?.dueDate).toDate();
                                        calenderOpen(min, max);
                                    }}
                                />
                            </div>
                            {required_error?.due_date?.[0] && (
                                <div style={{ color: "red" }}>
                                    {required_error?.due_date?.[0]}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-6">
                        <TaskCategorySelectionBox
                            selected={taskCategory}
                            onSelect={(value) => {
                                setTaskCategory(value);
                                setAssignedTo(null);
                            }}
                            isDesignerTask={taskCategory?.category_name === "Graphic Design" || taskCategory?.category_name === "UI/UIX Design"}
                        />
                    </div>


                    {
                        taskCategory ? taskCategory?.category_name === "Graphic Design" && <>
                            {/* Type Of Graphics Work */}
                            <div className="col-12 col-md-6">
                                <TypeOfGraphicsWorkSelection
                                    selected={typeOfGraphicsCategory}
                                    onSelect={setTypeOfGraphicsCategory}
                                    isDesignerTask={taskCategory?.category_name === "Graphic Design"}

                                />
                                {error?.typeOfGraphicsCategory && (
                                    <div style={{ color: "red" }}>
                                        {error?.typeOfGraphicsCategory}
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
                                        />
                                        {error?.typeOfLogo && (
                                            <div style={{ color: "red" }}>
                                                {error?.typeOfLogo}
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
                                            error={error?.brandName}
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
                                            error={error?.numOfVersions}
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
                                                fileTypesNeeded={fileTypesNeeded?.filter(type => type !== 'Others')}
                                                setFileTypesNeeded={setFileTypesNeeded}
                                                multiple
                                            />
                                            {error?.fileTypesNeeded && (
                                                <div style={{ color: "red" }}>
                                                    {error?.fileTypesNeeded}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {
                                        fileTypesNeeded?.includes('Others') && <div className="col-12 col-md-6">
                                            <div className={`form-group my-3 w-100`}>
                                                <label
                                                    htmlFor='fileType'
                                                    className={`f-14 text-dark-gray mb-1`}
                                                    data-label="true"
                                                >
                                                    Describe The File Type
                                                </label>
                                                <div className="d-flex align-items-center justify-content-between w-100">
                                                    <input
                                                        type="text"
                                                        className={`form-control height-35 f-14`}
                                                        placeholder={'Describe the file type'}
                                                        value={fileType}
                                                        onChange={(e) =>
                                                            handleChange(e, setFileType)
                                                        }
                                                    />
                                                    <button style={{ marginLeft: '10px', height: '39px' }} className="btn btn-success btn-sm" onClick={handleAddOtherFileType}>Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    }
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
                                            {
                                                typeOfGraphicsCategory?.id === 2 && <div style={{ maxHeight: "300px", overflowY: "auto" }}><UploadFilesInLine
                                                    files={textForDesign}
                                                    setFiles={setTextForDesign}
                                                    {...(defaultTextForDesignBanner && { previous: defaultTextForDesignBanner })}
                                                    onPreviousFileDelete={handleDeleteTextForDesignBanner}
                                                /></div>
                                            }
                                            {
                                                typeOfGraphicsCategory?.id === 3 && <div style={{ maxHeight: "300px", overflowY: "auto" }}><UploadFilesInLine
                                                    files={textForDesign}
                                                    setFiles={setTextForDesign}
                                                    {...(defaultTextForDesignBrochure && { previous: defaultTextForDesignBrochure })}
                                                    onPreviousFileDelete={handleDeleteTextForDesignBrochure}
                                                /></div>
                                            }
                                            {
                                                typeOfGraphicsCategory?.id === 4 && <div style={{ maxHeight: "300px", overflowY: "auto" }}><UploadFilesInLine
                                                    files={textForDesign}
                                                    setFiles={setTextForDesign}
                                                    {...(defaultTextForDesignCompanyProfile && { previous: defaultTextForDesignCompanyProfile })}
                                                    onPreviousFileDelete={handleDeleteTextForDesignCompanyProfile}
                                                /></div>
                                            }

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
                                            {
                                                typeOfGraphicsCategory?.id === 5 && <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                                                    <UploadFilesInLine
                                                        files={imageForDesigner}
                                                        setFiles={setImageForDesigner}
                                                        {...(defaultImageForDesignerRetouching ? { previous: defaultImageForDesignerRetouching } : {})}
                                                        onPreviousFileDelete={handleDeleteImgForDesigner}
                                                    />
                                                </div>
                                            }
                                            {
                                                typeOfGraphicsCategory?.id === 6 && <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                                                    <UploadFilesInLine
                                                        files={imageForDesigner}
                                                        setFiles={setImageForDesigner}
                                                        {...(defaultImageForDesignerBgRemoval ? { previous: defaultImageForDesignerBgRemoval } : {})}
                                                        onPreviousFileDelete={handleDeleteImgBgForDesigner}
                                                    />
                                                </div>
                                            }
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
                                            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                                                <UploadFilesInLine
                                                    files={imgOrVidForWork}
                                                    setFiles={setImgOrVidForWork}
                                                    previous={defaultImgOrVidForWork}
                                                    onPreviousFileDelete={handleDeletedefaultImgOrVidForWorkFile}
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
                                            {error?.illustration && (
                                                <div style={{ color: "red" }}>
                                                    {error?.illustration}
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
                                            {error?.others && (
                                                <div style={{ color: "red" }}>
                                                    {error?.others}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            }

                            {/* Reference */}
                            {<div className="col-12 col-md-6">
                                <div className={`form-group my-3 w-100`}>
                                    <label
                                        htmlFor='reference'
                                        className={`f-14 text-dark-gray mb-1`}
                                        data-label="true"
                                    >
                                        Reference
                                        <sup className='f-14 mr-1'>*</sup>
                                    </label>
                                    {referenceList?.map((singleReference, index) => (
                                        <div key={index}>
                                            <div className={`d-flex align-items-start justify-content-between w-100 ${index !== 0 && 'mt-2'}`}>
                                                <div className="d-flex flex-column justify-content-start align-items-start w-100">
                                                    <input
                                                        type="url"
                                                        name="reference"
                                                        className={`form-control height-35 f-14`}
                                                        placeholder={'Enter Task Reference'}
                                                        value={singleReference.reference}
                                                        onChange={(e) => handleReferenceChange(e, index)}

                                                    />
                                                    {singleReference?.reference && !validateUrl(singleReference?.reference) && (
                                                        <div style={{ color: "red" }}>Please enter a valid URL</div>
                                                    )}
                                                </div>
                                                <div className="">
                                                    {referenceList?.length !== 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleReferenceRemove(index)}
                                                            className="btn btn-outline-danger btn-sm "
                                                            style={{ marginLeft: '10px', height: '39px' }}
                                                        >
                                                            <RiDeleteBinLine />
                                                        </button>
                                                    )}
                                                </div>

                                            </div>
                                            <div>
                                                {referenceList?.length - 1 === index && (
                                                    <button
                                                        type="button"
                                                        onClick={handleReferenceAdd}
                                                        className="btn btn-success btn-sm mt-2"
                                                    >
                                                        <span>+</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            }

                            {formError?.reference && (
                                <div style={{ color: "red" }}>
                                    {formError?.reference}
                                </div>
                            )}

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
                                    error={error?.fontName}
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
                                    error={error?.fontUrl}
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
                                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                                        <UploadFilesInLine
                                            files={brandGuideline}
                                            setFiles={setBrandGuideline}
                                            previous={defaultBrandGuidelineFiles}
                                            onPreviousFileDelete={handleDeleteBrandFile}
                                        />
                                    </div>

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
                                                            data={primaryColorDescription || ""}
                                                            onChange={(e, editor) => (
                                                                setPrimaryColorDescription(editor.getData())
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

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
                                                            key={item?.id}
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
                                                                                item?.color
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleSecondaryColorChange(
                                                                                    e,
                                                                                    item?.id
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
                                                                        data={item.description || ""}
                                                                        onChange={(
                                                                            e,
                                                                            editor
                                                                        ) =>
                                                                            handleSecondaryColorDescriptionChange(
                                                                                e,
                                                                                editor,
                                                                                item?.id
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
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
                    {
                        taskCategory ? taskCategory?.category_name === "UI/UIX Design" && <>
                            {/* cms name  */}
                            <div className="col-12 col-md-6">
                                <CmsDropdown
                                    selected={cms}
                                    onSelect={setCms}
                                />
                                {error?.cms && (
                                    <div style={{ color: "red" }}>
                                        {error?.cms}
                                    </div>
                                )}
                            </div>
                            <div className="col-12 col-md-6">
                                <ThemeTypeSelect
                                    selected={themeType}
                                    onSelect={setThemeType}
                                />
                                {error?.themeType && (
                                    <div style={{ color: "red" }}>
                                        {error?.themeType}
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
                                            error={error?.themeName}
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
                                            placeholder="Theme Template Library URL"
                                            name="themeTemplate"
                                            required={true}
                                            value={themeTemplate}
                                            error={error?.themeTemplate}
                                            onChange={(e) =>
                                                handleChange(e, setThemeTemplate)
                                            }
                                        />
                                    </div>
                                </>
                            }

                        </> : null
                    }


                    <div className="col-6">
                        <AssignedToSelection
                            selected={assignedTo}
                            onSelect={setAssignedTo}
                            taskCategory={taskCategory}
                            isDesignerTask={taskCategory?.category_name === "Graphic Design" || taskCategory?.category_name === "UI/UIX Design"}
                        />
                    </div>
                    {/*
                    <div className="col-6">
                        <TaskObserverSelection />
                    </div> */}

                    {/* <div className="col-6">
                        <StatusSelection />
                    </div> */}

                    <div className="col-6">
                        <PrioritySelection
                            selected={priority}
                            setSelected={setPriority}
                        />
                    </div>

                    <div className="col-6">
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
                                {convertTime(Number(projects?.minutes_left) > 0 ? Number(projects?.minutes_left) : 0)}
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
