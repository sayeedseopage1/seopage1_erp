import React from 'react'
import { User } from '../../../utils/user-details'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const InnerWorkItem = ({data}) => { 
  return (
    <div className="d-flex align-items-center justify-content-between sp1_tark_right_item px-0 py-2" styte={{gap: "16px"}}>
        <div> 
            <a 
              className='hover-underline text-primary' 
              href={`/account/tasks/${data?.task_id}`}
            > 
              Task#{data?.task_id} 
            </a>
            ({data?.submission_no}) submitted by <a className='hover-underline text-primary' href={`/account/employees/${data?.user_id}`}>{data?.name}</a> </div>

        <div>{dayjs(data?.submission_date).format('MMM DD, YYYY')}</div>  

        <div className="d-flex align-items-center">
            <Link to={`?submitted-work=${data?.task_id}${data?.submission_no}`} className="mr-2 py-2 sp1_task_righ_action_btn">
              <i className="fa-regular fa-eye"></i>
            </Link>
        </div> 
    </div> 
  )
}

export default InnerWorkItem