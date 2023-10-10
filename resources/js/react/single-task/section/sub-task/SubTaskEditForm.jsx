import React, { useState } from 'react'
import Button from '../../components/Button'
import Input from '../../components/form/Input'
import TaskCategorySelectionBox from './TaskCategorySelectionBox'
import AssginedToSelection from './AssignedToSelection'
import PrioritySelection from './PrioritySelection'
import DatePicker from '../comments/DatePicker'
import CKEditorComponent from '../../../ckeditor'
import UploadFilesInLine from '../../../file-upload/UploadFilesInLine'
import _ from 'lodash'
import { useDeleteUplaodedFileMutation, useEditSubtaskMutation, useGetTaskDetailsQuery, useLazyGetTaskDetailsQuery } from '../../../services/api/SingleTaskPageApi'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { storeSubTasks } from '../../../services/features/subTaskSlice'
import { CompareDate } from '../../../utils/dateController'
import { toast } from 'react-toastify'

const dayjs = new CompareDate();


const  SubtTaskEditForm= ({close, editId}) => {
    const { task, subTask } = useSelector(s => s.subTask);
    const dispatch = useDispatch();

//   form data
  const [title, setTitle] = useState('');
  const [milestone, setMilestone] = useState('');
  const [parentTask, setParentTask] = useState('');
  const [startDate, setStateDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [project, setProject] = useState("");
  const [taskCategory, setTaskCategory] = useState('')
  const [assignedTo, setAssignedTo] = useState('');
  const [taskObserver, setTaskObserver] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [priority, setPriority] = useState('Medium');
  const [estimateTimeHour, setEstimateTimeHour ] = useState('');
  const [estimateTimeMin, setEstimateTimeMin ] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [files, setFiles] = React.useState([]);

    const params = useParams();

const [
    editSubtask,
    { isLoading, error }
] = useEditSubtaskMutation();

const [
    getTaskDetails,
    { data: edit, isFetching: editDataIsFetching}
] = useLazyGetTaskDetailsQuery();


// find edited subtask
const editSubTask = subTask.find(d => d.id === editId);

const { data: estimation, isFetching } = useGetTaskDetailsQuery(`/${params?.taskId}/json?mode=estimation_time`);


const required_error = error?.status === 422 ? error?.data: null;


// handle change
React.useEffect(() => {
    const formatedDate = (d) => {
        let day = dayjs.dayjs(d).toDate();
        return day;
    }
    getTaskDetails(`/${editId}/json?mode=sub_task_edit`).unwrap().then(res => {
        if(res){
            const assigneeTo = res?.users?.[0];

            setTitle(res.heading);
            setMilestone(res.milestone_title);
            setParentTask(task?.heading);
            setStateDate(formatedDate(res.start_date));
            setDueDate(formatedDate(res.due_date));
            setProject(res.project_name);
            setTaskCategory(res.task_category);
            setAssignedTo(assigneeTo ? {id: assigneeTo?.id, name: assigneeTo?.name}: '');
            setDescription(res.description);
            setPriority(_.startCase(res.priority));
            setEstimateTimeHour(res.estimate_hours);
            setEstimateTimeMin(res.estimate_minutes);
            setAttachedFiles(res.files);



        }
    }).catch((err) => {
        console.log(err)
    } )
}, [task, editId])



// handle onchange
const handleChange = (e, setState) =>{
    e.preventDefault();
    let value = e.target.value;
    setState(value);
}

// handle submission
const handleSubmit = (e) => {
    e.preventDefault();
  const _startDate = dayjs.dayjs(startDate).format('DD-MM-YYYY');
  const _dueDate = dayjs.dayjs(dueDate).format('DD-MM-YYYY');

  const fd = new FormData();
    fd.append('milestone_id', task?.milestone_id);
    fd.append('task_id', task?.id);
    fd.append('title', title);
    fd.append('start_date', _startDate);
    fd.append('due_date', _dueDate);
    fd.append('project_id', task?.project_id);
    fd.append('task_category_id', taskCategory?.id);
    fd.append('user_id', assignedTo?.id);
    fd.append('description', description);
    fd.append('board_column_id', task?.board_column_id);
    fd.append('priority', _.lowerCase(priority));
    fd.append('estimate_hours', estimateTimeHour);
    fd.append('estimate_minutes', estimateTimeMin);
    fd.append('image_url', null);
    fd.append('subTaskID', editSubTask?.subtask_id);
    fd.append('addedFiles', null);
    fd.append('_method', 'PUT');
    fd.append('_token', document.querySelector("meta[name='csrf-token']").getAttribute("content"));
    Array.from(files).forEach((file) => {
        fd.append('file[]', file);
    });

    editSubtask({data: fd, id: editId}).unwrap().then(res => {
            if(res?.status === 'success'){

                 let _subtask = [...subTask];
                 _subtask = _subtask?.map(s => {
                    if(Number(s?.id) === Number(res?.sub_task?.id)){
                        return res?.sub_task
                    }else return s;
                 })

                dispatch(storeSubTasks(_subtask));

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res?.message,
                    showConfirmButton: false,
                    timer: 2500
                })

                close();
            }
    }).catch((err) => {
        if(err?.status === 422){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Please fill out all required fields",
                showConfirmButton: true,
            })
        }
    })
}

// handle uplaoded file delete request
const [deleteUplaodedFile] = useDeleteUplaodedFileMutation();
const handleFileDelete = (e, file) => {
    // delete
    deleteUplaodedFile(file?.id).unwrap();

    // delete form ui
    let previousFile = [...attachedFiles];
    let index = previousFile?.indexOf(file);
    previousFile.splice(index,1);
    setAttachedFiles(previousFile);
}


// handle loading state
React.useEffect(() => {
    if (isLoading || editDataIsFetching) {
        document.getElementsByTagName('body')[0].style.cursor = 'progress';
      } else {
        document.getElementsByTagName('body')[0].style.cursor = 'default';
      }
}, [isLoading, editDataIsFetching])



const handleEditorChange = (e, editor) => {
    const data = editor.getData();
    setDescription(data);
}

const estimateError= (err) =>{
    let errText = '';
    let hoursErr = err?.estimate_hours?.[0];
    let minErr = err?.estimate_minutes?.[0];
    if(hoursErr) errText += hoursErr;
    if(minErr) errText += minErr;
    return errText;
}

  return (
    <>
        <div className='sp1-subtask-form --modal-panel'>
            <div className='sp1-subtask-form --modal-panel-header'>
                 <h6>
                        Edit Sub Task
                        {editDataIsFetching && <div
                            className="spinner-border text-dark ml-2"
                            role="status"
                            style={{
                                width: '16px',
                                height: '16px',
                                border: '0.14em solid rgba(0, 0, 0, .25)',
                                borderRightColor: 'transparent'
                            }}
                        />}
                </h6>
                <Button
                    aria-label="close-modal"
                    className='_close-modal'
                    onClick={close}
                >
                    <i className="fa-solid fa-xmark" />
                </Button>
            </div>

            <div className="sp1-subtask-form --modal-panel-body position-relative">
                {editDataIsFetching &&
                    <div className='w-100' style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1
                    }}/>
                }
                <div className='sp1-subtask-form --form row'>
                    <div className="col-6">
                        <Input
                            id='title'
                            label="Title"
                            type="text"
                            placeholder='Enter a task title'
                            name='title'
                            required={true}
                            value={title}
                            error= {required_error?.title?.[0]}
                            onChange={e => handleChange(e, setTitle)}
                        />
                    </div>

                    <div className="col-6">
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

                    <div className="col-6">
                        <div className="form-group my-3">
                            <label htmlFor="">Start Date <sup className='f-14'>*</sup></label>
                            <div className="form-control height-35 f-14">
                                <DatePicker
                                    placeholderText={`Ex: ${dayjs.dayjs().format('DD-MM-YYYY')}`}
                                    minDate={dayjs.dayjs(task?.start_date).toDate()}
                                    maxDate={dueDate || dayjs.dayjs(task?.due_date).toDate()}
                                    date={startDate}
                                    setDate={setStateDate}
                                />
                            </div>
                            {
                                required_error?.start_date?.[0] &&
                               <div style={{color: 'red'}}>{required_error?.start_date?.[0]}</div>
                            }
                        </div>
                    </div>

                    <div className='col-6'>
                        <div className="form-group my-3">
                            <label htmlFor="">Due Date <sup className='f-14'>*</sup></label>
                            <div className="form-control height-35 f-14">
                                <DatePicker
                                    placeholderText={`Ex: ${dayjs.dayjs().format('DD-MM-YYYY')}`}
                                    minDate={startDate || dayjs.dayjs(task?.start_date).toDate()}
                                    maxDate={dayjs.dayjs(task?.due_date).toDate()}
                                    date={dueDate}
                                    setDate={setDueDate}
                                />
                            </div>
                            {
                                required_error?.due_date?.[0] &&
                               <div style={{color: 'red'}}>{required_error?.due_date?.[0]}</div>
                            }
                        </div>
                    </div>

                    <div className="col-6">
                        <TaskCategorySelectionBox selected={taskCategory} onSelect={setTaskCategory}  />
                    </div>

                    <div className="col-6">
                        <AssginedToSelection selected={assignedTo} onSelect={setAssignedTo} />
                    </div>
{/*
                    <div className="col-6">
                        <TaskObserverSelection />
                    </div> */}

                    {/* <div className="col-6">
                        <StatusSelection />
                    </div> */}

                    <div className="col-6">
                        <PrioritySelection selected={priority} setSelected={setPriority} />
                    </div>

                    <div className="col-6">
                        <div className="form-group my-3">
                            <label htmlFor="" className='f-14 text-dark-gray'>Set Estimate Time <sup className='f-14'> * </sup></label>
                            <div className="d-flex align-items-center">
                                <input
                                    type='number'
                                    onWheel={e => e.currentTarget.blur()}
                                    className="form-control height-35 f-14 mr-2"
                                    value={estimateTimeHour}
                                    onChange={(e) => handleChange(e, setEstimateTimeHour)}
                                /> hrs
                                <input
                                    type='number'
                                    onWheel={e => e.currentTarget.blur()}
                                    className="form-control height-35 f-14 mr-2 ml-2"
                                    value={estimateTimeMin}
                                    onChange={e => handleChange(e, setEstimateTimeMin)}
                                /> min
                            </div>

                            <div style={{color: 'red'}}>
                                {estimateError(required_error)}
                            </div>
                            <div style={{color: 'red'}}>
                            Estimation time can't exceed {estimation?.hours_left} hours {estimation?.minutes_left} minutes
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="form-group my-3">
                            <label htmlFor=""> Description </label>
                            <div className='sp1_st_write_comment_editor' style={{minHeight: '100px'}}>
                                <CKEditorComponent data={description} onChange={handleEditorChange} />
                            </div>
                        </div>
                    </div>


                    <div className='col-12'>
                        <UploadFilesInLine
                            onPreviousFileDelete={handleFileDelete}
                            previous={attachedFiles}
                            files={files}
                            setFiles={setFiles}
                        />
                    </div>

                    <div className="col-12 mt-3">

                        <div className="d-flex align-items-center justify-content-end">
                            <Button
                                variant='secondary'
                                className='mr-2'
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
                            <Button className='cursor-processing'>
                                <div
                                    className="spinner-border text-white"
                                    role="status"
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                    }}
                                >
                                </div>
                                Processing...
                            </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SubtTaskEditForm
