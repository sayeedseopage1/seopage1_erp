import React from 'react'
import WorkItem from './WorkItem'

const SubmittedWork = () => {
  return (
    <div className='sp1_task_right_card mb-3'>
       <div className='d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold'>
          <span className="f-16">Submitted Work</span> 
        </div>

        <div className="sp1_task_right_card--body">
            <WorkItem />
            <WorkItem />
            <WorkItem />
            <WorkItem />
        </div>

   </div>
  )
}

export default SubmittedWork