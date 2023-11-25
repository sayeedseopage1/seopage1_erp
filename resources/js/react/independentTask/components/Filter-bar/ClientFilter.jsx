import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Dropdown from '../Dropdown';
import Loader from '../Loader';
import Search from '../Searchbox';

const useClient = ()=>{
  const [clients, setClients] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(()=>{
    setIsFetching(true);
    fetch('/account/independent-task-clients')
      .then((res)=>res.json())
      .then(({data}) => {
        // console.log({data});
        setClients(data);
        setIsFetching(false);
      });
  },[])

  return { users:clients, usersIsFetching:isFetching};
}

const ClientFilter = ({state, setState, title, selectionBoxClassName, roleIds=[5, 9, 10]}) => {
    const [query, setQuery] = useState('');
    const { users, usersIsFetching } = useClient();


    const _users = _.filter(users, (user) => _.includes(_.lowerCase(user?.name || user?.client_name), _.lowerCase(query)));

    const showClientName = (selectedClient)=>{
      if (selectedClient?.id) {
        return _.size(state?.name) > 16 ? `${state?.name?.slice(0, 16)}...` : state?.name;
      } else {
        return _.size(state?.client_name) > 16 ? `${state?.client_name?.slice(0, 16)}...` : state?.client_name;
      }
    }

    const name = showClientName(state);
  return (
    <div className='sp1_task_filter_item'>
            <span className='mr-2 f-13 d-flex flex-nowrap'>{title} :</span>
            <Dropdown>
                <Dropdown.Toggle className={`sp1_filter_toggle ${selectionBoxClassName ?? ''}`}>
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
                        {_.map(_users, (item,i) => {
                            // const user = new User(item);
                            return <Dropdown.Item key={i} onClick={() => setState({...item,index:i})} className={state?.index===i ? 'sp1_filter--user active' : 'sp1_filter--user'}>
                                <img src={'http://127.0.0.1:8000/user-uploads/avatar/avatar_blank.png'} alt={''} width={32} height={32}/>
                                {item?.id ? item?.name : item?.client_name}
                            </Dropdown.Item>
                        })}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
    </div>
  )
}

export default ClientFilter;
