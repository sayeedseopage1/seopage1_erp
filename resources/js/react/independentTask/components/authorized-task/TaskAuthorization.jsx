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
import { useSearchParams } from 'react-router-dom';


const TaskAuthorization = ({ title }) => {
    // const [searchParams, setSearchParams] = useSearchParams();
    const [visible, setVisible] = useState(false);

    const { data, isFetching } = useGetIndependentAuthorizeTaskQuery();

    const open = () => setVisible(true);
    const close = () => setVisible(false);

      console.log({data,isFetching});

    // const tasksType = data ? data?.pendingParentTask : [];

    // filter data
    // const getData = (type) => {
    //     let _data = _.orderBy(tasksType, 'authorization_status', 'asc');
    //     switch (type) { 
    //         case 'all':
    //             return _data;
    //         case 'pending':
    //             return _.filter(_data, d => !d.authorization_status);
    //         case 'denied':
    //             return _.filter(_data, d => d.authorization_status === 2);        
    //         case 'authorized':
    //             return _.filter(_data, d => d.authorization_status === 1);        
    //         default:
    //             return _data;
    //     }
    // }

    // const _data = {
    //     'all': getData('all'),
    //     'pending': getData('pending'),
    //     'denied' : getData('denied'),
    //     'authorized': getData('authorized'),
    // }

    // const tableData = (type) => {
    //     if(type){
    //         return _.orderBy(_data[type], 'updated_at', 'desc')
    //     }else return []
    // }

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
                            {/* <Tabs data={_data} /> */}

                            <DataTable
                                tableData={_.orderBy(data?.pendingParentTask, 'updated_at', 'desc') || []}
                                tableColumns={authorizationColumns()}
                                tableName="authorize-task-table"
                                isLoading={false}
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




// tabs
// const Tabs = (props) => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const data = props.data;
//     const handleRouteChange = (e, params) => {
//         e.preventDefault();
//         for (const [key, value] of Object.entries(params)) {
//             searchParams.set(key, value);
//         }
//         setSearchParams(searchParams);
//     }


//     const badge = (type) => {
//         return _.size(data[type]);
//     }
//     return (
//         <ul className={styles.tabs}>
//             <li>
//                 <Link
//                     to="#"
//                     data-type="all"
//                     onClick={e => handleRouteChange(e, { show: 'all' })}
//                     data-active={searchParams.get("show") === "all"}
//                 >
//                     All <span className="badge badge-light">{badge('all')}</span>
//                 </Link>
//             </li>

//             <li>
//                 <Link
//                     to="#"
//                     data-type="pending"
//                     onClick={e => handleRouteChange(e, { show: 'pending' })}
//                     data-active={searchParams.get("show") === "pending"}
//                 >
//                     Pending <span className="badge badge-light">{badge('pending')}</span>
//                 </Link>
//             </li>

//             <li>
//                 <Link
//                     to="#"
//                     data-type="authorized"
//                     onClick={e => handleRouteChange(e, { show: 'authorized' })}
//                     data-active={searchParams.get("show") === "authorized"}
//                 >
//                     Authorized <span className="badge badge-light">{badge('authorized')}</span>
//                 </Link>
//             </li>

//             <li>
//                 <Link
//                     to="#"
//                     data-type="denied"
//                     onClick={e => handleRouteChange(e, { show: 'denied' })}
//                     data-active={searchParams.get("show") === "denied"}
//                 >
//                     Denied <span className="badge badge-light">{badge('denied')}</span>
//                 </Link>
//             </li>
//         </ul>
//     );
// };