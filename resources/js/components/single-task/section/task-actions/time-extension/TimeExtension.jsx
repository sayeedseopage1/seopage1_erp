import React, {useState} from 'react'
import Button from '../../../components/Button'
import RequestTimeExtension from './RequestTimeExtension'
import { SingleTask } from '../../../../utils/single-task'
import Modal from '../../../components/Modal'
import ReviewTimeExtensionRequest from './ReviewTimeExtensionRequest'

const TimeExtension = ({task}) => {
  const [timeExtensionModal, setTimeExtensionModal] = useState(false);
  const singleTask = new SingleTask(task);


  // on submit a form
  const handleSubmittion = (e, data) => {
    e.preventDefault();
    console.log(data)
  }

  return (
    <React.Fragment>
        <Button 
            variant='tertiary'
            onClick={() => setTimeExtensionModal(true)}
            className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
        >
            <i className="fa-regular fa-clock"></i>
            <span className="d-inline ml-1">Request Time Extension</span>
        </Button>

        <Button 
            variant='success'
            onClick={() => setTimeExtensionModal(true)}
            className='d-flex align-items-center mr-2 border-success'
        >
            <i className="fa-regular fa-clock"></i>
            <span className="d-inline ml-1">Time Extension Request</span>
        </Button>

        <Modal isOpen={timeExtensionModal} className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
                {/* <RequestTimeExtension 
                    task={singleTask}
                    close={() => setTimeExtensionModal(false)}
                    onSubmit={handleSubmittion}
                />  */}

                <ReviewTimeExtensionRequest 
                    task={singleTask}
                    close={() => setTimeExtensionModal(false)}
                    onSubmit={handleSubmittion}
                />
            </div>
        </Modal> 
    </React.Fragment>
  )
}

export default TimeExtension