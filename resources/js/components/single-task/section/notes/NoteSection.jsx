import React from 'react'
import Note from './Note'

const NoteSection = () => {
  return (
    <div className='sp1_task_right_card mb-3'>
       <div className='d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold'>
          <span className="f-16">Notes</span>
          <button
              className="sp1_tark_add_item" 
              aria-label="addButton"
          > 
              <i 
                  className="fa-solid fa-plus mr-2" 
                  style= {{fontSize: '12px'}} 
              /> 
              Note
          </button>
        </div>

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