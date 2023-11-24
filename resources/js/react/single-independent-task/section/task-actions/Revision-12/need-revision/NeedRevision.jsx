import React from 'react';
import Switch from '../../../../../global/Switch';
import Modal from '../../../../components/Modal';
import SubTaskRevision from './SubTaskRevision';
import TaskRevision from './TaskRevision';

const NeedRevision = ({
    task,
    auth,
    status,
    close,
    isOpen
}) => {



  return (
    <Modal
        isOpen={isOpen}
        className="sp1_single_task--modal"
    >
        <div className="sp1_single_task--modal-panerl-wrapper">
            <Switch>
                {/* Revision to Parent Task */}
                <Switch.Case condition={!task?.isSubtask}>
                    <TaskRevision
                        task={task}
                        status={status}
                        auth={auth}
                        close={close}
                    />
                </Switch.Case>

                {/* Revision to SubTask */}
                <Switch.Case condition={task?.isSubtask}>
                    <SubTaskRevision
                        task={task}
                        status={status}
                        auth={auth}
                        close={close}
                    />
                </Switch.Case>
            </Switch>
        </div>
    </Modal>
  )
}

export default NeedRevision
