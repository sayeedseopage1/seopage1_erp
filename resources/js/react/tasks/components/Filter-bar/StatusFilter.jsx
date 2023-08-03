import React, {useState} from 'react'
import Dropdown from '../Dropdown';
import {User} from '../../../utils/user-details';
import _ from 'lodash';
import { useUsers } from '../../../hooks/useUsers';
import Search from '../Searchbox';
import Loader from '../Loader';

const status = [
    "Hide completed task",
    "All",
    "Incomplete",
    "To Do",
    "Doing",
    "Completed",
    "Under Review",
    "Overdue"
]

const StatusFilter = ({state, setState}) => {
  const [query, setQuery] = useState('');  
  return (
    <div className='sp1_task_filter_item'>
        <div>
            <span className='mr-2 f-13'>Status :</span>
            <Dropdown>
                <Dropdown.Toggle className="sp1_filter_toggle">
                    <strong>{state}</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    <div>
                        <Search autoFocus={true} value={query} onChange={setQuery} />
                    </div>
                    <div className="sp1_filter--users">
                        {_.map(_.filter(status, i => _.includes(_.lowerCase(i), _.lowerCase(query))), item => (
                            <Dropdown.Item key={item} onClick={() => setState(item)} className={state === item ? 'sp1_filter--user active' : 'sp1_filter--user'}>
                                {item}
                            </Dropdown.Item>
                        ))}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </div>
  )
}

export default StatusFilter 