import React from 'react'
import TimeLogItem from './TimeLogItem'

const TimeLogSection = () => {
  return (
    <div className='sp1_task_right_card mb-3'>
        <div className='d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold'>
        <span className="f-16">Time Logs</span> 
        </div>

        <div className="sp1_task_right_card--body">
              <TimeLogItem/>
              <TimeLogItem/>
              <TimeLogItem/>
              <TimeLogItem/>
              <TimeLogItem/>
              <TimeLogItem/>
        </div>

    </div>
  )
}

export default TimeLogSection