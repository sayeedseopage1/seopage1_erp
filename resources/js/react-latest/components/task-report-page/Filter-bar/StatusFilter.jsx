import React, {useState} from 'react'
import Dropdown from '../../../ui/Dropdown';
import _ from 'lodash';
import Search from './Searchbox';
import Loader from '../../../ui/Loader';
// import { useGetBoardColoumnListQuery } from '../../../services/api/boardColumnsApliSlice';

 
const StatusFilter = ({state, setState, selectionBoxClassName}) => {
  const [query, setQuery] = useState('');  
//   const {data, isFetching} = useGetBoardColoumnListQuery();

  const status = [
    {id: "1_ts_r_1", column_name: 'All', title: 'all'},
    {id: "1_ts_r_2", column_name: 'Pending', title: 'pending'},
    {id: "1_ts_r_3", column_name: 'Resolved', title: 'resolved'},
    {id: "1_ts_r_4", column_name: 'Accepted & Resolved', title: 'approved'},
    {id: "1_ts_r_5", column_name: 'Denied & Resolved', title: 'denied'},
  ];

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

                        {/* {!isFetching && _.size(status) > 0 && */}
                        { _.map(_.filter(status, i => _.includes(_.lowerCase(i.column_name), _.lowerCase(query))), item => (
                            <Dropdown.Item key={item.id} onClick={() => setState(item)} className={state.id === item.id ? 'sp1_filter--user active' : 'sp1_filter--user'}>
                                {item?.column_name}
                            </Dropdown.Item>
                        ))}
 
                        {/* {isFetching && <div className='py-3'><Loader title='Loading...' /> </div>} */}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </div>
  )
}

export default StatusFilter 