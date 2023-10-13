import React from 'react'
import Loader from '../../../components/Loader'
import CommentSendBox from '../../comments/CommentSendBox'
import InnerComment from '../../comments/InnerComment'

const Comments = ({task, comments, onCommentPost, isLoading}) => {
  return (
    <React.Fragment>
        <div className='d-flex flex-column'>
            <CommentSendBox task={task} onCommentPost ={onCommentPost}/>  
            <div className='sp1_task_comment_list mt-4'>
                <div className='font-weight-bold pb-3'>Comments: </div>
                <div className='sp1_task_comment_list_items'>
                    {isLoading && comments?.length === 0 && <Loader />}
                    {comments?.length > 0 && comments?.map(comment => (
                        <InnerComment key={comment.id} comment={comment} />
                    )) }
                </div>
            </div>
        </div>
    </React.Fragment> 
  )
}

export default Comments