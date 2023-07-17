import React from 'react'
import { Placeholder } from '../../../global/Placeholder'

const TimeLogItemLoader = ({}) => {

  return (
    <div className="d-flex align-items-center justify-content-between sp1_tark_right_item py-2" style={{gap: '10px', height: '30px'}}>
        <div className='d-flex align-items-center'>
            <Placeholder width="24px" height="24px" type='circle' className='mr-2' />
            <span className='sp1_time_log_emplyee_name'>
                <Placeholder width='100px' />
            </span>
        </div> 

        <div>
            <Placeholder height="10px" width='50px' />
        </div> 
        <div>
            <Placeholder height="10px" width='50px' />
        </div>
        <div>
            <Placeholder height="10px" width='50px' />
        </div>
    </div>
  )
}

export default TimeLogItemLoader