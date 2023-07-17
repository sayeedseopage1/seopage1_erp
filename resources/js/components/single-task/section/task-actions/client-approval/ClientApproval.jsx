import React from 'react'
import { SubmitForClientApproval } from './SubmitForClientApproval'
import ClientAcceptedTask from './ClientAcceptedTask'
import { SingleTask } from '../../../../utils/single-task'
import ClientRevision from './ClientRevision'

const ClientApproval = ({task}) => {
  const _task = new SingleTask(task);
  return (
    <React.Fragment>
        <SubmitForClientApproval task={_task} />
        <ClientAcceptedTask task={_task} />
        <ClientRevision task={_task} />
    </React.Fragment>
  )
}

export default ClientApproval