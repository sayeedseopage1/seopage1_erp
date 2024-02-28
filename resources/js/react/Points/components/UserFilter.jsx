import React, {useState} from 'react'
import Dropdown from './Dropdown';
import _ from 'lodash';
import Search from './Searchbox';
import { useUsers } from '../../hooks/useUsers';
import { User } from '../../utils/user-details';
import Loader from './Loader';

const UserFilter = ({state, setState, title, selectionBoxClassName, roleIds=[5, 9, 10], disabled=false, sidebarIsOpen}) => {
    const [query, setQuery] = useState('');
    const { users, usersIsFetching } = useUsers();
    let _users;

    if(roleIds === null){
        _users = _.filter(users, user => user.role_id === null)
    }else if(!_.isEmpty(roleIds)){
        _users = _.filter(users, user => _.includes(roleIds, Number(user.role_id)))
    }else _users = users;

    _users = _.filter(_users, (user) => _.includes(_.lowerCase(user.name), _.lowerCase(query)));

    const name = _.size(state?.name) > 16 ? `${state?.name?.slice(0, 16)}...` : state?.name

    return (
        <div className={`sp1_task_filter_item d-flex  ${sidebarIsOpen ? "flex-column w-100" : "align-items-center"}`}>
                <span className='mr-2 f-13 d-flex flex-nowrap'>{title} :</span>
                <Dropdown>
                    <Dropdown.Toggle disabled={disabled} className={`sp1_filter_toggle ${selectionBoxClassName ?? ''} ${sidebarIsOpen && "py-2"}`} >
                        <span
                            data-toggle={name ? 'tooltip' : ''}
                            title={state?.name ?? ''}
                        >
                            <strong>{name ?? 'All'}</strong>
                        </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <div>
                            <Search autoFocus={true} value={query} onChange={setQuery} />
                        </div>
                        {usersIsFetching &&
                            <Loader title="Loading..." />
                        }
                        <div className="sp1_filter--users">
                            {!usersIsFetching &&
                                <Dropdown.Item onClick={() => setState(null)} className={state === null ? 'sp1_filter--user active' : 'sp1_filter--user'}>
                                    All
                                </Dropdown.Item>}
                            {_.map(_users, item => {
                                const user = new User(item);
                                return <Dropdown.Item key={user.getId()} onClick={() => setState(item)} className={state?.id === user.getId() ? 'sp1_filter--user active' : 'sp1_filter--user'}>
                                    <img src={user.getAvatar()} alt={user.getName()} width={32} height={32}/>
                                    {user.getName()}
                                </Dropdown.Item>
                            })}
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
        </div>
    )
}

export default UserFilter
