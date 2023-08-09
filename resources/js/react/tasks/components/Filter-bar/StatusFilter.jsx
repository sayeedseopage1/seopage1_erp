import React, {useState} from 'react'
import Dropdown from '../Dropdown';
import _ from 'lodash';
import Search from '../Searchbox';
import Loader from '../Loader';
import { useGetBoardColoumnListQuery } from '../../../services/api/boardColumnsApliSlice';

 
const StatusFilter = ({state, setState, selectionBoxClassName}) => {
  const [query, setQuery] = useState('');  
  const {data, isFetching} = useGetBoardColoumnListQuery();

  const status = data ? [
    {id: 11, column_name: 'All'},
    ...data,
    {id: 10, column_name: 'Hide Completed Task'},
  ] : [];

  return (
    <div className='sp1_task_filter_item'>
        <div>
            <span className='mr-2 f-13'>Status :</span>
            <Dropdown>
                <Dropdown.Toggle className={`sp1_filter_toggle ${selectionBoxClassName ?? ''}`}>
                    <strong>{state?.column_name}</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    <div>
                        <Search autoFocus={true} value={query} onChange={setQuery} />
                    </div>
                    <div className="sp1_filter--users">  

                        {!isFetching && _.size(status) > 0 && _.map(_.filter(status, i => _.includes(_.lowerCase(i.column_name), _.lowerCase(query))), item => (
                            <Dropdown.Item key={item.id} onClick={() => setState(item)} className={state.id === item.id ? 'sp1_filter--user active' : 'sp1_filter--user'}>
                                {item?.column_name}
                            </Dropdown.Item>
                        ))}
 
                        {isFetching && <div className='py-3'><Loader title='Loading...' /> </div>}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </div>
  )
}

export default StatusFilter 