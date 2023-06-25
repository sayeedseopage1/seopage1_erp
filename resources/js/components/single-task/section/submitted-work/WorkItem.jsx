import React from 'react'

const WorkItem = () => {
  return (
    <div className="d-flex align-items-center justify-content-between sp1_tark_right_item">
        <div>
            Lorem ipsum dolor sit amet...
        </div>

        <div className="d-flex align-items-center">
            <a href="#" className="mr-2 py-2 sp1_task_righ_action_btn"><i className="fa-regular fa-eye"></i></a>
            <a href="#" className="mr-2 py-2 sp1_task_righ_action_btn"><i className="fa-regular fa-pen-to-square"></i></a>
        </div>
    </div> 
  )
}

export default WorkItem