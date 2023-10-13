import * as React from 'react'
import Modal from '../../components/Modal';
import CommentPreview from './CommentPreview';
import { User } from '../../../utils/user-details';
import dayjs from 'dayjs';

const Comment = ({comment}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const user =  comment?.user ? new User(comment.user) : null;

  // handle comment preview
  const previewComment = (e) =>{
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  return (
    <>
        <div className="d-flex justify-content-between sp1_tark_right_item align-items-start pt-1 pb-2">
         <div className='w-100 sp1_st_comment-view' style={{overflow: 'hidden'}}>
            <p className='mb-0 pb-0'>
              <a href={user?.getUserLink()} className='hover-underline text-primary'>
                {user?.getName()}
              </a> add a comment
            </p>
            <p
              className='text-ellipsis d-flex align-items-center mb-0 pb-0'
              style={{color: '#AEAFB9'}}>
                {
                  comment?.last_updated_at &&
                  <>
                    {dayjs.unix(comment?.last_updated_at).format('MMM DD, YYYY ')} at &nbsp;
                    {dayjs.unix(comment?.last_updated_at).format('hh:mm a')}
                  </>
                }
            </p>
         </div>

          <div className="d-flex align-items-center">
              <a href="#" className={`mr-2 py-2 sp1_task_righ_action_btn ${isOpen ? 'text-primary' : ''}`} onClick={previewComment}><i className="fa-regular fa-eye"></i></a>
              {/* <a href="#" className="mr-2 py-2 sp1_task_righ_action_btn"><i className="fa-regular fa-pen-to-square"></i></a> */}
          </div>
        </div>


        <Modal Modal className='sp1_st_cnt_modal' isOpen={isOpen}>
          <CommentPreview isOpen={isOpen} close={() => setIsOpen(false)} comment={comment} />
        </Modal>
    </>
  )
}

export default Comment
