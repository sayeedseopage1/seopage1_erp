import { Combobox } from '@headlessui/react'
import * as React from 'react' 
import _  from 'lodash';
import { useParams } from 'react-router-dom';
import { useGetTaskDetailsQuery } from '../../../services/api/SingleTaskPageApi';
import Loader from '../../components/Loader';


const AssginedToSelection = ({selected, onSelect}) => {
    const [query, setQuery] = React.useState('');

    const params = useParams(); 
    const {
        data:employees,
        isFetching
    } = useGetTaskDetailsQuery(`/${params?.taskId}/json?mode=employees`);
 

    const filteredData =
    query === ''
      ? employees
      : employees?.filter((employee) => {
          return employee?.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox  value={selected} onChange={onSelect}>
        <div className="form-group position-relative my-3">
            <label htmlFor="">Assigned To</label>
            <Combobox.Button className="d-flex align-items-center w-100 sp1-selection-display-button">
                <Combobox.Input 
                    onChange={e => setQuery(e.target.value)} 
                    placeholder='--'
                    displayValue={(value) => value?.name || ''}
                    className="form-control height-35 f-14 sp1-selection-display w-100" 
                />
                <div className='__icon'>
                    <i className="fa-solid fa-sort"></i>
                </div>
            </Combobox.Button>
                 
            <Combobox.Options className="sp1-select-options">

                {isFetching && (
                    <div className='sp1-select-option-nodata'>
                        <Loader />
                    </div>
                )}
                
                {filteredData?.length===0 ? 
                    <div className='sp1-select-option-nodata'>
                         Nothing found.
                    </div>
                :filteredData?.map((employee) => (
                <Combobox.Option
                    key={employee?.id}
                    className={({ active }) =>  `sp1-select-option ${ active ? 'active' : ''}`}
                    value={employee}
                >
                    {({ selected }) => (
                        <div className="d-flex align-items-center" style={{gap: '10px'}}>
                            <div 
                                className="rounded-circle"
                                style={{
                                    width: '28px',
                                    height: '28px',
                                    overflow: 'hidden',
                                }}
                            >
                                <img 
                                    src={employee?.image_url} 
                                    alt={employee?.name} 
                                    width={100} 
                                    height={100} 
                                    className="rounded-circle"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'fill'
                                    }}
                                />
                            </div>
                            <span
                                className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                                {employee?.name} <span className='badge badge-primary'>Open to Work</span> 
                            </span>
                            {selected ? (
                                <span className="ml-auto">
                                    <i className="fa-solid fa-check"></i>
                                </span>
                            ) : null}
                        </div>
                    )}
                </Combobox.Option>
            ))}
            </Combobox.Options>
        </div>
    </Combobox >
  )
}

export default AssginedToSelection 