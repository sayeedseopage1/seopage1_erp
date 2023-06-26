import * as React from 'react'
import { useNavigate, useSearchParams} from 'react-router-dom'
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Genarel from './preview/Genarel';

const PreviewSubtask = () => {
  const [searchParams] = useSearchParams(); 
  const previewType= searchParams.get('preview-type') === 'modal';
  const taskID = searchParams.get('subtask');
 
  const navigate = useNavigate();

  const handleClick = (e) => {
        navigate(-1);
  } 

  return (
    <Modal className={`sp1_subtask_offsetcanvas--modal`} isOpen={previewType}>
        <div className={`sp1_subtask_offsetcanvas ${previewType ? 'open': ''}`}>
           <div className='d-flex align-items-center justify-content-between p-2 sp1_subtask_offsetcanvas--bar'> 
                <div className='pl-3'>
                    <span className='font-weight-bold f-16'>Sub Task # 324</span>
                </div>
                <div className='d-flex align-items-center ml-auto'>
                    <Button variant='tertiary' className='mr-2 px-2'> 
                        <i className="fa-solid fa-up-right-and-down-left-from-center" />
                    </Button>
                    <Button onClick={handleClick} className=''> 
                        <i className='fa-solid fa-xmark' /> 
                    </Button>
                </div>
           </div> 

           <div className='sp1_subtask_offsetcanvas--body'>
                {/* tab */} 
                    <div className="nav flex-column nav-pills sp1-subtask-modal-sidebar" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className="nav-link active" id="v-pills-general-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">General</a>
                        <a className="nav-link" id="v-pills-comments-tab" data-toggle="pill" href="#v-pills-comments" role="tab" aria-controls="v-pills-comments" aria-selected="false">Comment</a>
                        <a className="nav-link" id="v-pills-subtask-tab" data-toggle="pill" href="#v-pills-subtask" role="tab" aria-controls="v-pills-subtask" aria-selected="false">Sub Task</a>
                        <a className="nav-link" id="v-pills-submitted-work-tab" data-toggle="pill" href="#v-pills-submitted-work" role="tab" aria-controls="v-pills-submitted-work" aria-selected="false">Submitted Works</a> 
                        <a className="nav-link" id="v-pills-time-log-work-tab" data-toggle="pill" href="#v-pills-time-log-work" role="tab" aria-controls="v-pills-time-log-work" aria-selected="false">Time Logs</a>  
                        <a className="nav-link" id="v-pills-task-review-work-tab" data-toggle="pill" href="#v-pills-task-review-work" role="tab" aria-controls="v-pills-task-review-work" aria-selected="false">Task Review</a>
                        
                    </div>

                    <div className="tab-content p-3" id="v-pills-tabContent">

                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-general-tab">
                           <Genarel taskID={taskID} /> 
                        </div>

                        <div className="tab-pane fade" id="v-pills-comments" role="tabpanel" aria-labelledby="v-pills-comments-tab">Comment</div>
                        <div className="tab-pane fade" id="v-pills-subtask" role="tabpanel" aria-labelledby="v-pills-subtask-tab">
                            Sub Task
                        </div>
                        <div className="tab-pane fade" id="v-pills-submitted-work" role="tabpanel" aria-labelledby="v-pills-submitted-work-tab">Submitted work</div>

                        
                        <div className="tab-pane fade" id="v-pills-time-log-work" role="tabpanel" aria-labelledby="v-pills-time-log-work-tab">Time Logs</div>

                        
                        <div className="tab-pane fade" id="v-pills-review-work" role="tabpanel" aria-labelledby="v-pills-review-work-tab">Task Reviews</div>
                    </div> 
                {/* end tab */}
           </div>
        </div>
    </Modal>
  )
}

export default PreviewSubtask