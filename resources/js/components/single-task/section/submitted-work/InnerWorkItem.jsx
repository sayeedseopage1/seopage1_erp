import React from 'react'
import { User } from '../../../utils/user-details'

const InnerWorkItem = ({data}) => {   
  const user = data?.user ? new User(data?.user) : null;

  return (
    <div className="d-flex align-items-center justify-content-between sp1_tark_right_item px-0 py-2">
        <div> 
            <a className='hover-underline text-primary' href={`/account/tasks/132?preview-type=modal&subtask=${data?.task_id}`}> Task#{data?.task_id} </a>
            ({data?.submission_no}) submitted by <a className='hover-underline text-primary' href={user?.getUserLink()}>{user?.getName()}</a> </div>

        <div>  Feb 14, 2023  </div>  
    </div> 
  )
}

export default InnerWorkItem