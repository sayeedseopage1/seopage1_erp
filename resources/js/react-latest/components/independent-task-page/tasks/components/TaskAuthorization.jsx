import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import styles from './taskAuthorization.module.css'
import _ from 'lodash';
import Button from './Button';
import Modal from './Modal';
import Card from '../../../../ui/Card';
import DataTable from '../../../../ui/basic-table/DataTable';
import { useGetAuthorizeTasksQuery } from '../../../../../react/services/api/projectApiSlice';
import { AuthorizationColumns } from './TaskAuthorizationColumns';

const TaskAuthorization = ({title}) => {
  const [visible, setVisible] = useState(false);

  const {data, isFetching} = useGetAuthorizeTasksQuery('');

  const open = () => setVisible(true);
  const close = () => setVisible(false);



  return (
    <div className={styles.task_authorization}>
        <Button
            variant='tertiary'
            onClick={open}
            className={styles.authorize_task}
        >
            <i className='fa-solid fa-hourglass-end' />
            {title ?? 'Authorize Task'} <span className='badge badge-light'>{_.size(data?.data)}</span>
        </Button>


        <Modal isOpen={visible}>
           <div className={styles.modal_overlay}>
            <Card className={styles.card}>
                    <Card.Head onClose={close} className={styles.card_head}>
                        <span>Authorize Task </span>
                    </Card.Head>

                    <Card.Body className={styles.card_body}>
                        <DataTable
                            tableData = {_.orderBy(data?.data, 'updated_at', 'desc') || []}
                            tableColumns = {AuthorizationColumns}
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
