import React from 'react'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import CKEditorComponent from '../../../ckeditor'

const CommentWritingModal = ({isOpen, close}) => {
  return (
    <Modal isOpen={isOpen} className="sp1_st_cnt_modal">
        <div className='sp1_st_comment_preview'>
            <div className='sp1_st_comment_panel' style={{maxWidth: '60vw', minHeight: '50vh'}}> 
                <div className='border-bottom pb-2 d-flex'>
                    <Button
                        aria-label="close-modal"
                        className='_close-modal'
                        onClick={close}
                    >
                        <i className="fa-solid fa-xmark" />
                    </Button>
                </div> 


                {/* comment */}
                <div className='mt-3 w-100'>
                   <div className="sp1_st_write_comment-sendbox">
                       <div style={{minWidth: '48px'}}>
                            <img 
                                src="/user-uploads/avatar/40164f31bc7d575c7dbe99b24b408d75.png" 
                                alt=""
                                width={48}
                                height={48}
                                className='rounded-circle'
                            />
                       </div> 
                         
                        <div> 
                            <div className='sp1_st_write_comment_editor'>
                                <CKEditorComponent/>
                            </div> 
                            <div className='py-3'>
                                <div>Attach Files here (if need) <i className='fa-solid fa-paperclip ml-1 text-primary' /></div>
                                <div className='sp1_st_write_comment_editor_attach'>
                                    <i className="fa-solid fa-cloud-arrow-up"></i>
                                    <span>Attach Files</span>
                                </div> 
                            </div>
                        </div> 
                   </div>
                </div>
            </div>
        </div>
    </Modal>
  )
}

export default CommentWritingModal