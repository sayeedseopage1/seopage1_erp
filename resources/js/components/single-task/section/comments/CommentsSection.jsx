import * as React from 'react'
import Comment from './Comment'
import CommentModal from './CommentModal';
  
const CommentSection = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalToggleRef, setModalToggleRef] = React.useState(null);


  const toggleModalButton = () => setModalIsOpen(!modalIsOpen);

  return (
   <div className='sp1_task_right_card mb-3'>
      <CommentModal 
        isOpen={modalIsOpen}
        toggleRef={modalToggleRef} 
      />

      <button 
        aria-label='openCommentModalButton' 
        ref={setModalToggleRef} 
        className='sp1_task_right_dl_toggle'
        onClick={toggleModalButton}
      >
          <i className={`fa-solid fa-circle-chevron-${modalIsOpen ? 'right' : 'left'}`} style={{color: "#276fec"}} />
      </button>


       <div className='d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold'>
          <span className="f-16">Comment</span>
          <button
              className="sp1_tark_add_item" 
              aria-label="addButton"
          > 
              <i 
                  className="fa-solid fa-plus mr-2" 
                  style= {{fontSize: '12px'}} 
              /> 
              Comment 
          </button>
        </div>

        <div className="sp1_task_right_card--body">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>

   </div>
  )
}

export default CommentSection 