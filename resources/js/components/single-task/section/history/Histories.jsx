import React from 'react'
import CustomModal from '../../components/CustomModal'
import Button from '../../components/Button';
import InnerHistoryItem from './InnerHistoryItem';

const Histories = ({isOpen, close, toggle, data = []}) => {
  return (
    <CustomModal
        isOpen={isOpen}
        toggleRef={toggle} 
    >
        <div className='sp1-subtask-form --modal-panel'>
            <div className='sp1-subtask-form --modal-panel-header'> 
                 <h6> History </h6> 
                <Button
                    aria-label="close-modal"
                    className='_close-modal'
                    onClick={close}
                >
                    <i className="fa-solid fa-xmark" />
                </Button> 
            </div>

            <div className="sp1-subtask-form --modal-panel-body">
                <div className='mt-3'>
                    {data ? data.map(d => (
                        <InnerHistoryItem key={d.id} history={d} />
                    )):null}
                </div>      
            </div>
        </div>
    </CustomModal>
  )
}

export default Histories
