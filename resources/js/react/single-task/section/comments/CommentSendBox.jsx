import dayjs from 'dayjs';
import * as React from 'react';
import CKEditorComponent from '../../../ckeditor';
import UploadFilesInLine from '../../../file-upload/UploadFilesInLine';
import { useStoreCommentMutation } from '../../../services/api/SingleTaskPageApi';
import { User } from '../../../utils/user-details';
import Button from '../../components/Button';
import { ErrorText } from '../../components/form/ErrorText';

const CommentSendBox = ({onCommentPost, task}) => {
  const [editMode, setEditMode] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [files, setFiles] = React.useState([]);

  const auth = new User(window?.Laravel?.user);

  const [storeComment, {isLoading}] = useStoreCommentMutation();

  // error
  const [error, setError] = React.useState(null);

  const handleEditorChange = (e, editor) => {
    const data = editor.getData();
    setComment(data);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    // is text is not provide show error message
    if(!comment){
        setError(s => ({...s, comment: "Please provide a comment before submitting."}));
        return;
    }

    // make form data
    const fd = new FormData();
    fd.append('comment', comment);
    fd.append('task_id', task?.id);
    fd.append('_token', document.querySelector("meta[name='csrf-token']").getAttribute("content"));
    Array.from(files).forEach((file) => {
        fd.append('file[]', file);
    });

    await storeComment({data: fd, task_id: task?.id}).unwrap().then(res=>{
      setEditMode(false);
      setComment("");
      setFiles('');
      let comment = {...res}
      comment.last_updated_at = dayjs(res?.last_updated_at).unix();
      onCommentPost(comment);
    }).catch(err => console.log(err))

  }

  const commentMode = () => {
    if(editMode){
      return (
        <div className='w-100'>
          <div className='ck-editor-holder'>
              <CKEditorComponent data={comment} onChange={handleEditorChange} />
            </div>

            {/* Show validation error */}
            {error?.comment ? <ErrorText >{error?.comment}</ErrorText> : null}

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
            <div className='__avatar rounded-circle mr-2' style={{width: '36px', height: '36px'}}>
                <img
                  src={auth?.getAvatar()}
                  alt='sender_name'
                  width="36px"
                  height="36px"
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
