import React from 'react' 
import CKEditorComponent from '../../../ckeditor'

const CommentSendBox = () => {
  return (
    <div className='sp1_task_comment_send_box'>
        <>
            <div className='__avatar rounded-circle'>
                <img 
                src="/user-uploads/avatar/40164f31bc7d575c7dbe99b24b408d75.png"
                alt='sender_name'
                width="32px"
                height="32px"
                className='rounded-circle'
                />
            </div> 
        </>
        <div className='__send-box'>
             <span> Write a comment..</span>
             <CKEditorComponent />
        </div>
    </div>
  )
}

export default CommentSendBox