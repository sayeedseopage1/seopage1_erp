import React from 'react'
import CustomModal from '../../components/CustomModal'
import Button from '../../components/Button';
import { User } from '../../../utils/user-details';
import dayjs from 'dayjs'; 

const SubmitionView = ({isOpen, close, toggle, data}) => {
    const user = data && data.user ? new User(data?.user) : null;
  return (
    <CustomModal
        isOpen={isOpen}
        toggleRef={toggle} 
    >
        <div className='sp1-subtask-form --modal-panel'>
            <div className='sp1-subtask-form --modal-panel-header'> 
                <div className='d-flex align-items-center'>
                    <h6>Submitted Task </h6>
                    {true && <div 
                        className="spinner-border text-dark ml-2" 
                        role="status"
                        style={{
                            width: '16px',
                            height: '16px',
                            border: '0.14em solid rgba(0, 0, 0, .25)',
                            borderRightColor: 'transparent' 
                        }}
                    />}
                </div> 
                <Button
                    aria-label="close-modal"
                    className='_close-modal'
                >
                    <i className="fa-solid fa-xmark" />
                </Button> 
            </div>

            <div className="sp1-subtask-form --modal-panel-body">
                <div className='mt-3'>
                  
                </div>      
            </div>
        </div>
    </CustomModal>
  )
}

export default SubmitionView 