import React, {useState, lazy, Suspense} from 'react'
import Button from '../../../components/Button' 
import Modal from '../../../components/Modal';
import { SingleTask } from '../../../../utils/single-task';
import ClientRevisionForm from './ClientRevisionForm';
import AssigneeRevisionToDev from './AssigneeRevisionToDev';

const ClientRevision = ({task}) => {
    const [revisionModal, setRevisionModal] = useState(false);
    const [show,setShow] = useState('CLIENT_REVISION');
    const singleTask = new SingleTask(task)

    const handleSubmit = () => {
       setShow('ASSINEE_TO_DEV'); 
    }

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
                <div
                    className="sp1_single_task--modal-panel"
                    style={{ maxWidth: "550px" }}
                >
                    <div className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between">
                        <div className="font-weight-bold f-14">
                            Client Revision - Task#{task?.id}
                        </div>
                        <Button onClick={close} className="">
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div>

                    {show === 'CLIENT_REVISION' && 
                        <ClientRevisionForm 
                            task={singleTask}
                            onSubmitForm={handleSubmit}
                            close={() => setRevisionModal(false)} 
                        />
                    }
                    {show === "ASSINEE_TO_DEV" &&
                        <AssigneeRevisionToDev 
                            task={task}
                            onSubmit={(data) => console.log({ASSINEE_TO_DEV: data})}
                            isSubmitting = {false}
                        />
                    }
                </div>
            </div>
        </Modal> 
    </React.Fragment>
  )
}

export default ClientRevision 