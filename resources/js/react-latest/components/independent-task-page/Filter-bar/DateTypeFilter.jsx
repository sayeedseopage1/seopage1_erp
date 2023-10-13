import React, {useState} from 'react'
import Dropdown from '../../../ui/Dropdown';
import _ from 'lodash';
import Search from './Searchbox';

const dateType = [
    "Due Date",
    "Created Date",
    "Actual Completion Date"
]

const DateTypeFilter = ({state, setState, selectionBoxClassName}) => {
  const [query, setQuery] = useState('');  
  return (
    <div className='sp1_task_filter_item'>
        <div>
            <span className='mr-2 f-13'>Date Filter By :</span>
            <Dropdown>
                <Dropdown.Toggle className={`sp1_filter_toggle ${selectionBoxClassName ?? ''}`}>
                    <strong>{state}</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    <div>
                        <Search autoFocus={true} value={query} onChange={setQuery} />
                    </div>
                    <div className="sp1_filter--users">
                        {_.map(_.filter(dateType, i => _.includes(_.lowerCase(i), _.lowerCase(query))), item => (
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

export default DateTypeFilter 