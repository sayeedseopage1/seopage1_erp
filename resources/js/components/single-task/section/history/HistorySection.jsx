


import React from 'react'
import HistoryItem from './HistoryItem'

const HistorySection = () => {
  return (
    <div className='sp1_task_right_card mb-3'>
        <div className='d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold'>
        <span className="f-16">History</span> 
        </div>

        <div className="sp1_task_right_card--body">
             <HistoryItem/>
             <HistoryItem/>
             <HistoryItem/>
             <HistoryItem/>
             <HistoryItem/>
             <HistoryItem/>
        </div> 
    </div>
  )
}

export default HistorySection