import React, { useState } from 'react';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import DeveloperRevisionView from './DeveloperRevisionView';
import RevisionViewModal from './RevisionViewModal';

const RevisionViewControl = ({task, auth, status}) => {
    const [revisionModal, setRevisionModal] = useState(false);
    const singleTask = task;

    console.log({task})
  return (
    <React.Fragment>
        <Button
            variant='tertiary'
            onClick={() => setRevisionModal(true)}
            className='d-flex align-items-center sp1-st-revision-btn --view-revision'
        >
            <i className="fa-solid fa-plus-minus" />
            <span className="d-inline ml-1">Revision</span>
        </Button>

        <Modal isOpen={revisionModal} className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
                {
                    // check is subtask
                    task?.hasSubtask ?
                    <RevisionViewModal
                        task={singleTask}
                        close={() => setRevisionModal(false)}
                    />
                    :
                    <DeveloperRevisionView
                        task={task}
                        close={() => setRevisionModal(false)}
                    />
                }

            </div>
        </Modal>
    </React.Fragment>
  )
}

export default RevisionViewControl
