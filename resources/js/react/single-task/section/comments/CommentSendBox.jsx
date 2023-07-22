import * as React from 'react' 
import CKEditorComponent from '../../../ckeditor';
import Button from '../../components/Button';  
import UploadFilesInLine from '../../../file-upload/UploadFilesInLine';
import { useSelector } from 'react-redux';
import { useStoreCommentMutation } from '../../../services/api/SingleTaskPageApi';

const CommentSendBox = ({onCommentPost, task}) => {
  const [editMode, setEditMode] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [files, setFiles] = React.useState([]);


  const [storeComment, {isLoading}] = useStoreCommentMutation();
 
  const handleEditorChange = (e, editor) => {
    const data = editor.getData();
    setComment(data);
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('comment', comment);
    fd.append('task_id', task?.id);
    fd.append('_token', document.querySelector("meta[name='csrf-token']").getAttribute("content"));
    Array.from(files).forEach((file) => {
        fd.append('file[]', file);
    });

    storeComment({data: fd, task_id: task?.id}).unwrap().then(res=>{
      setEditMode(false);
      setComment("");
      setFiles('');
      onCommentPost(res);
    }).catch(err => console.log(err))

  }

  const commentMode = () => {
    if(editMode){
      return (
        <div className='w-100'>
          <div className='ck-editor-holder'>
              <CKEditorComponent data={comment} onChange={handleEditorChange} />
            </div> 

            <div className='mt-2'>
              <h6>Attach Files</h6>
              <UploadFilesInLine 
                files={files} 
                setFiles={setFiles} 
                uploadInputClass='comment-file-upload'
                fileWrapperClass='comment-uploaded-file'
              />
            </div>
          <div className='mt-3 d-flex align-items-center'>
            {isLoading ? 
                  <Button className='cursor-processing mr-2'>
                      <div 
                          className="spinner-border text-white" 
                          role="status"
                          style={{width: '18px', height: '18px' }}
                      >
                      </div>
                      Processing...
                  </Button> : 
                <Button className='mr-2' onClick={handleSubmit}>Send</Button>}
            
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