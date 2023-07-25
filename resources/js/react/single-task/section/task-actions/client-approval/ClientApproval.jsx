import React from 'react'
import { SubmitForClientApproval } from './SubmitForClientApproval'
import ClientAcceptedTask from './ClientAcceptedTask'
import { SingleTask } from '../../../../utils/single-task'
import ClientRevision from './../Revision/ClientRevision'
import { submitForClientApproval, clientApproveConfirmationButtonPermission } from '../../../permissions'

const ClientApproval = ({task, status, auth}) => {
  const _task = new SingleTask(task);

  return (
    <React.Fragment>
        { submitForClientApproval({task, status, auth}) && <SubmitForClientApproval task={_task} auth={auth} /> }
        { clientApproveConfirmationButtonPermission({task, status, auth}) && 
          <React.Fragment>
            <ClientAcceptedTask task={_task} auth={auth} />
            <ClientRevision task={_task} auth={auth} />
          </React.Fragment>
        }
    </React.Fragment>
  )
}

export default ClientApproval