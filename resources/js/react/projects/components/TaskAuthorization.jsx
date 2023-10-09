import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import styles from './taskAuthorization.module.css'
import Button from '../../global/Button'
import Modal from '../../global/Modal';
import Card from '../../global/Card';
import DataTable from '../../global/table/DataTable';

const TaskAuthorization = ({title}) => {
  const [visible, setVisible] = useState();


  // get tasks



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
            {title ?? 'Authorize Task'}
        </Button>


        <Modal isOpen={visible}>
           <div className={styles.modal_overlay}>
            <Card className={styles.card}>
                    <Card.Head onClose={close} className={styles.card_head}>
                        Authorize Task
                    </Card.Head>

                    <Card.Body className={styles.card_body}>
                        <DataTable
                            tableData = {[]}
                            tableColumns = {[]}
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
