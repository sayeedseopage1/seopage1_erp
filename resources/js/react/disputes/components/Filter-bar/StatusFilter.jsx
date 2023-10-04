import React, {useState} from 'react'
import Dropdown from '../../../global/Dropdown';
import _ from 'lodash';
  
const StatusFilter = ({state, setState, selectionBoxClassName}) => {
  const [query, setQuery] = useState('');  

  const status = [
    {id: 12, column_name: 'All'},
    {id: 11, column_name: 'Pending'},
    {id: 13, column_name: 'In Progress'},
    {id: 10, column_name: 'Resolved'},
  ] ;

  return (
    <div className='sp1_task_filter_item'>
        <div>
            <span className='mr-2 f-13'>Status :</span>
            <Dropdown>
                <Dropdown.Toggle className={`sp1_filter_toggle ${selectionBoxClassName ?? ''}`}>
                    <strong>{state?.column_name}</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu > 
                    <div className="sp1_filter--users">  

                        { _.size(status) > 0 && _.map(_.filter(status, i => _.includes(_.lowerCase(i.column_name), _.lowerCase(query))), item => (
                            <Dropdown.Item key={item.id} onClick={() => setState(item)} className={state.id === item.id ? 'sp1_filter--user active' : 'sp1_filter--user'}>
                                {item?.column_name}
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