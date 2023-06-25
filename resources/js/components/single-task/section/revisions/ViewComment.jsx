import * as React from 'react'
import Button from '../../components/Button'
import CustomModal from '../../components/CustomModal' 


const  ViewComment = ({close, isOpen, toggleRef, comment}) => { 
  return (
    <CustomModal isOpen={isOpen} toggleRef={toggleRef}>
        <div className='sp1-subtask-form --modal-panel'>
            <div className='sp1-subtask-form --modal-panel-header'> 
                <Button
                    aria-label="close-modal"
                    className='_close-modal ml-auto'
                    onClick={close}
                >
                    <i className="fa-solid fa-xmark" />
                </Button> 
            </div>

            <div className="sp1-subtask-form --modal-panel-body">
                <div className='py-3'>
                    <div>
                        {/* comment here... */}
                    </div>
                </div>
            </div>
        </div>
    </CustomModal>
    
  )
}

export default ViewComment 

