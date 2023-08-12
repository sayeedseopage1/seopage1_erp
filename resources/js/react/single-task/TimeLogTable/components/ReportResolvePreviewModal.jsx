import React from 'react'
import Modal from './Modal'
import Button from './Button'
import CkEditor from '../../ckeditor/index';

const ReportResolvePreviewModal = ({row}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(prev => !prev);
    const close = () => setIsOpen(false);

  return (
    <React.Fragment>
        <button type='button' onClick={toggle} className='sp1_tlh_resolve_btn'>Resolve</button>
        <React.Fragment>
            <Modal isOpen={isOpen} className="sp1_single_task--modal">
                <div className="sp1_single_task--modal-panerl-wrapper">
                    <div className="sp1_single_task--modal-panel resolve--modal-panel">
                        <div className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between">
                            <div className="font-weight-bold f-14">
                               Report # {row?.id}			
                            </div>
                            <Button variant="tertiary" onClick={close} className="">
                                <i className="fa-solid fa-xmark" />
                            </Button>
                        </div>

                        <div className="px-3">
                            <div className=''>
                                <div>
                                    <p className=''>
                                        <span><strong>Reason</strong>: </span>
                                        <span>{row?.reason_for_less_tracked_hours_a_day_task}</span>
                                    </p>
                                </div> 

                                {/* employee */}
                                <div>
                                    <span><strong>Developer</strong>: </span>
                                    <span>Md. Rakib Hossain</span>
                                </div> 
                                 
                                {/* project */}
                                <div className='mt-2'>
                                    <span><strong>Project</strong>: </span>
                                    <span>Build Me A Shopify Website</span>
                                </div> 
                                <div>
                                    <span><strong>Task</strong>: </span>
                                    <span>Example Task</span>
                                </div> 
                                <div>
                                    <span><strong>Client</strong>: </span>
                                    <span>Jordan Shaw</span>
                                </div> 
                                 
                                <div className='mt-2'>
                                    <span><strong>Date</strong>: </span>
                                    <span>7 June, 2023</span>
                                </div> 
                                
                                <div>
                                    <span><strong>Duration</strong>: </span>
                                    <span>1 Hour 24 Minutes</span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <span><strong>Time:</strong> 9:00 AM <strong>to</strong> 11:00 AM</span> 
                                </div>        


                                <div className='mt-3'>
                                    <span className='d-block'>
                                        <strong>Developer's Explanation</strong>
                                    </span>

                                    <span className='d-block mt-2'>
                                        <strong>Specific Reason:</strong> {row?.child_reason}
                                    </span>
                                    <div className='sp1_ck_content py-1'>
                                       <strong>Comment:</strong>  
                                       <div dangerouslySetInnerHTML={{__html: row?.comment}}/>
                                    </div>
                                </div> 


                                {/* top management's feedback  */}
                                <div className="mt-3">
                                    <span className="d-block mb-1">
                                        <strong>Top Management's Feedback</strong>
                                    </span>
                                    <form>
                                        <div className='ck-editor-holder'>
                                            <CkEditor />
                                        </div>

                                        <div className='d-flex align-items-center py-4'>
                                            <Button variant='success' className='ml-auto mr-2'>Resolve & Close</Button>
                                            <Button className='deny_button'>Deny & Close</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    </React.Fragment>
  )
}

export default ReportResolvePreviewModal