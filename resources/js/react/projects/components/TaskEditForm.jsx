import React from "react";
import Button from "../../tasks/components/Button";
import Modal from "../../tasks/components/Modal";
import Input from "../../tasks/components/form/Input";
import {
    useCreateSubtaskMutation,
    useLazyGetTaskDetailsQuery,
} from "../../services/api/SingleTaskPageApi";
import { useDispatch, useSelector } from "react-redux";
import { CompareDate } from "../../utils/dateController";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SingleTask } from "../../utils/single-task";
import { User } from "../../utils/user-details";
import DatePickerComponent from "../../single-task/section/comments/DatePicker";
import TaskCategorySelectionBox from "../../single-task/section/sub-task/TaskCategorySelectionBox";
import AssginedToSelection from "./AssignedToSelection";
import StatusSelection from "../../single-task/section/sub-task/StatusSelection";
import PrioritySelection from "../../single-task/section/sub-task/PrioritySelection";
import CKEditorComponent from "../../ckeditor";
import UploadFilesInLine from "../../file-upload/UploadFilesInLine";
import { Combobox, Listbox } from "@headlessui/react";
import { useGetMilestoneDetails, useGetMilestoneDetailsQuery, useStoreProjectTaskMutation } from "../../services/api/projectApiSlice";
import { convertTime } from '../../utils/converTime';
import _ from "lodash";

const TaskCreationForm = ({ isOpen, close, onSuccess }) => {
    const {
        task: taskDetails,
        subTask,
    } = useSelector((s) => s.subTask);
    const dispatch = useDispatch();
    const dayjs = new CompareDate();
    //   form data
    const [title, setTitle] = useState("");
    const [milestone, setMilestone] = useState(null);
    const [startDate, setStateDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [project, setProject] = useState("");
    const [taskCategory, setTaskCategory] = useState("");
    const [assignedTo, setAssignedTo] = useState(null); 
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [estimateTimeHour, setEstimateTimeHour] = useState(0);
    const [estimateTimeMin, setEstimateTimeMin] = useState(0);
    const [files, setFiles] = React.useState([]);
    
    const [formError, setFormError] = React.useState(null);

    const task = new SingleTask(taskDetails);
    const auth = new User(window?.Laravel?.user);

    const params = useParams();
    const [storeProjectTask, { isLoading, error }] = useStoreProjectTaskMutation()
   
    const required_error = error?.status === 422 ? error?.data : null;
    

    const {data: projectInfo, isFetching: milestoneDataIsFetching} = useGetMilestoneDetailsQuery(params?.projectId); 

 
    // handle change
    React.useEffect(() => {
        if(projectInfo){
            let project = _.head(projectInfo?.milestones);
            setProject(project?.project_name ?? '')
        }
    }, [milestoneDataIsFetching]);

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

        if(title === ''){
            err.title = "This field is required!",
            errCount++;
        }

        if(taskCategory === ''){
            err.taskCategory = "Select a category";
            errCount++;
        }

        if(milestone === null){
            err.milestone = "Select a milestone";
            errCount++;
        }

        if(!startDate){
            err.startDate = "Start date is required";
            errCount++;
        }

        if(!dueDate){
            err.dueDate = "Due date is required",
            errCount++;
        }

        if(!assignedTo?.id){
            err.assignedTo = "Select a user.";
            errCount++;
        }

        if(description === ''){
            err.description = 'Write a Description';
            errCount++;
        }

        setFormError(err); 
        return !errCount;
  
    }


    // handle sumition
    const handleSubmit = (e) => {
        e.preventDefault();
        const _startDate = startDate ? dayjs.dayjs(startDate).format("DD-MM-YYYY") : '';
        const _dueDate = dueDate ? dayjs.dayjs(dueDate).format("DD-MM-YYYY") : '';

        const fd = new FormData();
        fd.append('heading', title ?? '');
        fd.append('description', description ?? ''); 
        fd.append("start_date", _startDate ?? '');
        fd.append("due_date", _dueDate ?? '');
        fd.append("project_id", params?.projectId ?? '');
        fd.append("category_id", taskCategory?.id ?? '');
        fd.append("priority", _.lowerCase(priority));
        fd.append("board_column_id", 2);
        fd.append("estimate_hours", estimateTimeHour ?? 0);
        fd.append("estimate_minutes", estimateTimeMin ?? 0);
        fd.append("deliverable_id", milestone?.deliverable_type ?? '');
        fd.append("milestone_id", milestone?.id ?? ''); 
        fd.append("user_id", assignedTo?.id ?? '');

        
        Array.from(files).forEach((file) => {
            fd.append("file[]", file);
        });

        fd.append(
            "_token",
            document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content")
        );

        for (const pair of fd.entries()) {
          console.log(`${pair[0]} :, ${pair[1]}`);
        }
 
        if(isValid()){
            storeProjectTask(fd)
            .unwrap()
            .then((res) => { 
                onSuccess();
                close();

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: res.message,
                    showConfirmButton: false,
                    timer: 2500,
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
        }else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please fillup all required fields",
                showConfirmButton: true,
            });
        }
    };


    // global cursol loading status
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
                                />
                                {formError?.taskCategory  && (
                                    <div style={{ color: "red" }}> 
                                        {formError?.taskCategory }
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
                                            {milestone?.milestone_title ?? '--'}
                                            <div className='__icon'>
                                                <i className="fa-solid fa-sort"></i>
                                            </div>
                                        </Listbox.Button>
                                        <Listbox.Options  className="sp1-select-options">
                                            {_.map(projectInfo?.milestones, (milestone) => (
                                                <Listbox.Option 
                                                    key={milestone.id}
                                                    className={({ active }) =>  `sp1-select-option ${ active ? 'active' : ''}`}
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
                                            setDate={setStateDate}
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
                                        {convertTime(projectInfo?.minutes_left ?? 0)}
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

export default TaskCreationForm;
