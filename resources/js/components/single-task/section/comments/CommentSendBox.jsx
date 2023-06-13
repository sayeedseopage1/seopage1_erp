import React from 'react'
import CKEditorComponent from '../../components/ckeditor/CKEditor'

const CommentSendBox = () => {
  return (
    <div className='sp1_task_comment--send-box'>
        <div className='__avatar'>
            <img 
               src="/user-uploads/avatar/40164f31bc7d575c7dbe99b24b408d75.png"
               alt='sender_name'
               width="32px"
               height="32px" 
            />
        </div>

        <div className='__send-box'>
             <span> Write a comment..</span>
            <CKEditorComponent />
        </div>
    </div>
  )
}

export default CommentSendBox