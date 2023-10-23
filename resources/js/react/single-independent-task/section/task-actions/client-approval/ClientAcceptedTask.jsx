import React from 'react'
import Button from '../../../components/Button'
import { useConfirmClientApprovalMutation } from '../../../../services/api/SingleTaskPageApi'
import SubmitButton from '../../../components/SubmitButton';

const ClientAcceptedTask = ({task}) => { 

  const [confirmClientApproval, {isLoading}] = useConfirmClientApprovalMutation();

  const handleClick=(e)=>{
    e.preventDefault();
    confirmClientApproval({
        task_id: task?.id
    }).unwrap()
  }

  return (
    <React.Fragment>
        <SubmitButton 
            onClick={handleClick}
            variant='success'
            isLoading={isLoading}
            className='d-flex align-items-center border-success'
        >
            <i className="fa-solid fa-check"></i>
            <span className="d-inline ml-1">Client Has Accepted This Task</span>
        </SubmitButton>
    </React.Fragment>
  )
}

export default ClientAcceptedTask