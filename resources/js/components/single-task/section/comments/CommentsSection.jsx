import * as React from 'react'
import Comment from './Comment'
import CommentModal from './CommentModal';
import Button from '../../components/Button';
import CommentWritingModal from './CommentWritingModal';
  
const CommentSection = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [openAddCommentModal, setOpenAddCommentModal] = React.useState(false);
  const [modalToggleRef, setModalToggleRef] = React.useState(null);

  const toggleModalButton = () => setModalIsOpen(!modalIsOpen);
  const toggleAddCommentModal = () => setOpenAddCommentModal(!openAddCommentModal);
  const closeAddCommentModal = () => setOpenAddCommentModal(false);

  
  
  return (
   <div 
      className='sp1_task_right_card mb-3'
      style={{zIndex:modalIsOpen ? '99': '' }}
   >
      <CommentModal 
        isOpen={modalIsOpen}
        toggleRef={modalToggleRef} 
      />

      <button 
        aria-label='openCommentModalButton' 
        ref={setModalToggleRef} 
        className='sp1_task_right_dl_toggle'
        onClick={toggleModalButton} 
        style={{zIndex:modalIsOpen ? '110': '' }}
      >
          <i className={`fa-solid fa-circle-chevron-${modalIsOpen ? 'right' : 'left'}`} style={{color: "#276fec"}} />
      </button>


       <div className='d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold'>
          <span className="f-16">Comment</span>
          <Button
              variant='tertiary'
              className="sp1_tark_add_item" 
              aria-label="addButton"
              onClick={toggleModalButton}
          > 
              <i 
                  className="fa-solid fa-plus" 
                  style= {{fontSize: '12px'}} 
              />  
              Comment 
          </Button>

          <CommentWritingModal 
            isOpen={openAddCommentModal} 
            close={closeAddCommentModal}
          />
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