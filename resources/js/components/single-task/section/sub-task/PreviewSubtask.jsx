import * as React from 'react'
import { useNavigate, useSearchParams} from 'react-router-dom'
import Modal from '../../components/Modal';
import Button from '../../components/Button';

const PreviewSubtask = () => {
  const [searchParams] = useSearchParams(); 
  const previewType= searchParams.get('preview-type') === 'modal';
 
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
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-general" role="tab" aria-controls="nav-general" aria-selected="true">General</a>
                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-sub-task" role="tab" aria-controls="nav-sub-task" aria-selected="false">Sub Task</a>
                        <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Submitted Works</a>
                        <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-time-logs" role="tab" aria-controls="nav-time-logs" aria-selected="false">Time Logs</a>
                        <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-reviews" role="tab" aria-controls="nav-reviews" aria-selected="false">Task Review</a>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-general" role="tabpanel" aria-labelledby="nav-home-tab">...</div>
                <div className="tab-pane fade" id="nav-sub-task" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
                <div className="tab-pane fade" id="nav-time-logs" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
                <div className="tab-pane fade" id="nav-reviews" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
                </div>
                {/* end tab */}
           </div>
        </div>
    </Modal>
  )
}

export default PreviewSubtask