import React from 'react'
import Button from '../../components/Button'
import TimerControl from './TimerControl'
import MarkAsComplete from './MarkAsComplete'
import { timeControlPermision, markAsCompletedButtonPermission, taskEditPermision, approveButtonPermission, needRevisionPermision, revisionButtonPermission} from '../../permissions'
import RevisionControl from './Revision/RevisionControl'
import RevisionViewControl from './Revision/RevisionViewControl'
import ApproveTask from './approve-task/ApproveTask'
import TimeExtension from './time-extension/TimeExtension'
import ClientApproval from './client-approval/ClientApproval'
import ReportControl from './report/Report'
import { User } from '../../../utils/user-details'
import _ from 'lodash'



const TaskAction = ({task, status}) => {
   const loggedUser = new User(window?.Laravel?.user); 
   const [timerStart, setTimerStart] = React.useState(false);
   

  return ( 
        <div className="d-flex flex-wrap border-bottom pb-3 sp1_task_btn_group" style={{gap: '10px'}}>
            {/* with permision */}
            {timeControlPermision({task, status, loggedUser}) ? <TimerControl task={task} timerStart={timerStart} setTimerStart={setTimerStart} auth={loggedUser} /> : null }  
            {!timerStart && markAsCompletedButtonPermission({task, status, loggedUser}) ? <MarkAsComplete task={task} auth={loggedUser} />  : null }

            {/* develop */}
            {approveButtonPermission({task, status, loggedUser}) ? <ApproveTask task={task} status={status} auth={loggedUser} /> : null}
            {needRevisionPermision({task, status, loggedUser}) ? <RevisionControl task={task} auth={loggedUser} /> : null} 
            
            { revisionButtonPermission({task, status, loggedUser})  && <RevisionViewControl task={task} status={status} auth={loggedUser}/>}
            {/* <TimeExtension task={task} /> */}
            <ClientApproval task={task} status={status} auth={loggedUser}/> 
            { _.includes([5, 8, 10], loggedUser?.getRoleId()) && <ReportControl task={task} /> }
            
            {   
                taskEditPermision({task, status, auth: loggedUser}) && 
                <a className='cnx__btn cnx__btn_sm cnx__btn_primary sp1_task-edit-button' >
                    <i className="fa-solid fa-file-pen"></i>
                    <span className='mx-2'>Edit</span>
                </a>
            }

            {/* {{-- 3 dot --}} */}
            {/* <button type="button" className="d-flex align-items-center btn btn-sm btn-outline-dark mr-2 border-0 ml-auto">
                <i className="bi bi-three-dots" ></i>
            </button> */}
        </div> 
  )
}

export default TaskAction