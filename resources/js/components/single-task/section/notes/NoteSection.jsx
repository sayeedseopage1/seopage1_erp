import React from 'react'
import Note from './Note'
import CreateNote from './CreateNote';
import CustomModal from '../../components/CustomModal';
import Button from '../../components/Button';

const NoteSection = () => {
  const [modalRefButton, setModalRefButton] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);


  const openModal = e => {
    e.preventDefault();
    setIsModalOpen(!isModalOpen);
  }

  const close = (e) => { 
    setIsModalOpen(false);
  }

  return (
    <div className='sp1_task_right_card mb-3' style={{zIndex: isModalOpen? '99' : ''}}>
       <div className='d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold'>
          <span className="f-16">Notes</span>
          <Button
              variant='tertiary'
              className="sp1_tark_add_item" 
              aria-label="addButton"
              onClick={openModal}
          > 
              {isModalOpen ? (
                <> <i className="fa-solid fa-xmark" style= {{fontSize: '12px'}}/> Close </> 
                ) :
                (
                  <> <i className="fa-solid fa-plus"  style= {{fontSize: '12px'}} /> Note  </>
                )
              }
          </Button>
        </div>

        {/* left dropdown */}
        <button 
          aria-label='openCommentModalButton'  
          ref={setModalRefButton}
          className='sp1_task_right_dl_toggle'
          onClick={openModal}
          style={{zIndex: isModalOpen? '110' : ''}}
        >
            <i className={`fa-solid fa-circle-chevron-${isModalOpen ? 'right' : 'left'}`} style={{color: "#276fec"}} />
        </button>
      {/* left dropdown */}

        <CustomModal
          close={close}
          isOpen={isModalOpen} 
          toggleRef={modalRefButton}
        >
           <CreateNote close={close} /> 
        </CustomModal>

        <div className="sp1_task_right_card--body">
         <Note />
         <Note />
         <Note />
         <Note />
         <Note />
        </div>

   </div>
  )
}

export default NoteSection