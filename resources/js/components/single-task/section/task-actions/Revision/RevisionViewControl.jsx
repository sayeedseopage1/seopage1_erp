import React, { useState } from 'react';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import { SingleTask } from '../../../../utils/single-task';
import RevisionViewModal from './RevisionViewModal';

const RevisionViewControl = ({task}) => {
    const [revisionModal, setRevisionModal] = useState(false);
    const singleTask = new SingleTask(task)

  return (
    <React.Fragment>
        <Button
            variant='tertiary'
            onClick={() => setRevisionModal(true)}
            className='d-flex align-items-center mr-2 sp1-st-revision-btn --view-revision'
        >
            <i className="fa-solid fa-plus-minus" />
            <span className="d-inline ml-1">Revision</span>
        </Button> 

        <Modal isOpen={revisionModal} className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
                 <RevisionViewModal 
                    task={singleTask} 
                    close={() => setRevisionModal(false)} 
                 />
            </div>
        </Modal> 
    </React.Fragment>
  )
}

export default RevisionViewControl