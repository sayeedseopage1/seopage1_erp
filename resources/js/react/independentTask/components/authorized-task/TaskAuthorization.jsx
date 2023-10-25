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
import { User } from '../../../utils/user-details';


const TaskAuthorization = ({ title }) => {
    // user and auth
    const user = new User(window.Laravel.user);
    const auth = _.includes([1, 8], user.getRoleId());


    // const [searchParams, setSearchParams] = useSearchParams();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const [authorizedData, setAuthorizedData] = useState([]);
    const [visibilityOption,setVisibilityOption] = useState('all')

    const { data: authorizationData, isFetching } = useGetIndependentAuthorizeTaskQuery();

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    // console.log({ data, isFetching });

    const filteredData = (data = []) => {
        const newData = data.filter((d) => {
            return d.assign_by_id === user.id || d.assign_to_id === user.id;
        })

        return newData;
    }


    // filter data according to role and user
    useEffect(() => {
        if (authorizationData) {
            if (auth) {
                setAuthorizedData(authorizationData?.pendingParentTask);
            } else {
                setAuthorizedData(filteredData(authorizationData?.pendingParentTask));
            }
        }
    }, [authorizationData]);


    // filter data
    const getData = (type) => {
        switch (type) { 
            case 'all':
                return authorizedData;
            case 'pending':
                return _.filter(authorizedData, d => !d.approval_status);
            case 'denied':
                return _.filter(authorizedData, d => d.approval_status === 2);        
            case 'authorized':
                return _.filter(authorizedData, d => d.approval_status === 1);        
            default:
                return authorizedData;
        }
    }

    const _data = {
        'all': getData('all'),
        'pending': getData('pending'),
        'denied' : getData('denied'),
        'authorized': getData('authorized'),
    }

    useEffect(()=>{
        // console.log(visibilityOption);
        setData(_data[visibilityOption]);
    },[visibilityOption,authorizedData])

    return (
        <div className={styles.task_authorization}>
            <Button
                variant='tertiary'
                onClick={open}
                className={styles.authorize_task}
            >
                <i className='fa-solid fa-hourglass-end' />
                {title ?? 'Authorize Task'} <span className='badge badge-light'>{_.size(authorizedData)}</span>
            </Button>


            {
                _.size(authorizedData)?
                <Modal isOpen={visible}>
                    <div className={styles.modal_overlay}>
                        <Card className={styles.card}>
                            <Card.Head onClose={close} className={styles.card_head}>
                                <span>Authorize Task </span>
                            </Card.Head>

                            <Card.Body className={styles.card_body}>
                                <Tabs data={_data} setVisibilityOption={setVisibilityOption} visibilityOption={visibilityOption}/>

                                <DataTable
                                    tableData={_.orderBy(data, 'updated_at', 'desc') || []}
                                    tableColumns={authorizationColumns()}
                                    tableName="authorize-task-table"
                                    isLoading={false}
                                // tableMaxHeight
                                />
                            </Card.Body>
                        </Card>
                    </div>
                </Modal>
                :
                ''
            }
        </div>
    )
}


TaskAuthorization.propTypes = {
    title: PropTypes.string
}

export default TaskAuthorization




// tabs
const Tabs = ({data,visibilityOption,setVisibilityOption}) => {

    const badge = (type) => {
        return _.size(data[type]);
    }
    return (
        <ul className={styles.tabs}>
            <li>
                <a
                    onClick={()=>{
                      setVisibilityOption('all');
                    }}
                    className={`${visibilityOption==='all'?styles.all_active:styles.all_btn}`}
                >
                    All <span className="badge badge-light">{badge('all')}</span>
                </a>
            </li>

            <li>
                <a
                    onClick={()=>{
                        setVisibilityOption('pending');
                      }}
                    className={`${visibilityOption==='pending'?styles.pending_active:styles.pending_btn}`}
                >
                    Pending <span className="badge badge-light">{badge('pending')}</span>
                </a>
            </li>

            <li>
                <a
                    onClick={()=>{
                        setVisibilityOption('authorized');
                      }}
                    className={`${visibilityOption==='authorized'?styles.authorized_active:styles.authorized_btn}`}
                >
                    Authorized <span className="badge badge-light">{badge('authorized')}</span>
                </a>
            </li>

            <li>
                <a
                    onClick={()=>{
                        setVisibilityOption('denied');
                      }}
                    className={`${visibilityOption==='denied'?styles.denied_active:styles.denied_btn}`}
                >
                    Denied <span className="badge badge-light">{badge('denied')}</span>
                </a>
            </li>
        </ul>
    );
};