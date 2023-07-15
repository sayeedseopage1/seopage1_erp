import React, {useState, useRef} from 'react'
import Button from '../../../components/Button'
import Modal from '../../../components/Modal';
import { useClickAway } from 'react-use';

export const SubmitForClientApproval = ({task}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  const ref = useRef();

  useClickAway(ref, closeModal);

  const handleOnSubmit = ()=>{
      Swal.fire({
        position: "center",
        icon: "success",
        title: 'Submitted Task For Client Approval Successfully',
        showConfirmButton: false,
        timer: 2500,
    });

    closeModal();
  }


  return (
    <React.Fragment>
        <Button 
            variant='success'
            onClick={openModal}
            className='d-flex align-items-center mr-2 border-success'
        >
            <i className="fa-solid fa-handshake-angle"></i>
            <span className="d-inline ml-1">Submit For Client Approval</span>
        </Button>

        <Modal isOpen={isOpen} className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
              <div 
                ref={ref}
                className="sp1_single_task--modal-panel position-absolute p-2 mb-3"
                style={{top:'50%', left:'50%',transform:'translate(-50%, -50%)', width: '250px'}}
              >
                <div className='d-flex align-items-center border-bottom pb-1'>
                  <Button variant='tertiary' onClick={closeModal} className='ml-auto border-0'>
                    <i className='fa-solid fa-xmark' />
                  </Button>
                </div>
                <div className='d-flex flex-column align-items-center p-2' style={{gap:'10px'}}>
                  <img src='/img/warning.gif' alt='' style={{width: '50px', height: '50px'}}/>
                  <div className='d-flex flex-column aling-items-center'>
                    <h5 className='d-block mb-3'>Are You Sure?</h5>
                    <div className='d-flex align-items-center justify-content-center'>
                      <Button onClick={handleOnSubmit} className='mr-2 py-0'>Yes</Button>
                      <Button variant='tertiary' onClick={closeModal} className='py-0'>No</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Modal> 
    </React.Fragment>
  )
}
