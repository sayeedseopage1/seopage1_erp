import React from 'react'
import SubmitionView from './SubmitionView';
import { Link, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

const WorkItem = ({data, toggle, modalRef, close, isLoading}) => { 
  const [searchParams] = useSearchParams();
  const previewId = searchParams.get('submitted-work') || 0;

  return (
    <div className="d-flex align-items-center justify-content-between sp1_tark_right_item">
        <div> 
            <a className='hover-underline text-primary' href={`/account/tasks/${data?.task_id}`}> Task#{data?.task_id} </a>
            ({data?.submission_no}) submitted by <a className='hover-underline text-primary' href={`/account/employees/${data?.user_id}`}>{data?.name}</a> </div>

        <div>{dayjs(data?.submission_date).format('MMM DD, YYYY')}</div>

        <div className="d-flex align-items-center">
            <Link to={`?submitted-work=${data?.task_id}${data?.submission_no}`} className="mr-2 py-2 sp1_task_righ_action_btn">
              <i className="fa-regular fa-eye"></i>
            </Link>
        </div> 

       {
        Number(previewId) === Number(`${data?.task_id}${data?.submission_no}`) && 
        <SubmitionView
            isOpen={Number(previewId) === Number(`${data?.task_id}${data?.submission_no}`)}
            toggle={modalRef}
            data={data}
            close={close}
            isLoading={isLoading}
        />
       } 
    </div> 
  )
}

export default WorkItem