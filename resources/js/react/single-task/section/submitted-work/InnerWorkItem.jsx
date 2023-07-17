import React from 'react'
import { User } from '../../../utils/user-details'
import { Link } from 'react-router-dom';

const InnerWorkItem = ({data}) => {   
  const user = data?.user ? new User(data?.user) : null;

  return (
    <div className="d-flex align-items-center justify-content-between sp1_tark_right_item px-0 py-2" styte={{gap: "16px"}}>
        <div> 
            <a 
              className='hover-underline text-primary' 
              href={`/account/tasks/132?preview-type=modal&subtask=${data?.task_id}`}
            > 
              Task#{data?.task_id} 
            </a>
            ({data?.submission_no}) submitted by <a className='hover-underline text-primary' href={user?.getUserLink()}>{user?.getName()}</a> </div>

        <div>  Feb 14, 2023  </div>  

        <div className="d-flex align-items-center">
            <Link to={`?submitted-work=${data?.id}`} className="mr-2 py-2 sp1_task_righ_action_btn">
              <i className="fa-regular fa-eye"></i>
            </Link>
        </div> 
    </div> 
  )
}

export default InnerWorkItem