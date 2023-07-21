import React from 'react'
import CustomModal from '../../components/CustomModal'
import Button from '../../components/Button'
import InnerWorkItem from './InnerWorkItem'
import Modal from '../../components/Modal'
import { useWindowSize } from 'react-use'

const SubmittedModalView = ({
    isOpen, 
    toggle,
    data,
    close,
    isLoading
}) => {
  const { width: deviceWidth } = useWindowSize();
 
  const content = () => {
        return(
            <div className='sp1-subtask-form --modal-panel --modal-submitted'>
                <div className='sp1-subtask-form --modal-panel-header'> 
                    <div className='d-flex align-items-center'>
                        <h6>Submitted Task </h6>
                        {isLoading && <div 
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
                        onClick={close}
                    >
                        <i className="fa-solid fa-xmark" />
                    </Button> 
                </div>

                <div className="sp1-subtask-form --modal-panel-body px-0">
                    {data?.map(d => (
                        <InnerWorkItem key={`${d.task_id}_${d.submission_no}`} data={d} />
                    ))}
                </div>
            </div>
        )
  }


  return (
        deviceWidth > 1200 ? 
        <React.Fragment>
            <CustomModal isOpen={isOpen} toggleRef={toggle} > {content()} </CustomModal>
        </React.Fragment> : 
        <React.Fragment>
            <Modal isOpen={isOpen}> { content() } </Modal> 
        </React.Fragment>
  )
}

export default SubmittedModalView