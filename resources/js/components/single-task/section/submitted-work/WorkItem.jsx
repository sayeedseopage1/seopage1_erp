import React from 'react'
import { User } from '../../../utils/user-details'

const WorkItem = ({data}) => {
  const user = data?.user ? new User(data?.user) : null;
  return (
    <div className="d-flex align-items-center justify-content-between sp1_tark_right_item">
        <div> Task submitted by <a href={user?.getUserLink()}>{user?.getName()}</a> </div>

        <div>  Feb 14, 2023  </div>

        <div className="d-flex align-items-center">
            <a href={`?preview=${132}`} className="mr-2 py-2 sp1_task_righ_action_btn"><i className="fa-regular fa-eye"></i></a>
        </div>
    </div> 
  )
}

export default WorkItem