import React from 'react'
import SubTask from './SubTask'

const SubTaskSection = () => {
  return (
    <div className='sp1_task_right_card mb-3'>
       <div className='d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold'>
          <span className="f-16">Sub Task</span>
          <button
              className="sp1_tark_add_item" 
              aria-label="addButton"
          > 
              <i 
                  className="fa-solid fa-plus mr-2" 
                  style= {{fontSize: '12px'}} 
              /> 
              Sub Task 
          </button>
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