import React from 'react'
import { User } from '../../../utils/user-details' 
import SubmitionView from './SubmitionView';
import { Link, useSearchParams } from 'react-router-dom';

const WorkItem = ({data, toggle, modalRef, close}) => { 
  const [searchParams] = useSearchParams();
  const previewId = searchParams.get('submitted-work') || 0;

  const user = data?.user ? new User(data?.user) : null;

  return (
    <div className="d-flex align-items-center justify-content-between sp1_tark_right_item">
        <div> 
            <a className='hover-underline text-primary' href={`/account/tasks/132?preview-type=modal&subtask=${data?.task_id}`}> Task#{data?.id} </a>
            ({data?.submission_no}) submitted by <a className='hover-underline text-primary' href={user?.getUserLink()}>{user?.getName()}</a> </div>

        <div>  Feb 14, 2023  </div>

        <div className="d-flex align-items-center">
            <Link to={`?submitted-work=${data?.id}`} className="mr-2 py-2 sp1_task_righ_action_btn">
              <i className="fa-regular fa-eye"></i>
            </Link>
        </div> 

       {
        Number(previewId) === Number(data.id) && 
        <SubmitionView
            isOpen={Number(previewId) === Number(data?.id)}
            toggle={modalRef}
            data={data}
            close={close}
        />
       } 
    </div> 
  )
}

export default WorkItem