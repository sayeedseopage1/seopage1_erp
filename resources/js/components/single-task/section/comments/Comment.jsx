import * as React from 'react'
import Modal from '../../components/Modal';
import CommentPreview from './CommentPreview';

const Comment = () => {
  const [isOpen, setIsOpen] = React.useState(true);


  // handle comment preview
  const previewComment = (e) =>{
    e.preventDefault();
    setIsOpen(!isOpen);
  }


  return (
    <div className="d-flex align-items-center justify-content-between sp1_tark_right_item">
        <a href="#" onClick={previewComment}>  Lorem ipsum dolor sit amet... </a>
        <Modal className='sp1_st_cnt_modal' isOpen={isOpen}>
          <CommentPreview />
        </Modal>

        <div className="d-flex align-items-center">
            <a href="#" className="mr-2 py-2 sp1_task_righ_action_btn"><i className="fa-regular fa-eye"></i></a>
            <a href="#" className="mr-2 py-2 sp1_task_righ_action_btn"><i className="fa-regular fa-pen-to-square"></i></a>
        </div>
    </div> 
  )
}

export default Comment