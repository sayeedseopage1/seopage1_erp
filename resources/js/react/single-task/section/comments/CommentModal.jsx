import * as React from 'react' 
import CommentSendBox from './CommentSendBox';  
// import InnerComment from './InnerComment';
import CustomModal from '../../components/CustomModal'; 
import Modal from '../../components/Modal';
import { useWindowSize } from 'react-use';
import InnerCommentLoader from '../../components/loader/CommentLoader';
const InnerComment = React.lazy(() => import('./InnerComment'));

const CommentModal = ({toggleRef = null, isOpen, close, task, comments=[], onCommentPost}) => {
    const { width } = useWindowSize();
    
  return (
   <React.Fragment>
        {width > 1200 ?
        <CustomModal toggleRef={toggleRef} isOpen={isOpen}> 
            <div className='sp1_task_comment_modal'>
                <div className='d-flex flex-column'>
                    <CommentSendBox  onCommentPost ={onCommentPost} task={task}/>  
                    <div className='sp1_task_comment_list mt-4'>
                        <div className='font-weight-bold pb-3'>Comments: </div>
                        <div className='sp1_task_comment_list_items'>
                            {comments?.length > 0 && comments?.map(comment => (
                                <React.Fragment key={comment.id} >
                                    <React.Suspense fallback={<InnerCommentLoader />}>
                                        <InnerComment comment={comment} />
                                    </React.Suspense> 
                                </React.Fragment>
                            )) }
                        </div>
                    </div>
                </div> 
            </div>  
        </CustomModal>:
         <React.Fragment>
            <Modal isOpen={isOpen}>
                <div className='position-relative'>
                    <div className='sp1_task_comment_modal --small-device'>
                        <div className='d-flex flex-column'>
                            <CommentSendBox  onCommentPost ={onCommentPost} task={task}/>  
                            <div className='sp1_task_comment_list mt-4'>
                                <div className='font-weight-bold pb-3'>Comments: </div>
                                <div className='sp1_task_comment_list_items'>
                                    {comments?.length > 0 && comments?.map(comment => (
                                        <React.Fragment key={comment.id} >
                                            <React.Suspense fallback={<InnerCommentLoader />}>
                                                <InnerComment comment={comment} />
                                            </React.Suspense> 
                                        </React.Fragment>
                                    )) }
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>  
            </Modal>
         </React.Fragment>
        }
   </React.Fragment> 
  )
}

export default CommentModal