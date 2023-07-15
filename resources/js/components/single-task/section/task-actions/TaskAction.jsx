import React from 'react'
import Button from '../../components/Button'
import TimerControl from './TimerControl'
import MarkAsComplete from './MarkAsComplete'
import { timeControlPermision, markAsCompletedButtonPermission } from '../../permissions'
import RevisionControl from './Revision/RevisionControl'
import RevisionViewControl from './Revision/RevisionViewControl'
import ApproveTask from './approve-task/ApproveTask'
import TimeExtension from './time-extension/TimeExtension'
import ClientApproval from './client-approval/ClientApproval'



const TaskAction = ({task, status}) => {
   const loggedUser = window?.Laravel?.user; 
  return ( 
        <div className="d-flex flex-wrap border-bottom pb-3 sp1_task_btn_group" style={{gap: '10px'}}>
            {/* with permision */}
            {/* {timeControlPermision({task, status, loggedUser})  ? <TimerControl task={task}/> : null }  
            {markAsCompletedButtonPermission({task, status, loggedUser}) ? <MarkAsComplete />  : null } */}

            {/* develop */}
            <TimerControl task={task} />
            <MarkAsComplete />
            <ApproveTask task={task} />
            <RevisionControl task={task} />
            <RevisionViewControl task={task} />
            <TimeExtension task={task} />
            <ClientApproval />

            
            
             
            {/* {{-- 3 dot --}} */}
            {/* <button type="button" className="d-flex align-items-center btn btn-sm btn-outline-dark mr-2 border-0 ml-auto">
                <i className="bi bi-three-dots" ></i>
            </button> */}
        </div> 
  )
}

export default TaskAction