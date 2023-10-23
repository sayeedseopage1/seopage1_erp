import React, {useState, lazy, Suspense} from 'react'
import Button from '../../../components/Button' 
import Modal from '../../../components/Modal';
import { SingleTask } from '../../../../utils/single-task';
import ClientRevisionForm from './ClientRevisionForm';
import AssigneeToLeadFromClientRevision from './AssigneeToLeadFromClientRevision';
import { useStoreClientRevisionTaskMutation } from '../../../../services/api/SingleTaskPageApi';

const ClientRevision = ({task, auth}) => {
    const [revisionModal, setRevisionModal] = useState(false);
    const [show,setShow] = useState('ASSINEE_TO_DEV');
    
    const singleTask = task;

    // client revision data
    const [clientComment, setClientComment] = useState('');
    const [clientAcknowledgement, setClientAcknowladgement] = useState('');


    const [storeClientRevisionTask, {isLoading}] = useStoreClientRevisionTaskMutation();

    const handleSubmit = (data) => {
       setClientAcknowladgement(data?.reason);
       setClientComment(data?.comment); 
       setShow('ASSINEE_TO_DEV'); 
    }

    const close = () => {
        setRevisionModal(false)
    }

    const handleSubmitToStore = (data) =>{
        const fData = {
            ...data,
            project_id: task?.projectId
        }
  
        // show toster notification
        const showToster= () =>{
            const Toast = Swal.mixin({
                toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
            }) 
            Toast.fire({
                icon: 'success',
                title: 'Task submitted for Revision successfully'
            })
        }
    
        storeClientRevisionTask(fData)
        .unwrap()
        .then(res => showToster())
        .catch(err => console.log(err))
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
                    className="sp1_single_task--modal-panel w-100 pb-3"
                    style={{ maxWidth: "550px" }}
                >
                    <div className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between">
                        <div className="font-weight-bold f-14">
                            Task#{task?.id} - Client Revision
                        </div>
                        <Button onClick={close} className="">
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div>

                    {/* {show === 'CLIENT_REVISION' && 
                        <ClientRevisionForm 
                            task={singleTask}
                            close={() => setRevisionModal(false)} 
                            onSubmitForm={(data) => handleSubmit(data)}
                        />
                    }  */}
                    {/* {show === "ASSINEE_TO_DEV" && */}
                        <AssigneeToLeadFromClientRevision 
                            task={task}
                            auth={auth}
                            isSubmitting = {isLoading}
                            onSubmit={handleSubmitToStore}
                            close={() => setRevisionModal(false)}
                            onBack={() => setShow('CLIENT_REVISION')}
                        />
                    {/* }  */}
                </div>
            </div>
        </Modal> 
    </React.Fragment>
  )
}

export default ClientRevision 

