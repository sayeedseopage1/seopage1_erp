import React from 'react'
import Button from '../../components/Button'
import TimerControl from './TimerControl'
import MarkAsComplete from './MarkAsComplete'
import { timeControlPermision, markAsCompletedButtonPermission } from '../../permissions'
import RevisionControl from './Revision/RevisionControl'
import RevisionViewControl from './Revision/RevisionViewControl'
import ApproveTask from './approve-task/ApproveTask'



const TaskAction = ({task, status}) => {
   const loggedUser = window?.Laravel?.user; 
  return ( 
        <div className="d-flex flex-wrap border-bottom pb-3 sp1_task_btn_group">
            {/* with permision */}
            {/* {timeControlPermision({task, status, loggedUser})  ? <TimerControl task={task}/> : null }  
            {markAsCompletedButtonPermission({task, status, loggedUser}) ? <MarkAsComplete />  : null } */}

            {/* develop */}
            <TimerControl task={task} />
            <MarkAsComplete />


            {/* <Button 
                variant='tertiary'
                className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
            >
                <i className="fa-solid fa-plus"></i>
                <span className="d-inline ml-1">Request Time Extension</span>
            </Button> */}
            
            <ApproveTask task={task} />
            <RevisionControl task={task} />
            <RevisionViewControl task={task} />
            
            

            {/* {{-- approved --}} */}
            {/* <button type="button" className="d-flex align-items-center btn btn-sm btn-success mr-2 text-white border-0">
                <span className="d-inline mr-1">Approved</span> 
            </button>  */}

            {/* {{-- awaiting for time extension --}} */}
            {/* <button type="button" className="d-flex align-items-center btn btn-sm btn-warning mr-2 text-dark border-0" >
                <span className="d-inline mr-1">Awaiting for Time Extension</span> 
            </button> */}

            {/* {{-- 3 dot --}} */}
            <button type="button" className="d-flex align-items-center btn btn-sm btn-outline-dark mr-2 border-0 ml-auto">
                <i className="bi bi-three-dots" ></i>
            </button>
        </div> 
  )
}

export default TaskAction