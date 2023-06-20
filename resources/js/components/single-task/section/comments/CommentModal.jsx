import * as React from 'react' 
import CommentSendBox from './CommentSendBox';  
import InnerComment from './InnerComment';
import CustomModal from '../../components/CustomModal'; 

const CommentModal = ({toggleRef = null, isOpen, close}) => {
    
  return (
    <CustomModal toggleRef={toggleRef} isOpen={isOpen}> 
        <div className='sp1_task_comment_modal'>
            <div className='d-flex flex-column'>
                <CommentSendBox />  
                <div className='sp1_task_comment_list mt-4'>
                    <div className='font-weight-bold pb-3'>Comments: </div>
                    <div className='sp1_task_comment_list_items'>
                        <InnerComment />
                    </div>
                </div>
            </div> 
        </div>  
    </CustomModal>
  )
}

export default CommentModal