import React, {useState} from 'react'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import Input from '../../components/form/Input' 
import TaskCategorySelectionBox from './TaskCategorySelectionBox'
import TaskObserverSelection from './TaskObserverSelection'
import AssginedToSelection from './AssignedToSelection'
import StatusSelection from './StatusSelection'
import PrioritySelection from './PrioritySelection'
import DatePicker from '../comments/DatePicker'
import CKEditorComponent from '../../../ckeditor'




const SubTaskForm = ({isOpen, close, defaultData, mode="add"}) => {

 
//   form data
  const [title, setTitle] = useState('')
  const [milestone, setMilestone] = useState('')
  const [parentTask, setParentTask] = useState('')
  const [startDate, setStateDate] = useState(new Date())
  const [dueDate, setDueDate] = useState(new Date())
  const [project, setProject] = useState('')
  const [taskCategory, setTaskCategory] = useState('')
  const [assignedTo, setAssignedTo] = useState('');
  const [taskObserver, setTaskObserver] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [Priority, setPriority] = useState('Medium');
  const [estimateTimeHour, setEstimateTimeHour ] = useState('');
  const [estimateTimeMin, setEstimateTimeMin ] = useState('');
  const [attachments, setAttachments ] = useState('');
 

// handle onchange
const handleChange = (e, setState) =>{
    e.preventDefault();
    let value = e.target.value;
    setState(value);
}


  return (
    <>
        <div className='sp1-subtask-form --modal-panel'>
            <div className='sp1-subtask-form --modal-panel-header'> 
                <h6>Create Sub Task</h6>
                {/* <Button
                    aria-label="close-modal"
                    className='_close-modal'
                    onClick={close}
                >
                    <i className="fa-solid fa-xmark" />
                </Button>  */}
            </div>


            <div className="sp1-subtask-form --modal-panel-body">
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
                            onChange={e => handleChange(e, setTitle)}
                        />
                    </div> 

                    <div className="col-6">
                        <Input 
                            id='milestone'
                            label="Milestone"
                            type="text" 
                            name='milestone'
                            value="Home page with header, footer (design & functionality)"
                            readOnly={true}
                        /> 
                    </div> 

                    <div className="col-6">
                        <Input 
                            id='parent_task'
                            label="Parent Task"
                            type="text" 
                            name='parent_task'
                            value="Homepage"
                            readOnly={true}
                        /> 
                    </div> 

                    <div className="col-6">
                        <Input 
                            id='project'
                            label="Project"
                            type="text" 
                            name='project'
                            value="new website design for an institute"
                            readOnly={true}
                        /> 
                    </div> 

                    <div className="col-6">
                        <div className="form-group my-3">
                            <label htmlFor="">Start Date <sup className='f-14'>*</sup></label>
                            <div className="form-control height-35 f-14">
                                <DatePicker date={startDate} setDate={setStateDate} />
                            </div>
                        </div>
                    </div>

                    <div className='col-6'> 
                        <div className="form-group my-3">
                        <label htmlFor="">Due Date <sup className='f-14'>*</sup></label>
                            <div className="form-control height-35 f-14">
                                <DatePicker date={dueDate} setDate={setDueDate} />
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <TaskCategorySelectionBox />
                    </div>

                    <div className="col-6">
                        <AssginedToSelection />
                    </div>

                    <div className="col-6">
                        <TaskObserverSelection />
                    </div>
 
                    <div className="col-6">
                        <StatusSelection />
                    </div>

                    <div className="col-6">
                        <PrioritySelection />
                    </div>

                    <div className="col-6">
                        <div className="form-group my-3">
                            <label htmlFor="" className='f-14 text-dark-gray'>Set Estimate Time <sup className='f-14'> * </sup></label>
                            <div className="d-flex">
                                <input className="form-control height-35 f-14 mr-2"/> hrs
                                <input className="form-control height-35 f-14 mr-2" /> min
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="form-group my-3">
                            <label htmlFor=""> Description </label>
                            <div className='sp1_st_write_comment_editor' style={{minHeight: '300px'}}>
                                <CKEditorComponent />
                            </div>
                        </div>
                    </div>

                    <div className="d-flex align-items-center">
                        <Button>
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SubTaskForm