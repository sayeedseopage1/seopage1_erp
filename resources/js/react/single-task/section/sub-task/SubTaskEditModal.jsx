import _ from "lodash";
import React, { useState } from "react";
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
} from "../../../services/api/SingleTaskPageApi";
import { useGetMilestoneDetailsQuery } from "../../../services/api/projectApiSlice";

const dayjs = new CompareDate();

// Edit form Provider
const EditFormProvider = ({ task }) => {
    const [searchParams] = useSearchParams(); // get search params
    const isVisible = searchParams.get("modal") === "edit"; // check has modal
    const taskId = searchParams.get("task"); // get task id
    const navigate = useNavigate();
    const location = useLocation();

    const close = () => navigate(location.pathname, {replace: true});


    const [   editSubtask, { isLoading, error } ] = useEditSubtaskMutation();
    // handle submission
    const handleSubmission = (formData) => {
        editSubtask({data: formData, id: task?.id}).unwrap().then(res => {
            toast.success("Task Updated successfully!");
            close();
        }).catch((err) => {
            if(err?.status === 422){
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
                    <h6> Edit Task # {taskId} </h6>
                </Card.Head>

                <Card.Body className={styles.form_card_body}>
                    <div className="">
                        {task && (
                            <SubTaskEditModal
                                task={task}
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

const SubTaskEditModal = ({ task, onSubmit, isLoading, onClose}) => {
    const editDataIsFetching = !task;
    //form data
    const [title, setTitle] = useState(task.title);
    const [milestone, setMilestone] = useState({id: task.milestoneID, milestone_title: task.milestoneTitle});
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
            icon: _.includes(['png','jpeg', 'jpg', 'svg', 'gif', 'webp'] , file.task_file_icon) ? 'images' : 'others',
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
          `You cannot assign this task to ${name} because ${
            gender === 'male' ? 'he ' : 'she '
          } has more than 4 submittable tasks.`,
        description: 'This field is required.',
      };

      const showError = (field) => {
        err[field] = errorMessages[field];
        count++;
      }


      if(!title) showError('title');
      if(!startDate) showError('startDate');
      if(!dueDate) showError('dueDate');
      if(!taskCategory) showError('taskCategory');
      if(!assignedTo) showError('assignedTo');

      if (assignedTo && assignedTo?.isOverloaded) {
        err.assignedTo = overloadedUser(assignedTo.name, genderPronoun);
        count++;
      }

      if(!description) showError('description');

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

        if(isValid()){
         onSubmit(fd);
        }else{
         toast.warn('Please fill out all required fields!');
        }

    };


      const {data: projects, isFetching: isFetchingMilestone} = useGetMilestoneDetailsQuery(task?.projectId)



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
                                defaultValue={milestone?.milestone_title}
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
                                defaultValue={task?.parentTaskTitle}
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

                    <div className="col-12 col-md-6">
                        <TaskCategorySelectionBox
                            selected={taskCategory}
                            onSelect={setTaskCategory}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <AssignedToSelection
                            selected={assignedTo}
                            onSelect={setAssignedTo}
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
