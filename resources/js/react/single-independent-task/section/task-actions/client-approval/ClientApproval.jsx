import React from 'react'
import { SubmitForClientApproval } from './SubmitForClientApproval'
import ClientAcceptedTask from './ClientAcceptedTask'
import { SingleTask } from '../../../../utils/single-task'
import ClientRevision from '../Revision/ClientRevision'
import { submitForClientApproval, clientApproveConfirmationButtonPermission } from '../../../permissions'

const ClientApproval = ({task, status, auth}) => {
  return (
    <React.Fragment>
        { submitForClientApproval({task, status, auth}) && <SubmitForClientApproval task={task} auth={auth} /> }
        { clientApproveConfirmationButtonPermission({task, status, auth}) && 
          <React.Fragment>
            <ClientAcceptedTask task={task} auth={auth} />
            <ClientRevision task={task} auth={auth} />
          </React.Fragment>
        }
    </React.Fragment>
  )
}

export default ClientApproval