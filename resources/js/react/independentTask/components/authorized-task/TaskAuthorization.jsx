import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import styles from './taskAuthorization.module.css'
// import Button from '../../global/Button'
// import Modal from '../../global/Modal';
// import Card from '../../global/Card';
// import DataTable from '../../global/table/DataTable';
import { authorizationColumns } from './TaskAuthorizationColumns';
import _ from 'lodash';
import { useGetIndependentAuthorizeTaskQuery } from '../../../services/api/independentTaskApiSlice';
import Button from '../Button';
import Modal from '../Modal';
import Card from '../../../../react-latest/ui/Card';
import DataTable from '../table/DataTable';

const TaskAuthorization = ({title}) => {
  const [visible, setVisible] = useState(false);

  const {data, isFetching} = useGetIndependentAuthorizeTaskQuery();

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  console.log({data,isFetching});


  return (
    <div className={styles.task_authorization}>
        <Button
            variant='tertiary'
            onClick={open}
            className={styles.authorize_task}
        >
            <i className='fa-solid fa-hourglass-end' />
            {title ?? 'Authorize Task'} <span className='badge badge-light'>{_.size(data?.pendingParentTask)}</span>
        </Button>


        <Modal isOpen={visible}>
           <div className={styles.modal_overlay}>
            <Card className={styles.card}>
                    <Card.Head onClose={close} className={styles.card_head}>
                        <span>Authorize Task </span>
                    </Card.Head>

                    <Card.Body className={styles.card_body}>
                        <DataTable
                            tableData = {_.orderBy(data?.pendingParentTask, 'updated_at', 'desc') || []}
                            tableColumns = {authorizationColumns()}
                            tableName="authorize-task-table"
                            isLoading = {false}
                            // tableMaxHeight
                        />
                    </Card.Body>
                </Card>
           </div>
        </Modal>
    </div>
  )
}


TaskAuthorization.propTypes = {
    title: PropTypes.string
}

export default TaskAuthorization
