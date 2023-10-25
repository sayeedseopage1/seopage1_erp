import React from 'react'
import Modal from './Modal';
import Button from './Button';
import Input from './form/Input';

const TaskCreationForm = () => {
  return (
     <Modal isOpen={true}> 
        <div className="sp1_modal-content-wrapper">
            <div className="sp1_modal-panel">
                {/* header */}
                <div className="sp1_modal-head">
                    <div className="sp1_modal-title">Add Task</div>
                    <Button aria-label="ModalClose" variant='tertiary' className='sp1_modal-close'>
                      <i className='fa-solid fa-xmark'/>
                    </Button>
                </div>
                {/* end header */}

                {/* body */}
                <div className="sp1_modal-body">

                    {/* form */}
                       {/* form here... */}

                    {/* end form */}

                </div>
                {/* end body */}
            </div>  
        </div>
     </Modal>
  )
}

export default TaskCreationForm 