import * as React from 'react' 
import CKEditorComponent from '../../../ckeditor';
import Button from '../../components/Button'; 

const CommentSendBox = () => {
  const [editMode, setEditMode] = React.useState(false);



  const commentMode = () => {
    if(editMode){
      return (
        <div className='w-100'>
          <div className='ck-editor-holder'>
              <CKEditorComponent />
            </div> 
          <div className='mt-3 d-flex align-items-center'>
            <Button className='mr-2'>Send</Button>
            <Button 
              variant='secondary' 
              onClick={() => setEditMode(false)}
            >Close</Button>
          </div>
        </div>
      )
    }

    return <div 
      onClick={() => setEditMode(true)} 
      className='__box'
    ><span>Write a comment ...</span></div> 
  }

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
            {commentMode()}  
          </div>
    </div>
  )
}

export default CommentSendBox