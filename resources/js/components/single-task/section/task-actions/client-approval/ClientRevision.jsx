import React, {useState, lazy, Suspense} from 'react'
import Button from '../../../components/Button' 
import Modal from '../../../components/Modal';
import { SingleTask } from '../../../../utils/single-task';
import ClientRevisionForm from './ClientRevisionForm';

const ClientRevision = ({task}) => {
    const [revisionModal, setRevisionModal] = useState(false);
    const singleTask = new SingleTask(task)

  return (
    <React.Fragment>
        <Button
            variant='tertiary'
            onClick={() => setRevisionModal(true)}
            className='d-flex align-items-center sp1-st-revision-btn sp1-st-revision-btn'
        >
            <i className="fa-solid fa-plus-minus" />
            <span className="d-inline ml-1">Client Has Revision</span>
        </Button> 

        <Modal isOpen={revisionModal} className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
                <ClientRevisionForm 
                    task={singleTask} 
                    close={() => setRevisionModal(false)} 
                />
            </div>
        </Modal> 
    </React.Fragment>
  )
}

export default ClientRevision 