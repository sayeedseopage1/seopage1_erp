import React from 'react'
import SubTask from './SubTask' 
import SubTaskForm from './SubTaskForm';
import Button from '../../components/Button';
import SubTaskFormModal from './SubTaskFormModal';

const SubTaskSection = () => {
  const [openAddTaskModal, setOpenAddTaskModal] = React.useState(true);
  const [subtaskModalToggleRef, setSubtaskModalToggleRef] = React.useState(null);
  const toggleAddButton = () => setOpenAddTaskModal(!openAddTaskModal);
  const closeAddModal = () => setOpenAddTaskModal(false);

  return (
    <div className='sp1_task_right_card mb-3'>  

      <SubTaskFormModal 
        toggleRef={subtaskModalToggleRef}
        isOpen={openAddTaskModal} 
      />

      {/* left dropdown */}
        <button 
          aria-label='openCommentModalButton'  
          ref={setSubtaskModalToggleRef}
          className='sp1_task_right_dl_toggle'
          onClick={toggleAddButton}
        >
            <i className={`fa-solid fa-circle-chevron-${openAddTaskModal ? 'right' : 'left'}`} style={{color: "#276fec"}} />
        </button>
      {/* left dropdown */}

       <div className='d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold'>
          <span className="f-16">Sub Task</span> 
          <Button
              variant='tertiary'
              className="sp1_tark_add_item" 
              aria-label="addButton"
              onClick={toggleAddButton}
          > 
              <i 
                  className="fa-solid fa-plus" 
                  style= {{fontSize: '12px'}} 
              />  
              Sub Task 
          </Button>
        </div>

        <div className="sp1_task_right_card--body">
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
        </div>

   </div>
  )
}

export default SubTaskSection