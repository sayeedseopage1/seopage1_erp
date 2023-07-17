import React from 'react'
import { Link } from 'react-router-dom'

const SubTask = ({subTask, task, toggleEditForm}) => {
  return (
    <div className="d-flex align-items-center justify-content-between sp1_tark_right_item" style={{gap: '16px'}}>
        <div className='w-100 text-ellipsis'>
          {subTask?.title} 
        </div>

        <div className="d-flex align-items-center">
            <Link to={`?preview-type=modal&subtask=${subTask?.id}`} className="mr-2 py-2 sp1_task_righ_action_btn">
              <i className="fa-regular fa-eye"></i>
            </Link>
            <Link to='#' onClick={(e) => toggleEditForm(e, subTask?.id)} className="mr-2 py-2 sp1_task_righ_action_btn">
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
        </div>
    </div> 
  )
}

export default SubTask