import { Listbox } from "@headlessui/react";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CKEditorComponent from "../../ckeditor";
import UploadFilesInLine from "../../file-upload/UploadFilesInLine";
import { useDeleteGraphicsTaskFileMutation, useDeleteUplaodedFileMutation, useGetTypesOfGraphicWorksQuery } from "../../services/api/SingleTaskPageApi";
import { useLazyGetMilestoneDetailsQuery } from "../../services/api/projectApiSlice";
import { useLazyGetTasksQuery, useUpdateTaskMutation } from "../../services/api/tasksApiSlice";
import { updateTasks } from "../../services/features/tasksSlice";
import DatePickerComponent from "../../single-task/section/comments/DatePicker";
import PrioritySelection from "../../single-task/section/sub-task/PrioritySelection";
import TaskCategorySelectionBox from "../../single-task/section/sub-task/TaskCategorySelectionBox";
import Button from "../../tasks/components/Button";
import Modal from "../../tasks/components/Modal";
import Input from "../../tasks/components/form/Input";
import { convertTime } from '../../utils/converTime';
import { CompareDate } from "../../utils/dateController";
import { User } from "../../utils/user-details";
import AssignedToSelection from "./AssignedToSelection";
import ThemeTypeSelect from "./ui-ux-design-forms/ThemeTypeSelect";
import { checkIsURL } from "../../utils/check-is-url";
import { toast } from "react-toastify";
import TypeOfGraphicsWorkSelection from "./graphics-design-forms/TypeOfGraphicsWorkSelection";
import TypeOfLogo from "./graphics-design-forms/TypeOfLogo";
import FileTypesNeeded from "./graphics-design-forms/FileTypesNeeded";
import CmsDropdown from "./ui-ux-design-forms/CmsDropdown";
import { RiDeleteBinLine } from "react-icons/ri";
import { validateUrl } from "../utils/validateUrl";

const TaskEditForm = ({ isOpen, close, row, table }) => {
    const { tasks, filter } = useSelector(s => s.tasks);
    const dispatch = useDispatch();
    const dayjs = new CompareDate();
    const [loading, setLoading] = useState(true);
    //   form data
    const [title, setTitle] = useState("");
    const [milestone, setMilestone] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [project, setProject] = useState("");
    const [taskCategory, setTaskCategory] = useState("");
    const [assignedTo, setAssignedTo] = useState(null);
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [estimateTimeHour, setEstimateTimeHour] = useState(0);
    const [estimateTimeMin, setEstimateTimeMin] = useState(0);
    const [files, setFiles] = React.useState([]);
    const [attachedFiles, setAttachedFiles] = React.useState([]);

    // graphic task details
    const graphicWorkDetails = new Object(row?.graphic_work_detail);

    let defaultSecondaryColors;
    let defaultFileTypesNeeded;

    // files
    const [defaultBrandGuidelineFiles, setDefaultBrandGuidelineFiles] = useState(graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 4))

    const [defaultImgOrVidForWork, setDefaultImgOrVidForWork] = useState(graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 3))


    if (graphicWorkDetails?.secondary_colors || graphicWorkDetails?.file_types_needed || graphicWorkDetails?.graphic_task_files) {
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

    if (graphicWorkDetails) {
        // defaultTextForDesignBanner = graphicWorkDetails?.type_of_graphic_work_id === 2 && graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 1)
        // defaultTextForDesignBrochure = graphicWorkDetails?.type_of_graphic_work_id === 3 && graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 1)
        // defaultTextForDesignCompanyProfile = graphicWorkDetails?.type_of_graphic_work_id === 4 && graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 1)

        // defaultImageForDesignerRetouching = graphicWorkDetails?.type_of_graphic_work_id === 5 && graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 2)

        // defaultImageForDesignerBgRemoval = graphicWorkDetails?.type_of_graphic_work_id === 6 && graphicWorkDetails?.graphic_task_files?.filter((item) => item?.file_type == 2)
    }

    useEffect(() => {
        if (isOpen) {
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
        }
    }, [isOpen]);

    const [formError, setFormError] = React.useState(null);

    // const task = new SingleTask(taskDetails);
    const auth = new User(window?.Laravel?.user);

    const params = useParams();
    const [updateTask, { isLoading, error }] = useUpdateTaskMutation();
    const [getTasks, { isFetching: taskFetching }] = useLazyGetTasksQuery();

    const required_error = error?.status === 422 ? error?.data : null;

    // get milestone Details
    const [
        getMilestoneDetails,
        {
            data: projectInfo,
            isFetching: milestoneDataIsFetching
        }
    ] = useLazyGetMilestoneDetailsQuery();

    // handle change
    React.useEffect(() => {
        if (isOpen) {
            getMilestoneDetails(params?.projectId).unwrap()
                .then(res => {
                    let project = _.head(res?.milestones);
                    setProject(project?.project_name ?? '')
                })
        }
    }, [isOpen]);

    const clearForm = () => {
        setTitle("");
        setMilestone(null);
        setTaskCategory("");
        setProject("");
        setStartDate(null);
        setDueDate(null);
        setAssignedTo(null)
        setPriority("Medium");
        setEstimateTimeHour(0);
        setEstimateTimeMin(0);
        setAttachedFiles(null);
        setDescription("");
    }

    // initial default data
    useEffect(() => {
        if (row) {
            setTitle(row?.heading);
            setMilestone({
                id: row.milestone_id,
                milestone_title: row.milestone_title,
                deliverable_type: row.deliverable_id,
                deliverable_title: row.deliverable_title
            });
            setTaskCategory({ id: row.task_category_id, category_name: row.category_name });
            setProject(row?.project_name);
            setStartDate(dayjs.dayjs(row.startDate).toDate());
            setDueDate(dayjs.dayjs(row?.dueDate).toDate());
            setAssignedTo({ id: row.assigned_to_id, name: row?.assigned_to_name })
            setPriority(_.startCase(row?.priority));
            setEstimateTimeHour(row.estimate_hours);
            setEstimateTimeMin(row.estimate_minutes);
            setAttachedFiles(row?.files);
            setDescription(row?.description);
            setCms({
                type_name: row?.cms
            });
            setThemeName(row?.theme_name);
            setThemeTemplate(row?.theme_template_library_link);
            // graphics 
            setTypeOfGraphicsCategory({
                id: row?.graphic_work_detail?.type_of_graphic_work_id,
                name: graphicOptions?.find((item) => item.id == row?.graphic_work_detail?.type_of_graphic_work_id)?.name,
            });
            setTypeOfLogo({
                type_name: graphicWorkDetails?.type_of_logo,
            });

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
        }
    }, [isOpen])

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

        if (title === '') {
            err.title = "This field is required!",
                errCount++;
        }

        if (taskCategory === '') {
            err.taskCategory = "Select a category";
            errCount++;
        }

        if (milestone === null) {
            err.milestone = "Select a milestone";
            errCount++;
        }

        if (!startDate) {
            err.startDate = "Start date is required";
            errCount++;
        }

        if (!dueDate) {
            err.dueDate = "Due date is required",
                errCount++;
        }

        if (!assignedTo?.id) {
            err.assignedTo = "Select a user.";
            errCount++;
        }

        if (description === '') {
            err.description = 'Write a Description';
            errCount++;
        }

        // graphics design fields validation
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

        // ui/ux design fields validation
        if (taskCategory?.category_name === "UI/UIX Design") {
            if (!cms) {
                err.cms = "The CMS name field is required";
                errCount++;
            }
            if (!themeType) {
                err.themeType = "You have to select Theme";
                errCount++;
            }

            if (themeType?.id === 2) {
                if (themeName === null) {
                    err.themeName = "The theme name field is required";
                    errCount++;
                }
                if (themeTemplate === null) {
                    err.themeTemplate = "You have to provide theme template URL";
                    count++;
                } else if (!checkIsURL(themeTemplate)) {
                    err.themeTemplate = "You have to provide a valid theme template URL";
                    toast.warn("You have to provide a valid theme template URL");
                    errCount++;
                }
            }
        }

        setFormError(err);
        return !errCount;

    }

    // handle submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const _startDate = startDate ? dayjs.dayjs(startDate).format("DD-MM-YYYY") : '';
        const _dueDate = dueDate ? dayjs.dayjs(dueDate).format("DD-MM-YYYY") : '';

        // form data
        const fd = new FormData();
        fd.append('heading', title ?? '');
        fd.append('description', description ?? '');
        fd.append("start_date", _startDate ?? '');
        fd.append("due_date", _dueDate ?? '');
        fd.append("project_id", params?.projectId ?? '');
        fd.append("task_id", row?.id);
        fd.append("category_id", taskCategory?.id ?? '');
        fd.append("priority", _.lowerCase(priority));
        fd.append("board_column_id", 2);
        fd.append("estimate_hours", estimateTimeHour ?? 0);
        fd.append("estimate_minutes", estimateTimeMin ?? 0);
        fd.append("deliverable_id", milestone?.deliverable_type ?? '');
        fd.append("milestone_id", milestone?.id ?? '');
        fd.append("user_id", assignedTo?.id ?? '');

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


        Array.from(files).forEach((file) => {
            fd.append("file[]", file);
        });

        fd.append(
            "_token",
            document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content")
        );

        if (isValid()) {
            await updateTask(fd)
                .unwrap()
                .then((res) => {
                    // close();
                    // // change on local
                    // const queryString = new URLSearchParams(filter).toString();
                    dispatch(updateTasks({ task: res.task }))
                    // // fetch updated tasks
                    // getTasks(`?${queryString}`)
                    //     .unwrap()
                    //     .then(response => {
                    //         console.log({response})
                    //         const data = _.orderBy(response?.tasks, 'due_date', 'desc');
                    //         dispatch(storeTasks({tasks: data}))
                    //     })
                    //     .catch(err => console.log(err))

                    clearForm();
                    // alert update successful
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: res.message,
                        showConfirmButton: false,
                        timer: 2500,
                    });
                    window.location.reload();
                })
                .catch((err) => {
                    if (err?.status === 422) {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Please fill out all required fields",
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


    // global cursor loading status
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

    // generate estimate error text
    const estimateError = (err) => {
        let errText = "";
        let hoursErr = err?.estimate_hours?.[0];
        let minErr = err?.estimate_minutes?.[0];
        if (hoursErr) errText += hoursErr;
        if (minErr) errText += minErr;
        return errText;
    };


    const [deleteUplaodedFile, { isLoading: deletingUploadedFile }] = useDeleteUplaodedFileMutation()
    const handleDeleteUploadedFile = (e, file) => {
        deleteUplaodedFile(file?.id).unwrap();
        // delete form ui
        let previousFile = [...attachedFiles];
        let index = previousFile?.indexOf(file);
        previousFile.splice(index, 1);
        setAttachedFiles(previousFile);
    }

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
        <Modal isOpen={isOpen}>
            <div className="sp1_modal-content-wrapper">
                <div className="sp1_modal-panel sp1_task_create_modal_panel w-100">
                    {/* header */}
                    <div className="sp1_modal-head">
                        <div className="sp1_modal-title">
                            <strong>Edit Task</strong>
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
                                    onChange={(e) => handleChange(e, setTitle)}
                                />
                            </div>

                            {/* Task Categories List */}
                            <div className="col-12 col-md-6">
                                <TaskCategorySelectionBox
                                    selected={taskCategory}
                                    onSelect={setTaskCategory}
                                    isDesignerTask={taskCategory?.category_name === "Graphic Design" || taskCategory?.category_name === "UI/UIX Design"}
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
                                            {_.map(projectInfo?.milestones, (milestone) => (
                                                <Listbox.Option
                                                    key={milestone.id}
                                                    className={({ active }) => `sp1-select-option ${active ? 'active' : ''}`}
                                                    value={milestone}
                                                > {milestone?.milestone_title} </Listbox.Option>
                                            ))}
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
                                                dayjs
                                                    .dayjs()
                                                    .toDate()
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
                                        defaultValue={milestone?.deliverable_type ?? ''}
                                    />
                                </div>
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
                                                        fileTypesNeeded={fileTypesNeeded?.filter(type => type !== 'Others')}
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
                                                        typeOfGraphicsCategory?.id === 2 && <UploadFilesInLine
                                                            files={textForDesign}
                                                            setFiles={setTextForDesign}
                                                            {...(defaultTextForDesignBanner && { previous: defaultTextForDesignBanner })}
                                                            onPreviousFileDelete={handleDeleteTextForDesignBanner}
                                                        />
                                                    }
                                                    {
                                                        typeOfGraphicsCategory?.id === 3 && <UploadFilesInLine
                                                            files={textForDesign}
                                                            setFiles={setTextForDesign}
                                                            {...(defaultTextForDesignBrochure && { previous: defaultTextForDesignBrochure })}
                                                            onPreviousFileDelete={handleDeleteTextForDesignBrochure}
                                                        />
                                                    }
                                                    {
                                                        typeOfGraphicsCategory?.id === 4 && <UploadFilesInLine
                                                            files={textForDesign}
                                                            setFiles={setTextForDesign}
                                                            {...(defaultTextForDesignCompanyProfile && { previous: defaultTextForDesignCompanyProfile })}
                                                            onPreviousFileDelete={handleDeleteTextForDesignCompanyProfile}
                                                        />
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
                                                        typeOfGraphicsCategory?.id === 5 && <UploadFilesInLine
                                                            files={imageForDesigner}
                                                            setFiles={setImageForDesigner}
                                                            {...(defaultImageForDesignerRetouching ? { previous: defaultImageForDesignerRetouching } : {})}
                                                            onPreviousFileDelete={handleDeleteImgForDesigner}
                                                        />
                                                    }
                                                    {
                                                        typeOfGraphicsCategory?.id === 6 && <UploadFilesInLine
                                                            files={imageForDesigner}
                                                            setFiles={setImageForDesigner}
                                                            {...(defaultImageForDesignerBgRemoval ? { previous: defaultImageForDesignerBgRemoval } : {})}
                                                            onPreviousFileDelete={handleDeleteImgBgForDesigner}
                                                        />
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
                                                    <UploadFilesInLine
                                                        files={imgOrVidForWork}
                                                        setFiles={setImgOrVidForWork}
                                                        previous={defaultImgOrVidForWork}
                                                        onPreviousFileDelete={handleDeletedefaultImgOrVidForWorkFile}
                                                    />
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
                                    {/* Reference */}
                                    {<div className="col-12 col-md-6">
                                        <div className={`form-group my-3 w-100`}>
                                            <label
                                                htmlFor='fileType'
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
                                    {/* <div className="col-12 col-md-6">
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
                                    </div> */}

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
                                                previous={defaultBrandGuidelineFiles}
                                                onPreviousFileDelete={handleDeleteBrandFile}
                                            />
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
                                                                    data={primaryColorDescription || ""}
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
                                                                                data={item?.description || ""}
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

                            {
                                taskCategory ? taskCategory?.category_name === "UI/UIX Design" && <>
                                    {/* cms name  */}
                                    <div className="col-12 col-md-6">
                                        <CmsDropdown
                                            selected={cms}
                                            onSelect={setCms}
                                        />
                                        {formError?.cms && (
                                            <div style={{ color: "red" }}>
                                                {formError?.cms}
                                            </div>
                                        )}
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
                                                    placeholder="Enter a Theme Template Library URL"
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
                                <AssignedToSelection
                                    selected={assignedTo}
                                    onSelect={setAssignedTo}
                                    taskCategory={taskCategory}
                                    isDesignerTask={taskCategory?.category_name === "Graphic Design" || taskCategory?.category_name === "UI/UIX Design"}
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

                                    <div style={{ color: "red" }}>
                                        {estimateError(required_error)}
                                    </div>
                                    <div style={{ color: "red" }}>
                                        Estimation time can't exceed{" "}
                                        {convertTime((Number(projectInfo?.minutes_left) + row.estimate_minutes + (row.estimate_hours * 60)) - (Number(estimateTimeMin) + (Number(estimateTimeHour) * 60)))}
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="form-group my-3">
                                    <label
                                        htmlFor=""
                                        className="f-14 text-dark-gray"
                                    >
                                        Description{" "}
                                        <sup className="f-14"> * </sup>
                                    </label>
                                    <div
                                        className="sp1_st_write_comment_editor"
                                        style={{ minHeight: "100px" }}
                                    >
                                        <CKEditorComponent
                                            onChange={handleEditorChange}
                                            data={description}
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
                                    previous={attachedFiles}
                                    onPreviousFileDelete={handleDeleteUploadedFile}
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
                                            Update
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

export default TaskEditForm;