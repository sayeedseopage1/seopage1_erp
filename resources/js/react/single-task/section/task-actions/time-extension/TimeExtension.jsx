import React, {useState} from 'react'
import Button from '../../../components/Button'
import RequestTimeExtension from './RequestTimeExtension'
import { SingleTask } from '../../../../utils/single-task'
import Modal from '../../../components/Modal'
import ReviewTimeExtensionRequest from './ReviewTimeExtensionRequest'

const TimeExtension = ({task}) => {
  const [timeExtensionModal, setTimeExtensionModal] = useState(false);
  const [showFor, setShowFor] = useState('REQUEST_TIME_EXTENSION');
  const singleTask = new SingleTask(task);


  // on submit a form
  const handleSubmittion = (e, data) => {
    e.preventDefault();
    // console.log(data)
  }

  const open = (type) =>{
    setTimeExtensionModal(true);
    setShowFor(type)
  }

  return (
    <React.Fragment>
        <Button 
            variant='tertiary'
            onClick={() => open('REQUEST_TIME_EXTENSION')}
            className='d-flex align-items-center btn-outline-dark text-dark'
        >
            <i className="fa-regular fa-clock"></i>
            <span className="d-inline ml-1">Request Time Extension</span>
        </Button>

        <Button 
            variant='success'
            onClick={() => open('REVIEW_TIME_EXTENSION')}
            className='d-flex align-items-center border-success'
        >
            <i className="fa-regular fa-clock"></i>
            <span className="d-inline ml-1">Time Extension Request</span>
        </Button>

        <Modal isOpen={timeExtensionModal} className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
                {showFor === 'REQUEST_TIME_EXTENSION' && 
                    <RequestTimeExtension 
                        task={singleTask}
                        close={() => setTimeExtensionModal(false)}
                        onSubmit={handleSubmittion}
                    />
                }

                {showFor==='REVIEW_TIME_EXTENSION' && 
                    <ReviewTimeExtensionRequest 
                        task={singleTask}
                        close={() => setTimeExtensionModal(false)}
                        onSubmit={handleSubmittion}
                    />
                }
                 

            </div>
        </Modal> 
    </React.Fragment>
  )
}

export default TimeExtension