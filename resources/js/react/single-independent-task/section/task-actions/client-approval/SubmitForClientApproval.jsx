import React, {useState, useRef} from 'react'
import Button from '../../../components/Button'
import Modal from '../../../components/Modal';
import { useClickAway } from 'react-use';
import { useSubmitForClientApprovalMutation } from '../../../../services/api/SingleTaskPageApi';
import Loader from '../../../components/Loader';

export const SubmitForClientApproval = ({task, auth}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)
  const ref = useRef();
  useClickAway(ref, closeModal);


  const [submitForClientApproval, {isLoading}] = useSubmitForClientApprovalMutation();


  const handleOnSubmit = ()=>{
    submitForClientApproval({task_id: task?.id, user_id: auth?.getId()})
    .unwrap()
    .then(res => {
      Swal.fire({
          position: "center",
          icon: "success",
          title: 'Submitted Task For Client Approval Successfully',
          showConfirmButton: false,
          timer: 2500,
      });
    })
    .catch(err => console.log(err))
    .finally(() => closeModal())
  }


  return (
    <React.Fragment>
        <React.Fragment>
          {
            isLoading ? 
            <React.Fragment>
              <div className="cursor-processing cnx__btn cnx__btn_sm cnx__btn_primary">
                    <div
                        className="spinner-border text-white"
                        role="status"
                        style={{
                            width: "18px",
                            height: "18px",
                        }}
                    ></div>
                    Processing...
                </div>
            </React.Fragment>
            :
              <Button 
                  variant='success'
                  onClick={openModal}
                  className='d-flex align-items-center border-success'
              >
                  <i className="fa-solid fa-handshake-angle"></i>
                  <span className="d-inline ml-1">Submit For Client Approval</span>
              </Button> 
          }
        </React.Fragment>
        <Modal isOpen={isOpen} className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
              <div 
                ref={ref}
                className="sp1_single_task--modal-panel position-absolute p-2 mb-3"
                style={{top:'50%', left:'50%',transform:'translate(-50%, -50%)', width: '250px'}}
              >
                {!isLoading &&
                  <div className='d-flex align-items-center border-bottom pb-1'>
                    <Button variant='tertiary' onClick={closeModal} className='ml-auto border-0'>
                      <i className='fa-solid fa-xmark' />
                    </Button>
                </div>
                }
                <div className='d-flex flex-column align-items-center p-2' style={{gap:'10px'}}>
                  {isLoading && 
                    <React.Fragment>
                      <Loader title='Submitting...' />
                    </React.Fragment>
                  }
                  
                  {!isLoading &&
                    <React.Fragment>
                      <img src='/img/warning.gif' alt='' style={{width: '50px', height: '50px'}}/>
                      <div className='d-flex flex-column aling-items-center'>
                        <h5 className='d-block mb-3'>Are You Sure?</h5>
                        <div className='d-flex align-items-center justify-content-center'>
                          <Button onClick={handleOnSubmit} className='mr-2 py-0'>Yes</Button>
                          <Button variant='tertiary' onClick={closeModal} className='py-0'>No</Button>
                        </div>
                      </div>
                   </React.Fragment>
                  }
                </div>
              </div>
            </div>
        </Modal> 
    </React.Fragment>
  )
}
